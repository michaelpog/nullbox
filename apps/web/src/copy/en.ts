import type { Category } from "../api/generated/Category";
import type { ErrorCode } from "../api/generated/ErrorCode";
import type { PreferredTime } from "../api/generated/PreferredTime";
import type { Severity } from "../api/generated/Severity";
import type { TicketStatus } from "../api/generated/TicketStatus";

/**
 * English copy. This object defines the `Copy` type: every other dictionary
 * (ja.ts, and later Pirate, Corporate Speak or "Serious Mode") must match it.
 * Interpolation is done with functions, e.g. `openCount(3)`.
 */
const en = {
  app: {
    name: "Osaka Handy Helpers",
    subtitle: "Fixed, eventually. Probably.",
    nav: {
      submit: "Report a problem",
      myTickets: "My tickets",
      details: "My details",
      inbox: "Handyman inbox",
      login: "Log in",
    },
    language: "Language",
    footer: "No pipes were harmed in the making of this website.",
  },

  status: {
    open: "Waiting for a handyman",
    in_progress: "Accepted",
    waiting_on_customer: "Waiting on you",
    resolved: "Fixed",
    closed: "Done and dusted",
  } satisfies Record<TicketStatus, string>,

  severity: {
    p1: "Everything is on fire (not literally)",
    p2: "The water is winning",
    p3: "Annoying, this week please",
    p4: "It can wait",
  } satisfies Record<Severity, string>,

  category: {
    plumbing: "Plumbing",
    electrical: "Electrical",
    gas: "Gas",
    air_conditioning: "Air conditioning",
    moving: "Moving",
  } satisfies Record<Category, string>,
  noCategory: "Other",

  preferredTime: {
    weekday_morning: "Weekday morning",
    weekday_afternoon: "Weekday afternoon",
    weekday_evening: "Weekday evening",
    weekend: "Weekend",
    any_time: "Any time",
  } satisfies Record<PreferredTime, string>,

  /** Flat-rate items per category; prices are in `data/testRates.ts`. */
  rates: {
    plumbing: ["Unclog a drain", "Fix a leaky tap", "Toilet repair", "Water heater check"],
    electrical: [
      "Replace an outlet or switch",
      "Install a light fixture",
      "Breaker troubleshooting",
    ],
    gas: [
      "Stove or range connection",
      "Water heater ignition check",
      "Gas appliance safety inspection",
    ],
    air_conditioning: ["AC cleaning (wall unit)", "AC repair diagnosis", "AC installation"],
    moving: ["Small move (one room)", "Heavy item move", "Furniture assembly"],
  } satisfies Record<Category, string[]>,

  /** Keys come from the backend (`nullbox_domain::ANON_ANIMALS`). */
  animals: {
    platypus: "Platypus",
    capybara: "Capybara",
    axolotl: "Axolotl",
    narwhal: "Narwhal",
    quokka: "Quokka",
    pangolin: "Pangolin",
    tardigrade: "Tardigrade",
    red_panda: "Red Panda",
    otter: "Otter",
    tanuki: "Tanuki",
    alpaca: "Alpaca",
    sloth: "Sloth",
  } as Record<string, string>,
  anonName: (animal: string, number: number) => `Anonymous ${animal} #${number}`,

  ticket: {
    number: (n: number) => `#${n}`,
    notFound: "Not Found",
    notFoundHint: "Ticket #404 exists. We just can't find it. Classic.",
    unassigned: "Nobody (yet)",
    severity: "Severity",
    status: "Status",
    assignee: "Assignee",
    customer: "From",
    opened: (when: string) => `opened ${when}`,
    aging: {
      fresh: "Fresh",
      yellowed: "Starting to yellow",
      cobwebs: "Cobwebs detected",
      fossil: "Officially a fossil",
    },
  },

  customer: {
    title: "What broke?",
    intro: "Tell us everything. A local handyman will accept it and send you a flat-rate invoice.",
    kind: "What kind of problem?",
    gasTitle: "Smell gas?",
    gasWarning:
      "Don't file a ticket. Open the windows, don't touch switches, leave, and call your gas company's emergency line now.",
    subject: "Subject",
    subjectPlaceholder: "The kitchen sink is draining at geological speed",
    subjectHints: {
      plumbing: "The kitchen sink is draining at geological speed",
      electrical: "The breaker trips whenever the kettle and rice cooker meet",
      gas: "The stove clicks but will not light",
      air_conditioning: "The air conditioner only blows warm, damp sadness",
      moving: "One sofa, three flights of stairs, zero elevators",
    } satisfies Record<Category, string>,
    body: "What happened?",
    bodyPlaceholder: "When it started, where in the home, the sound it made…",
    when: "When can we come?",
    ratesTitle: (category: string) => `${category} flat rates`,
    ratesIntro:
      "No surprise quotes. Once a handyman accepts, your first invoice comes from this list.",
    ratesFooter:
      "Bigger job? Your handyman can add items after the visit, and you approve them first.",
    testPrices: "TEST prices",
    yen: (amount: string) => `¥${amount}`,
    severity: "How bad is it?",
    name: "Your name (optional)",
    email: "Email (optional)",
    anonymousHint: "Skip both and you'll get a dignified anonymous alias.",
    submit: "Send it to the handymen",
    submitting: "Launching…",
    createdTitle: "Ticket received!",
    createdBody: (n: number) => `Ticket #${n} is now officially somebody else's problem.`,
    secretLinkTitle: "Your secret link",
    secretLinkWarning:
      "This link is the only way back to your ticket. Bookmark it. We can't resend it: we don't even know who you are.",
    copyLink: "Copy link",
    copied: "Copied!",
    openTicket: "Open my ticket",
    missingToken:
      "This link is missing its secret part. Use the full link you got when you submitted the ticket.",
    threadTitle: "Conversation",
    reply: "Add a reply",
    replyPlaceholder: "Any updates? New symptoms? Fresh smoke?",
    send: "Send reply",
    closedNotice: "This ticket was sent to the Shadow Realm. Please open a new one.",
    sendHint: "Ctrl + Enter to send",
  },

  myTickets: {
    title: "My tickets",
    tabsLabel: "Ticket status",
    tabs: {
      current: (n: number) => `Current · ${n}`,
      pending: (n: number) => `Invoice pending · ${n}`,
      paid: (n: number) => `Invoice paid · ${n}`,
    },
    empty: {
      current: "Nothing broken right now. Enjoy it while it lasts.",
      pending: "No invoices waiting.",
      paid: "No paid invoices yet.",
    },
    sent: (ago: string) => `Sent ${ago}`,
    acceptedBy: (name: string) => `Accepted by ${name}`,
    invoiceNotIssued: "Invoice not issued yet",
    done: "Done",
    created: (n: number) => `Ticket #${n} is on its way to the handymen.`,
    secretLink: "Your secret link (works on any device):",
    deviceNote:
      "Tickets you send from this browser show up here. Accounts are coming; until then, keep the secret link.",
    noTickets: "You haven't reported anything from this browser yet.",
    beastOpen: (n: string) => `${n} open`,
    report: "Report a problem",
  },

  login: {
    heroTitle: "Something broke?",
    heroTitle2: "We bring the hammer.",
    heroBody:
      "Plumbing, electrical, gas, air conditioning and moving help across Osaka. Tell us what happened, a local handyman accepts, you pay a flat rate.",
    heroBeastStrong: "Zero tickets.",
    heroBeast: "The Handyman Beast is napping on its toolbox. Let's keep it that way.",
    welcome: "Welcome back",
    welcomeBody: "Log in to report a problem or check on an invoice.",
    roleLabel: "I am",
    roleCustomer: "I need help",
    roleHandyman: "I'm a handyman",
    handymanNote:
      "Handymen see new tickets near them, accept the ones they want and send a flat-rate invoice.",
    email: "Email",
    emailPlaceholder: "you@example.jp",
    password: "Password",
    keepLoggedIn: "Keep me logged in",
    forgot: "Forgot password?",
    submit: "Log in",
    newHere: "New here?",
    createAccount: "Create an account",
    preview:
      "Preview: accounts aren't connected yet. Log in takes you straight to your tickets for now.",
  },

  details: {
    steps: { account: "Account", details: "Your details", firstTicket: "First ticket" },
    stepsLabel: "Sign-up progress",
    title: "Where do we send the hammer?",
    intro: "Your handyman sees this when they accept a ticket. You only fill it in once.",
    aboutYou: "About you",
    fullName: "Full name",
    fullNamePlaceholder: "Yamada Taro",
    phone: "Phone",
    emailInvoices: "Email (invoices go here)",
    handymanLanguage: "Language for your handyman",
    languages: ["English", "日本語", "Either is fine"],
    contact: "Best way to reach you",
    contactOptions: ["LINE", "Phone call", "Email"],
    yourPlace: "Your place",
    postal: "Postal code",
    prefecture: "Prefecture",
    prefectures: ["Osaka", "Hyogo", "Kyoto", "Nara"],
    city: "City / ward",
    cityPlaceholder: "Kita-ku",
    street: "Street address",
    streetPlaceholder: "Umeda 1-2-3",
    building: "Building and room",
    buildingPlaceholder: "Sakura Mansion 402",
    placeType: "Type of place",
    placeTypes: ["Apartment", "House", "Shop or office"],
    gettingIn: "Getting in",
    gettingInPlaceholder: "Auto-lock? Pets? Where can the van park?",
    consent: "I agree that my address is shared only with the handyman who accepts my ticket.",
    back: "Back",
    save: "Save and report a problem",
    preview: "Preview: these details aren't saved yet. They will be once accounts exist.",
  },

  worker: {
    inboxTitle: "Inbox",
    filter: "Show",
    filterActive: "Everything still alive",
    search: "Search subjects",
    searchPlaceholder: "Filter by subject…",
    noMatches: "Nothing matches. Suspicious.",
    you: "You are",
    actorPlaceholder: "Your name",
    actorHint: "Not a login. Anyone can claim to be anyone. (Login is one of your upgrades.)",
    back: "Back to inbox",
    reply: "Reply to customer",
    internalNote: "Internal note",
    internalBadge: "Internal",
    replyPlaceholder: "Write something reassuring…",
    notePlaceholder: "Only workers can see this. Vent responsibly.",
    send: "Send",
    yeet: "Yeet it",
    yeetHint: "Marks the ticket as resolved.",
    yeeted: "Yeeted into the sun.",
    assigneePlaceholder: "Name or empty",
    assign: "Assign",
    assignToMe: "Take it",
  },

  beast: {
    title: "Handyman Beast",
    moods: {
      asleep: "Inbox zero. Napping on the toolbox.",
      peckish: "On the job. Humming while it works.",
      grumpy: "Grumbling. Tightening bolts too hard.",
      kaiju: "Hammer raised. Nobody is safe.",
    },
    /** Spoken by screen readers: describes the drawing, not the joke. */
    labels: {
      asleep: "Handyman Beast, happy and napping",
      peckish: "Handyman Beast, busy and focused",
      grumpy: "Handyman Beast, grumpy and steaming",
      kaiju: "Handyman Beast, furious with hammer raised",
    },
    openCount: (n: string) => `${n} open`,
    oldest: (age: string) => `Oldest: ${age}`,
  },

  zero: {
    celebration: "INBOX ZERO!",
    void: "Please enjoy this complimentary void.",
  },

  thread: {
    empty: "No replies yet. The silence is deafening.",
    statusChanged: (from: string, to: string) => `Status: ${from} → ${to}`,
    itsAlive: "IT'S ALIVE! The customer replied and the ticket rose from the dead.",
    severityChanged: (from: string, to: string) => `Severity: ${from} → ${to}`,
    assigned: (to: string) => `Assigned to ${to}`,
    unassigned: "Unassigned. Free as a bird.",
    system: "Nullbox",
    you: "You",
  },

  errors: {
    not_found: "We looked everywhere. Even under the couch. It's not there.",
    missing_ticket_token: "This page needs your secret link.",
    missing_actor: "Pick a name first (top right).",
    forbidden: "You shall not pass.",
    validation_failed: "Something in the form doesn't look right. Please check the fields.",
    invalid_status_transition: "That status change isn't allowed. Time only flows one way.",
    ticket_closed: "This ticket is closed for good.",
    service_unavailable: "The server is taking a nap. Try again in a moment.",
    internal: "Something broke on our side. It works on our machine, though.",
    im_a_teapot: "I'm a teapot. Short and stout.",
    network_error: "Can't reach the server. Is it plugged in?",
  } satisfies Record<ErrorCode | "network_error", string>,

  loading: [
    "Bribing the database…",
    "Reticulating splines…",
    "Asking the hamsters to run faster…",
    "Consulting the rubber duck…",
    "Warming up the tubes…",
  ],

  eggs: {
    sudo: "This incident will be reported.",
    capsLock: "Priority: Loud",
    enterprise: {
      title: "Enterprise Mode™",
      intro: "Before you continue, please complete these mandatory fields.",
      fields: [
        "Synergy alignment quotient",
        "Paradigm shift reference ID",
        "Stakeholder's favorite font",
        "Fax number (required)",
        "Number of meetings this could have been an email",
      ],
      submit: "Submit for approval",
      synergizing: "Synergizing…",
      exit: "Return to reality",
    },
  },

  time: {
    unknown: "—",
  },
};

export type Copy = typeof en;
export default en;
