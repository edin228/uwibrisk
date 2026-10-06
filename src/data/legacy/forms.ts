/**
 * Forms that were hard-coded in the old Next.js app (not Hygraph embeds).
 * All of them POST JSON to /api/submit (see src/pages/api/submit.ts):
 *   { id, ...fields, Source }  plus an empty honeypot field named `website`.
 * The `Source` value selects the notification recipient (SOURCE_RECIPIENTS in
 * src/lib/server/sendFormNotification.ts); other sources go to FORM_NOTIFICATION_TO.
 */

/**
 * The old pages sent the Hygraph id of the "Contact Form" as `id`. Hygraph is
 * retired, so the new forms send this stable identifier instead.
 */
export const LEGACY_FORM_ID = 'contact-form';

export interface LegacyFormField {
  /** Input name in the old markup. */
  name: string;
  /** Key used in the JSON payload sent to /api/submit. */
  payloadKey: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea';
  required: boolean;
  placeholder?: string;
  autocomplete?: string;
  options?: string[];
}

export interface LegacyForm {
  id: string;
  /** Page(s) that render the form. */
  pages: string[];
  heading: string;
  /** Value sent as `Source` (drives the email recipient). */
  source: string;
  /** Who receives the notification email. */
  recipient: string;
  endpoint: '/api/submit';
  submitLabel: string;
  responseNote: string;
  consent: string;
  successMessage: string;
  errorMessage: string;
  /** Pre-fill: the old pages read ?email= into the email field. */
  prefillEmailFromQuery: boolean;
  fields: LegacyFormField[];
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const hotelsContactForm: LegacyForm = {
  id: 'hotels-coverage-review',
  pages: ['/hotels'],
  heading: 'Request a coverage review',
  source: 'California boutique hotels page',
  recipient: 'eschirding@uwib.com (fixed in SOURCE_RECIPIENTS)',
  endpoint: '/api/submit',
  submitLabel: 'Send request →',
  responseNote: 'Usually answered within one business day',
  consent: 'By submitting, you agree that UWIB may contact you about this request. No obligation.',
  successMessage: 'Thank you. A member of our hospitality team will be in touch soon.',
  errorMessage: 'Something went wrong. Please try again or email eschirding@uwib.com.',
  prefillEmailFromQuery: true,
  fields: [
    { name: 'name', payloadKey: 'Name', label: 'Your name', type: 'text', required: true, placeholder: 'First and last name', autocomplete: 'name' },
    { name: 'email', payloadKey: 'Email', label: 'Work email', type: 'email', required: true, placeholder: 'you@hotel.com', autocomplete: 'email' },
    { name: 'property', payloadKey: 'Property name', label: 'Property name', type: 'text', required: true, placeholder: 'Hotel or management group', autocomplete: 'organization' },
    { name: 'location', payloadKey: 'Location', label: 'Location', type: 'text', required: true, placeholder: 'City, California', autocomplete: 'address-level2' },
    { name: 'rooms', payloadKey: 'Number of rooms', label: 'Number of rooms', type: 'select', required: true, options: ['1–25', '26–50', '51–100', '101–200', '201+'] },
    { name: 'renewal', payloadKey: 'Renewal month', label: 'Renewal month', type: 'select', required: true, options: MONTHS },
    { name: 'message', payloadKey: 'Message', label: 'What would you like to review?', type: 'textarea', required: true, placeholder: 'Current concerns, changes to the property, or questions for us' },
  ],
};

export const coffeeContactForm: LegacyForm = {
  id: 'coffee-quick-quote',
  pages: ['/coffee-and-contracts'],
  heading: 'Get a quick quote',
  source: 'Coffee & Contracts page',
  recipient: 'josh@uwib.com (fixed in SOURCE_RECIPIENTS)',
  endpoint: '/api/submit',
  submitLabel: 'Send request →',
  responseNote: 'Usually answered within one business day',
  consent: 'By submitting, you agree that UWIB may contact you about this request. No obligation.',
  successMessage: 'Thank you. Josh will be in touch soon.',
  errorMessage: 'Something went wrong. Please try again or email josh@uwib.com.',
  prefillEmailFromQuery: true,
  fields: [
    { name: 'name', payloadKey: 'Name', label: 'Your name', type: 'text', required: true, placeholder: 'First and last name', autocomplete: 'name' },
    { name: 'email', payloadKey: 'Email', label: 'Work email', type: 'email', required: true, placeholder: 'you@yourcoffee.com', autocomplete: 'email' },
    { name: 'business', payloadKey: 'Business name', label: 'Business name', type: 'text', required: true, placeholder: 'Roastery, café or company', autocomplete: 'organization' },
    { name: 'location', payloadKey: 'Location', label: 'Location', type: 'text', required: true, placeholder: 'City, State', autocomplete: 'address-level2' },
    { name: 'businessType', payloadKey: 'Type of business', label: 'Type of business', type: 'select', required: true, options: ['Green coffee importer', 'Roaster', 'Wholesaler', 'Café or coffee bar', 'Other'] },
    { name: 'renewal', payloadKey: 'Renewal month', label: 'Renewal month', type: 'select', required: true, options: MONTHS },
    { name: 'message', payloadKey: 'Message', label: 'What would you like to review?', type: 'textarea', required: true, placeholder: 'New locations, equipment, contracts, or questions for Josh' },
  ],
};

export const trustedAdvisorForm: LegacyForm = {
  id: 'trusted-advisor-conversation',
  pages: ['/trusted-advisor'],
  heading: 'Let’s start a conversation',
  source: 'Trusted Advisor page',
  recipient: 'FORM_NOTIFICATION_TO (default recipients)',
  endpoint: '/api/submit',
  submitLabel: 'Send message →',
  responseNote: 'Your information will only be used to respond to this inquiry.',
  consent: 'Your information will only be used to respond to this inquiry.',
  successMessage:
    'Thank you for reaching out. We appreciate your interest and look forward to continuing the conversation.',
  errorMessage: 'Something went wrong. Please try again or email helpdesk@uwib.com.',
  prefillEmailFromQuery: false,
  fields: [
    { name: 'name', payloadKey: 'Name', label: 'Name', type: 'text', required: true, autocomplete: 'name' },
    { name: 'firm', payloadKey: 'Firm', label: 'Firm', type: 'text', required: true, autocomplete: 'organization' },
    { name: 'email', payloadKey: 'Email', label: 'Email', type: 'email', required: true, autocomplete: 'email' },
    { name: 'phone', payloadKey: 'Phone', label: 'Phone (optional)', type: 'tel', required: false, autocomplete: 'tel' },
    { name: 'designation', payloadKey: 'Professional designation', label: 'Professional designation', type: 'select', required: true, options: ['CPA', 'Enrolled Agent', 'CFP', 'Insurance Advisor', 'Attorney', 'Other'] },
    { name: 'message', payloadKey: 'Message', label: 'Message', type: 'textarea', required: true },
  ],
};

export const legacyForms: LegacyForm[] = [hotelsContactForm, coffeeContactForm, trustedAdvisorForm];
