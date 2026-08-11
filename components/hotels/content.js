export const HOTEL_PATHS = {
  home: "/hotels",
  why: "/hotels/why-uwib",
  coverage: "/hotels/coverage",
  briefs: "/hotels/risk-briefs",
  housekeeping: "/hotels/risk-briefs/housekeeping-injuries",
  ransomware: "/hotels/risk-briefs/ransomware-readiness",
  renovation: "/hotels/risk-briefs/renovation-season",
  amenities: "/hotels/risk-briefs/guest-amenities",
};

export const COVERAGE_AREAS = [
  {
    number: "01",
    id: "property",
    title: "Property & business income",
    summary: "Protect the physical place and the revenue stream that depends on it.",
    includes: [
      "Buildings and contents",
      "Business income & extra expense",
      "Ordinance and law",
      "Equipment breakdown",
    ],
  },
  {
    number: "02",
    id: "liability",
    title: "General & liquor liability",
    summary:
      "Address the guest-facing exposures created by amenities, events, food and beverage.",
    includes: [
      "Premises and operations",
      "Liquor liability",
      "Innkeeper’s liability",
      "Umbrella / excess",
    ],
  },
  {
    number: "03",
    id: "workers-comp",
    title: "Workers’ compensation",
    summary:
      "Pair statutory protection with attention to the injuries and processes driving cost.",
    includes: [
      "Employee injury coverage",
      "Housekeeping ergonomics",
      "Return-to-work planning",
      "Claims review",
    ],
  },
  {
    number: "04",
    id: "cyber",
    title: "Cyber & privacy",
    summary:
      "Prepare for the operational and reputational impact of a guest-data or payment-system event.",
    includes: [
      "Data breach response",
      "Business interruption",
      "Social engineering",
      "Ransomware and recovery",
    ],
    dark: true,
  },
  {
    number: "05",
    id: "management-risk",
    title: "Management & employment risk",
    summary:
      "Protect the decisions and relationships behind the property, not only its physical assets.",
    includes: [
      "Employment practices liability",
      "Directors & officers",
      "Crime / fidelity",
      "Fiduciary liability",
    ],
  },
];

export const BRIEFS = {
  "housekeeping-injuries": {
    slug: "housekeeping-injuries",
    path: HOTEL_PATHS.housekeeping,
    issue: "01",
    category: "Employee well-being",
    label: "This month’s focus",
    date: "September 2026",
    readTime: "7 minute read",
    title: "Preventing housekeeping injuries: a silent cost driver.",
    description:
      "Small changes in process, training and equipment can support safer teams and reduce the operational disruption that follows an injury.",
    introduction:
      "Housekeeping is essential to the guest experience, but it is physically demanding work performed at speed across changing environments.",
    lead:
      "Strains, sprains and overexertion can develop through repeated lifting, reaching, pushing and awkward postures. The effect extends beyond the individual injury: staffing pressure, overtime, training disruption and claim costs can follow.",
    sections: [
      {
        title: "Look first at the work, not only the worker.",
        body: "When the same discomfort appears across a team, the process deserves attention. Walk a representative room with the people doing the work. Observe bed making, bathroom cleaning, linen movement and cart handling without assuming the current method is fixed.",
      },
      {
        title: "Three places to start.",
        paragraphs: [
          "Equipment: Review cart height, wheel condition, vacuum weight, long-handled tools and linen loads.",
          "Process: Break high-strain tasks into safer steps and rotate work where practical.",
          "Training: Make the preferred method visible, coach it consistently and invite feedback from the team.",
        ],
      },
      {
        title: "Turn observations into a simple record.",
        body: "Document what was reviewed, what changed, who owns the follow-up and when the team will revisit it. A short, repeatable review is more useful than a one-time safety campaign that disappears under operational pressure.",
      },
    ],
    questions: [
      "Which tasks require repeated reaching or twisting?",
      "Where do employees lift from floor level?",
      "Can carts move easily when fully loaded?",
      "Do time expectations encourage unsafe shortcuts?",
    ],
    consider:
      "When were housekeeping procedures and equipment last evaluated for ergonomic risk?",
    outline: [
      "Look at the work",
      "Questions to ask",
      "Three places to start",
      "Document the review",
      "Manager checklist",
    ],
    checklistTitle: "A 30-minute housekeeping risk walk.",
    checklist: [
      "Invite a supervisor and one working housekeeper.",
      "Walk one standard room and one high-friction task.",
      "Choose one equipment and one process improvement.",
      "Assign ownership and a date to review the change.",
    ],
    cta: "Discuss housekeeping risk with your UWIB advisor.",
  },
  "ransomware-readiness": {
    slug: "ransomware-readiness",
    path: HOTEL_PATHS.ransomware,
    issue: "02",
    category: "Property & cyber security",
    label: "Property & cyber security",
    date: "October 2026",
    readTime: "6 minute read",
    title: "A practical ransomware readiness check for hotel operators.",
    description:
      "Five questions to ask before an incident tests the property, the team and the guest experience.",
    introduction:
      "Hotels concentrate reservations, payments, guest data and connected operational systems. A ransomware event can quickly become a business-interruption event.",
    lead:
      "Readiness is less about perfect prevention than a coordinated first response: clear roles, tested backups, accessible vendor contacts and a plan for serving guests while systems recover.",
    sections: [
      {
        title: "Start with the systems that keep guests moving.",
        body: "Map the property-management system, reservations, payments, door locks, phones, Wi-Fi and payroll. Identify which service must return first, who controls it and which outside vendor can respond after hours.",
      },
      {
        title: "Make response roles unambiguous.",
        body: "Name the incident lead, technology contact, operations decision-maker, communications owner and insurance contact. Store the list somewhere the team can reach without the hotel network.",
      },
      {
        title: "Practice the first hour.",
        body: "Run a short tabletop exercise: a reservation system is unavailable at 4 p.m. on a sold-out Friday. Walk through the first calls, guest communications, manual workarounds and escalation decisions. Record the gaps while they are visible.",
      },
    ],
    questions: [
      "What must be restored first?",
      "Who can take systems offline?",
      "Are backups isolated and tested?",
      "Which vendors respond after hours?",
      "How will the front desk operate manually?",
    ],
    consider:
      "Could your team check in guests, issue keys and take payments if core systems were unavailable tomorrow?",
    outline: [
      "Map critical systems",
      "Clarify response roles",
      "Protect key contacts",
      "Practice the first hour",
      "Manager checklist",
    ],
    checklistTitle: "A 30-minute ransomware readiness huddle.",
    checklist: [
      "Confirm emergency technology and vendor contacts.",
      "Locate the cyber policy and incident-reporting numbers.",
      "Verify who owns backup testing and recovery decisions.",
      "Walk through a manual guest-service plan.",
    ],
    cta: "Discuss cyber readiness with your UWIB advisor.",
  },
  "renovation-season": {
    slug: "renovation-season",
    path: HOTEL_PATHS.renovation,
    issue: "03",
    category: "Operational excellence",
    label: "Operational excellence",
    date: "November 2026",
    readTime: "7 minute read",
    title: "Renovation season: protecting guests while work moves forward.",
    description:
      "Contractor controls, communications and continuity planning for an occupied hotel.",
    introduction:
      "Renovation at an operating hotel blends construction risk with the guest experience. On a project schedule the two may appear separate; at the property, they share entrances, elevators, utilities and attention.",
    lead:
      "The strongest controls establish clear boundaries, daily coordination and a communication plan that reaches the front desk before a guest discovers the disruption.",
    sections: [
      {
        title: "Separate the work before it reaches the guest.",
        body: "Review physical barriers, contractor access, dust and noise controls, emergency egress, deliveries and tool storage. Pay special attention to the route a curious guest or child might follow after the crew leaves.",
      },
      {
        title: "Make the handoffs visible.",
        body: "Use a brief daily coordination note shared among the property lead, general contractor and affected department heads. It should name the work area, expected noise, utility impacts, guest detours and the person authorized to stop work.",
      },
      {
        title: "Plan for the day that does not go to plan.",
        body: "Consider a water shutdown that runs long, an unexpected odor, an alarm-system interruption, a leak or an injury. Define who makes the call, how guests are moved or informed and when the insurer or emergency vendor enters the conversation.",
      },
    ],
    questions: [
      "Who controls contractor access?",
      "How are work zones secured after hours?",
      "Which guest paths or exits change?",
      "Who approves hot work or shutdowns?",
      "How are concerns escalated?",
    ],
    consider:
      "If a guest walked toward the project area after hours, what would stop them before they reached the hazard?",
    outline: [
      "Separate the work",
      "Control guest routes",
      "Make handoffs visible",
      "Plan for disruption",
      "Manager checklist",
    ],
    checklistTitle: "A 30-minute renovation safety walk.",
    checklist: [
      "Walk the guest, employee and delivery routes.",
      "Check barriers, signage, lighting and after-hours security.",
      "Confirm permits for hot work and utility shutdowns.",
      "Review the next seven days with the front desk.",
    ],
    cta: "Discuss renovation risk with your UWIB advisor.",
  },
  "guest-amenities": {
    slug: "guest-amenities",
    path: HOTEL_PATHS.amenities,
    issue: "04",
    category: "Insurance awareness",
    label: "Insurance awareness",
    date: "December 2026",
    readTime: "6 minute read",
    title: "When guest amenities change, does your coverage keep up?",
    description:
      "A review prompt for bikes, spas, shuttles, events and every new experience added to the stay.",
    introduction:
      "Amenities help define a boutique property, but every new experience can add equipment, contracts, transportation, guest interaction or responsibilities outside the traditional room stay.",
    lead:
      "Risk often changes between renewals. A small trial becomes a permanent offering, a vendor relationship evolves, or guests begin using an amenity differently than the property originally expected.",
    sections: [
      {
        title: "Treat every new amenity as an operating change.",
        body: "Before launch, clarify who owns and operates the amenity, how guests participate, which contracts or waivers apply, who maintains the equipment and whether specialized training or credentials are required.",
      },
      {
        title: "Follow the guest beyond the room.",
        body: "Bicycles, shuttles, rooftop events, pools, spas and off-site excursions can extend the property’s responsibilities. Review where the activity begins and ends, who supervises it and which party responds when something goes wrong.",
      },
      {
        title: "Build an amenity-change trigger.",
        body: "Create a short sign-off before a new experience is marketed or offered. Operations, finance and the insurance advisor should see the same description, vendor agreement and launch date while there is still time to adjust the plan.",
      },
    ],
    questions: [
      "Who owns and operates it?",
      "Is participation included or charged?",
      "What contracts or waivers apply?",
      "Who inspects and maintains equipment?",
      "Has the broker reviewed it before launch?",
    ],
    consider:
      "Which guest amenities have been added, expanded or operated differently since the last policy renewal?",
    outline: [
      "Define the amenity",
      "Clarify ownership",
      "Follow the guest",
      "Create a review trigger",
      "Manager checklist",
    ],
    checklistTitle: "A 30-minute guest-amenity inventory.",
    checklist: [
      "List every amenity promoted to guests.",
      "Note who operates, maintains and supervises each one.",
      "Gather related vendor contracts and waivers.",
      "Flag changes that have not reached the insurance advisor.",
    ],
    cta: "Discuss amenity changes with your UWIB advisor.",
  },
};

export const BRIEF_LIST = Object.values(BRIEFS);

export const TEAM = [
  {
    name: "Stephanie Fregosi",
    role: "Client Services Manager",
    image: "/hotels/team/stephanie-fregosi.png",
  },
  {
    name: "Crystal van Eekhout",
    role: "Commercial Account Manager",
    image: "/hotels/team/crystal-van-eekhout.jpg",
  },
  {
    name: "Christa Ritner",
    role: "Senior Account Manager",
    image: "/hotels/team/christa-ritner.jpg",
  },
];
