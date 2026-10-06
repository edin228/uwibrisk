/** Coverage Management / COI page (/coi). Extracted from the old pages/coi.js. */
export const meta = { title: 'Coverage Management', description: 'Certificates of insurance and client portal access.' };

export const heading = 'Coverage Management';

export const clientPortalUrl = 'https://clientportal.vertafore.com/Login/3004020-1';

export const cards = [
  {
    title: 'Instant COI©',
    subtitle: 'Certificates of Insurance',
    href: clientPortalUrl,
    icon: 'link',
    secondary: { label: 'Manage Your Coverage', href: clientPortalUrl },
  },
  {
    title: '24hr COI©',
    href: '/certificates-of-insurance',
    icon: 'certificate',
    secondary: { label: 'Apply for Instant COI©', href: '/client-portal-request' },
  },
];
