/**
 * California boutique hotels microsite (/hotels/**). Content extracted from the
 * old Next.js app: components/hotels/{content,HotelsLanding,HotelsSupporting,
 * HotelsShell,RiskBriefCover,HotelsContactForm}.js and pages/hotels/**.
 * Single source of the copy for the faithful port in src/pages/hotels/** (styles in
 * src/styles/microsites/hotels.css). A "\n" in a string is a forced line break (<br>)
 * from the old markup.
 */
import type { ImageMetadata } from 'astro';
import heroImage from '../../assets/hotels/hero-boutique-hotel.jpg';
import christaRitner from '../../assets/hotels/team-christa-ritner.jpg';
import crystalVanEekhout from '../../assets/hotels/team-crystal-van-eekhout.jpg';
import ericSchirding from '../../assets/hotels/team-eric-schirding.png';
import stephanieFregosi from '../../assets/hotels/team-stephanie-fregosi.jpg';
import { altFor } from '../../lib/alt';

export interface LegacyImage {
  src: ImageMetadata;
  alt: string;
}

export interface MicrositeLink {
  label: string;
  href: string;
}

/** Header/footer of the old landing-page microsites (hotels, Coffee & Contracts). */
export interface MicrositeBrand {
  home: string;
  /** Accessible name of the home link ("<label> home"). */
  label: string;
  /** Two-line descriptor next to the logo. */
  descriptor: string;
  navLabel: string;
  /** `activePrefix`: highlight the item on every path that starts with it (otherwise exact match). */
  nav: (MicrositeLink & { activePrefix?: string })[];
  cta: MicrositeLink;
  tagline: string;
  footerColumns: MicrositeLink[][];
  legalLinks: MicrositeLink[];
  copyright: string;
}

export const HOTEL_PATHS = {
  home: '/hotels',
  why: '/hotels/why-uwib',
  coverage: '/hotels/coverage',
  briefs: '/hotels/risk-briefs',
} as const;

export const meta = {
  home: {
    title: 'California Boutique Hotel Insurance | UWIB Risk',
    description: 'Insurance and practical risk guidance for independent and boutique hotels throughout California.',
  },
  why: {
    title: 'Why UWIB for Boutique Hotels | UWIB Risk',
    description: 'A hospitality-focused insurance relationship built around your property, operations and long-term risk decisions.',
  },
  coverage: {
    title: 'Boutique Hotel Insurance Coverage | UWIB Risk',
    description:
      'Connected property, liability, workers’ compensation, cyber and management-risk coverage for California boutique hotels.',
  },
  briefs: {
    title: 'California Hospitality Risk Brief | UWIB Risk',
    description:
      'Practical risk-management insights for California boutique hotel owners, general managers and department leaders.',
  },
};

/** Microsite header/footer (shared shell). */
export const brand: MicrositeBrand = {
  home: HOTEL_PATHS.home,
  label: 'UWIB boutique hotel insurance',
  descriptor: 'Boutique hotel\ninsurance',
  navLabel: 'Boutique hotel insurance',
  nav: [
    { label: 'Why UWIB', href: HOTEL_PATHS.why },
    { label: 'Coverage', href: HOTEL_PATHS.coverage },
    { label: 'Hotel Risk Brief', href: HOTEL_PATHS.briefs, activePrefix: HOTEL_PATHS.briefs },
    { label: 'About', href: `${HOTEL_PATHS.home}#team` },
  ],
  cta: { label: 'Request a review', href: `${HOTEL_PATHS.home}#contact` },
  tagline: 'Independent insurance guidance for California boutique hotels.',
  footerColumns: [
    [
      { label: 'Why UWIB', href: HOTEL_PATHS.why },
      { label: 'Coverage', href: HOTEL_PATHS.coverage },
      { label: 'Risk Brief', href: HOTEL_PATHS.briefs },
    ],
    [
      { label: 'About', href: `${HOTEL_PATHS.home}#team` },
      { label: 'Contact', href: `${HOTEL_PATHS.home}#contact` },
      { label: 'Privacy', href: '/privacy-policy' },
    ],
  ],
  legalLinks: [
    { label: 'State licenses', href: '/licenses' },
    { label: 'Privacy policy', href: '/privacy-policy' },
  ],
  copyright: '© 2026 UWIB Risk & Insurance Solutions',
};

export const coverageAreas: {
  number: string;
  id: string;
  title: string;
  shortTitle: string;
  summary: string;
  includes: string[];
  /** Rendered as the dark row on /hotels/coverage. */
  dark?: boolean;
}[] = [
  {
    number: '01',
    id: 'property',
    title: 'Property & business income',
    shortTitle: 'Property',
    summary: 'Protect the physical place and the revenue stream that depends on it.',
    includes: ['Buildings and contents', 'Business income & extra expense', 'Ordinance and law', 'Equipment breakdown'],
  },
  {
    number: '02',
    id: 'liability',
    title: 'General & liquor liability',
    shortTitle: 'Liability',
    summary: 'Address the guest-facing exposures created by amenities, events, food and beverage.',
    includes: ['Premises and operations', 'Liquor liability', 'Innkeeper’s liability', 'Umbrella / excess'],
  },
  {
    number: '03',
    id: 'workers-comp',
    title: 'Workers’ compensation',
    shortTitle: 'Workers’ comp',
    summary: 'Pair statutory protection with attention to the injuries and processes driving cost.',
    includes: ['Employee injury coverage', 'Housekeeping ergonomics', 'Return-to-work planning', 'Claims review'],
  },
  {
    number: '04',
    id: 'cyber',
    title: 'Cyber & privacy',
    shortTitle: 'Cyber',
    summary: 'Prepare for the operational and reputational impact of a guest-data or payment-system event.',
    includes: ['Data breach response', 'Business interruption', 'Social engineering', 'Ransomware and recovery'],
    dark: true,
  },
  {
    number: '05',
    id: 'management-risk',
    title: 'Management & employment risk',
    shortTitle: 'Management & employment risk',
    summary: 'Protect the decisions and relationships behind the property, not only its physical assets.',
    includes: ['Employment practices liability', 'Directors & officers', 'Crime / fidelity', 'Fiduciary liability'],
  },
];

export const serviceTeam: (LegacyImage & { name: string; role: string })[] = [
  {
    name: 'Stephanie Fregosi',
    role: 'Client Services Manager',
    src: stephanieFregosi,
    alt: altFor('src/assets/hotels/team-stephanie-fregosi.jpg'),
  },
  {
    name: 'Crystal van Eekhout',
    role: 'Commercial Account Manager',
    src: crystalVanEekhout,
    alt: altFor('src/assets/hotels/team-crystal-van-eekhout.jpg'),
  },
  {
    name: 'Christa Ritner',
    role: 'Senior Account Manager',
    src: christaRitner,
    alt: altFor('src/assets/hotels/team-christa-ritner.jpg'),
  },
];

export const landing = {
  hero: {
    eyebrow: 'California hospitality insurance',
    heading: 'Protect the place\npeople remember.',
    text: 'Insurance and risk guidance designed around the realities of independent hotels, from guest experience and property protection to workers’ compensation and cyber risk.',
    primaryCta: { label: 'Request a coverage review →', href: '#contact' },
    secondaryCta: { label: 'Explore hotel coverage', href: HOTEL_PATHS.coverage },
    trust: 'Independent guidance · California expertise · Human service',
    image: { src: heroImage, alt: altFor('src/assets/hotels/hero-boutique-hotel.jpg') } satisfies LegacyImage,
    imageCaption: 'Built for independent properties',
  },
  credibilityLabel: 'California hospitality focus',
  credibility: ['Focused on California hospitality', 'Built for independent properties', 'Responsive, human service'],
  risks: {
    eyebrow: 'A hotel is never just a building',
    heading: 'One property.\nA hundred moving parts.',
    text: 'We help connect the risks that are too often handled in isolation, so your coverage reflects how your hotel actually operates.',
    items: [
      { number: '01', icon: 'property', title: 'Property & guest protection', text: 'Buildings, contents, equipment breakdown, guest liability, liquor and umbrella.' },
      { number: '02', icon: 'people', title: 'Your people & their well-being', text: 'Workers’ compensation, employment practices liability, benefits and safety strategy.' },
      { number: '03', icon: 'operations', title: 'Operational resilience', text: 'Business interruption, equipment failure, vendor exposures and continuity planning.' },
      { number: '04', icon: 'security', title: 'Property & cyber security', text: 'Guest data, payment systems, privacy events, social engineering and incident response.' },
    ],
  },
  briefFeature: {
    eyebrow: 'Useful before it’s urgent',
    heading: 'Risk guidance made for the people running the property.',
    text: 'Our California Hospitality Risk Brief turns claims patterns and operational pressure points into practical conversations for owners, general managers and department leaders.',
    topics: ['Insurance awareness', 'Employee well-being', 'Operational excellence', 'Cyber security'],
    cta: { label: 'Read the latest brief →', href: '/hotels/risk-briefs/housekeeping-injuries' },
  },
  coveragePreview: {
    eyebrow: 'Coverage, connected',
    heading: 'Built around the way your hotel works.',
    text: 'Independent properties rarely fit cleanly into a standard package. We start with the operation, then shape the insurance program around it.',
  },
  process: {
    eyebrow: 'A clearer insurance process',
    heading: 'Thoughtful advice. No hospitality-industry translation required.',
    steps: [
      { label: '01 / UNDERSTAND', title: 'See the whole operation.', text: 'We learn the property, people, amenities, contracts and plans behind the guest experience.' },
      { label: '02 / DESIGN', title: 'Connect coverage to reality.', text: 'We identify gaps, simplify tradeoffs and build an insurance program with intent.' },
      { label: '03 / STAY CLOSE', title: 'Keep pace with the property.', text: 'As operations evolve, we remain available for decisions, claims and renewal strategy.' },
    ],
  },
  team: {
    eyebrow: 'Meet your hospitality team',
    heading: 'A relationship with a team, not a handoff.',
    text: 'Boutique hotel clients work with people who know the account, understand the operation and stay close to day-to-day needs.',
    lead: {
      name: 'Eric Schirding',
      role: 'Co-Founder',
      bio: 'Eric helps set the direction for UWIB’s hospitality practice and makes sure clients are connected with the right people from the beginning.',
      link: { label: 'Meet Eric →', href: '/team/eric-schirding' },
      image: { src: ericSchirding, alt: altFor('src/assets/hotels/team-eric-schirding.png') } satisfies LegacyImage,
    },
    serviceEyebrow: 'Your day-to-day team',
    serviceHeading: 'Hospitality service, with a team you know and direct access.',
    serviceText:
      'Together, the team supports policy changes, certificates and documentation, carrier coordination, renewal preparation and the questions that come up between renewal dates.',
  },
  contact: {
    eyebrow: 'Start with a conversation',
    heading: 'Let’s look at the risk behind the reservation.',
    text: 'Tell us a little about your property. We’ll follow up with a focused conversation: no generic pitch, no pressure.',
    direct: { label: 'Prefer email?', name: 'Eric Schirding', role: 'Hospitality Practice Leader', email: 'eschirding@uwib.com' },
  },
};

export const whyPage = {
  hero: {
    eyebrow: 'Why UWIB for boutique hotels',
    heading: 'Insurance advice that starts with the property, not the policy.',
    text: 'Independent hotels ask more of their insurance partner. We bring curiosity, continuity and practical risk thinking to the relationship.',
  },
  pointOfView: {
    eyebrow: 'Our point of view',
    heading: 'The best insurance conversations happen long before a claim or renewal deadline.',
    text: 'California expertise · Independent guidance · Responsive service',
  },
  intro: {
    heading: 'A specialist mindset without the specialist-language barrier.',
    text: 'You get an advisor who understands hospitality operations and explains insurance decisions plainly.',
  },
  points: [
    { number: '01', title: 'We learn the operation.', text: 'Guest flow, amenities, food and beverage, employees, contracts, renovations and growth plans.' },
    { number: '02', title: 'We make tradeoffs clear.', text: 'What each option protects, what it leaves exposed and why the difference matters.' },
    { number: '03', title: 'We stay useful all year.', text: 'Risk questions, contract reviews, claims conversations and operational changes do not wait for renewal.' },
    { number: '04', title: 'We advocate when it counts.', text: 'A claim is not a handoff. We help you navigate the process and keep the business context visible.' },
  ],
  stages: {
    eyebrow: 'From renewal to claim',
    heading: 'One advisor relationship across the moments that shape your risk.',
    items: [
      { number: '01', title: 'Discovery', text: 'Property, operations and priorities' },
      { number: '02', title: 'Program design', text: 'Options, gaps and clear tradeoffs' },
      { number: '03', title: 'Active service', text: 'Changes, contracts and questions' },
      { number: '04', title: 'Claims advocacy', text: 'Context, communication and follow-through' },
    ],
  },
  cta: { heading: 'See how this approach shapes a hotel insurance program.', label: 'Explore coverage →', href: HOTEL_PATHS.coverage },
};

export const coveragePage = {
  hero: {
    eyebrow: 'Boutique hotel coverage',
    heading: 'Connected coverage for a connected operation.',
    text: 'The goal is not more policies. It is fewer blind spots and a program that makes sense as one whole.',
  },
  jumpLabel: 'Jump to',
  includesLabel: 'Often includes',
  cta: {
    eyebrow: 'The right program is property-specific',
    heading: 'Let’s identify what belongs in yours, and what does not.',
    label: 'Request a coverage review →',
    href: `${HOTEL_PATHS.home}#contact`,
  },
};

/** The "California Hospitality Risk Brief" cover graphic (rendered in HTML, not an image). */
export const briefCover = {
  monogram: 'H',
  issue: 'ISSUE 01\nSEPT 2026',
  title: 'California\nHospitality\nRisk Brief',
  tagline: 'Practical risk management insights.',
  focusLabel: 'This month’s focus',
  focus: 'Preventing housekeeping injuries: a silent cost driver.',
};

export const libraryPage = {
  hero: {
    eyebrow: 'California Hospitality Risk Brief',
    heading: 'Practical ideas for safer, stronger hotel operations.',
    text: 'Short, useful guidance for owners, general managers and department leaders, grounded in the risks we see across hospitality.',
  },
  /** Old behaviour: submitting redirects to /hotels?email=<email>#contact (pre-fills the contact form). */
  newsletter: {
    eyebrow: 'Get the next issue',
    heading: 'One practical risk conversation each month.',
    label: 'Work email',
    placeholder: 'Work email',
    button: 'Subscribe →',
    action: `${HOTEL_PATHS.home}?email={email}#contact`,
  },
  featured: {
    slug: 'housekeeping-injuries',
    eyebrow: 'Featured issue · Employee well-being',
    text: 'Housekeeping is the backbone of every hotel experience. It is also one of the leading sources of worker injury and workers’ compensation pressure. Small process and equipment changes can make a measurable difference.',
    linkLabel: 'Read the full brief →',
  },
  topicsLabel: 'All topics',
  topics: ['Insurance awareness', 'Employee well-being', 'Operational excellence', 'Property & cyber security'],
  moreHeading: 'More from the brief',
  viewAll: { label: 'View all issues →', href: '#briefs' },
  cardLinkLabel: 'Read brief →',
  cta: {
    eyebrow: 'A question for your property?',
    heading: 'Turn the next risk brief into a conversation with an advisor.',
    label: 'Request a review →',
    href: `${HOTEL_PATHS.home}#contact`,
  },
};

export interface RiskBrief {
  slug: string;
  issue: string;
  category: string;
  label: string;
  date: string;
  readTime: string;
  title: string;
  description: string;
  introduction: string;
  lead: string;
  sections: { title: string; paragraphs: string[] }[];
  questions: string[];
  consider: string;
  outline: string[];
  checklistTitle: string;
  checklist: string[];
  cta: string;
}

/** Fixed labels on every risk-brief article (/hotels/risk-briefs/[slug]). */
export const briefArticle = {
  breadcrumbRoot: 'Risk Brief',
  issuePrefix: 'Issue',
  publication: 'California Hospitality Risk Brief',
  questionsLabel: 'Questions to ask',
  considerLabel: 'Question to consider',
  outlineLabel: 'In this brief',
  checklistLabel: 'Manager checklist',
  ctaEyebrow: 'Keep the conversation going',
  primaryCta: { label: 'Request a review →', href: `${HOTEL_PATHS.home}#contact` },
  secondaryCta: { label: 'Back to all briefs', href: HOTEL_PATHS.briefs },
};

export const briefDisclaimer =
  'This material is for general risk-management discussion and is not legal, medical or insurance coverage advice.';

export const briefs: RiskBrief[] = [
  {
    slug: 'housekeeping-injuries',
    issue: '01',
    category: 'Employee well-being',
    label: 'This month’s focus',
    date: 'September 2026',
    readTime: '7 minute read',
    title: 'Preventing housekeeping injuries: a silent cost driver.',
    description:
      'Small changes in process, training and equipment can support safer teams and reduce the operational disruption that follows an injury.',
    introduction:
      'Housekeeping is essential to the guest experience, but it is physically demanding work performed at speed across changing environments.',
    lead: 'Strains, sprains and overexertion can develop through repeated lifting, reaching, pushing and awkward postures. The effect extends beyond the individual injury: staffing pressure, overtime, training disruption and claim costs can follow.',
    sections: [
      {
        title: 'Look first at the work, not only the worker.',
        paragraphs: [
          'When the same discomfort appears across a team, the process deserves attention. Walk a representative room with the people doing the work. Observe bed making, bathroom cleaning, linen movement and cart handling without assuming the current method is fixed.',
        ],
      },
      {
        title: 'Three places to start.',
        paragraphs: [
          'Equipment: Review cart height, wheel condition, vacuum weight, long-handled tools and linen loads.',
          'Process: Break high-strain tasks into safer steps and rotate work where practical.',
          'Training: Make the preferred method visible, coach it consistently and invite feedback from the team.',
        ],
      },
      {
        title: 'Turn observations into a simple record.',
        paragraphs: [
          'Document what was reviewed, what changed, who owns the follow-up and when the team will revisit it. A short, repeatable review is more useful than a one-time safety campaign that disappears under operational pressure.',
        ],
      },
    ],
    questions: [
      'Which tasks require repeated reaching or twisting?',
      'Where do employees lift from floor level?',
      'Can carts move easily when fully loaded?',
      'Do time expectations encourage unsafe shortcuts?',
    ],
    consider: 'When were housekeeping procedures and equipment last evaluated for ergonomic risk?',
    outline: ['Look at the work', 'Questions to ask', 'Three places to start', 'Document the review', 'Manager checklist'],
    checklistTitle: 'A 30-minute housekeeping risk walk.',
    checklist: [
      'Invite a supervisor and one working housekeeper.',
      'Walk one standard room and one high-friction task.',
      'Choose one equipment and one process improvement.',
      'Assign ownership and a date to review the change.',
    ],
    cta: 'Discuss housekeeping risk with your UWIB advisor.',
  },
  {
    slug: 'ransomware-readiness',
    issue: '02',
    category: 'Property & cyber security',
    label: 'Property & cyber security',
    date: 'October 2026',
    readTime: '6 minute read',
    title: 'A practical ransomware readiness check for hotel operators.',
    description: 'Five questions to ask before an incident tests the property, the team and the guest experience.',
    introduction:
      'Hotels concentrate reservations, payments, guest data and connected operational systems. A ransomware event can quickly become a business-interruption event.',
    lead: 'Readiness is less about perfect prevention than a coordinated first response: clear roles, tested backups, accessible vendor contacts and a plan for serving guests while systems recover.',
    sections: [
      {
        title: 'Start with the systems that keep guests moving.',
        paragraphs: [
          'Map the property-management system, reservations, payments, door locks, phones, Wi-Fi and payroll. Identify which service must return first, who controls it and which outside vendor can respond after hours.',
        ],
      },
      {
        title: 'Make response roles unambiguous.',
        paragraphs: [
          'Name the incident lead, technology contact, operations decision-maker, communications owner and insurance contact. Store the list somewhere the team can reach without the hotel network.',
        ],
      },
      {
        title: 'Practice the first hour.',
        paragraphs: [
          'Run a short tabletop exercise: a reservation system is unavailable at 4 p.m. on a sold-out Friday. Walk through the first calls, guest communications, manual workarounds and escalation decisions. Record the gaps while they are visible.',
        ],
      },
    ],
    questions: [
      'What must be restored first?',
      'Who can take systems offline?',
      'Are backups isolated and tested?',
      'Which vendors respond after hours?',
      'How will the front desk operate manually?',
    ],
    consider: 'Could your team check in guests, issue keys and take payments if core systems were unavailable tomorrow?',
    outline: ['Map critical systems', 'Clarify response roles', 'Protect key contacts', 'Practice the first hour', 'Manager checklist'],
    checklistTitle: 'A 30-minute ransomware readiness huddle.',
    checklist: [
      'Confirm emergency technology and vendor contacts.',
      'Locate the cyber policy and incident-reporting numbers.',
      'Verify who owns backup testing and recovery decisions.',
      'Walk through a manual guest-service plan.',
    ],
    cta: 'Discuss cyber readiness with your UWIB advisor.',
  },
  {
    slug: 'renovation-season',
    issue: '03',
    category: 'Operational excellence',
    label: 'Operational excellence',
    date: 'November 2026',
    readTime: '7 minute read',
    title: 'Renovation season: protecting guests while work moves forward.',
    description: 'Contractor controls, communications and continuity planning for an occupied hotel.',
    introduction:
      'Renovation at an operating hotel blends construction risk with the guest experience. On a project schedule the two may appear separate; at the property, they share entrances, elevators, utilities and attention.',
    lead: 'The strongest controls establish clear boundaries, daily coordination and a communication plan that reaches the front desk before a guest discovers the disruption.',
    sections: [
      {
        title: 'Separate the work before it reaches the guest.',
        paragraphs: [
          'Review physical barriers, contractor access, dust and noise controls, emergency egress, deliveries and tool storage. Pay special attention to the route a curious guest or child might follow after the crew leaves.',
        ],
      },
      {
        title: 'Make the handoffs visible.',
        paragraphs: [
          'Use a brief daily coordination note shared among the property lead, general contractor and affected department heads. It should name the work area, expected noise, utility impacts, guest detours and the person authorized to stop work.',
        ],
      },
      {
        title: 'Plan for the day that does not go to plan.',
        paragraphs: [
          'Consider a water shutdown that runs long, an unexpected odor, an alarm-system interruption, a leak or an injury. Define who makes the call, how guests are moved or informed and when the insurer or emergency vendor enters the conversation.',
        ],
      },
    ],
    questions: [
      'Who controls contractor access?',
      'How are work zones secured after hours?',
      'Which guest paths or exits change?',
      'Who approves hot work or shutdowns?',
      'How are concerns escalated?',
    ],
    consider: 'If a guest walked toward the project area after hours, what would stop them before they reached the hazard?',
    outline: ['Separate the work', 'Control guest routes', 'Make handoffs visible', 'Plan for disruption', 'Manager checklist'],
    checklistTitle: 'A 30-minute renovation safety walk.',
    checklist: [
      'Walk the guest, employee and delivery routes.',
      'Check barriers, signage, lighting and after-hours security.',
      'Confirm permits for hot work and utility shutdowns.',
      'Review the next seven days with the front desk.',
    ],
    cta: 'Discuss renovation risk with your UWIB advisor.',
  },
  {
    slug: 'guest-amenities',
    issue: '04',
    category: 'Insurance awareness',
    label: 'Insurance awareness',
    date: 'December 2026',
    readTime: '6 minute read',
    title: 'When guest amenities change, does your coverage keep up?',
    description: 'A review prompt for bikes, spas, shuttles, events and every new experience added to the stay.',
    introduction:
      'Amenities help define a boutique property, but every new experience can add equipment, contracts, transportation, guest interaction or responsibilities outside the traditional room stay.',
    lead: 'Risk often changes between renewals. A small trial becomes a permanent offering, a vendor relationship evolves, or guests begin using an amenity differently than the property originally expected.',
    sections: [
      {
        title: 'Treat every new amenity as an operating change.',
        paragraphs: [
          'Before launch, clarify who owns and operates the amenity, how guests participate, which contracts or waivers apply, who maintains the equipment and whether specialized training or credentials are required.',
        ],
      },
      {
        title: 'Follow the guest beyond the room.',
        paragraphs: [
          'Bicycles, shuttles, rooftop events, pools, spas and off-site excursions can extend the property’s responsibilities. Review where the activity begins and ends, who supervises it and which party responds when something goes wrong.',
        ],
      },
      {
        title: 'Build an amenity-change trigger.',
        paragraphs: [
          'Create a short sign-off before a new experience is marketed or offered. Operations, finance and the insurance advisor should see the same description, vendor agreement and launch date while there is still time to adjust the plan.',
        ],
      },
    ],
    questions: [
      'Who owns and operates it?',
      'Is participation included or charged?',
      'What contracts or waivers apply?',
      'Who inspects and maintains equipment?',
      'Has the broker reviewed it before launch?',
    ],
    consider: 'Which guest amenities have been added, expanded or operated differently since the last policy renewal?',
    outline: ['Define the amenity', 'Clarify ownership', 'Follow the guest', 'Create a review trigger', 'Manager checklist'],
    checklistTitle: 'A 30-minute guest-amenity inventory.',
    checklist: [
      'List every amenity promoted to guests.',
      'Note who operates, maintains and supervises each one.',
      'Gather related vendor contracts and waivers.',
      'Flag changes that have not reached the insurance advisor.',
    ],
    cta: 'Discuss amenity changes with your UWIB advisor.',
  },
];
