/**
 * Industry program and landing page settings used by
 * src/components/templates/LandingTemplate.astro (keyed by landing slug).
 */
import { hvac } from './hvac';
import type { IndustryProgram, LandingSettings } from './types';

export type { IndustryProgram, LandingSettings } from './types';

/** Landing pages with a designed program page (mockup copy) instead of their Hygraph components. */
export const industryPrograms: Record<string, IndustryProgram> = { hvac };

/**
 * Hero photo and breadcrumbs for the other landing pages. Their Hygraph header
 * images are logos or text banners (or, for privateclient, a 555px illustration),
 * so the hero uses a photo from src/data/photos.ts instead.
 */
export const landingSettings: Record<string, LandingSettings> = {
  'benefits-solutions': {
    photo: 'hands',
    crumbs: [{ label: 'Coverage', href: '/coverage' }, { label: 'Employee benefits' }],
  },
  privateclient: {
    photo: 'house',
    crumbs: [
      { label: 'Coverage', href: '/coverage' },
      { label: 'Home & family', href: '/coverage#home' },
      { label: 'Private client' },
    ],
  },
  'earthquake-quote': {
    photo: 'porch',
    photoPosition: '50% 60%',
    crumbs: [
      { label: 'Coverage', href: '/coverage' },
      { label: 'Home & family', href: '/coverage#home' },
      { label: 'Earthquake' },
    ],
    hiddenTitles: ['EQ banner'],
  },
  'driver-safety': {
    photo: 'road',
    crumbs: [
      { label: 'Coverage', href: '/coverage' },
      { label: 'Business', href: '/coverage#business' },
      { label: 'Driver safety' },
    ],
  },
  'core-values': {
    photo: 'coworkers',
    crumbs: [{ label: 'About', href: '/about' }, { label: 'Our values' }],
  },
};
