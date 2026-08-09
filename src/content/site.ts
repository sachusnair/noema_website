/**
 * Single source of copy for the Noema site.
 * Components read from here and hold no literal strings of their own, so the
 * whole page can be re-written without opening a component file.
 */

/** Timestamps on the left time rail. They mark where in the overnight cycle
 *  each section sits, so they are content, not decoration. */
export const railTimes = {
  hero: "22:00",
  problem: "01:00",
  notAChatbot: "04:00",
  theBrief: "06:30",
  howItWorks: "08:00",
} as const;

export const site = {
  name: "Noema",
  tagline: "The superbrain of the company.",
  email: "sachu@noemabrain.com",
  location: "London, United Kingdom",
  url: "https://noemabrain.com",
  title: "Noema — The superbrain of the company",
  description:
    "Noema reads your whole UK business overnight and hands you the decisions that matter at 08:00, ranked, with the reason attached.",
} as const;

export const nav = {
  links: [
    { label: "How it works", href: "#how-it-works" },
    { label: "Connections", href: "#connections" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: "Book a demo",
  menuOpen: "Open menu",
  menuClose: "Close menu",
} as const;

export const hero = {
  eyebrow: "NOEMA · LONDON · PRE-LAUNCH",
  h1: "The superbrain of the company.",
  sub: "Noema reads your whole business overnight. At 08:00 you get the decisions that matter, ranked, with the reason attached.",
  primaryCta: "Book a demo",
  secondaryCta: "See what 08:00 looks like",
  secondaryHref: "#the-brief",
} as const;

/* -------------------------------------------------------------------------
   The Morning Brief card
   ------------------------------------------------------------------------- */

export type BriefRow = {
  decision: string;
  why: string;
  sources: string[];
  /** Evidence trail revealed on hover in the large card. Mono source lines. */
  evidence: string[];
};

export const brief = {
  timeLabel: "08:00",
  /* Shown before hydration and with JavaScript off. The live weekday and date
     are read client-side in Europe/London, as specified. */
  weekdayFallback: "MONDAY",
  title: "Today's decisions",
  footer: "Read 1,847 items overnight · 3 need you",
  footerLarge: "Read 1,847 items overnight · 5 need you",
  whyLabel: "Why",
  evidenceLabel: "Evidence",
} as const;

/** Rows 1 to 3 render in the hero card. All five render in section 4. */
export const briefRows: BriefRow[] = [
  {
    decision: "Chase Halden Ltd — £14,200, 46 days overdue, third missed promise",
    why: "Payment terms are 30 days. Two chase emails unanswered since Tuesday.",
    sources: ["XERO", "OUTLOOK", "SLACK"],
    evidence: [
      "XERO · INV-2291 raised 24 JUN · terms 30 days · unpaid",
      "OUTLOOK · 2 chase emails sent 04 AUG, 06 AUG · no reply",
      "SLACK · #accounts · \"they said Friday again\" · 06 AUG",
    ],
  },
  {
    decision: "Job 4471 has slipped twice and the client has not been told",
    why: "Promised Thursday on the job sheet. Site notes say parts arrive Monday.",
    sources: ["ASANA", "OUTLOOK"],
    evidence: [
      "ASANA · job 4471 due date moved 29 JUL, 05 AUG",
      "OUTLOOK · last client update sent 22 JUL",
      "ASANA · site note \"parts ETA Monday\" · 07 AUG",
    ],
  },
  {
    decision: "Two engineers are booked against the same slot on Wednesday",
    why: "Both jobs need the same van. Neither has been re-planned since Friday.",
    sources: ["MONDAY", "GOOGLE"],
    evidence: [
      "MONDAY · jobs 4488 and 4502 both 08:00 WED",
      "GOOGLE · vehicle calendar shows one van available",
      "MONDAY · no owner change since 01 AUG",
    ],
  },
  {
    decision: "Supplier price on the Kelso order is 11 percent above the quote",
    why: "Quote was fixed in writing on 14 July. The invoice arrived last night.",
    sources: ["DEXT", "OUTLOOK"],
    evidence: [
      "DEXT · invoice K-8842 received 08 AUG · £9,310",
      "OUTLOOK · quote confirmed 14 JUL · £8,385",
      "DEXT · no credit note against this supplier this quarter",
    ],
  },
  {
    decision: "Your best paying client has not placed an order in five weeks",
    why: "They ordered every fortnight for eleven months. Nothing since 4 July.",
    sources: ["XERO", "HUBSPOT"],
    evidence: [
      "XERO · 22 orders across 11 months · last 04 JUL",
      "HUBSPOT · no logged contact since 27 JUN",
      "XERO · account represents 9 percent of revenue",
    ],
  },
];

/* -------------------------------------------------------------------------
   Sections
   ------------------------------------------------------------------------- */

export const problem = {
  eyebrow: "THE 08:00 PROBLEM",
  h2: "Your morning starts with a search.",
  columns: [
    "You open the accounting system, the inbox, the job sheet, two spreadsheets and a group chat. You message three people to find out what actually happened yesterday. By eleven you have a picture of the business. It is already out of date.",
    "Nothing here is broken. The information exists. It is just spread across nine places and nobody owns the job of putting it together. So the most expensive person in the building spends the sharpest part of their day assembling it by hand.",
  ],
  /* Framed as the questions the operator is actually asking. There is no
     customer data to draw on, so nothing here is presented as a statistic. */
  questions: [
    "Who is overdue?",
    "What slipped?",
    "What did we promise?",
    "What needs me today?",
  ],
} as const;

export const notAChatbot = {
  eyebrow: "WHAT NOEMA IS NOT",
  h2: "A chatbot waits to be asked. Noema has already looked.",
  left: {
    title: "A tool you query",
    points: [
      "You have to know the question",
      "You have to know where to look",
      "You get an answer",
      "It forgets by tomorrow",
    ],
  },
  right: {
    title: "A brief you receive",
    points: [
      "It reads everything on a schedule",
      "It decides what is worth your attention",
      "It explains why",
      "It remembers what it told you last week",
    ],
  },
} as const;

export const theBrief = {
  eyebrow: "WHAT ARRIVES",
  h2: "One page. Ranked. Reasoned.",
  support:
    "Ranked by what it costs you to ignore it, not by what arrived most recently.",
  hint: "Open a row to see the trail",
} as const;

export const howItWorks = {
  eyebrow: "THE OVERNIGHT RUN",
  h2: "Four steps, none of them yours.",
  steps: [
    {
      time: "22:00",
      title: "Connect once",
      body: "Noema reads the systems you already run. Read access, nothing written back without your say-so.",
    },
    {
      time: "01:00",
      title: "Read everything",
      body: "Invoices, inboxes, job sheets, messages, calendars. Every night, the whole picture, not a sample.",
    },
    {
      time: "04:00",
      title: "Work out what changed",
      body: "Not a summary of the day. A comparison against what you were promised and what you expected.",
    },
    {
      time: "08:00",
      title: "Hand it over",
      body: "A ranked brief in your inbox before you open your laptop. Five things, in order, with the reason attached.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------
   Step 01: the connector console
   ------------------------------------------------------------------------- */

export type Connector = {
  name: string;
  /** simple-icons slug for the official brand mark, where one exists.
   *  Slack, Outlook, Monday, GoCardless and Dext are deliberately absent from
   *  simple-icons, in some cases at the brand owner's own request, so those
   *  fall back to the letter mark below. */
  icon?: string;
  /** The brand's own colour, used for the mark. Values come from each
   *  brand's published palette (the icon-backed ones via simple-icons). The
   *  two fallbacks use a lighter tone from the same palette so they stay
   *  legible on carbon. */
  brandColor: string;
  /** Two-character fallback, set in the utility font. */
  mark: string;
  /** What Noema would read from this source. Written as capability, never as
   *  a finding, because there is no live connection to have found it in. */
  reads: string[];
};

export const connectorConsole = {
  step: "01",
  eyebrow: "STEP ONE",
  h2: "Noema learns your business from the systems you already run.",
  sub: "Connect once and it reads across all of them every night. Pick a system to see what it takes from each.",
  panelLabel: "WHAT NOEMA READS FROM",
  hint: "Select a system",
  /* Required pre-launch honesty line. Do not remove or soften. */
  honesty: "Illustrative. Connections are in build and nothing here is live yet.",
  connectors: [
    {
      name: "Xero",
      icon: "xero",
      brandColor: "#13B5EA",
      mark: "XR",
      reads: [
        "Invoices raised, paid, part paid and overdue",
        "Agreed payment terms against the date money actually arrived",
        "Accounts that used to pay on time and no longer do",
      ],
    },
    {
      name: "Outlook",
      brandColor: "#28A8EA",
      mark: "OL",
      reads: [
        "Promises made to clients and suppliers in email threads",
        "Chases you sent that nobody answered",
        "Updates you owe someone and have not sent",
      ],
    },
    {
      name: "Slack",
      brandColor: "#36C5F0",
      mark: "SL",
      reads: [
        "Decisions that were made in a channel and never written down",
        "Where a job quietly got stuck and who was waiting",
        "What somebody said they would do and by when",
      ],
    },
    {
      name: "Asana",
      icon: "asana",
      brandColor: "#F06A6A",
      mark: "AS",
      reads: [
        "Due dates that moved, how often, and in which direction",
        "Jobs sitting with no owner",
        "Work promised for this week that has not started",
      ],
    },
    {
      name: "Stripe",
      icon: "stripe",
      brandColor: "#635BFF",
      mark: "ST",
      reads: [
        "Payments that failed and were never retried",
        "Customers whose billing stopped without anyone noticing",
        "Revenue that was expected this month and has not landed",
      ],
    },
    {
      name: "Google Workspace",
      icon: "google",
      brandColor: "#4285F4",
      mark: "GW",
      reads: [
        "People and vehicles booked against the same slot",
        "Meetings that moved and the work that moved with them",
        "Calendars that disagree with the job sheet",
      ],
    },
  ] satisfies Connector[],
} as const;

export const connections = {
  eyebrow: "CONNECTIONS",
  h2: "It reads the stack you already run.",
  sub: "Noema is built to connect to the tools UK businesses actually use. If yours is not here and it has an API, tell us and we will build it.",
  /* Names are set in the utility font inside bordered tiles rather than using
     official brand logo files. That avoids trademark use and holds the
     palette, which brand colours would break. */
  rowA: ["Xero", "Sage", "QuickBooks", "Dext", "Stripe", "GoCardless"],
  rowB: [
    "Outlook",
    "Google Workspace",
    "Slack",
    "WhatsApp Business",
    "HubSpot",
    "Asana",
    "Monday",
    "Shopify",
  ],
  /* Required pre-launch honesty line. Do not remove or soften. */
  honesty: "Connections are in build. Nothing above is live yet.",
} as const;

/** Portrait and profile link are optional. While they are null the founder
 *  note renders exactly as it did without them: no broken image, no dead
 *  button. Fill them in and the layout picks them up. */
export type FounderPortrait = {
  /** Path under /public, e.g. "/founder.jpg" */
  src: string;
  alt: string;
  /** Intrinsic size, set explicitly so the image reserves its space and the
   *  page does not shift while it loads. */
  width: number;
  height: number;
};

export const founder = {
  eyebrow: "WHY THIS EXISTS",
  name: "Sachu S Nair",
  /* Nothing here is claimed beyond what the note itself says. Education,
     employers and dates are deliberately absent until they are supplied. */
  role: "Founder",
  /* Width and height are the file's real pixel size, so the circle reserves
     its space and the block cannot shift as the image loads. */
  portrait: {
    src: "/founderimage.jpeg",
    alt: "Sachu S Nair",
    width: 400,
    height: 400,
  } as FounderPortrait | null,
  linkedIn: "https://www.linkedin.com/in/sachu-s-nair",
  linkedInLabel: "More about Sachu",
  /** Opening line, set larger. Everything below it runs at reading size. */
  lead: "I'm Sachu, founder of Noema.",
  body: [
    "I spent ten years running operations, from airport ground handling to leading ops for a growing consultancy. Same problem everywhere: good people doing work that software should be doing.",
    "So I started building the software.",
    "I build AI automations that take the repetitive work off your team. Voice agents that book appointments. Support tickets that route and escalate themselves. Meeting notes that turn into tasks and client documents without anyone touching them.",
    "I build these inside a live business every day. Not demos. Systems that run.",
    /* Kept from the original note. Without it the section reads as a profile
       of someone who builds automations, with no line tying it back to what
       this page is actually selling. */
    "Noema is that thinking applied to the whole operation. It does the gathering overnight so the morning starts with a decision instead of a search.",
  ],
  signature: "SACHU S NAIR · OPERATIONS · LONDON",
} as const;

export const trust = {
  eyebrow: "YOUR DATA",
  h2: "Read-only by default.",
  /* Written as commitments. None of these is claimed as an audited or
     certified achievement, because none of them has been audited yet. */
  commitments: [
    "UK and EU data residency",
    "Read access unless you grant more",
    "Your data is never used to train models",
    "Delete everything on request, permanently",
  ],
  /* Required pre-launch honesty line. Do not remove or soften. */
  honesty:
    "We are pre-launch, so we are not going to show you a compliance badge we have not earned yet. Ask us anything on the call.",
} as const;

export type FaqItem = { q: string; a: string };

export const faq = {
  eyebrow: "FAQ",
  /* The brief gives no heading for this section. Kept deliberately plain so
     it adds no claim the pre-launch product cannot support. */
  h2: "Before you book.",
  items: [
    {
      q: "Is this live yet?",
      a: "No. Noema is pre-launch and we are taking a small number of design partners. A demo is a working walkthrough plus a conversation about your operation, not a sales pitch.",
    },
    {
      q: "Do I have to change how my team works?",
      a: "No. Noema reads the systems you already use. Nobody has to learn a new tool or log anything extra.",
    },
    {
      q: "How is this different from asking ChatGPT?",
      a: "A chat tool answers the question you thought to ask. Noema tells you the thing you did not know to ask about.",
    },
    {
      q: "Who is it for?",
      a: "UK businesses between roughly 20 and 250 staff, where one or two people are holding the whole operation in their head.",
    },
    {
      q: "What does it cost?",
      a: "Design partner pricing is agreed case by case while we are pre-launch. Bring your numbers to the call.",
    },
    {
      q: "What happens on the demo?",
      a: "Thirty minutes. We map your morning as it runs now, then show you what the 08:00 brief would look like for your business.",
    },
  ] satisfies FaqItem[],
} as const;

export const closing = {
  h2: "Get your mornings back.",
  sub: "Thirty minutes. We will map your current morning and show you the version where it is already done.",
  cta: "Book a demo",
} as const;

export const footer = {
  tagline: "The superbrain of the company.",
  email: "sachu@noemabrain.com",
  location: "London, United Kingdom",
  copyright: "© 2026 Noema",
  links: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;

export const legal = {
  privacy: {
    title: "Privacy",
    body: [
      "Noema is pre-launch. This page is a placeholder and will be replaced with a full privacy notice before the product is available.",
      "Today the only personal data we hold is what you send us directly: your name, your email address and anything you tell us on a demo call. We use it to reply to you and to arrange that call. We do not sell it and we do not share it with anyone else.",
      "We do not run analytics, advertising or tracking cookies on this site.",
      "To ask what we hold or to have it deleted, email sachu@noemabrain.com and we will action it.",
    ],
  },
  terms: {
    title: "Terms",
    body: [
      "Noema is pre-launch. This page is a placeholder and will be replaced with full terms before the product is available.",
      "This website is provided for information. Nothing on it is a contract, an offer or a guarantee of availability, pricing or features. The product described here is in build and the description may change.",
      "Booking a demo places you under no obligation. Any commercial arrangement with a design partner will be set out in a separate written agreement.",
      "Questions about any of this go to sachu@noemabrain.com.",
    ],
  },
  back: "Back to Noema",
} as const;
