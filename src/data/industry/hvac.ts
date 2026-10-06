/**
 * /hvac (HVAC, plumbing & electrical contractors program).
 * Design and approved copy: Paper "Industry program — Desktop (Trade contractors)".
 * Replaces the Hygraph components in src/data/landing/hvac.json on this page.
 */
import { photos } from '../photos';
import type { IndustryProgram } from './types';

/** The HVAC program's qualifying survey (src/data/programs.json, "HVAC, Plumbing & Electrical Contractors"). */
const survey = '/qualifying-survey-for-electrical-contractors';

export const hvac: IndustryProgram = {
  title: 'HVAC, Plumbing & Electrical Contractors',
  description:
    'A program built for HVAC, plumbing and electrical contractors, with hands-on claims oversight from the first report to the day a claim closes.',
  hero: {
    crumbs: [{ label: 'Industries', href: '/programs' }, { label: 'Trade contractors' }, { label: 'HVAC, plumbing & electrical' }],
    title: 'Smarter insurance for the trades.',
    lead: 'A program built for HVAC, plumbing and electrical contractors, with hands-on claims oversight from the first report to the day a claim closes.',
    photo: photos.hvacTechnician,
    position: '50% 30%',
    height: 680,
    actions: [
      { label: 'See if you qualify →', href: survey },
      { label: 'Talk to a contractor specialist', href: '/contact' },
    ],
  },
  program: {
    eyebrow: 'The program',
    statement: 'Coverage built around how the trades actually work.',
    listLabel: 'The trades this program is built for',
    list: ['HVAC', 'Plumbing', 'Electrical'],
    paragraphs: [
      'Many contractors rely on their carrier to handle every part of a claim. When that service falls short, claims stall and drag on longer than they should.',
      'Your claims history follows you through your Experience Modification Factor (Ex-Mod), which carriers consider when they price your policy. We stay involved in every claim so nothing sits unattended.',
    ],
  },
  services: {
    eyebrow: 'Our core services',
    heading: 'The claims work your carrier won’t do for you.',
    text: 'Most contractors don’t have someone on staff to manage claims. We fill that role, working alongside your carrier.',
    items: [
      { title: 'Injury analysis', text: 'We review adjuster notes and help your team identify the real root causes.' },
      { title: 'Return-to-work coordination', text: 'Back-to-work plans designed with your team for injured employees.' },
      { title: 'Reserving & closure oversight', text: 'We review how reserves are set and push for timely decisions and closures.' },
    ],
  },
  oversight: {
    photo: photos.manReviewing,
    position: '50% 40%',
    eyebrow: 'Why oversight matters',
    heading: 'We watch every claim from the first report to the day it closes.',
    items: [
      { title: 'Direct loss-run access', text: 'Carriers send claims data straight to us. No middlemen, no delays.' },
      { title: 'Tracking from day one', text: 'Every new claim is logged event by event, from first report through closure.' },
      { title: 'Aggressive follow-up', text: 'We keep pressure on carriers for timely decisions and fast closures.' },
    ],
  },
  benefits: {
    eyebrow: 'What you get',
    heading: 'What you can expect.',
    items: [
      { title: 'Claims that keep moving', text: 'We follow up with carriers so open claims don’t linger.' },
      { title: 'Early attention', text: 'We get involved at first report, when issues are easiest to address.' },
      { title: 'Return-to-work planning', text: 'Plans that help injured technicians get back to work safely.' },
      { title: 'A second look at reserves', text: 'We question carrier reserves that don’t add up.' },
    ],
  },
  closing: {
    eyebrow: 'Start here',
    heading: 'See if your company qualifies.',
    primary: { label: 'Take the qualifying survey →', href: survey },
  },
};
