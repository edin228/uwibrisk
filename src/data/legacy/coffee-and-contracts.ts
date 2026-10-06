/**
 * Coffee & Contracts landing page (/coffee-and-contracts). Content extracted from
 * the old Next.js app: pages/coffee-and-contracts.js, components/coffee/*.
 * It reused the hotels microsite shell and the hotels day-to-day service team.
 * Single source of the copy for src/pages/coffee-and-contracts.astro. A "\n" in a
 * string is a forced line break (<br>) from the old markup.
 */
import coffeeAndNotebook from '../../assets/coffee-and-contracts/coffee-and-notebook.jpg';
import coffeeMug from '../../assets/coffee-and-contracts/coffee-mug.jpg';
import coffeeShop from '../../assets/coffee-and-contracts/coffee-shop.jpg';
import heroCoffeeCup from '../../assets/coffee-and-contracts/hero-coffee-cup.jpg';
import joshAcosta from '../../assets/coffee-and-contracts/josh-acosta.jpg';
import { altFor } from '../../lib/alt';
import { type LegacyImage, type MicrositeBrand, serviceTeam } from './hotels';

const HOME = '/coffee-and-contracts';

export const meta = {
  title: 'Coffee & Contracts | Specialty Coffee Insurance | UWIB Risk',
  description:
    'Insurance, labor and risk guidance for specialty coffee importers, roasters, wholesalers and cafés from Coffee & Contracts, a division of UWIB.',
};

export const brand: MicrositeBrand = {
  home: HOME,
  label: 'Coffee & Contracts',
  descriptor: 'Coffee &\ncontracts',
  navLabel: 'Coffee & Contracts',
  nav: [
    { label: 'About', href: `${HOME}#about` },
    { label: 'Who we serve', href: `${HOME}#who-we-serve` },
    { label: 'Our approach', href: `${HOME}#approach` },
    { label: 'Team', href: `${HOME}#team` },
  ],
  cta: { label: 'Get a quick quote', href: `${HOME}#contact` },
  tagline: 'Coffee & Contracts, a division of UWIB. Insurance and risk guidance for the specialty coffee community.',
  footerColumns: [
    [
      { label: 'About', href: `${HOME}#about` },
      { label: 'Who we serve', href: `${HOME}#who-we-serve` },
      { label: 'Our approach', href: `${HOME}#approach` },
    ],
    [
      { label: 'Team', href: `${HOME}#team` },
      { label: 'Privacy', href: '/privacy-policy' },
      { label: 'Licensing', href: '/licenses' },
    ],
  ],
  legalLinks: [
    { label: 'State licenses', href: '/licenses' },
    { label: 'Privacy policy', href: '/privacy-policy' },
  ],
  copyright: '© 2026 UWIB Risk & Insurance Solutions',
};

export const hero = {
  eyebrow: 'Specialty coffee insurance · Since 2012',
  heading: 'Insurance advice,\nbrewed for coffee.',
  text: 'Insurance, labor and risk guidance for the coffee businesses we know best: importers, roasters, wholesalers and cafés.',
  primaryCta: { label: 'Get a quick quote →', href: '#contact' },
  secondaryCta: { label: 'Meet the coffee team', href: '#team' },
  trust: 'A division of UWIB · Specialty Coffee Association members',
  image: { src: heroCoffeeCup, alt: altFor('src/assets/coffee-and-contracts/hero-coffee-cup.jpg') } satisfies LegacyImage,
  imageCaption: 'From green coffee to the last pour',
};

export const credibilityLabel = 'Specialty coffee focus';

export const credibility = [
  'Specialty coffee, since 2012',
  'Specialty Coffee Association members',
  'Two decades advising coffee businesses',
];

export const about = {
  eyebrow: 'What we’re about',
  heading: 'Partners for the business behind the bar.',
  text: 'We see ourselves as partners to small and mid-sized coffee businesses facing today’s labor and insurance complexities.',
  image: { src: coffeeShop, alt: altFor('src/assets/coffee-and-contracts/coffee-shop.jpg') } satisfies LegacyImage,
  points: [
    {
      number: '01',
      title: 'Founded for coffee in 2012',
      text: 'Over twenty years, we had become the insurance brokers and advisers to many leading US specialty coffee wholesalers, third-wave coffee bars, roasters and importers. Coffee & Contracts made it official.',
    },
    {
      number: '02',
      title: 'Coffee insight, applied',
      text: 'We bring years of insight from the coffee world to every account, with one goal: to serve our clients expertly.',
    },
    {
      number: '03',
      title: 'Tailored service, no added cost',
      text: 'Because of our focus, these services come at no additional cost, and our free review often helps clients save money right away.',
    },
  ],
};

export const differentiators = {
  eyebrow: 'What we do that’s different',
  heading: 'Two decades of coffee, applied to your insurance.',
  text: 'Our real-world experience in coffee shapes a practical, cost-effective set of solutions, not a generic package.',
  image: { src: coffeeAndNotebook, alt: altFor('src/assets/coffee-and-contracts/coffee-and-notebook.jpg') } satisfies LegacyImage,
  items: [
    { number: '01', title: 'Insight', text: 'We’ve learned valuable lessons along the way and use common sense to solve problems.' },
    { number: '02', title: 'Experience', text: 'More than two decades advising coffee importers, roasters, wholesalers and retailers.' },
    { number: '03', title: 'Passion', text: 'We know a gibraltar from a flat white, and that attention to detail shows up in your program.' },
  ],
};

export const whoWeServe = {
  eyebrow: 'Who we serve',
  heading: 'From origin to\nthe espresso bar.',
  text: 'We work with small and mid-sized coffee businesses at every step of the supply chain, and we understand how their risks connect.',
  items: [
    { number: '01', icon: 'importer', title: 'Green coffee importers', text: 'Cargo and stock throughput, warehouse exposures, contract terms with growers and buyers.' },
    { number: '02', icon: 'roaster', title: 'Roasters & wholesalers', text: 'Roasting equipment, product liability, wholesale accounts, delivery fleets and supplier contracts.' },
    { number: '03', icon: 'cafe', title: 'Cafés & coffee bars', text: 'General liability, property, equipment breakdown, staff and the lease terms behind each location.' },
    { number: '04', icon: 'people', title: 'Your people & payroll', text: 'Workers’ compensation, employment practices and help with labor rules as your team grows.' },
  ],
};

export const approach = {
  eyebrow: 'How we work',
  heading: 'We know a gibraltar from a flat white. And a gap in your coverage.',
  steps: [
    { label: '01 / IDENTIFY', title: 'Find what matters most.', text: 'We uncover your most critical needs, from the roaster floor to the lease, and address them first.' },
    { label: '02 / EVALUATE', title: 'Compare real options.', text: 'We customize a program so you can weigh your options side by side, in plain language.' },
    { label: '03 / SUPPORT', title: 'Stay beside you.', text: 'We keep advising as you add locations, accounts and people, through claims and renewals.' },
  ],
};

export const team = {
  eyebrow: 'Meet your coffee team',
  heading: 'Coffee people, with an insurance brokerage behind them.',
  text: 'Coffee & Contracts clients work with a dedicated account executive, backed by the UWIB service team and roots in risk management dating to 1918.',
  lead: {
    name: 'Josh Acosta',
    role: 'Account Executive',
    bio: 'Josh leads Coffee & Contracts and is your first call for coverage, renewals and new locations. A Specialty Coffee Association member based in Tennessee, he takes his espresso single-origin.',
    email: 'josh@uwib.com',
    emailLabel: 'Email',
    phone: '(615) 234-0347',
    phoneLabel: 'Phone',
    phoneHref: 'tel:+16152340347',
    image: { src: joshAcosta, alt: altFor('src/assets/coffee-and-contracts/josh-acosta.jpg') } satisfies LegacyImage,
  },
  serviceEyebrow: 'Your day-to-day team',
  serviceHeading: 'Coffee service, with a team you know and direct access.',
  serviceTeam,
  serviceText:
    'Together, the team supports policy changes, certificates and documentation, carrier coordination, renewal preparation and the questions that come up between renewal dates.',
};

export const contact = {
  eyebrow: 'Let’s get started',
  heading: 'We’re ready when you are.',
  text: 'Tell us a little about your coffee business. Josh will follow up with a focused conversation and a free review of your current program.',
  direct: { label: 'Prefer to talk directly?', email: 'josh@uwib.com', phone: '(615) 234-0347', phoneHref: 'tel:+16152340347' },
  image: { src: coffeeMug, alt: altFor('src/assets/coffee-and-contracts/coffee-mug.jpg') } satisfies LegacyImage,
};
