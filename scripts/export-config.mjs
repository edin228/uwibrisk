/**
 * Owner decisions and migration rules applied by scripts/export-hygraph.mjs.
 *
 * Everything that changes or overrides Hygraph content lives here (or in
 * src/data/alt-text.json for image alt text), so re-running
 * `npm run export:hygraph` always reproduces the same, decided result.
 * Never hand-edit generated files to apply a decision: the manifest would
 * then skip those files on every future export.
 */

/** Test pages that must not be migrated (404 on the new site). */
export const SKIP_PAGE_SLUGS = ['test-jotform', 'sembley-test'];

/**
 * Blog posts that are not migrated, with the URL they 301 to.
 * Inactive (but published) posts are dropped automatically and 301 to /blog.
 */
export const DROPPED_BLOG_POSTS = {
  // Owner: cut (copied content).
  'increase-chances-of-career-success-5-cliches-that-work-to-get-you-started': {
    to: '/blog',
    reason: 'cut by owner (copied content)',
  },
  'excellence-in-the-workplace-maturity-is-an-expected-element': {
    to: '/blog',
    reason: 'cut by owner (copied content)',
  },
  // Owner: duplicate of ...-reduce-risk (identical body). Keep -reduce-risk.
  'how-independent-agents-can-help-condo-clients-reduce': {
    to: '/blog/how-independent-agents-can-help-condo-clients-reduce-risk',
    reason: 'duplicate of how-independent-agents-can-help-condo-clients-reduce-risk (owner decision)',
  },
};

/**
 * Corrections for broken URL values in Hygraph data fields
 * (programs, quote cards, office resources, ...). Exact match on the raw value.
 */
export const URL_FIXES = {
  // Two URLs concatenated in Hygraph (Drone program + Drone quote card).
  'https://uwib.portal.skywatch.ai/brokerLoginhttps://uwib.portal.skywatch.ai/brokerLogin':
    'https://uwib.portal.skywatch.ai/brokerLogin',
};

/**
 * Overrides for links inside rich text, keyed by the site-relative path the
 * link resolves to after internal-link rewriting.
 *   string -> replace the link target
 *   null   -> remove the link, keep its text
 */
export const LINK_OVERRIDES = {
  // Pre-Next (WordPress-era) uwib.com contact URLs.
  '/contact-us': '/contact',
  '/contact-webform': '/contact',
  // Old uwib.com blog posts with no equivalent in the current blog: unlink.
  '/before-you-sign-on-the-dotted-line-consider-these-risks': null,
  '/why-confidentiality-agreements-are-a-must': null,
  // Michael Kenneth is not on the team; the sentence reads fine without the link.
  '/team/michael-kenneth': null,
};

/**
 * Field overrides for office locations, keyed by office id (slug of the Hygraph city).
 */
export const OFFICE_OVERRIDES = {
  // Owner: 228 Pearl St is correct (Hygraph had 859 Novalis St, Nashville 37135).
  nashville: { address: '228 Pearl Street, Floor 2', city: 'Franklin', zip: '37064' },
};

/**
 * Exact-text corrections applied to generated files, keyed by output path.
 * The export fails if a `find` string is no longer present, so stale rules surface.
 */
export const TEXT_FIXES = {
  'src/content/pages/contact.md': [
    // Owner: the main number is (800) 378-5554.
    { find: 'Phone: (626) 397 -4700', replace: 'Phone: (800) 378-5554' },
  ],
  'src/content/blog/navigating-the-looming-labor-shortage-a-guide-for-hr-professionals.md': [
    // Owner: Michael Kenneth is no longer with UWIB; drop his introduction and contact details.
    {
      find: '**Meet Michael Kenneth, Our Benefits Expert**\n\nTo guide you through these evolving times, we’d like to introduce you to Michael Kenneth, one of our seasoned Account Executives. Michael brings a wealth of experience in crafting tailored benefits solutions that resonate with today’s workforce. Feel free to reach out to him at [michael@uwib.com](mailto:michael@uwib.com) or 626-376-9672.\n\n',
      replace: '',
    },
  ],
  'src/content/blog/towing-insurance-what-you-need-to-know.md': [
    // Owner: David Murphy is inactive; drop the link to his (non-existent) profile.
    { find: '\n\n**Learn More About**[**David Murphy**](/team)', replace: '' },
  ],
};

/**
 * Links that are knowingly left unresolved (reported, not changed).
 */
export const KNOWN_UNRESOLVED_LINKS = {
  '/about': 'Nav dropdown parent ("Contact"); an About page will exist in the redesign.',
};

/** Hosts whose links are flagged for the owner (likely require a Microsoft login). Unchanged. */
export const FLAGGED_LINK_HOSTS = ['sharepoint.com', 'loop.cloud.microsoft'];

/**
 * Images hard-coded in the old Next.js app that point at remote URLs
 * (found by grepping `main` for graphassets.com / cdn.brinq.io). Videos excluded.
 */
export const LEGACY_REMOTE_IMAGES = [
  {
    url: 'https://us-west-2.graphassets.com/AxLg70bPjR3y8qyVdg6FNz/cmfx68c9z00k807n5vnyzdmxq',
    name: 'sales-team-logo',
    source: 'pages/sales-team.js:44 (inside a commented-out block)',
  },
  {
    url: 'https://us-west-2.graphassets.com/AxLg70bPjR3y8qyVdg6FNz/cmfx7hsh31lb507n5gluvg1ka',
    name: 'trusted-advisor-dana-coates',
    source: 'pages/trusted-advisor.js:14 (same file as Dana Coates team photo)',
  },
  {
    url: 'https://cdn.brinq.io/UWIBR/safeco4157.jpg',
    name: 'safeco-logo',
    source: 'pages/index.js:131, pages/safeco-faq.js:67',
  },
];
export const LEGACY_SKIPPED = [
  {
    url: 'https://media.graphassets.com/I5lQ9O1nTv2SBBitaDMw',
    source: 'pages/dirt-haulers.js:19',
    reason: 'Dirt Haulers video (~155 MB mp4) - videos are dropped',
  },
];

/**
 * Static routes of the old Next.js app (pages/*.js) and where they live now.
 * `to` defaults to the same path. `approved` records an owner decision.
 */
export const OLD_STATIC_ROUTES = [
  { path: '/', note: 'Home page (hard-coded layout + Hygraph data). Placeholder until the redesign.' },
  { path: '/blog', note: 'Blog index.' },
  { path: '/team', note: 'Team index.' },
  { path: '/get-quotes', note: 'Quote cards grid (quoteCards data).' },
  { path: '/contact', note: 'Contact page: CMS text + advisor-matching wizard (src/data/legacy/contact.ts).' },
  { path: '/coi', note: 'COI & client portal links (src/data/legacy/coi.ts).' },
  { path: '/waiver', note: 'Waiver-tab demo page (src/data/legacy/waiver.ts).' },
  { path: '/carriers', note: 'Carrier directory (carriers data).' },
  { path: '/programs', note: 'Programs grid (programs data).' },
  { path: '/glossary-terms', note: 'Glossary (glossary data).' },
  { path: '/office-resources', note: 'Office resources grid (officeResources data).' },
  { path: '/coverage-check-ups', note: 'Check-up cards grid (checkUpCards data).' },
  { path: '/coverage-and-cost-estimates', note: 'Quote cards + niche programs.' },
  { path: '/sales-team', note: 'Producers list (team data, isProducer) + copy in src/data/legacy/sales-team.ts.' },
  { path: '/safeco-faq', note: 'Safeco FAQ (src/data/legacy/safeco-faq.ts).' },
  { path: '/search', note: 'Site search, rebuilt with Pagefind.' },
  { path: '/trusted-advisor', note: 'Trusted Advisor landing page (src/data/legacy/trusted-advisor.ts).' },
  { path: '/coffee-and-contracts', note: 'Coffee & Contracts landing page (src/data/legacy/coffee-and-contracts.ts).' },
  { path: '/hotels', note: 'Hotels microsite (src/data/legacy/hotels.ts).' },
  { path: '/hotels/coverage', note: 'Hotels microsite.' },
  { path: '/hotels/why-uwib', note: 'Hotels microsite.' },
  { path: '/hotels/risk-briefs', note: 'Hotels microsite.' },
  { path: '/hotels/risk-briefs/housekeeping-injuries', note: 'Hotels risk brief.' },
  { path: '/hotels/risk-briefs/ransomware-readiness', note: 'Hotels risk brief.' },
  { path: '/hotels/risk-briefs/renovation-season', note: 'Hotels risk brief.' },
  { path: '/hotels/risk-briefs/guest-amenities', note: 'Hotels risk brief.' },
  {
    path: '/dirt-haulers',
    to: '/southern-states-dirt-hauling-and-excavation-contractors',
    note: 'Page was only the dropped Dirt Haulers video (which forwarded to the dirt-hauling survey when finished).',
    approved: '301 to the dirt-hauling survey (owner approved).',
  },
  { path: '/commercial-options', note: 'Large/small business quote chooser (src/data/legacy/commercial-options.ts).' },
  {
    path: '/benefits-solutions111',
    to: '/benefits-solutions',
    note: 'Hard-coded duplicate/older version of the benefits-solutions landing page.',
    approved: '301 to /benefits-solutions (owner approved).',
  },
  {
    path: '/old-contact',
    to: '/contact',
    note: 'Old contact page variant.',
    approved: '301 to /contact (owner approved).',
  },
  { path: '/resources', note: 'Resources stub page (src/data/legacy/resources.ts); also the nav dropdown slug.' },
];

/** Owner approvals for automatically generated redirects. */
export const APPROVED = {
  inactiveBlogPosts: '301 to /blog (owner approved).',
  inactiveTeamMembers: '301 to /team (owner approved).',
};

/**
 * Pages that only existed as code in the old Next.js app. Their content was
 * extracted by hand into src/data/legacy/ (not part of the Hygraph export);
 * listed here so the migration report stays complete.
 */
export const LEGACY_PAGES = [
  {
    paths: ['/hotels', '/hotels/why-uwib', '/hotels/coverage', '/hotels/risk-briefs', '/hotels/risk-briefs/<4 briefs>'],
    data: 'src/data/legacy/hotels.ts',
    source: 'pages/hotels/**, components/hotels/*',
    images: 'src/assets/hotels/ (hero + 4 team photos)',
    form: 'Coverage review form -> POST /api/submit, Source "California boutique hotels page" (emails eschirding@uwib.com). Fields: Name, Email, Property name, Location, Number of rooms, Renewal month, Message. Risk-brief "subscribe" box only redirects to /hotels?email=...#contact.',
  },
  {
    paths: ['/coffee-and-contracts'],
    data: 'src/data/legacy/coffee-and-contracts.ts',
    source: 'pages/coffee-and-contracts.js, components/coffee/*',
    images: 'src/assets/coffee-and-contracts/ (4 photos + Josh Acosta portrait); reuses the hotels service-team photos',
    form: 'Quick-quote form -> POST /api/submit, Source "Coffee & Contracts page" (emails josh@uwib.com). Fields: Name, Email, Business name, Location, Type of business, Renewal month, Message.',
  },
  {
    paths: ['/trusted-advisor'],
    data: 'src/data/legacy/trusted-advisor.ts',
    source: 'pages/trusted-advisor.js',
    images: 'src/assets/legacy/trusted-advisor-dana-coates.jpg',
    form: 'Conversation form -> POST /api/submit, Source "Trusted Advisor page" (FORM_NOTIFICATION_TO). Fields: Name, Firm, Email, Phone (optional), Professional designation, Message.',
  },
  { paths: ['/safeco-faq'], data: 'src/data/legacy/safeco-faq.ts', source: 'pages/safeco-faq.js', images: 'src/assets/legacy/safeco-logo.jpg', form: null },
  {
    paths: ['/waiver'],
    data: 'src/data/legacy/waiver.ts',
    source: 'pages/waiver.js',
    images: null,
    form: 'Third-party Waiver Electronic tab script (waiverelectronic.com, id 5ccc99bddb83f601b57306fb); no UWIB endpoint.',
  },
  { paths: ['/commercial-options'], data: 'src/data/legacy/commercial-options.ts', source: 'pages/commercial-options.js', images: 'src/assets/commercial-options/', form: null },
  { paths: ['/resources'], data: 'src/data/legacy/resources.ts', source: 'pages/resources/index.js (stub with the word "Resources")', images: null, form: null },
  { paths: ['/coi'], data: 'src/data/legacy/coi.ts', source: 'pages/coi.js', images: null, form: null },
  {
    paths: ['/contact'],
    data: 'src/data/legacy/contact.ts',
    source: 'pages/contact.js, components/contact/HomeContactForm.js',
    images: null,
    form: 'Advisor-matching wizard (state map -> personal/business -> questions -> producer booking link or /personal-quote). It never posted to /api/submit. Routing rules ported verbatim (isProducerMatch); they still reference inactive David Murphy.',
  },
  { paths: ['/sales-team'], data: 'src/data/legacy/sales-team.ts', source: 'pages/sales-team.js', images: 'team motionPhotos (now exported)', form: null },
  {
    paths: ['/get-quotes', '/coverage-check-ups', '/coverage-and-cost-estimates', '/carriers', '/programs', '/glossary-terms', '/office-resources'],
    data: 'src/data/legacy/listing-pages.ts',
    source: 'pages/*.js (headings/meta only; content comes from data collections)',
    images: null,
    form: null,
  },
];

/**
 * Patterns for the "Copy to revise (cost promises)" audit (docs/copy-guidelines.md).
 * `cost` alone is too common to list; it is only reported when a promise verb
 * appears in the same line.
 */
export const COST_PROMISE_PATTERNS = [
  /\bsav(?:e|es|ed|ing|ings)\b/i,
  /\blower(?:s|ed|ing)?\b/i,
  /\breduc(?:e|es|ed|ing|tion|tions)\b/i,
  /premium credits?/i,
  /\bcut(?:s|ting)?\s+(?:your\s+)?(?:costs?|premiums?|expenses)/i,
  /\d+(?:\.\d+)?\s?%/,
  /\bcosts?\b.*\b(?:less|cheaper|affordable|minimi[sz]e|decrease|fraction of|no additional|free)\b/i,
  /\b(?:less|cheaper|affordable|minimi[sz]e|decrease|fraction of|no additional|free)\b.*\bcosts?\b/i,
];
