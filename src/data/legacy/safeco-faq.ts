/** Safeco FAQ (/safeco-faq). Content extracted from the old pages/safeco-faq.js. */
import safecoLogo from '../../assets/legacy/safeco-logo.jpg';
import { altFor } from '../../lib/alt';
import type { LegacyImage } from './hotels';

export const meta = {
  title: 'Safeco FAQ',
  description: 'Frequently asked questions about Safeco’s recent decision to reduce policies in Western States.',
};

export const logo = { src: safecoLogo, alt: altFor('src/assets/legacy/safeco-logo.jpg') } satisfies LegacyImage;

export const intro =
  'We know you may have questions about Safeco’s recent decision, so we’ve put together this quick FAQ to give you clarity and peace of mind. If you don’t see your question here, please reach out - our team is ready to help.';

/** Also emitted as FAQPage structured data on the old site. */
export const faqs = [
  {
    question: 'Why is Safeco not renewing my policies?',
    answer:
      'Safeco has made a business decision to reduce the number of policies they write and renew. This decision is not based on your account history or claims - it is simply their internal strategy.',
  },
  {
    question: 'When will my coverage end?',
    answer:
      'Your current Safeco coverage remains in place until your policy expiration date. We will present you with new options at least 30 days before that date to ensure a smooth transition.',
  },
  {
    question: 'Do I need to do anything right now?',
    answer:
      'No action is needed at this time. Our team is already preparing alternatives and will reach out with recommendations tailored to your needs.',
  },
  {
    question: 'Will my new coverage cost more?',
    answer:
      'Premiums across California have been rising, but our priority is to keep your coverage strong and competitive. We will shop several trusted A rated companies and present you with all of your options so that you can make an informed decision.',
  },
  {
    question: 'Which carriers will you work with for me?',
    answer:
      'We partner with respected A rated companies such as Mercury, Travelers, and Hartford, along with many other trusted carriers. Our recommendations will be based on what best fits your situation.',
  },
  {
    question: 'What should I do if I have changes coming up (new driver, vehicle, address, business change)?',
    answer: 'Please tell us as soon as possible. These details help us secure the best coverage and pricing for your new policy.',
  },
];
