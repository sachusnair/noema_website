/**
 * Single source of copy for the Noema site.
 * Components read from here and hold no literal strings of their own, so the
 * whole page can be re-written without opening a component file.
 */

/** Timestamps on the left time rail. They mark where in the overnight cycle
 *  each section sits, so they are content, not decoration.
 *  The hero has no mark: the rail runs past it unlabelled. */
export const railTimes = {
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

/* Third-party endpoints.
 *
 * Both are baked into the client bundle at build time and are visible to
 * anyone who views source, so neither is a secret and both are safe to keep
 * here. They are checked in as defaults rather than left to environment
 * variables alone: a host that has not had its variables configured would
 * otherwise silently ship a site with no contact form and demo buttons that
 * fall back to email, which is exactly what happened on the first deploy.
 *
 * Setting the environment variable still overrides the default, which is what
 * a staging build or a different Calendly link would use. */
export const integrations = {
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL ??
    "https://calendly.com/sachusnair-ai/30min",
  formEndpoint:
    process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "https://formspree.io/f/mgawagep",
} as const;

/* The nav points at pages rather than at anchors on a single page. The
   wordmark is the route home, so Home is not repeated as a link beside it. */
export const nav = {
  /* Pricing is parked while pre-launch. Its page lives at src/app/_pricing and
     its copy is still below under `pricing`; put the link back here to
     restore it. */
  links: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  cta: "Book a demo",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  home: "Home",
} as const;

export const hero = {
  eyebrow: "INTRODUCING",
  h1: "The superbrain of the company.",
  sub: "Noema is an AI-powered super employee that knows your business, uses your tools, and proactively gets things done.",
  primaryCta: "Book a demo",
} as const;

/* Email capture in the hero. Posts to the same form endpoint as the contact
   page, tagged so the two are distinguishable in one inbox rather than needing
   a second form to administer. */
export const waitlist = {
  label: "Your email",
  placeholder: "you@company.co.uk",
  submit: "Join waiting list",
  sending: "Joining",
  success: "You are on the list. We will be in touch before we open up.",
  error:
    "That did not send. Email sachu@noemabrain.com and we will add you by hand.",
  invalidEmail: "Enter an email address we can reach you on",
} as const;

/* The hero graphic: sources feeding one core overnight. */
export const overnightGraphic = {
  caption: "Every system, every signal, into one brief.",
  alt: "Xero, QuickBooks, Google Workspace, Stripe, Asana and HubSpot orbiting a single core that produces one brief at 08:00",
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
  /* The heading is split so the product name can be its own control: a signal
     arrives at it, it goes live, and pressing it opens the alert below. */
  h2Lead: "Noema",
  h2Rest: " runs your business while you focus on growing it.",
  body: "From emails and content to finances and business intelligence, Noema handles the work, connects the dots, and keeps everything moving 24/7. Not automation. Your business\u2019s AI brain.",
} as const;

/* The live alert behind the product name in the heading. Illustrative, like
   the brief card: there are no customers and therefore no real orders. The
   dialog says so at the foot, in the same terms as every other honesty line
   on the site. */
export const alert = {
  trigger: "Open the alert Noema raised",
  live: "1 alert",
  /* The notification that appears above the heading. Hovering it, or focusing
     it, opens the card: no click required. */
  toastTitle: "You have a notification",
  badge: "Fulfilment Risk Detected",
  headline:
    "312 orders are now at risk of missing tomorrow\u2019s dispatch cutoff.",
  detail:
    "The picking queue in Zone A is 38% above capacity, and the current staffing level won\u2019t clear the backlog before the carrier cutoff.",
  waitLabel: "If we wait",
  impact: [
    "312 orders at risk",
    "\u00a318,400 revenue exposure",
    "Likely increase in customer contacts",
  ],
  actionLabel: "Already done",
  action:
    "I\u2019ve already reallocated 2 warehouse staff from Zone B and adjusted the picking queue. The backlog should clear before cutoff.",
  ready: "Ready to apply.",
  primary: "Approve & Execute",
  secondary: "Review Changes",
  footnote:
    "Waiting could push these orders beyond today\u2019s recovery window.",
  close: "Close",
} as const;

/* Answers the objection a sceptical operator arrives with, before the page
   asks them for anything. */
export const adapts = {
  question: "Will it work for your business?",
  answer: "Absolutely.",
  body: "Noema adapts to your business—not the other way around. It learns how you work and builds around your workflows, whether you're solo, scaling a team, technical, or not.",
  ctaLabel: "See what Noema can handle",
  ctaHref: "/about",
} as const;

/* Replaces the chatbot comparison. Same job, a side by side, but told as one
   morning lived twice rather than as a feature list. */
export const difference = {
  eyebrow: "HERE\u2019S THE DIFFERENCE",
  h2: "Without Noema, your everyday starts with catching up.",
  before: {
    label: "Before",
    meta: "2 hours gone",
    items: [
      "You open your laptop. 47 unread emails. You start figuring out what needs your attention.",
      "You jump between inboxes, spreadsheets, dashboards and Slack trying to piece together what happened overnight.",
      "You check your payments. Then your bank. Then your sales numbers. Something doesn\u2019t add up. You start reconciling it yourself.",
      "You remember the LinkedIn post you meant to publish Friday. It\u2019s Monday already.",
      "A customer issue came in over the weekend. You flag it for later. Then another one arrives.",
      "By 11am, you\u2019re still catching up instead of moving the business forward.",
    ],
  },
  after: {
    label: "After",
    meta: "Running \u00b7 15 min",
    items: [
      {
        time: "7:30am",
        body: "Your morning brief is waiting. Overnight activity, priorities, risks and anything requiring your attention, already pulled together.",
      },
      {
        time: "8:00am",
        body: "Your emails are sorted. Routine replies are drafted in your voice. You approve the ones that need you.",
      },
      {
        time: "8:30am",
        body: "Your numbers are already reconciled. Revenue, payments, marketing spend and key business metrics, one view, no spreadsheet hunt.",
      },
      {
        time: "9:00am",
        body: "Your content is ready. Today\u2019s post is drafted, your latest campaign is prepared, and anything waiting for approval is clearly flagged.",
      },
      {
        time: "9:15am",
        body: "An operational issue appears. Noema has already identified the problem, prepared the fix and is waiting for your approval to execute.",
      },
      {
        time: "9:30am",
        body: "You start building. Noema keeps the business moving.",
      },
    ],
  },
  closing: [
    "You stop running after the business.",
    "Your business starts running with you.",
  ],
  ctaQuestion: "Want your everyday to look like this?",
  ctaLabel: "Get Noema",
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

/** A tool shown in the connections marquee. */
export type Tool = {
  name: string;
  /** simple-icons slug, where the brand has a mark in the set. */
  icon?: string;
  /** An official asset in /public, for brands with no mark in simple-icons.
   *  Takes precedence over `icon`. */
  file?: string;
  /** The brand's own colour. Omitted where no verified value was available,
   *  in which case the tile stays in the page palette. */
  brandColor?: string;
};

export const connections = {
  eyebrow: "CONNECTIONS",
  h2: "It reads the stack you already run.",
  sub: "Noema is built to connect to the tools UK businesses actually use. If yours is not here and it has an API, tell us and we will build it.",
  /* Each tile pairs the official brand mark with the wordmark. Marks come from
     simple-icons, except Outlook and Slack, whose official icons are held in
     /public/logos because both brands had theirs removed from that set at
     their own request. See public/logos/SOURCES.md for provenance.

     Dext, GoCardless and Monday still show the wordmark alone: Dext has no
     public asset, and the other two exist only as wide wordmarks that cannot
     read at 16px beside a text label. */
  rowA: [
    { name: "Xero", icon: "xero", brandColor: "#13B5EA" },
    { name: "Sage", icon: "sage", brandColor: "#00D639" },
    { name: "QuickBooks", icon: "quickbooks", brandColor: "#2CA01C" },
    { name: "Dext" },
    { name: "Stripe", icon: "stripe", brandColor: "#635BFF" },
    { name: "GoCardless" },
  ] satisfies Tool[],
  rowB: [
    { name: "Outlook", file: "/logos/outlook.svg" },
    { name: "Google Workspace", icon: "google", brandColor: "#4285F4" },
    { name: "Slack", file: "/logos/slack.svg" },
    { name: "WhatsApp Business", icon: "whatsapp", brandColor: "#25D366" },
    { name: "HubSpot", icon: "hubspot", brandColor: "#FF7A59" },
    { name: "Asana", icon: "asana", brandColor: "#F06A6A" },
    { name: "Monday" },
    { name: "Shopify", icon: "shopify", brandColor: "#7AB55C" },
  ] satisfies Tool[],
  /* Required pre-launch honesty line. Do not remove or soften. */
  honesty: "Connections are in build. Nothing above is live yet.",

  /* The model and tooling layer, kept in its own labelled row. These are not
     things a customer runs, so folding them into "the stack you already run"
     would make that sentence untrue. */
  builtOnLabel: "Built on",
  rowC: [
    { name: "OpenAI", file: "/chatgpt.png" },
    { name: "Claude", icon: "claude", brandColor: "#D97757" },
    { name: "Gemini", icon: "gemini", brandColor: "#8E75B2" },
    { name: "Cursor", icon: "cursor", brandColor: "#EDEDEA" },
    { name: "n8n", icon: "n8n", brandColor: "#EA4B71" },
    { name: "Model Context Protocol", icon: "mcp", brandColor: "#EDEDEA" },
  ] satisfies Tool[],
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

/* -------------------------------------------------------------------------
   Standalone pages
   ------------------------------------------------------------------------- */

/* About is assembled from copy already approved elsewhere on the site: the
   problem, what Noema is not, and the founder note. Nothing here is a new
   claim about the company, because there is no team, no office and no trading
   history to describe yet. Replace the prose freely; the shape will hold. */
export const about = {
  eyebrow: "ABOUT US",
  h1: "We are building the thing we kept needing.",
  intro:
    "Noema is a London company building an operations platform for UK businesses. It reads across the systems a business already runs and hands the person in charge a ranked set of decisions each morning.",
  sections: [
    {
      title: "What we do",
      body: [
        "Noema connects to the systems a business already runs, reads across all of them overnight, and produces one ranked brief for 08:00. Every item carries the reason it is there and the sources it came from.",
        "It is not a chat tool waiting for a question. It decides what is worth someone's attention before they ask, and it remembers what it told them last week.",
      ],
    },
    {
      title: "Why we are building it",
      body: [
        "Operations do not fail because the people are bad. They fail because nobody owns the system that joins the information together, so it gets done by hand, badly, by whoever has the least time.",
        "That job should belong to software. Noema is that owner. It does the gathering overnight so the morning starts with a decision instead of a search.",
      ],
    },
    {
      title: "Where we are",
      body: [
        "Noema is pre-launch. We are taking a small number of design partners and building the connections with them rather than guessing at what they need.",
        "That means there is no customer list to show you and no compliance badge we have earned yet. What there is, is a working walkthrough and a straight conversation about your operation.",
      ],
    },
  ],
  /* Required pre-launch honesty line. Do not remove or soften. */
  honesty:
    "We are pre-launch. No customers, no case studies, no certifications yet.",
} as const;

export const pricing = {
  eyebrow: "PRICING",
  h1: "Design partner pricing.",
  sub: "Noema is pre-launch. Rather than publish a price list we have not tested, we agree terms case by case with a small number of design partners.",
  tiers: [
    {
      name: "Design partner",
      price: "Agreed case by case",
      note: "Taking a small number now",
      featured: true,
      points: [
        "A working walkthrough of your own morning",
        "The connections you need, built with you",
        "Direct line to the person building it",
        "Terms agreed against your numbers, not a list price",
      ],
    },
    {
      name: "At launch",
      price: "Not set yet",
      note: "Priced when the product is live",
      featured: false,
      points: [
        "Per business, not per seat",
        "Scaled to the size of the operation",
        "Published here when we have set it",
        "Design partners keep their agreed terms",
      ],
    },
  ],
  /* Required pre-launch honesty line. Do not remove or soften. */
  honesty:
    "There are no numbers on this page because we have not set them yet. We are not going to invent a price list to look established.",
  ctaLabel: "Book a demo",
  faqTitle: "Questions about pricing",
  faq: [
    {
      q: "Why is there no price list?",
      a: "Because we would be guessing. We are pre-launch and agreeing terms with each design partner against what the work is actually worth to them.",
    },
    {
      q: "What does a design partner commit to?",
      a: "Time, mostly. You tell us how your morning runs, we build against it, and you tell us where we got it wrong.",
    },
    {
      q: "Will the price go up later?",
      a: "Design partners keep the terms they agreed. That is the point of coming in early.",
    },
  ],
} as const;

export const blog = {
  eyebrow: "BLOG",
  h1: "Notes from the build.",
  sub: "Occasional writing about operations, the overnight run, and what we are learning from design partners.",
  /* Shown when no posts have been published. It says the true thing rather
     than pretending the section is merely loading. */
  empty: "Nothing published yet. The first post is being written.",
  readMore: "Read",
  backLabel: "All posts",
} as const;

export const contact = {
  eyebrow: "CONTACT",
  h1: "Tell us about your morning.",
  sub: "Send a note and we will come back to you. If you would rather just book the walkthrough, the demo button does that directly.",
  emailLabel: "Email",
  locationLabel: "Where we are",
  form: {
    name: { label: "Your name", placeholder: "" },
    email: { label: "Email", placeholder: "" },
    company: { label: "Company", placeholder: "" },
    message: { label: "What would you like to tell us?", placeholder: "" },
    submit: "Send",
    sending: "Sending",
    success: "Thank you. We have your message and will come back to you.",
    error:
      "That did not send. Email sachu@noemabrain.com directly and we will pick it up.",
    required: "Required",
    invalidEmail: "Enter an email address we can reply to",
  },
} as const;

/** A social account in the footer.
 *
 *  `href` is null until the real profile URL is known. Entries without one are
 *  not rendered, so the footer never carries a link that goes nowhere. */
export type Social = {
  name: string;
  /** simple-icons slug. LinkedIn has no mark in the set, having been removed
   *  at the brand's request, so it falls back to a typographic badge. */
  icon?: string;
  badge?: string;
  href: string | null;
};

export const socials = {
  title: "Follow",
  items: [
    {
      name: "LinkedIn",
      badge: "in",
      /* Sachu's personal profile, standing in until the company page exists. */
      href: "https://www.linkedin.com/in/sachu-s-nair",
    },
    { name: "X", icon: "x", href: null },
    { name: "YouTube", icon: "youtube", href: null },
    { name: "Instagram", icon: "instagram", href: null },
  ] satisfies Social[],
} as const;

export const footer = {
  tagline: "The superbrain of the company.",
  email: "sachu@noemabrain.com",
  location: "London, United Kingdom",
  copyright: "© 2026 Noema",
  ctaLabel: "Book a demo",
  /* Grouped columns. Legal keeps its own heading rather than sitting loose in
     the bottom bar, which is where Privacy and Terms used to live. */
  columns: [
    {
      title: "Pages",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
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
