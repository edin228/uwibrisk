/** Commercial quoting chooser (/commercial-options). Extracted from the old pages/commercial-options.js. */
import largeBusiness from '../../assets/commercial-options/large-business.webp';
import smallBusiness from '../../assets/commercial-options/small-business.webp';
import { altFor } from '../../lib/alt';
import type { LegacyImage } from './hotels';

export const meta = { title: 'Commercial Quoting', description: 'Choose the commercial insurance quote path that fits your business.' };

export const heading = 'Commercial Quoting';

export const options: { title: string; href: string; icon: string; criteria: string[]; text: string; image: LegacyImage }[] = [
  {
    title: 'Large Business',
    href: '/initial-client-interview',
    icon: 'apartment',
    criteria: ['Over $2M in revenue', '50+ Employees'],
    text: 'Tailored insurance solutions to meet your large-scale business needs and coverage',
    image: { src: largeBusiness, alt: altFor('src/assets/commercial-options/large-business.webp') },
  },
  {
    title: 'Small Business',
    href: '/commercial-quote',
    icon: 'handshake',
    criteria: ['Under $2M in revenue', 'Under 50 Employees'],
    text: 'Insurance solutions to protect your business and support your growth',
    image: { src: smallBusiness, alt: altFor('src/assets/commercial-options/small-business.webp') },
  },
];
