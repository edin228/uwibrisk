/**
 * Trusted Advisor landing page (/trusted-advisor). Content extracted from the old
 * Next.js app: pages/trusted-advisor.js (InsureTax Ambassador Program, a note from
 * Dana Coates). The page had its own header/footer. Single source of the copy for
 * src/pages/trusted-advisor.astro (styles in src/styles/microsites/trusted-advisor.css).
 */
import danaPhoto from '../../assets/legacy/trusted-advisor-dana-coates.jpg';
import { altFor } from '../../lib/alt';
import type { LegacyImage } from './hotels';

export const meta = {
  title: 'Trusted Advisor | UWIB Risk & Insurance Solutions',
  description:
    'Thoughts on trust, risk, and serving clients well. Learn how the InsureTax Ambassador Program helps trusted advisors educate clients about IRS audit risk and available protection.',
};

export const home = { href: '/', label: 'UWIB Risk home' };

export const navLabel = 'Trusted Advisor sections';

export const nav = [
  { label: 'What I’ve Learned', href: '#learned' },
  { label: 'Our Shared Responsibility', href: '#responsibility' },
  { label: 'Why Audit Risk Matters', href: '#audit-risk' },
  { label: 'About InsureTax', href: '#insuretax' },
  { label: 'Ambassador Program', href: '#ambassador' },
];

export const cta = { label: 'Start a conversation', href: '#conversation' };

export const hero = {
  label: 'Trusted Advisor',
  heading: 'Over the years I’ve noticed something…',
  text: 'Reflections on what it means to be a trusted advisor.',
  byline: 'A note from Dana Coates',
  quote: ['Clients rarely regret the risks they understood.', 'They regret the ones they never saw coming—or weren’t prepared for.'],
};

export const learned = {
  number: '01',
  heading: 'What I’ve learned',
  lead: 'Over the years I’ve noticed something, and I’d be curious whether you’ve noticed it too.',
  paragraphs: [
    'Clients rarely regret the risks they understood. They regret the ones they never saw coming or weren’t prepared for.',
    'As trusted advisors, none of us can predict the future. We cannot prevent every audit, lawsuit, cyberattack, wildfire, or unexpected event.',
    'What we can do is help our clients understand those risks before they become realities.',
  ],
  quote: 'I believe that is one of the highest responsibilities we accept when someone places their trust in us.',
};

export const responsibility = {
  number: '02',
  heading: 'Our shared responsibility',
  text: 'The risks are different. Our responsibility is remarkably similar.',
  comparison: [
    {
      title: 'For the tax advisor',
      text: 'The risk may be an IRS audit—or having to explain why defending a client’s return resulted in professional fees the client never anticipated.',
    },
    {
      title: 'For the insurance advisor',
      text: 'The risk may be a wildfire, liability lawsuit, cyberattack, or another financial event that changes everything in a matter of hours.',
    },
  ],
  list: [
    'We help people understand what could happen.',
    'We help them evaluate their choices.',
    'We help them prepare before circumstances decide.',
  ],
};

export const awareness = {
  eyebrow: '03 · We create awareness, not fear',
  heading: 'The purpose of a trusted advisor is not to alarm people. It is to help them make informed decisions.',
  text: 'The most valuable advice is often the advice our clients hope they never need.',
  quote:
    'I have yet to meet a client who was upset because someone took the time to explain an important risk. I have met many who wished someone had.',
};

export const auditRisk = {
  eyebrow: '04 · Why audit risk matters',
  heading: 'The cost of an audit is rarely just the tax.',
  text: 'When a return is questioned, a client may face representation costs, unexpected professional fees, business disruption, appeals, or litigation—often while trying to understand what their advisor can and cannot do.',
  conclusion: 'These conversations are most useful before an audit occurs, when clients still have time to understand their choices.',
  impacts: [
    { title: 'Representation costs', text: 'Preparing, documenting, and responding to IRS requests' },
    { title: 'Professional fees', text: 'Time from CPAs, attorneys, and specialist advisors' },
    { title: 'Business interruption', text: 'Records, interviews, and operational distraction' },
    { title: 'Client expectations', text: 'Clarity about what support is—and is not—included' },
    { title: 'Appeals', text: 'Additional work when the first determination is challenged' },
    { title: 'Litigation', text: 'The potential cost of taking a dispute further' },
  ],
};

export const insureTax = {
  eyebrow: '05 · A practical option',
  wordmark: 'InsureTax',
  heading: 'A way to prepare for the financial side of an audit.',
  paragraphs: [
    'InsureTax is one practical solution designed to help clients manage the professional expenses that can follow an IRS audit.',
    'It does not prevent an audit, predict an outcome, or replace sound tax advice. It gives clients a way to plan for costs they might otherwise face unexpectedly.',
  ],
  notes: [
    { label: 'The idea', text: 'Plan before an audit.' },
    { label: 'The purpose', text: 'Reduce financial surprise.' },
  ],
};

export const ambassador = {
  eyebrow: '06 · The InsureTax Ambassador Program',
  heading: 'A responsible way to begin an important conversation.',
  text: 'The advisor is not becoming an insurance salesperson. The advisor remains exactly what they already are: a trusted advisor.',
  steps: [
    { label: 'You', title: 'Introduce the conversation', text: 'Help a client understand why audit risk is worth considering.' },
    { label: 'UWIB Risk + InsureTax', title: 'Handle the insurance process', text: 'We explain, arrange, and support the coverage conversation.', featured: true },
    { label: 'You', title: 'Keep serving as the advisor', text: 'Your role—and the client relationship—stay exactly where they belong.' },
  ],
};

export const personalNote = {
  eyebrow: 'A personal note',
  heading: 'Why this matters to me',
  name: 'Dana Coates',
  role: 'Director of Strategic Partnerships',
  company: 'UWIB Risk & Insurance Solutions',
  image: { src: danaPhoto, alt: altFor('src/assets/legacy/trusted-advisor-dana-coates.jpg') } satisfies LegacyImage,
  intro:
    'After nearly fifty years in underwriting, agency operations, software development, and risk management, one lesson stands above all others.',
  lesson: ['People rarely regret preparing.', 'They often regret not knowing.'],
  closing: 'If an IRS audit never comes, wonderful. If it does, I hope no client ever has to say,',
  quote: '“I wish someone had told me about this.”',
};

export const conversationCta = {
  eyebrow: 'If this reflects how you serve',
  heading: 'Start a conversation',
  text: 'If these thoughts reflect the way you serve your clients, I’d enjoy the opportunity to talk with you about the InsureTax Ambassador Program.',
  noPressure: ['No pressure.', 'No sales presentation.', 'Just a conversation.'],
};

export const conversation = {
  eyebrow: 'Let’s talk',
  heading: 'Let’s start a conversation',
  text: 'Tell us a little about yourself and what brought you here. Dana or a member of the UWIB team will follow up personally.',
  privacy: 'Your information will only be used to respond to this inquiry.',
};

export const library = {
  eyebrow: 'A growing resource',
  heading: 'The Trusted Advisor Library',
  text: 'This page is designed to grow into a home for the ideas, tools, and conversations that help advisors serve clients well.',
  items: [
    { title: 'Reflections & essays', text: '“Over the Years I’ve Noticed Something…” and related articles', status: 'Coming soon' },
    { title: 'Conversations', text: 'Short videos, webinars, and thoughtful client stories', status: 'Coming soon' },
    { title: 'Practical resources', text: 'Guides, frequently asked questions, and advisor tools', status: 'Coming soon' },
  ],
};

export const footer = {
  tagline: 'Insurance solutions how you want them, when you need them.',
  navLabel: 'Footer navigation',
  columns: [
    {
      heading: 'Trusted Advisor',
      links: [
        { label: 'What I’ve learned', href: '#learned' },
        { label: 'Why audit risk matters', href: '#audit-risk' },
        { label: 'Ambassador Program', href: '#ambassador' },
      ],
    },
    {
      heading: 'UWIB Risk',
      links: [
        { label: 'About', href: '/team' },
        { label: 'Insights', href: '/blog' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ],
  copyright: '© 2026 UWIB Risk & Insurance Solutions',
  legalLinks: [
    { label: 'Privacy', href: '/privacy-policy' },
    { label: 'Terms', href: '/terms-of-use' },
    { label: 'State licenses', href: '/licenses' },
    { label: 'Compensation disclosure', href: '/compensation-disclosure' },
  ],
};
