/**
 * Sales team page (/sales-team). Old pages/sales-team.js listed active producers
 * (team members with isProducer) using their motion profile photos, then this copy,
 * the niche programs grid and the quote cards grid. The redesign shows the producers
 * like the /team listing, then links to those two sections' own pages.
 */
export const meta = { title: 'Sales Team', description: 'Meet the UWIB Risk sales team.' };

export const heading = 'Meet Our Team';

export const intro = [
  { text: 'UWIB Risk has team members standing by to assist with answering your questions.' },
  {
    text: 'Our specialized programs, including InsureTax, deliver revolutionary coverage to provide complex businesses and successful families with Peace of Mind.',
    link: { label: 'InsureTax', href: 'https://irsinsurance.tax' },
  },
];

export const programsHeading = 'Niche Programs';
export const quoteCardsHeading = 'Coverage and Cost Estimates';

/** Links that replace the old programs and quote-card grids. */
export const moreLinks = [
  { label: programsHeading, href: '/programs' },
  { label: quoteCardsHeading, href: '/coverage-and-cost-estimates' },
];
