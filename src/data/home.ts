/** Homepage copy and curated lists (design: Paper "Home — Desktop" / "Home — Mobile"). */
import { company } from './site';
import { photos, type Photo } from './photos';

export const hero = {
  eyebrow: `Independent since ${company.founded}`,
  heading: ['Protect what', 'you’ve built.'],
  text: 'Business, home and benefits coverage, placed with care across two dozen carriers and looked after by people who know your name.',
  cta: { label: 'Start a quote →', href: '/get-quotes' },
  photo: photos.house,
};

/** Carrier names shown in the marquee (must match src/data/carriers.json). */
export const marqueeCarriers = [
  'Chubb',
  'Travelers',
  'Hartford',
  'Liberty Mutual',
  'Nationwide',
  'CNA',
  'Philadelphia Insurance Companies',
  'Tokio Marine',
  'Hanover',
  'Mercury',
  'Kemper',
  'MetLife',
];

export const statement = {
  eyebrow: 'Who we are',
  muted: 'We’re not a call center or a comparison site.',
  lead: 'We’re an independent team that reads the fine print, shops the market and stays in your corner long after the policy is signed.',
};

export interface CoveragePanel {
  id: string;
  label: string;
  short: string;
  heading: string[];
  text: string;
  href: string;
  photo: Photo;
}

export const coverage = {
  eyebrow: 'What we cover',
  heading: 'Three sides of your life, one team looking after all of them.',
  text: 'Most clients start with one policy. Bring us the rest and we’ll make sure nothing overlaps and nothing falls through the gaps.',
  panels: [
    {
      id: 'business',
      label: 'Business',
      short: 'Business',
      heading: ['For the business', 'you sign for.'],
      text: 'General liability, property, workers’ comp, cyber, EPLI, commercial auto and surety bonds.',
      href: '/coverage#business',
      photo: photos.constructionTruck,
    },
    {
      id: 'home',
      label: 'Home & family',
      short: 'Home & family',
      heading: ['For the people', 'under your roof.'],
      text: 'Home, auto, flood, earthquake, life, travel and pet coverage, plus private client service.',
      href: '/coverage#home',
      photo: photos.breakfast,
    },
    {
      id: 'employees',
      label: 'Employee benefits',
      short: 'Your employees',
      heading: ['For the people', 'who work for you.'],
      text: 'Group benefits with online enrollment, HR documents and payroll integration in one portal.',
      href: '/benefits-solutions',
      photo: photos.coworkers,
    },
  ] satisfies CoveragePanel[],
};

export const industries = {
  eyebrow: 'Industry programs',
  heading: 'Built by people who’ve worked inside these industries.',
  allLink: { label: 'All industry programs', href: '/programs' },
  items: [
    { label: 'Specialty coffee', caption: 'Coffee & Contracts', href: '/coffee-and-contracts', photo: photos.coffeeShop },
    { label: 'Boutique hotels', caption: 'California hospitality program', href: '/hotels', photo: photos.hotelExterior },
    { label: 'Trade contractors', caption: 'HVAC, plumbing & electrical', href: '/hvac', photo: photos.hvacTechnician },
    {
      label: 'Property investors',
      caption: 'Investors, managers & contractors',
      href: '/property-investors-managers-and-contractors',
      photo: photos.building,
    },
    {
      label: 'Hauling & excavation',
      caption: 'Southern states program',
      href: '/southern-states-dirt-hauling-and-excavation-contractors',
      photo: photos.dumpTruck,
    },
    {
      label: 'Technology firms',
      caption: 'IT & technology service providers',
      href: '/it-and-technology-service-providers',
      photo: photos.corridor,
    },
  ],
};

export const team = {
  eyebrow: 'Your people',
  heading: 'Faces, not phone trees.',
  text: 'You’ll have their direct line and email from day one, and a team that already knows your account when you call.',
  link: { label: 'Meet the team →', href: '/team' },
  /** Team slugs shown first, in this order; the rest follow in team order. */
  featured: ['josh-acosta', 'eric-schirding', 'stephanie-fregosi', 'crystal-van-eekhout', 'christa-ritner'],
};

export const insights = {
  eyebrow: 'Insights',
  heading: 'Plain English on what’s changing.',
  text: 'Notes on risk, coverage and the market, written by the people who place it.',
};

export const claims = {
  eyebrow: 'When something goes wrong',
  heading: 'You call a person, not a claims hotline.',
  photo: photos.road,
  /** Testimonial id (src/data/testimonials.json) and the verbatim excerpt shown. */
  testimonial: {
    id: 'heidi-s-edy1v4',
    excerpt: '…Always caring and will do right by the customer first and foremost…',
  },
};
