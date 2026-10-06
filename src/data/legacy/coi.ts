/** Certificates of insurance and client portal (/coi). Extracted from the old pages/coi.js. */
export const meta = { title: 'Coverage Management', description: 'Certificates of insurance and client portal access.' };

/** Old on-page heading; the redesign uses the CMS page title ("Certificate of Insurance"). */
export const heading = 'Coverage Management';

export const clientPortalUrl = 'https://clientportal.vertafore.com/Login/3004020-1';

export interface CoiOption {
  title: string;
  subtitle?: string;
  /** Short description (new copy for the redesign). */
  text: string;
  /** Main action (label is new copy for the redesign). */
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}

export const cards: CoiOption[] = [
  {
    title: 'Instant COI©',
    subtitle: 'Certificates of Insurance',
    text: 'Clients with portal access can issue certificates themselves from the client portal, at any time.',
    primary: { label: 'Open the client portal', href: clientPortalUrl },
    secondary: { label: 'Manage Your Coverage', href: clientPortalUrl },
  },
  {
    title: '24hr COI©',
    text: 'Send us the certificate holder’s details and what the contract requires, and we’ll prepare the certificate.',
    primary: { label: 'Request a certificate', href: '/certificates-of-insurance' },
    secondary: { label: 'Apply for Instant COI©', href: '/client-portal-request' },
  },
];
