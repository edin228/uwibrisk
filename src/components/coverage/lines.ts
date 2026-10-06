/**
 * Coverage lines listed on /coverage, by group. Each line links to its coverage
 * page (src/content/coverage/<coverage>.md) when that entry is visible in the
 * build (published, or a draft in dev / SHOW_DRAFTS=true; see src/lib/coverage.ts)
 * and to `fallbackHref`, an existing quote form or program page, otherwise.
 * Business lines follow the homepage "What we cover" list (src/data/home.ts).
 */
import type { CoverageGroup, CoverageLink } from './coverage';

export interface CoverageLine extends CoverageLink {
  label: string;
}

/** Commercial quote options (small/large business). */
const commercialQuote = '/commercial-options';

export const coverageLines: Record<CoverageGroup, CoverageLine[]> = {
  business: [
    { label: 'General liability', coverage: 'general-liability', fallbackHref: commercialQuote },
    { label: 'Commercial property', coverage: 'commercial-property', fallbackHref: commercialQuote },
    { label: 'Workers’ compensation', coverage: 'workers-compensation', fallbackHref: commercialQuote },
    { label: 'Cyber liability', coverage: 'cyber-liability', fallbackHref: '/cyber-liability' },
    // EPLI program site (src/data/programs.json, "EPLI").
    { label: 'Employment practices liability (EPLI)', coverage: 'epli', fallbackHref: 'https://epli.uwib.com/' },
    { label: 'Commercial auto', coverage: 'commercial-auto', fallbackHref: commercialQuote },
    // Surety bond quotes (src/data/quote-cards.json, "Bonds").
    { label: 'Surety bonds', coverage: 'surety-bonds', fallbackHref: 'https://bxsurety.com/bx-pro-landing/92507' },
  ],
  home: [
    { label: 'Home', coverage: 'homeowners', fallbackHref: '/personal-quote' },
    { label: 'Auto', coverage: 'personal-auto', fallbackHref: '/personal-quote' },
    { label: 'Flood', coverage: 'flood', fallbackHref: '/flood-quote' },
    { label: 'Earthquake', coverage: 'earthquake', fallbackHref: '/earthquake-quote' },
    { label: 'Life', coverage: 'life', fallbackHref: '/life-insurance-needs' },
    { label: 'Travel', coverage: 'travel', fallbackHref: '/travel-insurance' },
    { label: 'Pet', coverage: 'pet', fallbackHref: 'https://agency.petinsurance.com/uwib' },
    { label: 'Private client services', fallbackHref: '/privateclient' },
  ],
  benefits: [
    { label: 'Group benefits', coverage: 'group-benefits', fallbackHref: '/benefits-quote' },
    { label: 'Benefits & HR solutions', fallbackHref: '/benefits-solutions' },
    { label: 'Benefits check-up', fallbackHref: '/benefits-check-up' },
  ],
};
