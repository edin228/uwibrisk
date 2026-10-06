/**
 * Copy for the listing routes whose content comes from data collections
 * (carriers, programs, glossary, quote and check-up cards, ...).
 * `title`/`description` are the old routes' meta; `heading` is the on-page title.
 * Strings marked "new" were written for the redesign (not in the CMS or mockups).
 */
export interface ListingCopy {
  title: string;
  description: string;
  heading: string;
  lead?: string;
}

export const listingPages = {
  'get-quotes': {
    title: 'Get a Quote',
    description: 'Get insurance quotes from United Western Insurance Brokers',
    heading: 'Get a quote',
    // new
    lead: 'Pick the kind of coverage you need to open the matching quote form.',
    // new
    formsEyebrow: 'Worksheets & reviews',
  },
  'coverage-check-ups': {
    title: 'Coverage Checkups',
    description: 'Coverage check-ups from UWIB Risk.',
    heading: 'Coverage check-ups',
    // new
    lead: 'Worksheets for reviewing your business, personal and benefits coverage with us.',
  },
  'coverage-and-cost-estimates': {
    title: 'Coverage and Cost Estimates',
    description: 'Coverage and cost estimates and niche programs from UWIB Risk.',
    heading: 'Coverage and cost estimates',
    secondaryHeading: 'Niche programs',
  },
  carriers: {
    title: 'Carriers',
    description: 'Insurance carrier partners at United Western Insurance Brokers',
    heading: 'Our carriers',
    // new
    lead: 'Claims lines, payment links and websites for the carriers we place coverage with.',
    // new
    claimText: 'Call your carrier’s claims line or file online below. Not sure which carrier you’re with? Call us.',
  },
  programs: {
    title: 'Industry Programs',
    description: 'Insurance programs and coverage options from United Western Insurance Brokers',
    heading: 'Industry programs',
    // new
    featuredEyebrow: 'Featured',
    // new
    allEyebrow: 'All programs',
  },
  'glossary-terms': {
    title: 'Insurance Term Glossary',
    description: 'Insurance terms explained.',
    heading: 'Insurance term glossary',
    lead: 'Insurance terms explained.',
  },
  'office-resources': {
    title: 'Broker Resources',
    description: 'Office resources for the UWIB team.',
    heading: 'Broker resources',
  },
} as const;

/** Form pages listed on /get-quotes that no quote card links to (titles come from src/data/forms.ts). */
export const quoteFormSlugs = [
  'initial-client-interview',
  'commercial-quote',
  'epli-quote-request',
  'product-recall-insurance',
  'ho-worksheet',
  'residential-property-worksheet',
  'apartment-coverage-review',
  'california-hard-market-residential-property-insurance-worksheet',
];
