#!/usr/bin/env node
/**
 * Export all published content from Hygraph (read-only) into this repo.
 *
 *   npm run export:hygraph            # export, skipping files that were hand-edited
 *   npm run export:hygraph -- --force # overwrite hand-edited generated files too
 *
 * - Queries Hygraph live (sequentially, paginated `first: 100, skip`), never mutates.
 * - Writes content collections (src/content/{blog,team,pages}), data files (src/data),
 *   images (src/assets/<collection>/), PDFs (public/files/), the redirect map and
 *   docs/migration-report.md.
 * - Idempotent: every file it writes is recorded with its hash in
 *   scripts/hygraph-export-manifest.json. On re-run, a generated file is only
 *   overwritten (or deleted when no longer produced) if it still matches the recorded
 *   hash, so hand edits are never clobbered silently. Files it did not create are
 *   never touched. Use --force to override.
 * - Form submissions (may contain PII) go to /tmp/uwib-submissions.csv, never the repo.
 *
 * Credentials: NEXT_PUBLIC_GRAPHCMS_ENDPOINT / NEXT_PUBLIC_GRAPHCMS_TOKEN from .env
 * (or the environment).
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import * as config from './export-config.mjs';

// ---------------------------------------------------------------------------
// Configuration / owner decisions
// ---------------------------------------------------------------------------

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FORCE = process.argv.includes('--force');
const MANIFEST_PATH = 'scripts/hygraph-export-manifest.json';
const SUBMISSIONS_CSV = process.env.UWIB_SUBMISSIONS_CSV || '/tmp/uwib-submissions.csv';
const CACHE_DIR = path.join(os.tmpdir(), 'uwib-hygraph-asset-cache');
const MAX_EDGE = 2400;
const DOWNLOAD_CONCURRENCY = 4;

const SKIP_PAGE_SLUGS = new Set(config.SKIP_PAGE_SLUGS);
const DROPPED_BLOG_POSTS = config.DROPPED_BLOG_POSTS;
const LEGACY_IMAGES = config.LEGACY_REMOTE_IMAGES;
const LEGACY_SKIPPED = config.LEGACY_SKIPPED;
const OLD_STATIC_ROUTES = config.OLD_STATIC_ROUTES;
const LINK_OVERRIDES = new Map(Object.entries(config.LINK_OVERRIDES));
const URL_FIXES = new Map(Object.entries(config.URL_FIXES));
const ALT_TEXT_PATH = 'src/data/alt-text.json';
/** Page templates built from components (exported as JSON for redesign). */
const LANDING_TEMPLATES = new Set(['LandingPage', 'customLandingPage']);
/** Templates whose content is rendered by a dedicated (formerly hard-coded) route. */
const LISTING_TEMPLATES = new Set(['Blog', 'Grid', 'GridWithSearch', 'DualColumn']);

// ---------------------------------------------------------------------------
// Small utilities
// ---------------------------------------------------------------------------

const log = (...a) => console.log('[export]', ...a);
const warn = (...a) => console.warn('[export] WARN', ...a);
const posix = (p) => p.split(path.sep).join('/');
const abs = (rel) => path.join(ROOT, rel);
const sha256 = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function slugify(input) {
  return String(input)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/['\u2019]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 150)
    .replace(/-+$/g, '');
}

function relFrom(fromFile, toFile) {
  let r = posix(path.relative(path.dirname(fromFile), toFile));
  if (!r.startsWith('.')) r = `./${r}`;
  return r;
}

function cleanText(s) {
  if (s == null) return null;
  const t = String(s).replace(/\u2060/g, '').replace(/\s+/g, ' ').trim();
  return t.length ? t : null;
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function hostOf(url) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function loadEnv() {
  const env = { ...process.env };
  const file = abs('.env');
  if (fs.existsSync(file)) {
    for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
      if (/^\s*(#|$)/.test(line)) continue;
      const m = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
      if (!m) continue;
      let v = m[2];
      const q = v.match(/^(['"])(.*)\1$/);
      if (q) v = q[2];
      if (!(m[1] in process.env)) env[m[1]] = v;
    }
  }
  return env;
}

// ---------------------------------------------------------------------------
// YAML front matter (scalars are emitted as JSON strings = valid YAML)
// ---------------------------------------------------------------------------

function yamlScalar(v) {
  if (v === null || v === undefined) return 'null';
  if (v instanceof Date) return JSON.stringify(v.toISOString());
  if (typeof v === 'string') return JSON.stringify(v);
  return String(v);
}

function yamlEmit(obj, indent = '') {
  const lines = [];
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;
    if (Array.isArray(v)) {
      if (v.length === 0) lines.push(`${indent}${k}: []`);
      else if (v.every((x) => x === null || typeof x !== 'object')) {
        lines.push(`${indent}${k}: [${v.map(yamlScalar).join(', ')}]`);
      } else {
        lines.push(`${indent}${k}:`);
        for (const item of v) {
          const sub = yamlEmit(item, `${indent}    `).split('\n');
          lines.push(`${indent}  - ${sub[0].trimStart()}`);
          for (const s of sub.slice(1)) lines.push(s);
        }
      }
    } else if (v && typeof v === 'object' && !(v instanceof Date)) {
      lines.push(`${indent}${k}:`);
      lines.push(yamlEmit(v, `${indent}  `));
    } else {
      lines.push(`${indent}${k}: ${yamlScalar(v)}`);
    }
  }
  return lines.join('\n');
}

const GENERATED_NOTE =
  '# Generated by scripts/export-hygraph.mjs from Hygraph. If you edit this file by hand,\n' +
  '# re-running the export will skip it (see scripts/hygraph-export-manifest.json).';

function frontmatterDoc(data, body, imports = []) {
  const head = `---\n${GENERATED_NOTE}\n${yamlEmit(data)}\n---\n`;
  const imp = imports.length ? `\n${imports.join('\n')}\n` : '';
  return `${head}${imp}\n${body.trim()}\n`;
}

// ---------------------------------------------------------------------------
// Hygraph client (sequential, retrying, read-only)
// ---------------------------------------------------------------------------

const env = loadEnv();
const ENDPOINT = env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || env.HYGRAPH_ENDPOINT;
const TOKEN = env.NEXT_PUBLIC_GRAPHCMS_TOKEN || env.HYGRAPH_TOKEN;
if (!ENDPOINT) {
  console.error('Missing NEXT_PUBLIC_GRAPHCMS_ENDPOINT (set it in .env).');
  process.exit(1);
}

let queryCount = 0;
async function gql(query, variables = {}) {
  if (/^\s*mutation\b/i.test(query)) throw new Error('Refusing to run a mutation: this exporter is read-only.');
  for (let attempt = 1; ; attempt++) {
    queryCount++;
    let res;
    try {
      res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(TOKEN ? { authorization: `Bearer ${TOKEN}` } : {}),
        },
        body: JSON.stringify({ query, variables }),
      });
    } catch (err) {
      if (attempt >= 5) throw err;
      await sleep(1000 * attempt);
      continue;
    }
    if ((res.status === 429 || res.status >= 500) && attempt < 6) {
      const wait = Number(res.headers.get('retry-after')) * 1000 || 1500 * attempt;
      warn(`Hygraph HTTP ${res.status}, retrying in ${wait}ms`);
      await sleep(wait);
      continue;
    }
    const json = await res.json().catch(() => null);
    if (!res.ok || !json || json.errors) {
      const msg = json?.errors?.map((e) => e.message).join('; ') || `HTTP ${res.status}`;
      if (/too many requests|rate limit/i.test(msg) && attempt < 6) {
        await sleep(2000 * attempt);
        continue;
      }
      throw new Error(`Hygraph query failed: ${msg}`);
    }
    return json.data;
  }
}

async function fetchAll(field, selection, { stage = 'PUBLISHED', where = '', orderBy = '' } = {}) {
  const out = [];
  for (let skip = 0; ; skip += 100) {
    const args = [`first: 100`, `skip: ${skip}`, `stage: ${stage}`];
    if (where) args.push(`where: ${where}`);
    if (orderBy) args.push(`orderBy: ${orderBy}`);
    const data = await gql(`query { ${field}(${args.join(', ')}) { ${selection} } }`);
    const batch = data[field];
    out.push(...batch);
    if (batch.length < 100) break;
  }
  return out;
}

const ASSET = 'id handle url fileName mimeType width height size';

const Q = {
  assets: ASSET,
  blogPosts: `id slug title excerpt isActive template publishedAt updatedAt createdAt
    content { markdown json }
    featuredImage { ${ASSET} }
    teamMember { slug name isActive }
    blogCategories { title isActive }
    blogTags { title isActive }`,
  teamMembers: `id name slug email phone position isActive hasTeamPage meetingLink miniBio isProducer order
    employeeCategory publishedAt updatedAt
    bIo { markdown raw }
    photo { ${ASSET} }
    blogPhoto { ${ASSET} }
    motionProfilePhoto { ${ASSET} }
    pets { id name slug isActive bio { markdown } photo { ${ASSET} } }`,
  pages: `id slug title wordingUnderTitle template isActive isPasswordProtected publishedAt updatedAt createdAt
    content { markdown json }
    rawHtml
    headerImage { ${ASSET} }
    components {
      __typename
      ... on InfoCard { id title description icon }
      ... on WideCard { id header text showBackgroundColor textOnLeft useVideo videoUrl
        buttons { __typename ... on ActionButton { id label buttonUrl } }
        image { ${ASSET} } }
      ... on PageHeader { id header headerImage { ${ASSET} } }
      ... on ActionBanner { id title descriptive buttons { __typename ... on ActionButton { id label buttonUrl } } }
      ... on IconBanner { id bannerTitle labels descriptions icons }
      ... on QuoteGridItem { id name subtext link icon }
      ... on ImageLinkGrid { id title }
      ... on TestimonialsSection { id }
    }`,
  carrierBanners: `id name generalPhoneNumber claimsPhoneNumber billingPhoneNumber website claimLink payLink
    showInCarousel isActive logo { ${ASSET} }`,
  programs: `id title description url order isActive image { ${ASSET} }`,
  officeResources: `id title altLogoText link category order isActive image { ${ASSET} }`,
  officeLocations: `id state subtitle address city addressState zipcode officeLocationPhone officeLocationEmail
    order isActive image { ${ASSET} }`,
  testemonials: `id text from subText highlight isActive teamMembers { slug isActive }`,
  quoteCards: `id slug label icon order isActive image { ${ASSET} }`,
  checkUpCards: `id slug label icon order isActive image { ${ASSET} }`,
  glossaryTerms: `id term definition glossaryType`,
  navigationMenuItems: `id text slug externalUrl isActive highlight isDropdown isExternalUrl openInNewTab order
    pages { slug title isActive }`,
  forms: `id name pages { slug }
    fields {
      __typename
      ... on FormInput { name inputLabel: label placeholder required type }
      ... on FormSelect { name selectLabel: label required formOptions(first: 500) { value option } }
      ... on FormCheckbox { name checkboxLabel: label required }
    }`,
};

// ---------------------------------------------------------------------------
// Output bookkeeping (manifest-protected writes)
// ---------------------------------------------------------------------------

/** rel path -> Buffer | string */
const outputs = new Map();
function emit(rel, content) {
  if (outputs.has(rel)) throw new Error(`Duplicate output path ${rel}`);
  outputs.set(rel, content);
}
const writeJson = (rel, data) => emit(rel, `${JSON.stringify(data, null, 2)}\n`);

// ---------------------------------------------------------------------------
// Report state
// ---------------------------------------------------------------------------

const report = {
  counts: {},
  skipped: [],
  removedVideos: [],
  callouts: [],
  sharepoint: [],
  externalDomains: new Map(),
  internalLinks: [],
  unresolvedAssets: [],
  pdfs: [],
  altNeeded: [],
  authorIssues: [],
  failures: [],
  notes: [],
  legacy: [],
  webformPosts: [],
  linkOverrides: [],
  urlFixes: [],
  altMissing: [],
  duplicatePosts: [],
  convertedPng: [],
};
function addExternal(url, source) {
  const host = hostOf(url);
  if (!host) return;
  const e = report.externalDomains.get(host) ?? { count: 0, sources: new Set() };
  e.count++;
  e.sources.add(source);
  report.externalDomains.set(host, e);
  if (host.endsWith('sharepoint.com') || host.endsWith('loop.cloud.microsoft')) report.sharepoint.push({ source, url });
}

// ---------------------------------------------------------------------------
// Assets
// ---------------------------------------------------------------------------

const assetsByHandle = new Map();
/** handle/url key -> plan */
const assetPlans = new Map();
const usedDest = new Set();

const EXT_BY_MIME = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'image/avif': 'avif',
  'application/pdf': 'pdf',
};

function handleFromUrl(url) {
  try {
    const u = new URL(url);
    if (!/graphassets\.com$/.test(u.hostname)) return null;
    const parts = u.pathname.split('/').filter(Boolean);
    return parts.at(-1) ?? null;
  } catch {
    return null;
  }
}

function extFor(asset) {
  return EXT_BY_MIME[asset.mimeType] || path.extname(asset.fileName || '').slice(1).toLowerCase() || 'bin';
}

function uniqueDest(dir, base, ext) {
  let candidate = `${dir}/${base}.${ext}`;
  for (let i = 2; usedDest.has(candidate); i++) candidate = `${dir}/${base}-${i}.${ext}`;
  usedDest.add(candidate);
  return candidate;
}

/**
 * Plan an image download into src/assets/<dir>/<name>.<ext>. Returns the
 * repo-relative destination path. Same handle -> same file (deduped).
 */
function planImage(asset, dir, name, usedBy) {
  if (!asset?.url) return null;
  const key = asset.handle || asset.url;
  const existing = assetPlans.get(key);
  if (existing) {
    existing.usedBy.push(usedBy);
    return existing.dest;
  }
  if (!asset.mimeType?.startsWith('image/')) {
    report.failures.push(`${usedBy}: expected an image but asset ${asset.fileName} is ${asset.mimeType}`);
    return null;
  }
  const dest = uniqueDest(`src/assets/${dir}`, slugify(name) || 'image', extFor(asset));
  assetPlans.set(key, { kind: 'image', asset, dest, usedBy: [usedBy] });
  return dest;
}

/** Plan a downloadable file (PDF etc.) into public/files. Returns the public URL. */
function planFile(asset, usedBy) {
  const key = asset.handle || asset.url;
  const existing = assetPlans.get(key);
  if (existing) {
    existing.usedBy.push(usedBy);
    return existing.publicUrl;
  }
  const base = slugify(path.basename(asset.fileName || asset.handle, path.extname(asset.fileName || ''))) || asset.handle;
  const dest = uniqueDest('public/files', base, extFor(asset));
  const publicUrl = `/${dest.replace(/^public\//, '')}`;
  assetPlans.set(key, { kind: 'file', asset, dest, publicUrl, usedBy: [usedBy] });
  return publicUrl;
}

async function download(url, cacheKey) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  const cacheFile = path.join(CACHE_DIR, cacheKey.replace(/[^A-Za-z0-9._-]/g, '_'));
  if (fs.existsSync(cacheFile)) return fs.readFileSync(cacheFile);
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(cacheFile, buf);
      return buf;
    } catch (err) {
      if (attempt >= 4) throw new Error(`download failed for ${url}: ${err.message}`);
      await sleep(1000 * attempt);
    }
  }
}

/** Opaque PNGs larger than this after processing are re-encoded as JPEG (photos saved as PNG). */
const PNG_TO_JPEG_THRESHOLD = 400 * 1024;

async function processImage(buf, ext) {
  if (ext === 'svg') return buf;
  const meta = await sharp(buf, { animated: ext === 'gif' }).metadata();
  const longEdge = Math.max(meta.width ?? 0, meta.pageHeight ?? meta.height ?? 0);
  if (ext === 'gif' && longEdge <= MAX_EDGE) return buf; // keep animation untouched
  let img = sharp(buf, { animated: ext === 'gif' }).rotate().resize({
    width: MAX_EDGE,
    height: MAX_EDGE,
    fit: 'inside',
    withoutEnlargement: true,
  });
  // sharp drops EXIF/XMP/ICC metadata by default (pixels converted to sRGB).
  if (ext === 'jpg') img = img.jpeg({ quality: 82, mozjpeg: true });
  else if (ext === 'png') img = img.png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 });
  else if (ext === 'webp') img = img.webp({ quality: 82, effort: 6 });
  else if (ext === 'gif') img = img.gif();
  else if (ext === 'avif') img = img.avif({ quality: 60 });
  return img.toBuffer();
}

/** old dest -> new dest when an image changed format during processing. */
const renamedDest = new Map();

// ---- Alt text (src/data/alt-text.json, keyed by final asset path) ----------
let altMap = {};
function loadAltText() {
  const file = abs(ALT_TEXT_PATH);
  if (!fs.existsSync(file)) return {};
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  return Object.fromEntries(Object.entries(raw).filter(([k]) => !k.startsWith('$')));
}
/** Placeholder resolved after image processing (paths may change format). */
function altToken(dest, kind = 'json') {
  return dest ? `@@ALT${kind === 'md' ? 'M' : 'J'}:${dest}@@` : '';
}
const finalDest = (dest) => renamedDest.get(dest) ?? dest;
function resolveAltTokens() {
  const missing = new Set();
  for (const [rel, content] of outputs) {
    if (typeof content !== 'string' || !content.includes('@@ALT')) continue;
    const next = content.replace(/@@ALT([JM]):([^@]+)@@/g, (_m, kind, dest) => {
      const fd = finalDest(dest);
      const alt = altMap[fd];
      if (typeof alt !== 'string' || !alt.trim()) {
        missing.add(fd);
        return '';
      }
      if (kind === 'M') return alt.replace(/([[\]\\])/g, '\\$1');
      return JSON.stringify(alt).slice(1, -1);
    });
    outputs.set(rel, next);
  }
  report.altMissing = [...missing].sort();
}

/** Point every text output at renamed image files (relative paths end in the dest tail). */
function applyRenames() {
  if (!renamedDest.size) return;
  const subs = [...renamedDest].map(([from, to]) => {
    const tail = from.replace(/^src\//, '');
    return [new RegExp(`${tail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=["'\\)\\s;]|$)`, 'g'), to.replace(/^src\//, '')];
  });
  for (const [rel, content] of outputs) {
    if (typeof content !== 'string') continue;
    let next = content;
    for (const [re, to] of subs) next = next.replace(re, to);
    if (next !== content) outputs.set(rel, next);
  }
}

const assetStats = { images: 0, files: 0, originalBytes: 0, writtenBytes: 0, byDir: new Map() };

async function runAssetPlans() {
  const plans = [...assetPlans.values()];
  let i = 0;
  async function worker() {
    while (i < plans.length) {
      const plan = plans[i++];
      const { asset } = plan;
      const url = asset.downloadUrl || asset.url;
      try {
        const buf = await download(url, asset.handle || slugify(url));
        let out = buf;
        if (plan.kind === 'image') out = await processImage(buf, extFor(asset));
        if (plan.kind === 'image' && extFor(asset) === 'png' && out.length > PNG_TO_JPEG_THRESHOLD) {
          const { isOpaque } = await sharp(buf).stats();
          if (isOpaque) {
            const jpg = await sharp(buf)
              .rotate()
              .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
              .jpeg({ quality: 85, mozjpeg: true })
              .toBuffer();
            const oldDest = plan.dest;
            usedDest.delete(oldDest);
            const dir = path.posix.dirname(oldDest);
            plan.dest = uniqueDest(dir, path.posix.basename(oldDest, '.png'), 'jpg');
            renamedDest.set(oldDest, plan.dest);
            report.convertedPng.push({ from: oldDest, to: plan.dest, before: out.length, after: jpg.length });
            out = jpg;
          }
        }
        emit(plan.dest, out);
        assetStats.originalBytes += buf.length;
        assetStats.writtenBytes += out.length;
        if (plan.kind === 'image') assetStats.images++;
        else assetStats.files++;
        const dir = plan.dest.split('/').slice(0, 3).join('/');
        const d = assetStats.byDir.get(dir) ?? { count: 0, bytes: 0 };
        d.count++;
        d.bytes += out.length;
        assetStats.byDir.set(dir, d);
      } catch (err) {
        report.failures.push(`Asset ${asset.fileName ?? url} (${plan.usedBy.join(', ')}): ${err.message}`);
        warn(err.message);
      }
    }
  }
  await Promise.all(Array.from({ length: DOWNLOAD_CONCURRENCY }, worker));
}

// ---------------------------------------------------------------------------
// Links
// ---------------------------------------------------------------------------

const INTERNAL_RE = /^https?:\/\/(?:www\.)?(?:uwibrisk|uwib)\.com(?=[/?#]|$)/i;
/** old path -> new path when the URL changes (filled from the redirect map). */
const pathRewrites = new Map();

function normalizeInternalPath(p) {
  let out = p || '/';
  if (!out.startsWith('/')) out = `/${out}`;
  const m = out.match(/^([^?#]*)(.*)$/);
  let pathname = m[1].replace(/\/{2,}/g, '/');
  if (pathname.length > 1) pathname = pathname.replace(/\/+$/, '');
  pathname = pathRewrites.get(pathname) ?? pathname;
  return pathname + m[2];
}

/** Rewrite one URL found in content. Returns the new URL. */
function rewriteUrl(url, source) {
  if (!url) return url;
  let raw = url.trim();
  if (URL_FIXES.has(raw)) {
    report.urlFixes.push({ source, from: raw, to: URL_FIXES.get(raw) });
    raw = URL_FIXES.get(raw);
  }
  if (/^(mailto|tel):/i.test(raw) || raw.startsWith('#')) return raw;
  if (INTERNAL_RE.test(raw)) {
    const p = normalizeInternalPath(raw.replace(INTERNAL_RE, '') || '/');
    report.internalLinks.push({ source, from: raw, to: p });
    return p;
  }
  if (raw.startsWith('/')) {
    const p = normalizeInternalPath(raw);
    report.internalLinks.push({ source, from: raw, to: p });
    return p;
  }
  if (/^https?:\/\//i.test(raw)) addExternal(raw, source);
  return raw;
}

/** Like rewriteUrl, but treats bare slugs ("towing-industry-survey") as site paths. */
function toHref(value, source) {
  if (!value) return null;
  const v = String(value).trim();
  if (URL_FIXES.has(v)) return rewriteUrl(v, source);
  if (/^https?:\/\/[^?#]*https?:\/\//i.test(v)) report.notes.push(`${source}: malformed URL (two URLs concatenated): ${v}`);
  if (/^(https?:|mailto:|tel:|\/|#)/i.test(v)) return rewriteUrl(v, source);
  return rewriteUrl(`/${v}`, source);
}

// ---------------------------------------------------------------------------
// Rich text -> markdown post-processing
// ---------------------------------------------------------------------------

function walkNodes(node, fn) {
  if (Array.isArray(node)) return node.forEach((n) => walkNodes(n, fn));
  if (!node || typeof node !== 'object') return;
  fn(node);
  if (Array.isArray(node.children)) node.children.forEach((n) => walkNodes(n, fn));
}

function nodeText(node) {
  if (typeof node?.text === 'string') return node.text;
  return (node?.children ?? []).map(nodeText).join('');
}

function normalizeForMatch(s) {
  return s
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[\\*_`>#[\]\u2060\u00a0]/g, ' ')
    .replace(/^\s*(?:[-+]|\d+\.)\s+/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/**
 * Wrap the markdown blocks that correspond to Hygraph `class` nodes in
 * <Callout variant="...">. Returns { md, wrapped: [{variant, text}] }.
 */
function wrapClassBlocks(md, json, source) {
  const classNodes = [];
  walkNodes(json, (n) => {
    if (n.type === 'class') classNodes.push(n);
  });
  if (!classNodes.length) return { md, wrapped: [] };
  const blocks = md.split(/\n{2,}/);
  const norm = blocks.map(normalizeForMatch);
  const wrapped = [];
  const inserts = [];
  for (const node of classNodes) {
    const variant = String(node.className || 'cta-box').trim().split(/\s+/)[0];
    const childTexts = (node.children ?? []).map((c) => normalizeForMatch(nodeText(c))).filter(Boolean);
    if (!childTexts.length) continue;
    const first = childTexts[0].slice(0, 60);
    const last = childTexts.at(-1).slice(0, 60);
    const start = norm.findIndex((b, idx) => b.startsWith(first) && !inserts.some((r) => idx >= r.start && idx <= r.end));
    if (start < 0) {
      report.failures.push(`${source}: could not locate class "${variant}" block in markdown (left unwrapped)`);
      continue;
    }
    let end = start;
    for (let j = start; j < blocks.length && j < start + childTexts.length + 3; j++) {
      if (norm[j].startsWith(last)) {
        end = j;
        break;
      }
    }
    inserts.push({ start, end, variant });
    wrapped.push({ variant, text: childTexts.join(' / ').slice(0, 140) });
  }
  inserts.sort((a, b) => b.start - a.start);
  for (const { start, end, variant } of inserts) {
    blocks.splice(end + 1, 0, '</Callout>');
    blocks.splice(start, 0, `<Callout variant="${variant}">`);
  }
  return { md: blocks.join('\n\n'), wrapped };
}

function escapeMdxText(md) {
  // MDX treats { } and < as syntax. Escape them outside our <Callout> tag lines.
  return md
    .split('\n')
    .map((line) => (/^<\/?Callout\b/.test(line) ? line : line.replace(/([{}])/g, '\\$1').replace(/<(?=[A-Za-z/!])/g, '\\<')))
    .join('\n');
}

/**
 * Clean a Hygraph markdown body.
 * ctx: { file (repo-relative output path), source (label), assetDir, assetBase, json }
 */
function processMarkdown(markdown, ctx) {
  let md = (markdown ?? '').replace(/\r\n/g, '\n').replace(/\u2060/g, '');

  // 1. Drop video embeds (Hygraph renders them as a fallback link).
  const videoSrcs = [];
  walkNodes(ctx.json, (n) => {
    if (n.type === 'video' && n.src) videoSrcs.push(n);
  });
  for (const v of videoSrcs) {
    const handle = handleFromUrl(v.src);
    const before = md;
    md = md.replace(/^.*\]\((\S+?)(?:\s+"[^"]*")?\).*$/gm, (line, url) =>
      handleFromUrl(url) === handle && /^\s*!?\[[^\]]*\]\(\S+?(?:\s+"[^"]*")?\)\s*$/.test(line) ? '' : line,
    );
    report.removedVideos.push({
      source: ctx.source,
      file: v.title || handle,
      url: v.src,
      removed: before !== md,
    });
    if (before === md) report.failures.push(`${ctx.source}: video node ${v.title || handle} not found in markdown`);
  }

  // 2. Images: ![alt](url "title")
  let inlineIndex = 0;
  md = md.replace(/!\[([^\]]*)\]\((<[^>]+>|[^\s)]+)(?:\s+"([^"]*)")?\)/g, (all, alt, rawUrl, title) => {
    const url = rawUrl.replace(/^<|>$/g, '');
    const handle = handleFromUrl(url);
    let altText = alt;
    if (/\.(png|jpe?g|webp|gif|svg)$/i.test(alt.trim())) {
      report.altNeeded.push({ source: ctx.source, was: alt });
      altText = '';
    }
    const keepTitle = title && title !== alt && title !== url ? ` "${title}"` : '';
    if (!handle) {
      if (/^https?:/i.test(url)) report.unresolvedAssets.push({ source: ctx.source, url, reason: 'external inline image (not downloaded)' });
      return `![${altText}](${url}${keepTitle})`;
    }
    const asset = assetsByHandle.get(handle) ?? null;
    if (!asset) {
      report.unresolvedAssets.push({ source: ctx.source, url, reason: 'asset handle not found in published assets' });
      return all;
    }
    inlineIndex++;
    const dest = planImage(asset, ctx.assetDir, `${ctx.assetBase}-inline-${inlineIndex}`, ctx.source);
    if (!dest) return all;
    void altText; // Hygraph alt text is replaced by src/data/alt-text.json
    return `![${altToken(dest, 'md')}](${relFrom(ctx.file, dest)}${keepTitle})`;
  });

  // 3. Links: [text](url "title")
  md = md.replace(/(?<!!)\[((?:[^\]\\]|\\.)*)\]\((<[^>]+>|[^\s)]+)(?:\s+"([^"]*)")?\)/g, (_all, text, rawUrl, title) => {
    const url = decodeEntities(rawUrl.replace(/^<|>$/g, ''));
    const handle = handleFromUrl(url);
    let newUrl;
    if (handle) {
      const asset = assetsByHandle.get(handle);
      if (!asset) {
        report.unresolvedAssets.push({ source: ctx.source, url, reason: 'linked asset handle not found in published assets' });
        newUrl = url;
      } else if (asset.mimeType?.startsWith('video/')) {
        report.failures.push(`${ctx.source}: link to video asset ${asset.fileName} left in place`);
        newUrl = url;
      } else {
        newUrl = planFile(asset, ctx.source);
        if (asset.mimeType === 'application/pdf') report.pdfs.push({ source: ctx.source, fileName: asset.fileName, to: newUrl });
      }
    } else {
      newUrl = rewriteUrl(url, ctx.source);
      const pathOnly = newUrl.startsWith('/') ? newUrl.replace(/[?#].*$/, '') : null;
      if (pathOnly && LINK_OVERRIDES.has(pathOnly)) {
        const target = LINK_OVERRIDES.get(pathOnly);
        report.linkOverrides.push({ source: ctx.source, from: url, to: target });
        if (target === null) return text; // unlink, keep the text
        newUrl = target + newUrl.slice(pathOnly.length);
      }
    }
    // Hygraph sets the link title to the URL itself; drop URL-like titles.
    const keepTitle = title && title !== url && title !== rawUrl && !/^\s*https?:/i.test(title) ? ` "${title}"` : '';
    return `[${text}](${newUrl}${keepTitle})`;
  });

  // 4. Bare graphassets URLs that survived (not inside markdown links).
  for (const m of md.matchAll(/https?:\/\/[a-z0-9.-]*graphassets\.com\/[^\s)"'\]]+/gi)) {
    report.unresolvedAssets.push({ source: ctx.source, url: m[0], reason: 'bare asset URL in text' });
  }

  // 5. Hygraph `class` nodes -> <Callout> (requires MDX).
  const { md: wrappedMd, wrapped } = wrapClassBlocks(md, ctx.json, ctx.source);
  let isMdx = false;
  if (wrapped.length) {
    isMdx = true;
    md = escapeMdxText(wrappedMd);
    for (const w of wrapped) report.callouts.push({ source: ctx.source, ...w });
  }

  md = md.replace(/\n{3,}/g, '\n\n').trim();
  return { md, isMdx };
}

// ---------------------------------------------------------------------------
// Embeds (forms)
// ---------------------------------------------------------------------------

function parseEmbed(rawBlobs) {
  const rawHtml = rawBlobs.filter((b) => b && b.trim()).join('\n').trim();
  if (!rawHtml) return null;
  const iframe = rawHtml.match(/<iframe\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/i);
  const script = rawHtml.match(/<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/i);
  const src = decodeEntities((iframe ?? script)?.[1] ?? '');
  const jot = src.match(/jotform\.com\/(?:jsform\/)?(\d{6,})/i);
  let type;
  if (jot) type = 'jotform';
  else if (iframe && /wistia|vimeo|youtube|youtu\.be/i.test(src)) type = 'video';
  else if (iframe) type = 'iframe';
  else if (script) type = 'script';
  else type = 'iframe';
  return { type, ...(jot ? { jotformId: jot[1] } : {}), src, provider: hostOf(src), rawHtml };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  log(`Hygraph endpoint: ${new URL(ENDPOINT).host} (read-only)`);
  altMap = loadAltText();

  // 1. Fetch everything (sequentially).
  const data = {};
  for (const [model, sel] of Object.entries(Q)) {
    data[model] = await fetchAll(model, sel);
    log(`fetched ${model}: ${data[model].length}`);
  }
  let submissions = [];
  try {
    submissions = await fetchAll('submissions', 'id createdAt updatedAt formData form { name }', { stage: 'DRAFT' });
    log(`fetched submissions (DRAFT): ${submissions.length}`);
  } catch (err) {
    report.failures.push(`Submissions export failed: ${err.message}`);
  }

  for (const a of data.assets) if (a.handle) assetsByHandle.set(a.handle, a);
  const contentAsOf = [
    ...data.blogPosts,
    ...data.pages,
    ...data.teamMembers,
  ].reduce((max, e) => (e.updatedAt && e.updatedAt > max ? e.updatedAt : max), '');

  // ---- Team ---------------------------------------------------------------
  const teamSlugOf = (m) => (m?.slug ? m.slug.replace(/^team\//, '') : null);
  const activeTeam = data.teamMembers.filter((m) => m.isActive);
  const activeTeamSlugs = new Set(activeTeam.map((m) => teamSlugOf(m) ?? slugify(m.name)));

  // URLs that move on the new site; content links are rewritten to the new location.
  for (const r of OLD_STATIC_ROUTES) if (r.to && r.to !== r.path) pathRewrites.set(r.path, r.to);
  for (const p of data.blogPosts) {
    if (DROPPED_BLOG_POSTS[p.slug]) pathRewrites.set(`/blog/${p.slug}`, DROPPED_BLOG_POSTS[p.slug].to);
    else if (!p.isActive) pathRewrites.set(`/blog/${p.slug}`, '/blog');
  }
  for (const m of data.teamMembers) if (!m.isActive && m.slug) pathRewrites.set(`/${m.slug}`, '/team');
  for (const m of data.teamMembers.filter((x) => !x.isActive)) {
    report.skipped.push({ collection: 'team', id: teamSlugOf(m) ?? m.name, reason: 'isActive = false' });
  }
  let petCount = 0;
  for (const m of activeTeam) {
    const slug = teamSlugOf(m) ?? slugify(m.name);
    if (!m.slug) report.notes.push(`Team member ${m.name} has no slug in Hygraph; using "${slug}".`);
    const file = `src/content/team/${slug}.md`;
    const photo = planImage(m.photo, 'team', slug, `team:${slug}`);
    const blogPhoto = m.blogPhoto ? planImage(m.blogPhoto, 'team', `${slug}-blog`, `team:${slug}`) : null;
    const motionPhotos = (m.motionProfilePhoto ?? [])
      .map((a, i) => planImage(a, 'team', `${slug}-motion-${i + 1}`, `team:${slug}`))
      .filter(Boolean)
      .map((d) => ({ src: relFrom(file, d), alt: altToken(d) }));
    const pets = [];
    for (const p of m.pets ?? []) {
      if (!p.isActive) {
        report.skipped.push({ collection: 'team pets', id: `${slug}/${p.slug ?? p.name}`, reason: 'pet isActive = false' });
        continue;
      }
      const petPhoto = planImage(p.photo, 'pets', p.slug || slugify(p.name), `pet:${p.slug}`);
      pets.push({
        name: p.name,
        photo: petPhoto ? relFrom(file, petPhoto) : null,
        photoAlt: altToken(petPhoto),
        bio: cleanText(p.bio?.markdown),
      });
      petCount++;
    }
    const body = m.bIo
      ? processMarkdown(m.bIo.markdown, { file, source: `team:${slug}`, assetDir: 'team', assetBase: slug, json: m.bIo.raw })
      : { md: '', isMdx: false };
    if (body.isMdx) report.failures.push(`team:${slug} bio contains class nodes (not supported in team .md)`);
    emit(
      file,
      frontmatterDoc(
        {
          name: m.name,
          slug,
          role: m.position,
          email: m.email ?? null,
          phone: m.phone ?? null,
          meetingLink: m.meetingLink ?? null,
          category: m.employeeCategory,
          isProducer: Boolean(m.isProducer),
          order: m.order ?? null,
          hasTeamPage: Boolean(m.hasTeamPage),
          miniBio: cleanText(m.miniBio),
          photo: photo ? relFrom(file, photo) : null,
          photoAlt: altToken(photo),
          blogPhoto: blogPhoto ? relFrom(file, blogPhoto) : undefined,
          blogPhotoAlt: blogPhoto ? altToken(blogPhoto) : undefined,
          motionPhotos,
          pets,
          hygraphId: m.id,
        },
        body.md,
      ),
    );
  }
  report.counts.team = activeTeam.length;
  report.counts.pets = petCount;

  // ---- Blog ---------------------------------------------------------------
  let blogCount = 0;
  const exportedBlogSlugs = [];
  const blogBodies = new Map();
  const skippedBlog = [];
  for (const p of data.blogPosts) {
    const dropped = DROPPED_BLOG_POSTS[p.slug];
    if (dropped) {
      skippedBlog.push({ slug: p.slug, to: dropped.to, reason: `${dropped.reason}; 301 -> ${dropped.to}`, approved: true });
      continue;
    }
    if (!p.isActive) {
      skippedBlog.push({ slug: p.slug, to: '/blog', reason: 'isActive = false (was still published and reachable); 301 -> /blog', approved: config.APPROVED.inactiveBlogPosts });
      continue;
    }
    const slug = p.slug;
    const json = p.content?.json;
    let hasClass = false;
    walkNodes(json, (n) => {
      if (n.type === 'class') hasClass = true;
    });
    const file = `src/content/blog/${slug}.${hasClass ? 'mdx' : 'md'}`;
    const body = processMarkdown(p.content?.markdown, { file, source: `blog:${slug}`, assetDir: 'blog', assetBase: slug, json });
    const hero = planImage(p.featuredImage, 'blog', slug, `blog:${slug}`);
    if (!hero) report.failures.push(`blog:${slug} has no usable featured image`);
    let author = teamSlugOf(p.teamMember);
    if (p.teamMember && !p.teamMember.isActive) {
      report.authorIssues.push({ slug, author: p.teamMember.name, reason: 'author is inactive -> author set to null' });
      author = null;
    } else if (author && !activeTeamSlugs.has(author)) {
      report.authorIssues.push({ slug, author, reason: 'author not exported -> null' });
      author = null;
    } else if (!p.teamMember) {
      report.authorIssues.push({ slug, author: null, reason: 'no author in Hygraph' });
    }
    if (p.template === 'WebForm') report.webformPosts.push(slug);
    const imports = body.isMdx ? [`import Callout from '${relFrom(file, 'src/components/Callout.astro')}';`] : [];
    emit(
      file,
      frontmatterDoc(
        {
          title: p.title.trim(),
          slug,
          description: cleanText(p.excerpt) ?? '',
          pubDate: p.publishedAt,
          updatedDate: p.updatedAt,
          author,
          categories: (p.blogCategories ?? []).filter((c) => c.isActive).map((c) => c.title),
          tags: (p.blogTags ?? []).filter((t) => t.isActive).map((t) => t.title),
          heroImage: hero ? relFrom(file, hero) : null,
          heroAlt: altToken(hero),
          draft: false,
          hygraphId: p.id,
        },
        body.md,
        imports,
      ),
    );
    exportedBlogSlugs.push(slug);
    const bodyHash = sha256(body.md);
    const dupOf = blogBodies.get(bodyHash);
    if (dupOf) report.duplicatePosts.push({ slug, dupOf });
    else blogBodies.set(bodyHash, slug);
    blogCount++;
  }
  for (const s of skippedBlog) report.skipped.push({ collection: 'blog', id: s.slug, reason: s.reason });
  for (const s of Object.keys(DROPPED_BLOG_POSTS)) {
    if (!data.blogPosts.some((p) => p.slug === s)) report.notes.push(`Dropped blog post ${s} was not found in Hygraph (already gone?).`);
  }
  report.counts.blog = blogCount;

  // ---- Pages / forms / landing -------------------------------------------
  const forms = [];
  const landing = [];
  const pageRows = [];
  for (const pg of data.pages) {
    const slug = pg.slug;
    if (SKIP_PAGE_SLUGS.has(slug)) {
      report.skipped.push({ collection: 'pages', id: slug, reason: 'test page' });
      continue;
    }
    if (!pg.isActive) {
      report.skipped.push({ collection: 'pages', id: slug, reason: 'isActive = false' });
      continue;
    }
    if (pg.isPasswordProtected) report.notes.push(`Page ${slug} is password protected in Hygraph (password not exported).`);
    const embed = parseEmbed(pg.rawHtml ?? []);
    const richText = (pg.content ?? []).filter((c) => c?.markdown?.trim());

    if (LANDING_TEMPLATES.has(pg.template)) {
      const file = `src/data/landing/${slug}.json`;
      const header = pg.headerImage ? planImage(pg.headerImage, 'landing', `${slug}-header`, `landing:${slug}`) : null;
      let imgN = 0;
      const btns = (list) =>
        (list ?? [])
          .filter((b) => b && b.label)
          .map((b) => ({ label: b.label, href: toHref(b.buttonUrl, `landing:${slug}`) }));
      const components = [];
      for (const c of pg.components ?? []) {
        switch (c.__typename) {
          case 'InfoCard':
            components.push({ type: 'InfoCard', title: c.title, description: cleanText(c.description), icon: c.icon ?? null });
            break;
          case 'PageHeader': {
            const img = c.headerImage ? planImage(c.headerImage, 'landing', `${slug}-${++imgN}`, `landing:${slug}`) : null;
            components.push({ type: 'PageHeader', header: c.header, image: img ? relFrom(file, img) : null, imageAlt: altToken(img) });
            break;
          }
          case 'WideCard': {
            const images = (c.image ?? [])
              .map((a) => planImage(a, 'landing', `${slug}-${++imgN}`, `landing:${slug}`))
              .filter(Boolean)
              .map((d) => ({ src: relFrom(file, d), alt: altToken(d) }));
            if (c.videoUrl) addExternal(c.videoUrl, `landing:${slug}`);
            components.push({
              type: 'WideCard',
              header: c.header ?? null,
              text: c.text ?? null,
              showBackgroundColor: Boolean(c.showBackgroundColor),
              textOnLeft: Boolean(c.textOnLeft),
              useVideo: Boolean(c.useVideo),
              videoUrl: c.videoUrl ?? null,
              buttons: btns(c.buttons),
              images,
            });
            break;
          }
          case 'ActionBanner':
            components.push({ type: 'ActionBanner', title: c.title ?? null, description: c.descriptive ?? null, buttons: btns(c.buttons) });
            break;
          case 'IconBanner':
            components.push({
              type: 'IconBanner',
              title: c.bannerTitle ?? null,
              items: (c.labels ?? []).map((label, i) => ({
                label,
                description: cleanText(c.descriptions?.[i]),
                icon: c.icons?.[i] ?? null,
              })),
            });
            break;
          default:
            report.failures.push(`landing:${slug}: unsupported component ${c.__typename} skipped`);
        }
      }
      writeJson(file, {
        $generated: 'scripts/export-hygraph.mjs',
        slug,
        title: pg.title,
        description: cleanText(pg.wordingUnderTitle),
        template: pg.template,
        headerImage: header ? relFrom(file, header) : null,
        headerImageAlt: altToken(header),
        formEmbed: embed ? slug : null,
        components,
      });
      landing.push({ slug, template: pg.template, components: components.map((c) => c.type), embed: Boolean(embed) });
      if (embed) forms.push({ pg, embed, note: 'Embed lives on a landing page (see src/data/landing).' });
      continue;
    }

    if (pg.template === 'WebForm' || embed) {
      if (!embed) report.failures.push(`form:${slug} is a WebForm page without an embed`);
      else forms.push({ pg, embed });
      if (richText.length) report.notes.push(`Form page ${slug} also has rich text content (not exported).`);
      continue;
    }

    // Rich text / listing pages -> pages collection
    const file = `src/content/pages/${slug}.mdx`;
    let isMdx = false;
    const parts = [];
    richText.forEach((c, i) => {
      const r = processMarkdown(c.markdown, {
        file,
        source: `page:${slug}`,
        assetDir: 'pages',
        assetBase: `${slug}${i ? `-${i + 1}` : ''}`,
        json: c.json,
      });
      isMdx ||= r.isMdx;
      parts.push(r.md);
    });
    // Relative asset paths were computed against src/content/pages/, valid for .md and .mdx.
    const finalFile = isMdx ? file : file.replace(/\.mdx$/, '.md');
    const header = pg.headerImage ? planImage(pg.headerImage, 'pages', `${slug}-header`, `page:${slug}`) : null;
    const imports = isMdx ? [`import Callout from '${relFrom(finalFile, 'src/components/Callout.astro')}';`] : [];
    emit(
      finalFile,
      frontmatterDoc(
        {
          title: pg.title,
          slug,
          description: cleanText(pg.wordingUnderTitle),
          template: pg.template,
          hasBody: parts.length > 0,
          headerImage: header ? relFrom(finalFile, header) : null,
          headerAlt: altToken(header),
          updatedDate: pg.updatedAt,
          hygraphId: pg.id,
        },
        parts.join('\n\n'),
        imports,
      ),
    );
    pageRows.push({ slug, template: pg.template, hasBody: parts.length > 0, listing: LISTING_TEMPLATES.has(pg.template) });
  }
  report.counts.pages = pageRows.length;
  report.counts.landing = landing.length;
  report.counts.forms = forms.length;

  // forms.ts (TypeScript so header images can be imported)
  {
    const file = 'src/data/forms.ts';
    const imports = [];
    const rows = [];
    for (const { pg, embed, note } of forms) {
      let headerRef = 'null';
      let headerAlt = '';
      if (pg.headerImage) {
        const dest = planImage(pg.headerImage, 'forms', `${pg.slug}-header`, `form:${pg.slug}`);
        if (dest) {
          const ident = `header_${slugify(pg.slug).replace(/-/g, '_')}`;
          imports.push(`import ${ident} from '${relFrom(file, dest)}';`);
          headerRef = ident;
          headerAlt = altToken(dest);
        }
      }
      if (embed.src) addExternal(embed.src, `form:${pg.slug}`);
      rows.push(
        `  {\n` +
          `    slug: ${JSON.stringify(pg.slug)},\n` +
          `    title: ${JSON.stringify(pg.title)},\n` +
          `    wordingUnderTitle: ${JSON.stringify(cleanText(pg.wordingUnderTitle))},\n` +
          `    template: ${JSON.stringify(pg.template)},\n` +
          `    headerImage: ${headerRef},\n` +
          `    headerImageAlt: ${JSON.stringify(headerAlt)},\n` +
          (note ? `    note: ${JSON.stringify(note)},\n` : '') +
          `    embed: ${JSON.stringify(
            { type: embed.type, ...(embed.jotformId ? { jotformId: embed.jotformId } : {}), src: embed.src, provider: embed.provider, rawHtml: embed.rawHtml },
            null,
            2,
          ).replace(/\n/g, '\n    ')},\n` +
          `  },`,
      );
    }
    emit(
      file,
      `// Generated by scripts/export-hygraph.mjs from Hygraph pages with template "WebForm"\n` +
        `// or with an iframe/script embed. Hand edits are preserved on re-export (file is skipped).\n` +
        `import type { ImageMetadata } from 'astro';\n` +
        (imports.length ? `${imports.join('\n')}\n` : '') +
        `\nexport type FormEmbedType = 'jotform' | 'iframe' | 'script' | 'video';\n\n` +
        `export interface FormEmbed {\n  type: FormEmbedType;\n  jotformId?: string;\n  src: string;\n  provider: string | null;\n  /** Verbatim embed HTML from Hygraph (reference only). */\n  rawHtml: string;\n}\n\n` +
        `export interface FormPage {\n  slug: string;\n  title: string;\n  wordingUnderTitle: string | null;\n  template: string;\n  headerImage: ImageMetadata | null;\n  headerImageAlt: string;\n  note?: string;\n  embed: FormEmbed;\n}\n\n` +
        `export const forms: FormPage[] = [\n${rows.join('\n')}\n];\n`,
    );
  }

  // ---- Data collections ---------------------------------------------------
  const uniqueId = (() => {
    const seen = new Map();
    return (ns, base) => {
      const key = `${ns}:${base}`;
      const n = (seen.get(key) ?? 0) + 1;
      seen.set(key, n);
      return n === 1 ? base : `${base}-${n}`;
    };
  })();
  const activeOnly = (rows, collection, label) =>
    rows.filter((r) => {
      if (r.isActive === false) report.skipped.push({ collection, id: label(r), reason: 'isActive = false' });
      return r.isActive !== false;
    });

  {
    const file = 'src/data/glossary.json';
    const rows = [...data.glossaryTerms]
      .sort((a, b) => a.term.localeCompare(b.term))
      .map((t) => ({ id: uniqueId('glossary', slugify(t.term)), term: t.term.trim(), definition: t.definition.trim(), type: t.glossaryType }));
    writeJson(file, rows);
    report.counts.glossary = rows.length;
  }
  {
    const file = 'src/data/carriers.json';
    const rows = activeOnly(data.carrierBanners, 'carriers', (r) => r.name)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((c) => {
        const id = uniqueId('carriers', slugify(c.name));
        const logo = planImage(c.logo, 'carriers', id, `carrier:${id}`);
        return {
          id,
          name: c.name.trim(),
          phones: { general: c.generalPhoneNumber ?? null, claims: c.claimsPhoneNumber ?? null, billing: c.billingPhoneNumber ?? null },
          website: c.website ? rewriteUrl(c.website, `carrier:${id}`) : null,
          claimLink: c.claimLink ? rewriteUrl(c.claimLink, `carrier:${id}`) : null,
          payLink: c.payLink ? rewriteUrl(c.payLink, `carrier:${id}`) : null,
          showInCarousel: Boolean(c.showInCarousel),
          logo: logo ? relFrom(file, logo) : null,
          logoAlt: altToken(logo),
        };
      });
    writeJson(file, rows);
    report.counts.carriers = rows.length;
  }
  {
    const file = 'src/data/programs.json';
    const rows = activeOnly(data.programs, 'programs', (r) => r.title)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.title.localeCompare(b.title))
      .map((p) => {
        const id = uniqueId('programs', slugify(p.title));
        const image = planImage(p.image, 'programs', id, `program:${id}`);
        return { id, title: p.title.trim(), description: cleanText(p.description), url: toHref(p.url, `program:${id}`), order: p.order ?? null, image: image ? relFrom(file, image) : null, imageAlt: altToken(image) };
      });
    writeJson(file, rows);
    report.counts.programs = rows.length;
  }
  {
    const file = 'src/data/office-resources.json';
    const rows = activeOnly(data.officeResources, 'officeResources', (r) => r.title)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.title.localeCompare(b.title))
      .map((r) => {
        const id = uniqueId('officeResources', slugify(r.title));
        const image = planImage(r.image, 'office-resources', id, `officeResource:${id}`);
        return { id, title: r.title.trim(), link: toHref(r.link, `officeResource:${id}`), category: r.category, order: r.order ?? null, altLogoText: cleanText(r.altLogoText), image: image ? relFrom(file, image) : null, imageAlt: altToken(image) };
      });
    writeJson(file, rows);
    report.counts.officeResources = rows.length;
  }
  {
    const file = 'src/data/offices.json';
    const rows = activeOnly(data.officeLocations, 'offices', (r) => r.city)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((o) => {
        const id = uniqueId('offices', slugify(o.city));
        const image = planImage(o.image, 'offices', id, `office:${id}`);
        const est = o.subtitle?.match(/(\d{4})/);
        return {
          id,
          state: o.state.charAt(0) + o.state.slice(1).toLowerCase(),
          stateCode: o.addressState,
          city: o.city,
          address: o.address,
          zip: o.zipcode,
          phone: o.officeLocationPhone,
          email: o.officeLocationEmail,
          established: est ? Number(est[1]) : null,
          order: o.order ?? null,
          image: image ? relFrom(file, image) : null,
          imageAlt: altToken(image),
        };
      });
    writeJson(file, rows);
    report.counts.offices = rows.length;
  }
  {
    const file = 'src/data/testimonials.json';
    const rows = activeOnly(data.testemonials, 'testimonials', (r) => r.from).map((t) => {
      const members = (t.teamMembers ?? []).map((m) => ({ slug: teamSlugOf(m), active: m.isActive }));
      for (const m of members.filter((x) => !x.active || !activeTeamSlugs.has(x.slug))) {
        report.notes.push(`Testimonial from "${t.from}" referenced inactive team member ${m.slug}; reference dropped.`);
      }
      return {
        id: uniqueId('testimonials', slugify(`${t.from}-${t.id.slice(-6)}`)),
        text: t.text.trim(),
        from: t.from.trim(),
        subText: cleanText(t.subText),
        highlight: Boolean(t.highlight),
        teamMembers: members.filter((x) => x.active && activeTeamSlugs.has(x.slug)).map((x) => x.slug),
      };
    });
    writeJson(file, rows);
    report.counts.testimonials = rows.length;
  }
  for (const [model, name, dir] of [
    ['quoteCards', 'quote-cards', 'quote-cards'],
    ['checkUpCards', 'check-up-cards', 'check-up-cards'],
  ]) {
    const file = `src/data/${name}.json`;
    const rows = activeOnly(data[model], model, (r) => r.slug)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((c) => {
        const id = uniqueId(model, slugify(c.label));
        const image = planImage(c.image, dir, id, `${model}:${id}`);
        return { id, label: c.label, href: toHref(c.slug, `${model}:${id}`), icon: c.icon ?? null, order: c.order ?? null, image: image ? relFrom(file, image) : null, imageAlt: altToken(image) };
      });
    writeJson(file, rows);
    report.counts[model] = rows.length;
  }
  {
    const file = 'src/data/navigation.json';
    const rows = activeOnly(data.navigationMenuItems, 'navigation', (r) => r.text)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.text.localeCompare(b.text))
      .map((n) => {
        const id = uniqueId('navigation', slugify(n.text));
        const href = n.isExternalUrl && n.externalUrl ? toHref(n.externalUrl, `nav:${id}`) : toHref(`/${n.slug ?? ''}`, `nav:${id}`);
        return {
          id,
          text: n.text,
          href,
          external: Boolean(n.isExternalUrl),
          externalUrl: n.externalUrl ?? null,
          openInNewTab: Boolean(n.openInNewTab),
          highlight: Boolean(n.highlight),
          isDropdown: Boolean(n.isDropdown),
          order: n.order ?? 0,
          children: (n.pages ?? [])
            .filter((p) => p.isActive && !SKIP_PAGE_SLUGS.has(p.slug))
            .map((p) => ({ title: p.title, href: rewriteUrl(`/${p.slug}`, `nav:${id}`) })),
        };
      });
    for (const n of data.navigationMenuItems) {
      if (n.externalUrl && !n.isExternalUrl) report.notes.push(`Nav item "${n.text}" has externalUrl ${n.externalUrl} but isExternalUrl=false (href uses /${n.slug}).`);
    }
    writeJson(file, rows);
    report.counts.navigation = rows.length;
  }
  {
    const file = 'src/data/hygraph-forms.json';
    const rows = data.forms.map((f) => ({
      id: slugify(f.name),
      name: f.name,
      pages: (f.pages ?? []).map((p) => p.slug),
      fields: (f.fields ?? []).map((x) => {
        if (x.__typename === 'FormInput') return { kind: 'input', name: x.name, label: x.inputLabel, placeholder: x.placeholder ?? null, required: Boolean(x.required), inputType: x.type ?? null };
        if (x.__typename === 'FormSelect')
          return { kind: 'select', name: x.name, label: x.selectLabel, required: Boolean(x.required), options: (x.formOptions ?? []).filter((o) => o.option || o.value).map((o) => ({ value: o.value ?? o.option, label: o.option ?? o.value })) };
        if (x.__typename === 'FormCheckbox') return { kind: 'checkbox', name: x.name, label: x.checkboxLabel, required: Boolean(x.required) };
        return { kind: 'unknown', name: x.__typename };
      }),
    }));
    writeJson(file, rows);
    report.counts.hygraphForms = rows.length;
  }

  // ---- Legacy hard-coded images from the old Next.js app ------------------
  for (const l of LEGACY_IMAGES) {
    const handle = handleFromUrl(l.url);
    const known = handle ? assetsByHandle.get(handle) : null;
    const ext = known ? extFor(known) : path.extname(new URL(l.url).pathname).slice(1) || 'jpg';
    const asset = known ?? { url: l.url, handle: `legacy-${l.name}`, fileName: path.basename(new URL(l.url).pathname), mimeType: `image/${ext === 'jpg' ? 'jpeg' : ext}` };
    // Use a distinct key so legacy copies live in src/assets/legacy even if the handle is used elsewhere.
    const dest = uniqueDest('src/assets/legacy', l.name, ext);
    assetPlans.set(`legacy:${l.url}`, { kind: 'image', asset, dest, usedBy: [`legacy:${l.source}`] });
    report.legacy.push({ ...l, dest });
  }

  // ---- Redirect map ---------------------------------------------------------
  const urlMap = [];
  const seenFrom = new Set();
  const addMap = (entry) => {
    if (seenFrom.has(entry.from)) {
      const existing = urlMap.find((m) => m.from === entry.from);
      if (entry.note && existing && !existing.note?.includes(entry.note)) existing.note = [existing.note, entry.note].filter(Boolean).join(' ');
      return;
    }
    seenFrom.add(entry.from);
    urlMap.push({ status: 301, ...entry });
  };
  for (const r of OLD_STATIC_ROUTES) {
    addMap({ from: r.path, to: r.to ?? r.path, kind: 'static', note: r.note, ...(r.approved ? { approved: r.approved } : {}) });
  }
  for (const s of exportedBlogSlugs) addMap({ from: `/blog/${s}`, to: `/blog/${s}`, kind: 'blog' });
  for (const s of skippedBlog) {
    addMap({
      from: `/blog/${s.slug}`,
      to: s.to,
      kind: 'blog',
      note: s.reason,
      approved: typeof s.approved === 'string' ? s.approved : 'Owner decision (scripts/export-config.mjs).',
    });
  }
  for (const m of activeTeam) {
    const s = teamSlugOf(m) ?? slugify(m.name);
    addMap({ from: `/team/${s}`, to: `/team/${s}`, kind: 'team' });
  }
  for (const m of data.teamMembers.filter((x) => !x.isActive && x.slug)) {
    const s = teamSlugOf(m);
    addMap({ from: `/team/${s}`, to: '/team', kind: 'team', note: 'Inactive team member (page was still reachable on the old site).', approved: config.APPROVED.inactiveTeamMembers });
  }
  for (const row of pageRows) addMap({ from: `/${row.slug}`, to: `/${row.slug}`, kind: row.listing ? 'listing-page' : 'page', note: `Hygraph page (template ${row.template}).` });
  for (const row of landing) addMap({ from: `/${row.slug}`, to: `/${row.slug}`, kind: 'landing', note: `Component landing page (${row.template}); content in src/data/landing/${row.slug}.json, needs redesign.` });
  for (const { pg } of forms) addMap({ from: `/${pg.slug}`, to: `/${pg.slug}`, kind: 'form', note: 'Form page (src/data/forms.ts).' });
  for (const s of SKIP_PAGE_SLUGS) {
    addMap({ from: `/${s}`, to: null, status: 410, kind: 'dropped', note: 'Test page, not migrated (will 404).' });
  }
  const knownPaths = new Set(urlMap.filter((m) => m.to).flatMap((m) => [m.from, m.to]));
  knownPaths.add('/');

  const redirectsTs =
    `// Generated by scripts/export-hygraph.mjs. Hand edits are preserved on re-export (file is skipped).\n` +
    `// Every URL of the old Next.js site and where it lives on the new site.\n` +
    `// Identity entries (from === to) document URLs that stay the same; only entries whose\n` +
    `// destination differs become real redirects (see \`redirects\` below / astro.config.mjs).\n\n` +
    `export interface UrlMapping {\n  from: string;\n  /** null = intentionally dropped (404/410). */\n  to: string | null;\n  status: 301 | 302 | 308 | 410;\n  kind: 'static' | 'blog' | 'team' | 'page' | 'listing-page' | 'landing' | 'form' | 'dropped';\n  note?: string;\n  /** Owner decision behind a redirect (see scripts/export-config.mjs). */\n  approved?: string;\n  /** Set when the owner still needs to decide; \`to\` is the current proposal. */\n  decision?: string;\n}\n\n` +
    `export const urlMap: UrlMapping[] = ${JSON.stringify(urlMap, null, 2)};\n\n` +
    `/** Astro \`redirects\` config: only URLs that actually move. */\n` +
    `export const redirects: Record<string, { status: 301 | 302 | 308; destination: string }> = Object.fromEntries(\n` +
    `  urlMap\n` +
    `    .filter((m): m is UrlMapping & { to: string; status: 301 | 302 | 308 } => m.to !== null && m.to !== m.from && m.status !== 410)\n` +
    `    .map((m) => [m.from, { status: m.status, destination: m.to }]),\n` +
    `);\n`;
  emit('src/data/redirects.ts', redirectsTs);

  // ---- Assets ----------------------------------------------------------------
  log(`downloading/processing ${assetPlans.size} assets...`);
  await runAssetPlans();
  applyRenames();
  resolveAltTokens();

  // ---- Submissions CSV (outside the repo) ----------------------------------
  if (submissions.length) {
    const keys = [...new Set(submissions.flatMap((s) => Object.keys(s.formData ?? {})))].sort();
    const esc = (v) => {
      const s = v == null ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v);
      return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const lines = [['id', 'createdAt', 'form', ...keys].map(esc).join(',')];
    for (const s of submissions) lines.push([s.id, s.createdAt, s.form?.name ?? '', ...keys.map((k) => s.formData?.[k])].map(esc).join(','));
    fs.writeFileSync(SUBMISSIONS_CSV, `${lines.join('\n')}\n`, { mode: 0o600 });
    fs.chmodSync(SUBMISSIONS_CSV, 0o600);
    log(`wrote ${submissions.length} submissions to ${SUBMISSIONS_CSV} (outside the repo)`);
  }
  report.counts.submissions = submissions.length;

  // ---- Internal link check ----------------------------------------------------
  const brokenInternal = [];
  for (const l of report.internalLinks) {
    const p = l.to.replace(/[?#].*$/, '') || '/';
    if (p.startsWith('/files/')) continue;
    if (LINK_OVERRIDES.has(p)) continue; // handled by an owner decision (listed separately)
    if (!knownPaths.has(p)) brokenInternal.push(l);
  }

  // ---- Report -------------------------------------------------------------------
  emit('docs/alt-text-review.md', buildAltReview());
  emit(
    'docs/migration-report.md',
    buildReport({ data, contentAsOf, landing, forms, urlMap, brokenInternal, submissions }),
  );

  // ---- Write everything (manifest-protected) -----------------------------------
  writeOutputs();
  log(`done (${queryCount} Hygraph queries).`);
  if (report.failures.length) {
    warn(`${report.failures.length} issue(s) - see docs/migration-report.md`);
  }
}

// ---------------------------------------------------------------------------
// Manifest-protected writer
// ---------------------------------------------------------------------------

function writeOutputs() {
  const manifestFile = abs(MANIFEST_PATH);
  const old = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, 'utf8')).files ?? {} : {};
  const next = {};
  let written = 0;
  let unchanged = 0;
  const preserved = [];
  for (const [rel, content] of [...outputs.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const buf = Buffer.isBuffer(content) ? content : Buffer.from(content);
    const hash = sha256(buf);
    const target = abs(rel);
    if (fs.existsSync(target)) {
      const current = sha256(fs.readFileSync(target));
      if (current === hash) {
        next[rel] = hash;
        unchanged++;
        continue;
      }
      const ownedUnmodified = old[rel] && old[rel] === current;
      if (!ownedUnmodified && !FORCE) {
        preserved.push(rel);
        if (old[rel]) next[rel] = old[rel]; // keep tracking; still treated as hand-edited
        continue;
      }
    }
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, buf);
    next[rel] = hash;
    written++;
  }
  // Remove generated files that are no longer produced (only if untouched).
  let removed = 0;
  for (const [rel, hash] of Object.entries(old)) {
    if (outputs.has(rel)) continue;
    const target = abs(rel);
    if (!fs.existsSync(target)) continue;
    if (FORCE || sha256(fs.readFileSync(target)) === hash) {
      fs.rmSync(target);
      removed++;
    } else {
      preserved.push(`${rel} (stale but hand-edited)`);
      next[rel] = hash;
    }
  }
  const sorted = Object.fromEntries(Object.entries(next).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(
    manifestFile,
    `${JSON.stringify({ $comment: 'Files written by scripts/export-hygraph.mjs and their sha256. Do not edit.', files: sorted }, null, 2)}\n`,
  );
  log(`files: ${written} written, ${unchanged} unchanged, ${removed} removed, ${preserved.length} preserved (hand-edited)`);
  for (const p of preserved) warn(`preserved hand-edited file: ${p} (use --force to overwrite)`);
}

// ---------------------------------------------------------------------------
// Report builder
// ---------------------------------------------------------------------------

function fmtBytes(n) {
  if (n >= 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`;
  return `${Math.round(n / 1024)} KB`;
}

function table(headers, rows) {
  const esc = (v) => String(v ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
  return [`| ${headers.join(' | ')} |`, `| ${headers.map(() => '---').join(' | ')} |`, ...rows.map((r) => `| ${r.map(esc).join(' | ')} |`)].join('\n');
}

/** Every image file in src/assets after this export (generated + hand-added legacy assets). */
function currentAssetFiles() {
  const manifestFile = abs(MANIFEST_PATH);
  const tracked = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, 'utf8')).files ?? {} : {};
  const files = new Set([...outputs.keys()].filter((k) => k.startsWith('src/assets/')));
  const walk = (dir) => {
    if (!fs.existsSync(abs(dir))) return;
    for (const e of fs.readdirSync(abs(dir), { withFileTypes: true })) {
      const rel = `${dir}/${e.name}`;
      if (e.isDirectory()) walk(rel);
      else if (!tracked[rel]) files.add(rel); // hand-added (not produced by the export)
    }
  };
  walk('src/assets');
  return [...files].filter((f) => /\.(png|jpe?g|webp|gif|svg|avif)$/i.test(f)).sort();
}

function buildAltReview() {
  const files = currentAssetFiles();
  const missing = files.filter((f) => !altMap[f]);
  const unused = Object.keys(altMap).filter((k) => !files.includes(k));
  const L = [
    '# Alt text review',
    '',
    '> Generated by `scripts/export-hygraph.mjs` from `src/data/alt-text.json`. Edit alt text in that JSON file (not here), then re-run `npm run export:hygraph`.',
    '>',
    '> **AI-drafted:** every description below was written by an AI assistant after looking at the image. Please skim and correct anything inaccurate (names, places, text in images).',
    '',
    `${files.length} images, ${files.length - missing.length} with alt text${missing.length ? `, ${missing.length} missing` : ''}.`,
    '',
  ];
  if (missing.length) L.push('Missing:', '', ...missing.map((m) => `- \`${m}\``), '');
  if (unused.length) L.push('Entries in alt-text.json without a matching image (stale):', '', ...unused.map((m) => `- \`${m}\``), '');
  L.push(table(['Image', 'Alt text'], files.map((f) => [`\`${f}\``, altMap[f] ?? '(missing)'])));
  L.push('');
  return L.join('\n');
}

function staticSections() {
  const L = [];
  L.push('## Pages migrated from the old Next.js code');
  L.push('');
  L.push('These pages were hard-coded in the old app (not in Hygraph). Owner: all are still used. Their copy, structured data, image references, contacts and form definitions were extracted by hand into `src/data/legacy/` (not touched by the export). Each URL has a minimal stub route that renders the content plainly until the redesign.');
  L.push('');
  L.push(
    table(
      ['URL(s)', 'Content', 'Old source', 'Images', 'Form'],
      config.LEGACY_PAGES.map((p) => [p.paths.join(', '), `\`${p.data}\``, p.source, p.images ?? '-', p.form ?? '-']),
    ),
  );
  L.push('');
  L.push('- Shared form definitions (fields, payload keys, Source values, messages): `src/data/legacy/forms.ts`.');
  L.push('- The old pages sent the Hygraph id of the "Contact Form" as `id`; the new forms send `"contact-form"` (`LEGACY_FORM_ID`).');
  L.push('- Every URL in `src/data/redirects.ts` now resolves on the new site (stub routes for CMS pages, forms, landing pages, listing grids and legacy pages; verified against `dist/` after build).');
  L.push('- The team export now includes `motionPhotos` (alternate portraits used by the old /sales-team page).');
  L.push('- Not migrated: the old home page (`pages/index.js`) layout/copy, which will be redesigned.');
  L.push('');
  L.push('## Form submissions backend');
  L.push('');
  L.push('- `POST /api/submit` is an on-demand route (`src/pages/api/submit.ts`) porting `pages/api/submit.js` + `lib/server/sendFormNotification.js`: same JSON request contract (`id` + fields, `website` honeypot -> 204), 32 KB body limit, max 50 fields, field names <= 100 chars, values <= 5,000 chars (string/number/boolean/null), Resend email with the same `SOURCE_RECIPIENTS`, subject/body format, reply-to and idempotency key.');
  L.push('- Hygraph storage was dropped (Hygraph is being retired). The submission id is now a random UUID.');
  L.push('- Behaviour change: because nothing else stores the submission, a failed notification email now returns `502` instead of the old `201 { notificationSent: false }`, so the visitor sees an error and can retry or email us.');
  L.push('- Environment variables: `RESEND_API_KEY`, `FORM_FROM_EMAIL`, `FORM_NOTIFICATION_TO` (comma-separated); optional `RESEND_API_URL` (testing only). See README.');
  L.push('- Hygraph-embedded forms (Jotform, vendor iframes) are unchanged: they post to their own providers.');
  L.push('- Astro rejects cross-site form POSTs (`security.checkOrigin`), so submissions must come from the site origin; verify the forwarded host on DigitalOcean.');
  L.push('- Smoke-tested locally against a mock Resend server (no real emails): valid hotels/trusted-advisor submissions -> 201 and the expected recipients, honeypot -> 204, invalid/oversized -> 400/413, email failure -> 502, cross-origin -> 403.');
  L.push('');
  L.push('## Search');
  L.push('');
  L.push('- Pagefind indexes the built site after `astro build` (`npm run build`); `/search` is a minimal page using the Pagefind UI.');
  L.push('- Only pages that mark their content with `data-pagefind-body` are indexed: blog posts, team pages, CMS pages, landing pages and the legacy pages. Form/embed pages, listing grids and `/search` itself are excluded.');
  L.push('');
  return L;
}

function copyAuditSection() {
  const sources = new Map();
  for (const [rel, content] of outputs) {
    if (typeof content !== 'string') continue;
    if (!/^src\/(content|data)\//.test(rel)) continue;
    if (/alt-text\.json$|redirects\.ts$/.test(rel)) continue;
    sources.set(rel, content);
  }
  const legacyDir = 'src/data/legacy';
  if (fs.existsSync(abs(legacyDir))) {
    for (const f of fs.readdirSync(abs(legacyDir)).sort()) sources.set(`${legacyDir}/${f}`, fs.readFileSync(abs(`${legacyDir}/${f}`), 'utf8'));
  }
  const hits = [];
  for (const [rel, content] of [...sources].sort(([a], [b]) => a.localeCompare(b))) {
    content.split('\n').forEach((line, i) => {
      if (/assets\/|^#|"?[A-Za-z]*[Aa]lt"?:|hygraphId|^import /.test(line.trim())) return;
      const re = config.COST_PROMISE_PATTERNS.find((r) => r.test(line));
      if (!re) return;
      const m = line.match(re);
      const at = m?.index ?? 0;
      let snippet = line.slice(Math.max(0, at - 100), at + 140).replace(/\s+/g, ' ').trim();
      if (at > 100) snippet = `…${snippet}`;
      if (at + 140 < line.length) snippet = `${snippet}…`;
      hits.push([rel, i + 1, snippet.replace(/`/g, "'")]);
    });
  }
  const L = [];
  L.push('## Copy to revise (cost promises)');
  L.push('');
  L.push('Lines in the migrated content (`src/content`, `src/data` incl. `legacy/`) that match savings/cost-promise language, for review against `docs/copy-guidelines.md`. Content was **not** changed. Patterns: save/saving, lower, reduce, premium credit, cut costs, percentages, and "cost" only when a promise word (less, cheaper, affordable, minimize, decrease, fraction of, no additional, free) is on the same line. Many hits are legitimate (glossary definitions, process language, statistics); this is a review list, not a verdict.');
  L.push('');
  L.push(`${hits.length} lines in ${new Set(hits.map((h) => h[0])).size} files.`);
  L.push('');
  L.push(table(['File', 'Line', 'Quote'], hits.map(([f, n, q]) => [`\`${f}\``, n, `“${q}”`])));
  L.push('');
  return L;
}

function buildReport({ data, contentAsOf, landing, forms, urlMap, brokenInternal, submissions }) {
  const c = report.counts;
  const L = [];
  L.push('# Hygraph to Astro content migration report');
  L.push('');
  L.push('> Generated by `scripts/export-hygraph.mjs` (`npm run export:hygraph`). Re-running the export regenerates this file.');
  L.push(`> Content as of the latest Hygraph update: ${contentAsOf || 'unknown'}.`);
  L.push('');
  L.push('## Counts');
  L.push('');
  L.push(
    table(
      ['Collection', 'Hygraph (published)', 'Exported', 'Location'],
      [
        ['Blog posts', data.blogPosts.length, c.blog, 'src/content/blog/*.md(x)'],
        ['Team members', data.teamMembers.length, c.team, 'src/content/team/*.md'],
        ['Pets (on team members)', '-', c.pets, 'team front matter `pets`'],
        ['Pages (rich text / listing)', data.pages.length, c.pages, 'src/content/pages/*.md(x)'],
        ['Form pages', '-', c.forms, 'src/data/forms.ts'],
        ['Landing pages', '-', c.landing, 'src/data/landing/*.json'],
        ['Glossary terms', data.glossaryTerms.length, c.glossary, 'src/data/glossary.json'],
        ['Carriers', data.carrierBanners.length, c.carriers, 'src/data/carriers.json'],
        ['Programs', data.programs.length, c.programs, 'src/data/programs.json'],
        ['Office resources', data.officeResources.length, c.officeResources, 'src/data/office-resources.json'],
        ['Offices', data.officeLocations.length, c.offices, 'src/data/offices.json'],
        ['Testimonials', data.testemonials.length, c.testimonials, 'src/data/testimonials.json'],
        ['Quote cards', data.quoteCards.length, c.quoteCards, 'src/data/quote-cards.json'],
        ['Check-up cards', data.checkUpCards.length, c.checkUpCards, 'src/data/check-up-cards.json'],
        ['Navigation items', data.navigationMenuItems.length, c.navigation, 'src/data/navigation.json'],
        ['Hygraph form definitions', data.forms.length, c.hygraphForms, 'src/data/hygraph-forms.json'],
        ['Assets (all published)', data.assets.length, `${assetStats.images} images + ${assetStats.files} files`, 'src/assets/**, public/files/'],
        ['Form submissions (DRAFT)', submissions.length, submissions.length, `${SUBMISSIONS_CSV} (outside the repo; may contain PII)`],
      ],
    ),
  );
  L.push('');
  L.push('Pages total (63 in Hygraph) = ' + `${c.pages} pages + ${c.forms - forms.filter((f) => f.note).length} form pages + ${c.landing} landing pages + ${SKIP_PAGE_SLUGS.size} skipped test pages.`);
  L.push('');
  L.push('## Skipped content');
  L.push('');
  L.push(table(['Collection', 'Entry', 'Reason'], report.skipped.map((s) => [s.collection, s.id, s.reason])));
  L.push('');
  L.push('## Images and files');
  L.push('');
  L.push(`- ${assetStats.images} images downloaded, long edge capped at ${MAX_EDGE}px, metadata stripped (SVGs and small GIFs copied as-is).`);
  L.push(`- Original size ${fmtBytes(assetStats.originalBytes)}; written ${fmtBytes(assetStats.writtenBytes)} (images + files).`);
  L.push('');
  L.push(table(['Directory', 'Files', 'Size'], [...assetStats.byDir.entries()].sort().map(([d, s]) => [d, s.count, fmtBytes(s.bytes)])));
  L.push('');
  if (report.convertedPng.length) {
    const before = report.convertedPng.reduce((a, c) => a + c.before, 0);
    const after = report.convertedPng.reduce((a, c) => a + c.after, 0);
    L.push(`- ${report.convertedPng.length} opaque PNGs over ${fmtBytes(PNG_TO_JPEG_THRESHOLD)} (photos saved as PNG) were re-encoded as JPEG q85: ${fmtBytes(before)} -> ${fmtBytes(after)}. PNGs with transparency were kept as PNG.`);
    L.push('');
  }
  L.push('PDFs moved to `public/files/` (links rewritten):');
  L.push('');
  const pdfSeen = new Set();
  for (const p of report.pdfs) {
    const k = `${p.source}${p.to}`;
    if (pdfSeen.has(k)) continue;
    pdfSeen.add(k);
    L.push(`- ${p.fileName} -> \`${p.to}\` (${p.source})`);
  }
  L.push('');
  L.push('Hard-coded images from the old Next.js app (`main`), downloaded to `src/assets/legacy/`:');
  L.push('');
  for (const l of report.legacy) L.push(`- \`${l.dest}\` <- ${l.url} (${l.source})`);
  for (const l of LEGACY_SKIPPED) L.push(`- NOT downloaded: ${l.url} (${l.source}) - ${l.reason}`);
  L.push('');
  L.push('### Alt text');
  L.push('');
  L.push(`- Alt text for every image in \`src/assets\` lives in \`${ALT_TEXT_PATH}\` (keyed by asset path, AI-drafted, owner review in \`docs/alt-text-review.md\`). The export merges it into front matter / data (\`heroAlt\`, \`photoAlt\`, \`logoAlt\`, \`imageAlt\`, inline markdown alts); legacy pages read it via \`src/lib/alt.ts\`. Content schemas reject empty alt text, so a new image without an entry fails the build.`);
  L.push(`- Hygraph alt text was ignored; ${report.altNeeded.length} inline images only had a file name as alt.`);
  L.push(`- Images without alt text in this export: ${report.altMissing.length ? report.altMissing.map((a) => `\`${a}\``).join(', ') : 'none'}.`);
  L.push('');
  L.push('## Videos removed');
  L.push('');
  for (const v of report.removedVideos) L.push(`- ${v.source}: removed video node \`${v.file}\` (${v.url})${v.removed ? '' : ' - NOT FOUND in markdown'}`);
  L.push(`- Dirt Haulers video (${LEGACY_SKIPPED[0].url}, ~155 MB) not downloaded; /dirt-haulers now 301s to the dirt-hauling survey (owner approved).`);
  const vids = data.assets.filter((a) => a.mimeType?.startsWith('video/'));
  for (const v of vids) L.push(`- Hygraph video asset not exported: ${v.fileName} (${fmtBytes(v.size ?? 0)}).`);
  L.push('');
  L.push('## Callout blocks (Hygraph `class` nodes -> `<Callout>` in MDX)');
  L.push('');
  L.push('Hygraph markdown drops the custom class; these blocks were wrapped in `<Callout variant="...">` (stub: `src/components/Callout.astro`) and the files converted to `.mdx`:');
  L.push('');
  for (const co of report.callouts) L.push(`- ${co.source} - \`${co.variant}\`: "${co.text}"`);
  L.push('');
  L.push('## Links');
  L.push('');
  L.push(`- Absolute internal links (uwibrisk.com / www.uwibrisk.com / uwib.com) rewritten to site-relative paths: ${report.internalLinks.length}.`);
  L.push('');
  L.push('### Link overrides applied (scripts/export-config.mjs `LINK_OVERRIDES`, owner decisions)');
  L.push('');
  if (!report.linkOverrides.length) L.push('- none');
  for (const o of report.linkOverrides) L.push(`- ${o.source}: \`${o.from}\` -> ${o.to === null ? 'link removed, text kept' : `\`${o.to}\``}`);
  L.push('');
  L.push('### URL fixes applied (`URL_FIXES`)');
  L.push('');
  if (!report.urlFixes.length) L.push('- none');
  for (const o of report.urlFixes) L.push(`- ${o.source}: \`${o.from}\` -> \`${o.to}\``);
  L.push('');
  L.push('### SharePoint / Microsoft Loop links (left unchanged; owner must decide - likely require a Microsoft login)');
  L.push('');
  if (!report.sharepoint.length) L.push('- none');
  for (const s of report.sharepoint) L.push(`- ${s.source}: ${s.url}`);
  L.push('');
  L.push('### Internal links that do not match a known route');
  L.push('');
  if (!brokenInternal.length) L.push('- none');
  for (const b of brokenInternal) {
    const known = config.KNOWN_UNRESOLVED_LINKS[b.to.replace(/[?#].*$/, '')];
    L.push(`- ${b.source}: \`${b.from}\` -> \`${b.to}\`${known ? ` (left as-is: ${known})` : ''}`);
  }
  L.push('');
  L.push('### Unresolved asset URLs');
  L.push('');
  if (!report.unresolvedAssets.length) L.push('- none');
  for (const u of report.unresolvedAssets) L.push(`- ${u.source}: ${u.url} (${u.reason})`);
  L.push('');
  L.push('### External link domains');
  L.push('');
  L.push(
    table(
      ['Domain', 'Links', 'Used in'],
      [...report.externalDomains.entries()]
        .sort((a, b) => b[1].count - a[1].count || a[0].localeCompare(b[0]))
        .map(([d, e]) => [d, e.count, [...e.sources].slice(0, 4).join(', ') + (e.sources.size > 4 ? `, +${e.sources.size - 4} more` : '')]),
    ),
  );
  L.push('');
  L.push('## Blog notes');
  L.push('');
  L.push(`- Posts with Hygraph template \`WebForm\` (exported as normal posts): ${report.webformPosts.map((s) => `\`${s}\``).join(', ') || 'none'}.`);
  const noAuthor = report.authorIssues.filter((a) => !a.author);
  const inactive = report.authorIssues.filter((a) => a.author);
  L.push(`- Posts without an author in Hygraph: ${noAuthor.map((a) => `\`${a.slug}\``).join(', ') || 'none'}.`);
  for (const a of inactive) L.push(`- \`${a.slug}\`: ${a.reason} (${a.author}).`);
  L.push('- `rawHtml` on blog posts was ignored (the live site never rendered it).');
  for (const d of report.duplicatePosts) {
    L.push(`- DUPLICATE: \`${d.slug}\` has exactly the same body as \`${d.dupOf}\` (both exported). Decision: keep one and 301 the other.`);
  }
  L.push('');
  L.push('## Landing pages (component data, need redesign)');
  L.push('');
  L.push(table(['Slug', 'Template', 'Components', 'Form embed'], landing.map((l) => [l.slug, l.template, l.components.join(', '), l.embed ? 'yes (see forms.ts)' : ''])));
  L.push('');
  L.push('- `privateclient` (LandingPage template) also rendered highlighted testimonials and a hard-coded "Schedule a Consultation" Outlook booking link in the old code; neither is part of the JSON.');
  L.push('');
  L.push('## Forms');
  L.push('');
  const byType = forms.reduce((acc, f) => ((acc[f.embed.type] = (acc[f.embed.type] ?? 0) + 1), acc), {});
  L.push(`${forms.length} form/embed pages: ${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}.`);
  L.push('');
  L.push(table(['Slug', 'Title', 'Type', 'Provider / Jotform ID'], forms.map(({ pg, embed }) => [pg.slug, pg.title, embed.type, embed.jotformId ? `jotform ${embed.jotformId}` : embed.provider])));
  L.push('');
  const jotIds = new Map();
  for (const { pg, embed } of forms) if (embed.jotformId) jotIds.set(embed.jotformId, [...(jotIds.get(embed.jotformId) ?? []), pg.slug]);
  for (const [id, slugs] of jotIds) if (slugs.length > 1) L.push(`- Jotform ${id} is used by several pages: ${slugs.join(', ')}.`);
  const testJot = data.pages.find((p) => p.slug === 'test-jotform');
  const testEmbed = testJot ? parseEmbed(testJot.rawHtml ?? []) : null;
  if (testEmbed?.jotformId) {
    const same = forms.filter((f) => f.embed.jotformId === testEmbed.jotformId).map((f) => f.pg.slug);
    if (same.length) L.push(`- The skipped \`test-jotform\` page uses Jotform ${testEmbed.jotformId}, which is also the live form on: ${same.join(', ')}.`);
  }
  L.push('- The Hygraph-native contact form definition (fields/options) is in `src/data/hygraph-forms.json`; it needs an on-demand API route on the new site.');
  L.push('');
  L.push('## Redirects');
  L.push('');
  L.push('Owner-approved redirects (served as real 301s by the Node server):');
  L.push('');
  L.push(table(['Old URL', 'New URL', 'Decision'], urlMap.filter((m) => m.approved).map((m) => [m.from, m.to, m.approved])));
  L.push('');
  L.push('### Redirects needing a decision');
  L.push('');
  if (!urlMap.some((m) => m.decision)) L.push('- none');
  L.push(`\`src/data/redirects.ts\` maps ${urlMap.length} old URLs (${urlMap.filter((m) => m.to === m.from).length} unchanged, ${urlMap.filter((m) => m.to && m.to !== m.from).length} redirected, ${urlMap.filter((m) => !m.to).length} dropped).`);
  L.push('');
  if (urlMap.some((m) => m.decision)) L.push(table(['Old URL', 'Proposed', 'Decision needed'], urlMap.filter((m) => m.decision).map((m) => [m.from, m.to ?? '(404)', m.decision])));
  L.push('');
  L.push(...staticSections());
  L.push(...copyAuditSection());
  L.push('');
  L.push('## Other notes');
  L.push('');
  for (const n of [...new Set(report.notes)]) L.push(`- ${n}`);
  L.push('');
  L.push('## Failures / warnings');
  L.push('');
  if (!report.failures.length) L.push('- none');
  for (const f of report.failures) L.push(`- ${f}`);
  L.push('');
  return L.join('\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
