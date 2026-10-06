/**
 * Small, dependency-free HTML helpers for migrated CMS rich text (no remark/rehype plugins).
 * They work on the HTML Astro renders for a `pages` entry, which has a predictable shape.
 */
import { company } from '../../data/site';

export interface TocItem {
  slug: string;
  text: string;
}

/** Words kept upper case when an ALL-CAPS heading is turned into sentence case. */
const ACRONYMS = new Set(['UWIB', 'PIIB', 'AI', 'SSL', 'FEIN', 'COI', 'CA', 'CDI', 'NPN', 'EPLI', 'HR', 'LLC', 'U.S.', 'US', 'I']);

const LETTERS = /[A-Za-z]/;

/** True when the text has letters and none of them are lower case. */
export function isAllCaps(text: string): boolean {
  return LETTERS.test(text) && text === text.toUpperCase();
}

/** "PARTNERING WITH UWIB" -> "Partnering with UWIB". Mixed-case text is returned unchanged. */
export function sentenceCase(text: string): string {
  if (!isAllCaps(text)) return text;
  const lowered = text.replace(/[A-Z][A-Z.’']*/g, (word) => (ACRONYMS.has(word) ? word : word.toLowerCase()));
  const restored = lowered.replace(new RegExp(escapeRegExp(company.name), 'gi'), company.name);
  return restored.replace(LETTERS, (c) => c.toUpperCase());
}

/** Plain text of an HTML fragment (tags removed, common entities decoded). */
export function textOf(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Normalizes headings in CMS HTML:
 * - Hygraph pages often fake section headings with a bold ALL-CAPS paragraph
 *   (`<p><strong>DISCLAIMER</strong></p>`, sometimes glued to the end of the previous
 *   paragraph). Those become real `<h2>`s so they get anchors and appear in the TOC.
 *   A fake heading that repeats the page title is dropped.
 * - ALL-CAPS `<h2>`/`<h3>` text is shown in sentence case.
 */
export function normalizeHeadings(html: string, pageTitle: string): string {
  const used = new Set<string>([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1] ?? ''));
  const uniqueId = (text: string) => {
    const base = slugify(text) || 'section';
    let id = base;
    for (let i = 2; used.has(id); i++) id = `${base}-${i}`;
    used.add(id);
    return id;
  };
  const toH2 = (inner: string) => {
    const text = textOf(inner);
    if (text.toLowerCase() === pageTitle.trim().toLowerCase()) return '';
    const label = sentenceCase(text);
    return `<h2 id="${uniqueId(label)}">${escapeHtml(label)}</h2>`;
  };
  const isFakeHeading = (inner: string) => {
    const text = textOf(inner);
    return isAllCaps(text) && text.length > 2;
  };

  return (
    html
      // Whole paragraph is one bold ALL-CAPS run.
      .replace(/<p><strong>([^<]+)<\/strong><\/p>/g, (m, inner: string) => (isFakeHeading(inner) ? toH2(inner) : m))
      // Bold ALL-CAPS run glued to the end of a paragraph.
      .replace(/([^>\s])\s*<strong>([^<]+)<\/strong><\/p>/g, (m, before: string, inner: string) =>
        isFakeHeading(inner) && textOf(inner).split(' ').length > 1 ? `${before}</p>${toH2(inner)}` : m,
      )
      // Real headings written in ALL CAPS.
      .replace(/<(h[23])([^>]*)>([^<]+)<\/\1>/g, (m, tag: string, attrs: string, inner: string) =>
        isAllCaps(textOf(inner)) ? `<${tag}${attrs}>${escapeHtml(sentenceCase(textOf(inner)))}</${tag}>` : m,
      )
  );
}

/** `<h2 id>` entries of an HTML fragment, in order. */
export function headingsOf(html: string): TocItem[] {
  return [...html.matchAll(/<h2[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => ({
    slug: m[1] ?? '',
    text: textOf(m[2] ?? ''),
  }));
}

export interface LicenseRow {
  state: string;
  number: string;
}

/**
 * Licenses page: everything before the "State licenses" heading is the California
 * email notice; after it, each paragraph is "State<br>Number".
 * Returns null when the HTML doesn't have that shape (the page then renders as plain prose).
 */
export function splitLicenses(html: string): { notice: string; rows: LicenseRow[]; rest: string } | null {
  const heading = /<h2[^>]*id="state-licenses"[^>]*>[\s\S]*?<\/h2>/.exec(html);
  if (!heading) return null;
  const notice = html.slice(0, heading.index).trim();
  const after = html.slice(heading.index + heading[0].length);
  const rows: LicenseRow[] = [];
  const rest = after
    .replace(/<p>([^<]+)<br\s*\/?>\s*([^<]+)<\/p>/g, (_m, state: string, number: string) => {
      rows.push({ state: textOf(state), number: textOf(number) });
      return '';
    })
    .trim();
  return rows.length ? { notice, rows, rest } : null;
}
