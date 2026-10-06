/**
 * /contact advisor-matching wizard. Extracted from the old
 * components/contact/HomeContactForm.js (also used on the home page).
 *
 * The wizard does NOT submit a form: it routes visitors to a producer's booking
 * link or to a quote form. The CMS copy for /contact is in src/content/pages/contact.md
 * and the Hygraph "Contact Form" field definitions (Industry options etc.) are in
 * src/data/hygraph-forms.json.
 *
 * NOTE: the old routing referenced David Murphy, who is no longer active; he is kept
 * here (inactive: true) only so the original rules are preserved verbatim.
 */

export const meta = { title: 'Contact', description: 'Contact an advisor at United Western Insurance Brokers' };

export const heading = 'Contact an Advisor';

export const steps = {
  state: { question: 'What state are you in?', input: 'US map, multi-select states' },
  lineOfBusiness: {
    question: 'Do you need Personal or Business Insurance?',
    options: [
      { label: 'Personal or Private Client', value: 'Personal Insurance' },
      { label: 'Business Insurance', value: 'Business Insurance' },
    ],
  },
  personalAssets: { question: 'Do your liquid assets exceed $3,000,000?', options: ['Yes', 'No'] },
  personalHighNetWorth: {
    producer: 'jesse-nielsen',
    text: 'Jesse Nielsen is the perfect asset to help navigate your private client needs.',
    cta: 'Schedule a Consultation',
  },
  personalStandard: {
    text: 'Follow the link below to receive a quote for your Home and Auto Insurance',
    cta: { label: 'Get Quote Now', href: '/personal-quote' },
  },
  business: {
    heading: 'Lets match you with the right advisor',
    industry: 'Select your industry',
    employees: 'How many people do you employ?',
    revenue: 'Projected sales for the next 12 months?',
    revenueDefault: 1_000_000,
    resultTitle: 'Account Executive',
    cta: 'Schedule a Consultation',
  },
};

/** Producers shown in the business step, in the old order (team collection slugs). */
export const producers = [
  { slug: 'jesse-nielsen', name: 'Jesse Nielsen' },
  { slug: 'david-murphy', name: 'David Murphy', inactive: true },
  { slug: 'eric-schirding', name: 'Eric Schirding' },
  { slug: 'josh-acosta', name: 'Josh Acosta' },
  { slug: 'nick-latshaw', name: 'Nick Latshaw' },
];

/**
 * Port of the old `validAgent` rules: is this producer a match for the visitor's
 * industry, employee count and projected sales? (Dana Coates was commented out.)
 */
export function isProducerMatch(
  producer: string,
  industry: string,
  employeeCount: number,
  projectedSales: number,
): boolean {
  switch (producer) {
    case 'Jesse Nielsen':
      return !(
        projectedSales > 5_000_000 ||
        projectedSales < 2_000_000 ||
        industry === 'Mfg/Wholesale/Import/Export' ||
        industry === 'Real Estate Investment' ||
        industry === 'Entertainment' ||
        industry === 'Security' ||
        employeeCount > 100
      );
    case 'David Murphy':
      return !(
        projectedSales > 2_000_000 ||
        projectedSales < 2_000_000 ||
        industry === 'Mfg/Wholesale/Import/Export' ||
        industry === 'Real Estate Investment' ||
        industry === 'Entertainment' ||
        industry === 'Security' ||
        employeeCount > 100
      );
    case 'Eric Schirding':
      return !(
        projectedSales < 1_000_000 ||
        industry === 'Municipal Insurance' ||
        industry === 'Agriculture' ||
        industry === 'Transportation/Automotive' ||
        industry === 'Contracting Trades' ||
        industry === 'Entertainment' ||
        industry === 'Security' ||
        (industry === 'Restaurant/Coffee Bar' && projectedSales <= 10_000_000 && projectedSales >= 2_000_000) ||
        (employeeCount < 10 && industry === 'Restaurant/Coffee Bar') ||
        employeeCount < 20
      );
    case 'Josh Acosta':
      return !(
        projectedSales >= 50_000_000 ||
        projectedSales < 1_000_000 ||
        projectedSales <= 5_000_000 ||
        projectedSales > 10_000_000 ||
        (industry === 'Restaurant/Coffee Bar' && projectedSales <= 10_000_000 && projectedSales >= 2_000_000) ||
        industry === 'Entertainment' ||
        (employeeCount < 10 && industry === 'Restaurant/Coffee Bar')
      );
    case 'Nick Latshaw':
      return !(
        (projectedSales < 10_000_000 && industry !== 'Entertainment') ||
        industry === 'Real Estate Investment' ||
        industry === 'Software & Technology' ||
        industry === 'Medical' ||
        industry === 'Law' ||
        industry === 'Other Professional Services' ||
        industry === 'Retail' ||
        industry === 'Transportation/Automotive' ||
        industry === 'Security' ||
        industry === 'Restaurant/Coffee Bar' ||
        (employeeCount < 40 && industry !== 'Entertainment')
      );
    default:
      return true;
  }
}
