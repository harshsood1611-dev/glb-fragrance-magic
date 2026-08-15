/** All site copy lives here so pages stay presentational. */

export const AGENCY = {
  name: "Snapping Turtles",
  tagline: "A global digital marketing and brand growth studio",
  email: "hello@snappingturtles.com",
  phone: "+1 (415) 555-0142",
  studios: ["New York", "London", "Dubai", "Noida"],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "Behance", href: "https://behance.net" },
  ],
};

export const STATS = [
  { value: 241, suffix: "+", label: "Projects delivered" },
  { value: 199, suffix: "+", label: "Influencer campaigns" },
  { value: 100, suffix: "+", label: "Websites shipped" },
  { value: 70, suffix: "+", label: "Films produced" },
];

export const CLIENTS = [
  "Nestlé",
  "Taj Hotels",
  "Radisson Blu",
  "Dettol",
  "Cinépolis",
  "Avon",
  "Superplum",
  "Wakefit",
  "Milaap",
  "Nodinite",
  "Airia Mall",
  "Findsports",
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  body: string[];
  deliverables: string[];
  metric: string;
};

export const SERVICES: Service[] = [
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    short: "Full-funnel strategy that turns attention into revenue.",
    intro:
      "We build integrated growth systems — search, social, paid media and lifecycle — engineered around one number that matters to your business.",
    body: [
      "Our strategists design campaigns from the buying journey backwards. We map demand, size the opportunity by market, then deploy channel mixes that compound instead of competing with each other.",
      "Every engagement runs on a shared measurement layer: clean tracking, incrementality tests and a live dashboard your leadership team can read without a translator.",
      "From launch markets to mature accounts, we operate as an embedded growth team across time zones — weekly sprints, monthly business reviews, quarterly strategy resets.",
    ],
    deliverables: [
      "Growth strategy & channel plan",
      "Paid media buying (Meta, Google, LinkedIn, TikTok)",
      "Marketing analytics & attribution",
      "Lifecycle email & CRM automation",
      "Quarterly experimentation roadmap",
    ],
    metric: "Avg. 3.4x return on ad spend across retained accounts",
  },
  {
    slug: "seo",
    title: "SEO & Content",
    short: "Own the demand that already exists for your category.",
    intro:
      "Technical SEO, editorial content and digital PR combined into a compounding organic engine for global and local search.",
    body: [
      "We start with a full technical audit — crawl health, Core Web Vitals, internal linking and index bloat — then fix what actually blocks rankings.",
      "Our editorial team builds topical authority with content designed for humans and answer engines alike, including schema, entity coverage and AI-search readiness.",
      "For multi-location brands we run local SEO programmes: profile optimisation, citation hygiene, review velocity and city-level landing architecture.",
    ],
    deliverables: [
      "Technical SEO audit & remediation",
      "Keyword and entity research",
      "Editorial content production",
      "Digital PR & authority link building",
      "Local & multi-market SEO",
    ],
    metric: "Median +182% organic sessions in 9 months",
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    short: "Always-on brand presence that people actually follow.",
    intro:
      "Platform-native creative, community management and a publishing rhythm that keeps your brand culturally relevant.",
    body: [
      "We build a content system, not a calendar: repeatable formats, a distinct visual language and hooks tested against real retention data.",
      "Community managers respond in your brand voice within hours, turning comment sections into a conversion surface.",
      "Monthly creative reviews compare performance by format, hook and edit style so the next batch is sharper than the last.",
    ],
    deliverables: [
      "Channel strategy & tone of voice",
      "Monthly content production",
      "Short-form editing & motion",
      "Community management",
      "Performance creative testing",
    ],
    metric: "Up to 5.1x lift in engaged reach",
  },
  {
    slug: "influencer-marketing",
    title: "Influencer & UGC",
    short: "Creator-led campaigns with measurable commercial outcomes.",
    intro:
      "From nano creators to celebrity talent, we run end-to-end influencer programmes and high-volume UGC production.",
    body: [
      "We source talent on audience quality, not follower vanity — then negotiate usage rights so winning assets become paid media.",
      "Our UGC studio ships dozens of variations a month, briefed against your top-performing angles.",
      "Every campaign is tracked with promo codes, affiliate links and lift studies so creator spend is defensible.",
    ],
    deliverables: [
      "Creator sourcing & vetting",
      "Contracting and usage rights",
      "UGC production at scale",
      "Whitelisting & paid amplification",
      "Campaign measurement",
    ],
    metric: "199+ creator campaigns activated",
  },
  {
    slug: "video-production",
    title: "Video Production",
    short: "Films, TVCs and 2D/3D animation built for attention.",
    intro:
      "A full in-house production capability: concept, shoot, post, motion design and CGI for brand and performance.",
    body: [
      "We produce brand films for hospitality and retail, product CGI for e-commerce, and performance edits designed for feed-first viewing.",
      "Our animation team builds explainers, logo systems and 3D product visualisations that make complex offers instantly clear.",
      "One team from storyboard to master delivery keeps timelines short and the creative intent intact.",
    ],
    deliverables: [
      "Concept & storyboarding",
      "Production & direction",
      "2D / 3D animation and CGI",
      "TVC and brand films",
      "Performance edit variants",
    ],
    metric: "70+ productions delivered worldwide",
  },
  {
    slug: "web-development",
    title: "Web Development",
    short: "Fast, accessible, conversion-shaped websites.",
    intro:
      "Design and engineering under one roof — marketing sites, platforms and headless e-commerce built to score and to sell.",
    body: [
      "We design in-browser, so what you approve is what ships: real type, real motion, real performance budgets.",
      "Builds are component-driven and CMS-backed, with analytics and experimentation wired in from day one.",
      "Every site launches with Core Web Vitals in the green and an accessibility pass against WCAG AA.",
    ],
    deliverables: [
      "UX architecture & wireframes",
      "Interface design systems",
      "Front-end engineering",
      "Headless CMS integration",
      "Performance & accessibility QA",
    ],
    metric: "100+ websites shipped, avg. LCP under 1.8s",
  },
  {
    slug: "ecommerce",
    title: "E-commerce Growth",
    short: "Storefronts and retention loops that lift AOV.",
    intro:
      "Shopify and headless commerce builds paired with merchandising, CRO and retention programmes.",
    body: [
      "We rebuild the path to purchase: collection logic, PDP persuasion, bundling and checkout friction removal.",
      "Retention is treated as a channel — flows, segmentation and loyalty mechanics that raise repeat rate.",
      "A continuous CRO backlog keeps compounding conversion gains after launch.",
    ],
    deliverables: [
      "Store design & build",
      "Merchandising strategy",
      "Conversion rate optimisation",
      "Retention & loyalty flows",
      "Marketplace expansion",
    ],
    metric: "Avg. +28% conversion rate post-rebuild",
  },
  {
    slug: "brand-design",
    title: "Brand & Graphic Design",
    short: "Identity systems with the range to travel globally.",
    intro:
      "Logos, packaging, campaign art direction and design systems built to hold up across markets and languages.",
    body: [
      "We define positioning and verbal identity before a single mark is drawn, so the design has something to say.",
      "Deliverables include flexible identity systems, motion behaviour and multi-script typography considerations.",
      "Brand guidelines ship as living documentation your internal teams can actually apply.",
    ],
    deliverables: [
      "Positioning & naming",
      "Logo & identity systems",
      "Packaging and print",
      "Campaign art direction",
      "Brand guidelines",
    ],
    metric: "Identity systems in 6 languages",
  },
  {
    slug: "performance-crm",
    title: "CRM & WhatsApp Marketing",
    short: "Owned-channel revenue on autopilot.",
    intro:
      "Email, SMS and WhatsApp programmes that recover carts, onboard buyers and reactivate lapsed customers.",
    body: [
      "We architect lifecycle journeys mapped to real behavioural triggers rather than generic broadcast blasts.",
      "WhatsApp is treated as a first-class commerce channel with catalogue flows, opt-in growth and conversational support.",
      "Deliverability, consent and regional compliance are built into every deployment.",
    ],
    deliverables: [
      "Lifecycle journey mapping",
      "Email & SMS automation",
      "WhatsApp commerce flows",
      "Segmentation & CDP hygiene",
      "Reporting & incrementality",
    ],
    metric: "Owned channels at 24% of client revenue",
  },
];

export type Project = {
  slug: string;
  client: string;
  category: string;
  summary: string;
  result: string;
  year: string;
  region: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "nestle",
    client: "Nestlé",
    category: "Video Production",
    summary:
      "Product films and social-first edits for a multi-market FMCG portfolio, localised across three languages.",
    result: "+64% view-through rate",
    year: "2025",
    region: "EMEA",
  },
  {
    slug: "taj-hotels",
    client: "Taj Hotels",
    category: "Brand Film",
    summary:
      "A hospitality brand film capturing the arrival ritual, cut for cinema, TV and vertical placements.",
    result: "3.2M organic views",
    year: "2025",
    region: "Global",
  },
  {
    slug: "cinepolis",
    client: "Cinépolis",
    category: "Social Media Marketing",
    summary:
      "Always-on social for a cinema chain across 19 countries, with a repeatable release-week playbook.",
    result: "+41% ticket-page traffic",
    year: "2024",
    region: "Global",
  },
  {
    slug: "superplum",
    client: "Superplum",
    category: "E-commerce Growth",
    summary:
      "Fresh-produce D2C storefront rebuild with subscription bundles and retention flows.",
    result: "+28% conversion rate",
    year: "2025",
    region: "APAC",
  },
  {
    slug: "dettol",
    client: "Dettol",
    category: "Performance Marketing",
    summary:
      "Full-funnel paid media for a hygiene category leader, with creative testing at volume.",
    result: "3.9x return on ad spend",
    year: "2024",
    region: "EMEA",
  },
  {
    slug: "nodinite",
    client: "Nodinite",
    category: "2D Animation",
    summary:
      "Explainer animation system that turned an abstract integration platform into a clear story.",
    result: "2.4x demo requests",
    year: "2024",
    region: "Europe",
  },
  {
    slug: "findsports",
    client: "Findsports",
    category: "SEO",
    summary:
      "Technical rebuild plus category content for a snowsports and watersports retailer.",
    result: "+182% organic sessions",
    year: "2025",
    region: "ANZ",
  },
  {
    slug: "radisson-blu",
    client: "Radisson Blu",
    category: "Photography & Film",
    summary:
      "Property campaign shoot for a palace resort, delivering stills and motion in one production block.",
    result: "+37% direct bookings",
    year: "2024",
    region: "EMEA",
  },
  {
    slug: "santure-ai",
    client: "Santure AI",
    category: "Website Development",
    summary:
      "Positioning, identity and a headless marketing site for an AI infrastructure startup.",
    result: "1.4s LCP at launch",
    year: "2025",
    region: "North America",
  },
  {
    slug: "wakefit",
    client: "Wakefit",
    category: "Influencer & UGC",
    summary:
      "Celebrity-led campaign plus a UGC engine feeding paid social with fresh creator angles.",
    result: "199 creators activated",
    year: "2025",
    region: "APAC",
  },
  {
    slug: "airia-mall",
    client: "Airia Mall",
    category: "Creative Design",
    summary:
      "Seasonal campaign art direction and experiential content for a flagship retail destination.",
    result: "+52% footfall on campaign weekends",
    year: "2024",
    region: "MEA",
  },
  {
    slug: "sr4ipr",
    client: "Sr4ipr Partners",
    category: "Digital Marketing",
    summary:
      "Lead-generation programme for an intellectual property firm across two continents.",
    result: "-38% cost per qualified lead",
    year: "2025",
    region: "Global",
  },
];

export const CATEGORIES = [
  "All",
  ...Array.from(new Set(PROJECTS.map((p) => p.category))),
];

export const PROCESS = [
  {
    step: "01",
    title: "Discover",
    copy: "Market, category and customer research. We audit what exists and find the wedge.",
  },
  {
    step: "02",
    title: "Define",
    copy: "Positioning, KPI architecture and a channel plan with named owners and budgets.",
  },
  {
    step: "03",
    title: "Design",
    copy: "Creative systems, prototypes and production — built for the platforms you sell on.",
  },
  {
    step: "04",
    title: "Deploy",
    copy: "Launch in sprints, with tracking verified before a single dollar goes live.",
  },
  {
    step: "05",
    title: "Develop",
    copy: "Experiment, cut losers, scale winners. Compounding gains reviewed every quarter.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "They operate like an in-house team that happens to be excellent. Our paid and organic finally tell the same story.",
    name: "Amelia Hart",
    role: "VP Growth, hospitality group",
  },
  {
    quote:
      "The production quality is agency-of-record standard, but the turnaround is startup speed.",
    name: "Daniel Okoye",
    role: "Head of Brand, FMCG",
  },
  {
    quote:
      "We went from invisible in search to owning our category terms in three markets.",
    name: "Sofia Marchetti",
    role: "CMO, D2C retail",
  },
  {
    quote:
      "Their creator programme paid for itself in the first six weeks. Rare.",
    name: "Ravi Menon",
    role: "Founder, consumer tech",
  },
];

export const TEAM = [
  { name: "Aarav Sethi", role: "Founder & Strategy Director" },
  { name: "Clara Bennett", role: "Executive Creative Director" },
  { name: "Miguel Santos", role: "Head of Performance" },
  { name: "Nadia Haddad", role: "Head of Production" },
  { name: "Jonas Lind", role: "Engineering Lead" },
  { name: "Priya Raman", role: "Director of SEO" },
];

export const VALUES = [
  {
    title: "Evidence over opinion",
    copy: "Every recommendation is backed by data you can inspect. No black boxes, no vanity dashboards.",
  },
  {
    title: "Craft is commercial",
    copy: "Beautiful work performs better. We refuse the false trade-off between taste and results.",
  },
  {
    title: "One team, many markets",
    copy: "Studios across four cities means your campaigns move while you sleep.",
  },
  {
    title: "Radical clarity",
    copy: "Plain-language reporting, fixed scopes and no surprises on the invoice.",
  },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  body: string[];
};

export const POSTS: Post[] = [
  {
    slug: "ai-search-changed-seo",
    title: "AI search changed SEO — here is what still works",
    excerpt:
      "Answer engines summarise before they link. The brands winning are the ones being cited, not just crawled.",
    category: "SEO",
    date: "2026-07-28",
    readTime: "7 min",
    body: [
      "Zero-click results are no longer an edge case; for informational queries they are the default. That does not kill SEO, it moves the goalpost from ranking to being quoted.",
      "Three things move the needle: unambiguous entity signals, content structured as extractable answers, and third-party corroboration that makes your claims safe for a model to repeat.",
      "Practically, that means shipping schema properly, keeping a single canonical source per topic, and investing in the digital PR that makes your brand name co-occur with your category.",
      "Measurement shifts too. Track branded search volume, citation share in AI answers and assisted conversions alongside classic rankings.",
    ],
  },
  {
    slug: "creative-testing-framework",
    title: "A creative testing framework that survives real budgets",
    excerpt:
      "Most creative tests fail because they change five variables at once. Here is the structure we use.",
    category: "Performance",
    date: "2026-07-11",
    readTime: "6 min",
    body: [
      "Separate the hook, the proof and the offer. Test one layer per cycle and hold the other two constant.",
      "Volume beats brilliance early on: ship enough variants to find signal, then invest production budget behind the winning angle.",
      "Set a decision rule before launch — spend threshold, minimum impressions, and the metric you will act on. Without it, every test becomes an argument.",
    ],
  },
  {
    slug: "influencer-usage-rights",
    title: "The clause most brands forget in creator contracts",
    excerpt:
      "Usage rights are the difference between a nice post and a year of paid media assets.",
    category: "Influencer",
    date: "2026-06-24",
    readTime: "5 min",
    body: [
      "If you cannot run a creator asset as paid media, you bought reach once instead of an asset library.",
      "Negotiate paid usage, whitelisting and territory up front — it is dramatically cheaper than retro-licensing a winner.",
      "Document exclusivity windows narrowly. Broad category exclusivity inflates fees without protecting much.",
    ],
  },
  {
    slug: "web-performance-revenue",
    title: "Web performance is a revenue lever, not an engineering vanity metric",
    excerpt: "What a 400ms improvement actually did to conversion across nine builds.",
    category: "Web",
    date: "2026-06-09",
    readTime: "6 min",
    body: [
      "Across our last nine commerce builds, cutting largest contentful paint below two seconds tracked with a measurable lift in add-to-cart rate.",
      "The wins are unglamorous: image discipline, fewer third-party scripts, server-rendered first paint, and fonts that do not block.",
      "Set a performance budget in the design phase. Retrofitting speed after launch costs three times as much.",
    ],
  },
  {
    slug: "brand-for-multiple-markets",
    title: "Designing a brand that travels across markets",
    excerpt:
      "Multi-script typography, colour meaning and the traps of a one-market identity.",
    category: "Brand",
    date: "2026-05-22",
    readTime: "8 min",
    body: [
      "An identity that only works in Latin script will be rebuilt badly by a local team within a year.",
      "Choose type families with genuine multi-script coverage, and design layouts that tolerate 30% text expansion.",
      "Test colour and symbolism per market before you commit to packaging runs.",
    ],
  },
  {
    slug: "whatsapp-commerce-playbook",
    title: "The WhatsApp commerce playbook for global brands",
    excerpt:
      "Opt-in growth, catalogue flows and the compliance details that decide whether it scales.",
    category: "CRM",
    date: "2026-05-05",
    readTime: "6 min",
    body: [
      "Treat WhatsApp like a storefront with a conversation attached, not a broadcast list.",
      "Growth comes from placement: checkout opt-ins, order updates and support entry points beat paid list building.",
      "Consent records and regional messaging rules are the difference between a channel and a shutdown.",
    ],
  },
];

export const FAQS = [
  {
    q: "How do you work with international clients?",
    a: "We run overlapping hours across our New York, London, Dubai and Noida studios, so there is always a team on your brief. Communication runs through a shared workspace with weekly sprint reviews.",
  },
  {
    q: "What does a typical engagement look like?",
    a: "Most partnerships begin with a four-week discovery and strategy sprint, then move to a monthly retainer covering strategy, creative production and media management.",
  },
  {
    q: "How is performance reported?",
    a: "You get a live dashboard from day one plus a monthly business review that ties channel metrics to revenue, not impressions.",
  },
  {
    q: "Can you work alongside our in-house team?",
    a: "Yes. Roughly half our clients have internal marketers — we plug into the gaps, whether that is production capacity, paid media or engineering.",
  },
  {
    q: "What is the minimum engagement?",
    a: "Project work starts at a defined scope and timeline. Retainers typically run on a three-month initial term so strategy has time to compound.",
  },
];
