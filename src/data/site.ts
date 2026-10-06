/**
 * Site-wide company details, navigation and footer links for the redesign.
 * Office phones/addresses live in src/data/offices.json (Hygraph export).
 */
import offices from './offices.json';
import { clientPortalUrl } from './legacy/coi';

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export const company = {
  name: 'UWIB Risk & Insurance Solutions',
  legalName: 'United Western Insurance Brokers',
  tagline: 'An independent insurance brokerage for businesses, families and employers.',
  founded: 1995,
  phone: '(800) 378-5554',
  phoneHref: 'tel:+18003785554',
  email: 'helpdesk@uwib.com',
  paymentUrl: 'https://uwibrisk.epaypolicy.com/',
  clientPortalUrl,
} as const;

/** Display order for offices in the footer and on /contact. */
const OFFICE_ORDER = ['pasadena', 'coeur-dalene', 'nashville'];
/** Market names shown on the site (the Nashville office is in Franklin, TN). */
const OFFICE_LABELS: Record<string, string> = { nashville: 'Nashville' };

export const siteOffices = OFFICE_ORDER.map((id) => {
  const o = offices.find((x) => x.id === id);
  if (!o) throw new Error(`Unknown office ${id}`);
  return {
    ...o,
    label: OFFICE_LABELS[id] ?? o.city,
    phoneHref: `tel:+1${o.phone.replace(/\D/g, '')}`,
  };
});

export const primaryNav: NavLink[] = [
  { label: 'Coverage', href: '/coverage' },
  { label: 'Industries', href: '/programs' },
  { label: 'Insights', href: '/blog' },
  { label: 'About', href: '/about' },
];

export const clientLinks: NavLink[] = [
  { label: 'Report a claim', href: '/carriers' },
  { label: 'Request a certificate', href: '/coi' },
  { label: 'Make a payment', href: company.paymentUrl, external: true },
  { label: 'Client portal', href: company.clientPortalUrl, external: true },
];

export const quoteLink: NavLink = { label: 'Get a quote', href: '/get-quotes' };

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: 'Coverage',
    links: [
      { label: 'Business', href: '/coverage#business' },
      { label: 'Home & family', href: '/coverage#home' },
      { label: 'Employee benefits', href: '/benefits-solutions' },
      { label: 'Industry programs', href: '/programs' },
    ],
  },
  { title: 'Clients', links: clientLinks },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Team', href: '/team' },
      { label: 'Insights', href: '/blog' },
      { label: 'Careers', href: '/careers' },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: 'Privacy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms-of-use' },
  { label: 'Licenses', href: '/licenses' },
  { label: 'Compensation disclosure', href: '/compensation-disclosure' },
];
