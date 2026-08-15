/**
 * Single source of copy for the Noema site.
 * Components read from here and hold no literal strings of their own, so the
 * whole page can be re-written without opening a component file.
 */

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
  /* The chat widget's endpoint: the Cloudflare Worker in /worker, which holds
     the Anthropic key server-side. Empty until that Worker is deployed, and
     the widget renders nothing while it is empty, so a half-finished chat
     never ships. Paste the workers.dev URL (or a custom domain) here. */
  chatEndpoint: process.env.NEXT_PUBLIC_CHAT_ENDPOINT ?? "",
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

/* Steps two and three, following the connector console.

   Modelled on a reference the client supplied, which was a competitor's page.
   The structure is theirs: a numbered step, a headline, a panel demonstrating
   it. The words are not. Theirs talked about a "company brain" and "your
   agents", which are a step from second brain and agentic, both on this
   site's banned list, and both aimed at engineers building with an API rather
   than at an operations manager. */
export const stepTwo = {
  step: "02",
  eyebrow: "STEP TWO",
  h2: "It keeps one version of the truth, even when your systems disagree.",
  sub: "The invoice says one thing, the quote says another, and nobody notices until someone reconciles it by hand. Noema does that overnight and tells you which one is right.",
  panelLabel: "RECONCILING",
  conflictLabel: "Disagreement found",
  claims: [
    { source: "DEXT", line: "Invoice K-8842 received 08 AUG", value: "\u00a39,310" },
    { source: "OUTLOOK", line: "Quote confirmed in writing 14 JUL", value: "\u00a38,385" },
  ],
  resolvedLabel: "One version",
  resolution: "The Kelso order is \u00a3925 above the quote you agreed. The quote was fixed in writing, so the invoice is wrong.",
  honesty: "Illustrative. Connections are in build and nothing here is live yet.",
} as const;

export const stepThree = {
  step: "03",
  eyebrow: "STEP THREE",
  h2: "It writes the reply in your voice, ready before you are.",
  sub: "Noema drafts the routine answers the way you write them, shows you exactly what it changed, and waits for your approval before anything is sent.",
  channel: "OUTLOOK",
  status: "Reply drafted",
  fromLabel: "From",
  from: "Marie Dobson \u00b7 Halden Ltd",
  incoming:
    "Sorry for the delay on this. Could you resend the invoice and confirm what is outstanding?",
  draftLabel: "Drafted for you",
  /* kept: written as you would. cut: the padding it removed. added: the
     specifics it pulled from your own systems. */
  draft: [
    { text: "Hi Marie, ", kind: "kept" },
    { text: "I hope this email finds you well. ", kind: "cut" },
    { text: "no problem. ", kind: "kept" },
    { text: "Invoice INV-2291 is attached again, ", kind: "added" },
    { text: "\u00a314,200, raised 24 June on 30 day terms. ", kind: "added" },
    { text: "Please let me know if you have any further questions. ", kind: "cut" },
    { text: "That is the full balance outstanding. ", kind: "added" },
    { text: "Can you confirm a payment date?", kind: "kept" },
  ],
  ready: "Ready to send",
  primary: "Approve & send",
  secondary: "Edit first",
  footnote: "Nothing is sent until you approve it.",
} as const;

export const connections = {
  eyebrow: "CONNECTIONS",
  h2: "It connects with the tools your business already uses.",
  sub: "Noema is built to work with the tools you rely on every day. If your tool isn't supported yet but has an API, tell us — we'll build the connection.",
  /* Each tile pairs the official brand mark with the wordmark. Marks come from
     simple-icons, except Outlook, Slack, GoCardless and Monday, whose icons
     are held in /public/logos because none of the four are in that set. See
     public/logos/SOURCES.md for provenance and the trademark position.

     Every tile here carries a mark. Dext was dropped from the row rather than
     shown bare: its logo is the word itself, with no square mark that reads at
     16px. Adding a tool back without one puts that odd tile out again. */
  rowA: [
    { name: "Xero", icon: "xero", brandColor: "#13B5EA" },
    { name: "Sage", icon: "sage", brandColor: "#00D639" },
    { name: "QuickBooks", icon: "quickbooks", brandColor: "#2CA01C" },
    { name: "Stripe", icon: "stripe", brandColor: "#635BFF" },
    { name: "GoCardless", file: "/logos/gocardless.svg" },
  ] satisfies Tool[],
  rowB: [
    { name: "Outlook", file: "/logos/outlook.svg" },
    { name: "Google Workspace", icon: "google", brandColor: "#4285F4" },
    { name: "Slack", file: "/logos/slack.svg" },
    { name: "WhatsApp Business", icon: "whatsapp", brandColor: "#25D366" },
    { name: "HubSpot", icon: "hubspot", brandColor: "#FF7A59" },
    { name: "Asana", icon: "asana", brandColor: "#F06A6A" },
    { name: "Monday", file: "/logos/monday.png" },
    { name: "Shopify", icon: "shopify", brandColor: "#7AB55C" },
  ] satisfies Tool[],
  /* The model and tooling layer. It carried a "Built on" label that set it
     apart from the two rows above, because these are what Noema is built on
     rather than tools a customer already runs. The label was dropped on the
     client's instruction and the row now sits with the others, under a heading
     that says these are the tools your business already uses. */
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

/* The chat widget. Every string it can show lives here, including the two it
   shows when something breaks, so the failure states read like the rest of the
   site rather than like a stack trace.

   `note` is a required honesty line. The assistant is a language model
   answering from a system prompt, it has no account data and no access to
   anything a visitor has, and it is answering for a product that is not live.
   Saying so under the transcript is what keeps the widget from implying
   otherwise. Do not remove or soften it. */
export const chat = {
  launch: "Ask Noema",
  title: "Ask Noema",
  close: "Close",
  /* Shown once, before the visitor has typed anything. It sets the boundary
     of what the thing can do rather than inviting open-ended chat. */
  greeting:
    "Ask what Noema does, what it connects to, or how the pre-launch waiting list works. For anything about your own business, book a demo.",
  placeholder: "Ask a question",
  send: "Send",
  sending: "Sending",
  youLabel: "YOU",
  agentLabel: "NOEMA",
  note: "An AI assistant, answering from a brief. It can be wrong, it knows nothing about you, and nothing it says is a commitment. Noema is pre-launch.",
  /* Two failure modes worth telling apart: the endpoint answered with an
     error, or it could not be reached at all. */
  error: "That did not go through. Try again, or use the contact form.",
  offline: "The assistant is not reachable right now. The contact form still works.",
} as const;

export const socials = {
  title: "Follow",
  items: [
    {
      name: "LinkedIn",
      badge: "in",
      href: "https://www.linkedin.com/company/noemabrain",
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
  /* The footer carried a third "Book a demo" button, directly under the one in
     the closing section. Removed on the client's instruction; the closing
     section and the nav still carry one each. */
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
        { label: "Security", href: "/security" },
      ],
    },
  ],
} as const;

/** The registered facts a data controller has to publish. Every one of these
 *  is a real-world fact nobody can invent: the pages render each line only
 *  when it is filled in, so an unfilled value is an absent line rather than a
 *  wrong one.
 *
 *  All four are empty on purpose. Noema is not incorporated yet — that happens
 *  after endorsement — so until then the privacy notice names Sachu as the
 *  controller in his own right, which is what UK GDPR Article 13(1)(a) asks of
 *  a sole trader. Fill these in when the company exists and the lines appear
 *  on all three legal pages; the "who is responsible" paragraph in the privacy
 *  notice and the intro to the terms both need their wording updated at the
 *  same time, because both currently say there is no company. */
export const company = {
  /** Registered name, e.g. "Noema Technologies Ltd". Empty until incorporated. */
  legalName: "",
  /** Companies House number. */
  companyNumber: "",
  /** Registered office address, one line. */
  registeredAddress: "",
  /** ICO data protection register entry, e.g. "ZB123456". A controller
   *  processing personal data by automated means generally has to pay the
   *  ICO's data protection fee and appear on the register. */
  icoRegistration: "",
} as const;

export type LegalSection = { heading: string; body: readonly string[] };

export const legal = {
  /* Both notices carry a date. An undated policy reads as unmaintained, and
     it is the field a reviewer checks to see whether the page kept up with
     the product. Update it whenever the text below changes. */
  updated: "16 August 2026",
  updatedLabel: "Last updated",
  privacy: {
    title: "Privacy",
    intro:
      "This notice covers this website. Noema is pre-launch, so no customer business data is processed yet; when the product is available, processing for customers will be governed by a separate agreement rather than by this page.",
    sections: [
      {
        heading: "Who is responsible",
        body: [
          "Noema is not yet incorporated. It is the working name of a project by Sachu S Nair, based in London, and until a company exists Sachu is the data controller for the personal data described here. This notice will be updated with the registered company details, and with an entry on the Information Commissioner's register, once there is a company to register.",
          "Questions, requests and complaints all go to sachu@noemabrain.com and are answered by Sachu directly.",
        ],
      },
      {
        heading: "What we collect, and why",
        body: [
          "The contact form collects your name, email address, company name and your message, so that we can reply. The waiting list collects your email address alone, so that we can tell you when Noema is available. Booking a demo collects your name, email address and the time you choose.",
          "The assistant in the corner of the site sends what you type in it, and the reply, to the model provider named below in order to answer you. Do not put confidential information or personal data about other people into it.",
          "Our host records standard server logs, including IP addresses, as part of serving the site. We do not run analytics, advertising, or tracking of any kind, and we do not build a profile of you.",
        ],
      },
      {
        heading: "Our lawful basis",
        body: [
          "For replying to an enquiry and arranging a demo, our basis is legitimate interests: you contacted us and expect an answer. For the waiting list, it is your consent, which you can withdraw at any time by replying to any message or emailing us. For server logs, it is our legitimate interest in operating and securing the site.",
        ],
      },
      {
        heading: "Who else handles it",
        body: [
          "We use a small number of suppliers to run the site. They act on our instructions and each one sees only what its job requires: Formspree, which delivers contact form and waiting list submissions to us; Calendly, which handles demo bookings and only loads if you press the booking button; Anthropic, which answers the assistant; and Hostinger, which hosts the site.",
          "We do not sell personal data, we do not share it for advertising, and no one outside that list receives it unless the law requires it.",
        ],
      },
      {
        heading: "Where it goes",
        body: [
          "Formspree, Calendly and Anthropic are based in the United States, so using them transfers personal data outside the United Kingdom. Those transfers rely on the transfer terms in each supplier's data processing agreement, which use the UK's International Data Transfer Addendum or the equivalent standard contractual clauses.",
        ],
      },
      {
        heading: "How long we keep it",
        body: [
          "Enquiries are kept for two years from our last exchange, so that we have the context if you come back to us. Waiting list addresses are kept until you ask to come off the list or until we tell you Noema is available and you do not take it up. Assistant conversations are not stored by us: they exist only in your browser for the length of the conversation and are gone when you close the page.",
        ],
      },
      {
        heading: "Cookies",
        body: [
          "This site sets no cookies of its own, and there are no analytics, advertising or tracking cookies. If you open the demo booking, Calendly sets its own cookies inside its booking window; that only happens if you press the button.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You can ask us for a copy of the personal data we hold about you, ask us to correct it, ask us to delete it, ask us to restrict what we do with it, object to our using it, or ask for it in a portable form. Where we rely on consent you can withdraw it at any time. Email sachu@noemabrain.com and we will action it within one month.",
          "If you think we have handled your data badly, please tell us first so we can put it right. You also have the right to complain to the Information Commissioner's Office at ico.org.uk, or on 0303 123 1113.",
        ],
      },
    ] satisfies LegalSection[],
  },
  terms: {
    title: "Terms",
    intro:
      "These terms cover your use of this website. “We” means Sachu S Nair, trading as Noema, based in London; Noema is not yet incorporated, and these terms will be updated with the registered company details once it is. They are not the terms of the product: any commercial arrangement will be set out in a separate written agreement.",
    sections: [
      {
        heading: "What this site is",
        body: [
          "This website is published for information. Noema is in build and nothing here is an offer, a contract, or a promise that a feature, an integration, a price or a date will arrive. The panels shown on the home page contain illustrative example data, not real results. Booking a demo or joining the waiting list places you under no obligation and costs you nothing.",
        ],
      },
      {
        heading: "The assistant",
        body: [
          "The assistant in the corner of the site is an AI model answering from a written brief. It can be wrong, it has no access to your business or your account, and it cannot commit us to anything. Nothing it says is professional, legal, financial or technical advice, and nothing it says overrides these terms or the privacy notice. Do not enter confidential information or personal data about other people into it.",
        ],
      },
      {
        heading: "Using it fairly",
        body: [
          "Please do not attempt to break, overload, scrape or gain unauthorised access to this site or the assistant, use it to send unlawful or abusive content, or use automated means to make requests at volume. We may withdraw access to the assistant, or to the site, if it is being misused.",
        ],
      },
      {
        heading: "Who owns what",
        body: [
          "The text, design and code of this site belong to us. The product and company names and logos shown on the site belong to their respective owners and appear only to identify the tools Noema is built to work with; their appearance implies no partnership, endorsement or affiliation.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "The site is provided as it is. We do not promise it will be available without interruption or free of errors, and to the extent the law allows we are not liable for loss arising from relying on anything published here. Nothing in these terms limits liability for death or personal injury caused by negligence, for fraud, or for anything else that cannot lawfully be limited.",
        ],
      },
      {
        heading: "Changes, and the law that applies",
        body: [
          "We may update this site and these terms; the date above shows when they last changed. These terms and any dispute arising from them are governed by the law of England and Wales, and the courts of England and Wales have exclusive jurisdiction.",
          "Questions about any of this go to sachu@noemabrain.com.",
        ],
      },
    ] satisfies LegalSection[],
  },
  /* Restores the ground the removed Trust section used to cover. Everything in
     the first two sections is a statement about how the site works today and
     is verifiable from the code. The third section is deliberately written as
     commitments in the future tense, because there are no customers and so no
     practice to describe yet — do not rewrite them into the present tense. */
  security: {
    title: "Security and data",
    intro:
      "Noema is pre-launch. No customer business data is processed, no system is connected to anything, and there is no product to secure yet. This page says what is true today and what we are committing to before any customer data is touched.",
    sections: [
      {
        heading: "This website today",
        body: [
          "The site is a set of static files served over HTTPS. It runs no database, stores nothing about you, and sets no cookies of its own. There is no analytics, no advertising and no tracking on any page.",
          "Form submissions go to Formspree and demo bookings to Calendly, and both reach us as email. The assistant is answered by a small endpoint we run; the API key it uses is held server-side and never reaches your browser, conversations are not stored, and message length, conversation length and request rate are all capped.",
        ],
      },
      {
        heading: "What Noema will connect to",
        body: [
          "The integrations described on the home page are in build. Nothing is connected to any live business system today, and the figures shown in the product panels are illustrative examples rather than real data from anyone.",
        ],
      },
      {
        heading: "What we will commit to before any customer data",
        body: [
          "Read-only access wherever the work allows it, and a person approving anything that leaves the business. Customer data held in the United Kingdom or the European Economic Area. Customer data never used to train models. Deletion on request, and export of what we hold. A written data processing agreement, and a published list of the suppliers involved, before any customer is onboarded.",
          "These are commitments about how Noema will be built, not a description of controls already in place or of any certification held. We hold no security certification today and do not claim one.",
        ],
      },
      {
        heading: "Reporting something",
        body: [
          "If you find a security problem with this site or the assistant, email sachu@noemabrain.com with enough detail to reproduce it. We will confirm we have received it and tell you what we have done.",
        ],
      },
    ] satisfies LegalSection[],
  },
  back: "Back to Noema",
} as const;
