/**
 * Copy for /about (artboard "About — Desktop"). Condensed from
 * src/content/pages/our-history.md and src/content/pages/our-core-values.md;
 * the vision and the three values themselves come from src/data/landing/core-values.json.
 */
import { photos } from './photos';

/** "With roots in the insurance industry dating back to 1918" (our-history.md). */
export const ROOTS_YEAR = 1918;

export const hero = {
  title: ['Independent since 1995.', `In insurance since ${ROOTS_YEAR}.`],
  lead: 'Founded in Pasadena, now with offices in Coeur d’Alene and Nashville. We help businesses, families and employers understand their risk and their options.',
  photo: photos.coworkers,
  primary: { label: 'Meet the team →', href: '/team' },
  secondary: { label: 'Contact an advisor', href: '/contact' },
};

export const history = {
  eyebrow: 'Our history',
  statement: `With roots in the insurance industry dating back to ${ROOTS_YEAR}, we’re no stranger to helping businesses and families manage their risk.`,
  rootsLabel: 'Roots in insurance',
  paragraphs: [
    'Today, our team is made up of talented and diverse people with decades of risk management experience. Since our founding, UWIB has been known for using technology and automation to deliver speed and service to our clients.',
    'We’re intentional about anticipating the hurdles your business and your family might face. In a consultative way, we help you identify options so you can make informed decisions about risk and risk transfer.',
  ],
};

export const values = {
  eyebrow: 'Our core values',
  /** our-core-values.md: "In 2020, our team developed these values together as guideposts…" */
  heading: 'Written together, in 2020.',
  text: 'Guideposts for how we treat one another, our clients and every partner we work with.',
};

export const more = {
  heading: 'More about UWIB',
  /** `{carriers}` is replaced with the number of carriers in src/data/carriers.json. */
  cards: [
    { title: 'Licenses', text: 'Our license numbers in every state where we’re licensed.', href: '/licenses' },
    { title: 'Our carriers', text: 'The {carriers} carriers we place business with, plus their claim lines.', href: '/carriers' },
    { title: 'Careers', text: 'Open roles and what it’s like to work here.', href: '/careers' },
    { title: 'Partner with UWIB', text: 'For agencies and producers interested in working with us.', href: '/partner-with-uwib' },
  ],
};
