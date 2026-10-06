/**
 * Headings and meta from the old hard-coded listing routes (pages/*.js) whose
 * content comes from data collections.
 */
export const listingPages = {
  'get-quotes': { title: 'Get Quotes', description: 'Get insurance quotes from United Western Insurance Brokers', heading: 'Coverage and Cost Estimates' },
  'coverage-check-ups': { title: 'Coverage Checkups', description: 'Coverage check-ups from UWIB Risk.', heading: 'Coverage Checkups' },
  'coverage-and-cost-estimates': {
    title: 'Coverage and Cost Estimates',
    description: 'Coverage and cost estimates and niche programs from UWIB Risk.',
    heading: 'Coverage and Cost Estimates',
    secondaryHeading: 'Niche Programs',
  },
  carriers: { title: 'Carriers', description: 'Insurance carrier partners at United Western Insurance Brokers', heading: 'Carriers' },
  programs: {
    title: 'Programs',
    description: 'Insurance programs and coverage options from United Western Insurance Brokers',
    heading: 'Programs',
    secondaryHeading: 'Coverage and Cost Estimates',
  },
  'glossary-terms': { title: 'Insurance Term Glossary', description: 'Insurance terms explained.', heading: 'Insurance Term Glossary' },
  'office-resources': { title: 'Office Resources', description: 'Office resources for the UWIB team.', heading: 'Office Resources' },
} as const;
