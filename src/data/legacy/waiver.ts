/**
 * Waiver tab demo (/waiver). Old pages/waiver.js showed one sentence and loaded the
 * Waiver Electronic "splash" tab script with these settings.
 */
export const meta = { title: 'Waiver', description: 'Demonstration of the online waiver tab.' };

export const text = 'This page is a demonstration of the waiver tab once installed on your website';

export const waiverTab = {
  scriptSrc: 'https://www.waiverelectronic.com/js/splashId.js',
  /** data-* attributes on the #splashId element in the old markup. */
  attributes: {
    id: 'splashId',
    'data-value': '5ccc99bddb83f601b57306fb',
    'data-text': 'Sign Your Waiver Online',
    'data-position': 'right',
    'data-backgroundColor': '#ad8574',
    'data-fontColor': '#000000',
  },
};
