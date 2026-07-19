/* ============================================================================
   CONTENT SYSTEM — Dipankar Yadav Portfolio
   ----------------------------------------------------------------------------
   Everything on the site is driven from this file, so adding new work is easy:

   • NEW CASE STUDY   → add an object to `caseStudies` below
   • NEW PM ARTIFACT  → add to `artifacts` (or use the "+ Add" card on the site)
   • NEW CERTIFICATE  → add to `certifications` (or use the "+ Add" card on site)
   • NEW EXPERIENCE   → add to `experiences`
   • PHOTO / BANNER   → click the camera icons on the profile card (About section)
                        → uploads are saved in the browser automatically
   ========================================================================== */

export const profile = {
  name: "Dipankar Yadav",
  first: "Dipankar",
  last: "Yadav",
  initials: "DY",
  role: "Aspiring Product Manager",
  headline: "Building AI products that actually ship",
  sub: "IIT Kharagpur '26 · Dual Degree (B.Tech + M.Tech) · Bridging data, ML, and product thinking · Open to APM / Product roles",
  location: "Kanpur Nagar, Uttar Pradesh, India",
  availability: "Open to APM / Product roles",
  email: "dipankargalaxy1020@gmail.com",
  phoneDisplay: "+91 83189 60207",
  phoneTel: "+918318960207",
  whatsapp: "https://wa.me/918318960207",
  linkedin: "https://www.linkedin.com/in/dipankar-yadav",
};

export const heroStats = [
  { value: 2.8, suffix: "%", decimals: 1, label: "Top of JEE Advanced 2021", note: "of ~2,50,000 candidates" },
  { value: 6, suffix: "", decimals: 0, label: "Countries served", note: "AI solutions for SMBs" },
  { value: 3, suffix: "", decimals: 0, label: "LLM modes shipped", note: "AI Buddy, solo, live domain" },
  { value: 56, suffix: "", decimals: 0, label: "Households interviewed", note: "fieldwork before features" },
];

export const marqueeItems = [
  "Product Strategy",
  "User Research",
  "LLM Systems",
  "PRDs & Teardowns",
  "Data Storytelling",
  "Zero → One Shipping",
  "Fieldwork-First Thinking",
  "AI Tool Orchestration",
  "Stakeholder Communication",
  "Market Fit Intuition",
];

/* ------------------------------------------------------------------ ABOUT */
export const about = {
  lead: "I started out building ML systems. Somewhere along the way I realized the part I loved most wasn\u2019t the model — it was figuring out what to build, who it was for, and whether it actually solved a real problem.",
  thread: "That\u2019s the thread that\u2019s pulled me toward Product.",
  journey: [
    "Dual Degree (B.Tech + M.Tech) at IIT Kharagpur — Top 2.8% in JEE Advanced 2021",
    "Shipped AI Buddy solo — 3 LLM-powered modes on a live public domain, owned end to end",
    "Led a team of 6 to the Smart India Hackathon 2022 national finals with an app for NDRF",
    "Spent 3 months sitting with 56 farming households in UP before building the data pipeline",
    "Now selling & shipping AI-built products to small businesses across 6 countries",
  ],
  now: "Deep into Product Management — frameworks, case studies, PRDs, product teardowns. Writing about what I learn on LinkedIn and breaking down AI products as I go.",
  lens: {
    quote:
      "Most PMs come from MBA or business backgrounds. I come from building things, and from fieldwork with users most product teams never meet.",
    note: "That combination matters — especially for AI products that need to work for more than just the urban power user.",
  },
  topSkills: ["Ad Creative Production", "AI-Powered Design", "Small Business Sales"],
};

/* --------------------------------------------------------------- JOURNEY */
export interface Experience {
  id: string;
  role: string;
  org: string;
  period: string;
  location: string;
  kind: string;
  summary: string;
  bullets: string[];
  lesson: string;
  skills: string[];
}

export const experiences: Experience[] = [
  {
    id: "smb",
    role: "Founder & Product Builder",
    org: "AI Solutions for SMBs — Independent",
    period: "Mar 2026 — Present",
    location: "Remote · 6 countries",
    kind: "Independent business",
    summary:
      "Independent business selling and shipping AI-built websites and ad creatives to small businesses across the USA, Canada, Germany, UAE, Singapore, and India.",
    bullets: [
      "Every engagement starts with a 30–45 min discovery call — translating the outcome owners want into a deliverable they couldn\u2019t have specified themselves",
      "AI is leverage, not the product — design, copy, image, and video generation across the build, with a human pass on every output (the anti AI-slop guarantee)",
      "Recent project: a US e-commerce brand needed 7 ads in 10 days — scoped from one 45-minute call, first cut in 4 days, 3 feedback rounds, shipped on day 9",
    ],
    lesson:
      "Selling across 6 markets forced real user-context understanding — a US e-commerce founder, a UAE service business, and an Indian D2C brand care about different things. Every project is a mini lesson in market fit, pricing psychology, and how buyers evaluate AI once the hype wears off.",
    skills: ["Client discovery", "Requirements scoping", "Creative direction", "AI tool orchestration", "Project management", "Cross-cultural communication"],
  },
  {
    id: "deloitte",
    role: "Data & Product Analytics Simulation",
    org: "Deloitte Australia",
    period: "May 2026",
    location: "Virtual · Forage",
    kind: "Job simulation",
    summary:
      "Solved a real client problem for an industrial factory — the kind of work where you can\u2019t dump raw numbers on stakeholders and call it a day.",
    bullets: [
      "Took messy production data and separated the patterns that mattered to the business from the noise",
      "Built a Tableau dashboard designed around the questions stakeholders would actually ask — not visualizations that merely looked impressive",
      "Used Excel for forensic classification and turned findings into three clear business recommendations",
    ],
    lesson:
      "Analytics is only useful when it becomes a decision. That mindset is what pulled me toward product thinking in the first place.",
    skills: ["Tableau", "Excel forensics", "Data storytelling", "Business recommendations"],
  },
  {
    id: "aibuddy",
    role: "Solo Founder & Product Builder",
    org: "AI Buddy",
    period: "May 2024 — Feb 2026 · 1 yr 10 mos",
    location: "Live on a public domain",
    kind: "SaaS product",
    summary:
      "A cross-platform (Android + iOS) SaaS app built and shipped solo. Three LLM-powered modes, deployed live. Real users, real bugs, real product decisions.",
    bullets: [
      "Decided what to build and why — not every AI feature deserves to exist, and that filter matters",
      "Chose Gemini API after weighing tradeoffs against other LLMs on cost, latency, and quality for my use cases",
      "Designed the user flows, built front end and back end, handled deployment",
      "Made the hard product calls — what to cut from V1, what to leave for V2, when to ship even though it wasn\u2019t perfect",
    ],
    lesson:
      "Shipping end to end is fundamentally different from a class project. The decisions you avoid as a student — auth, deployment, edge cases, real user feedback — are exactly the decisions that make you a product person. This is the project that made me want to do this full-time.",
    skills: ["Gemini API", "Flutter", "Firebase", "Python", "V1/V2 scoping", "Deployment"],
  },
  {
    id: "iitkgp",
    role: "Research Intern — User Research + ML Pipeline",
    org: "IIT Kharagpur · Dept. of Agricultural & Food Engineering",
    period: "May 2025 — Jul 2025 · 3 mos",
    location: "Kharagpur, West Bengal",
    kind: "Research · Fieldwork",
    summary:
      "Supervisor: Prof. Ankit Shekhar. Project: correlating socio-demographic factors with climate-change awareness among Indian farmers. Most ML projects start with a clean Kaggle dataset — mine started with talking to 56 farming households across Kanpur Nagar and Dehat.",
    bullets: [
      "Designed the survey instrument and collected primary data on the ground — 30 variables, real people, real complexity. As much user research as data collection",
      "Cleaned the dataset across 3 structured sections — missing values, duplicates, schema mismatches; feature engineering on 6 categorical variables",
      "Ran statistical modeling with Scikit-learn and Statsmodels; produced 8 EDA visualizations — correlation matrices, 3D scatters, heatmaps, pairplots",
      "Finding: landholding size predicted income better than family size; education level was the strongest predictor of climate-change awareness — turned into actionable policy recommendations",
    ],
    lesson:
      "You can\u2019t build for users you\u2019ve never met. Sitting across from a farmer explaining his decision-making in his own words is something no dataset can replicate. Build for the user you actually understand, not the one you imagine.",
    skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "Statsmodels", "Seaborn", "Jupyter", "Survey design"],
  },
  {
    id: "sih",
    role: "Team Lead & Frontend Developer — National Finalist",
    org: "Smart India Hackathon 2022 · for NDRF",
    period: "Mar 2022 — Aug 2022 · 6 mos",
    location: "Grand Finale · 3rd place (campus)",
    kind: "Hackathon · Team of 6",
    summary:
      "First year at IIT. Led a team of 6 to build a mobile app for the National Disaster Response Force — the missing communication and coordination layer between NDRF and millions of trained NCC/NSS cadets.",
    bullets: [
      "Key insight: an app that only opens during emergencies is an app nobody opens — so cadets joined interest groups, posted updates, and stayed engaged year-round",
      "NDRF could broadcast alerts and identify cadets in proximity to a disaster zone; cadets opted into response tasks based on training and availability",
      "Split roles around what each teammate wanted to learn instead of dumping tasks; owned the product side — who it\u2019s for, core flow, what gets cut",
      "Designed the full prototype in Figma before serious code; built with Flutter + Django; pitched to judges at the national finals",
    ],
    lesson:
      "I remember the moment we cut three \u201ccool\u201d features so we could nail the one feature that actually solved the problem. That was the first time I thought like a PM.",
    skills: ["Flutter", "Django", "Figma", "Team leadership", "Feature prioritization", "Pitching"],
  },
];

/* ---------------------------------------------------------- CASE STUDIES */
export interface CaseSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}
export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  kind: string;
  year: string;
  role: string;
  image: string;
  tagline: string;
  metrics: { value: string; label: string }[];
  sections: CaseSection[];
  stack: string[];
  quote: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "ai-buddy",
    title: "AI Buddy",
    subtitle: "Shipping a solo SaaS end to end",
    kind: "SaaS Product",
    year: "2024 — 26",
    role: "Solo Founder & Product Builder",
    image: "images/case-aibuddy.jpg",
    tagline:
      "A cross-platform AI assistant with three LLM-powered modes — scoped, designed, built, and deployed by one person to a live public domain.",
    metrics: [
      { value: "3", label: "LLM-powered modes" },
      { value: "2", label: "platforms — Android + iOS" },
      { value: "1yr 10mo", label: "owned end to end" },
      { value: "1", label: "person on the team" },
    ],
    sections: [
      {
        heading: "The filter before the features",
        paragraphs: [
          "I owned the whole thing end to end — from deciding what to build, to pushing it live. The first product decision was a filter: not every AI feature deserves to exist. Three modes made the cut because each one had a real use case behind it, not because the API made them easy.",
        ],
      },
      {
        heading: "Decisions that had real tradeoffs",
        bullets: [
          "Chose Gemini API after weighing cost, latency, and quality against other LLMs for my specific use cases",
          "Decided what to cut from V1 and what to leave for V2 — scope is a strategy, not an accident",
          "Shipped even though it wasn\u2019t perfect, because real feedback beats imaginary polish",
          "Designed the user flows, built front end and back end, handled deployment myself",
        ],
      },
      {
        heading: "What shipping actually teaches you",
        paragraphs: [
          "Shipping a product end to end is fundamentally different from building a project for a class. The decisions you avoid as a student — auth, deployment, edge cases, real user feedback — are exactly the decisions that make you a product person.",
        ],
      },
    ],
    stack: ["Gemini API", "Flutter", "Firebase", "Python"],
    quote: "This is the project that made me realize I wanted to do product full-time.",
  },
  {
    id: "ndrf",
    title: "NDRF Volunteer Mobilization",
    subtitle: "National Finalist — Smart India Hackathon 2022",
    kind: "GovTech · Team Lead",
    year: "2022",
    role: "Team Lead & Frontend Developer",
    image: "images/case-ndrf.jpg",
    tagline:
      "Led a team of 6 in my first year at IIT to build the missing coordination layer between disaster response and millions of trained NCC/NSS cadets.",
    metrics: [
      { value: "Top 5", label: "national finals, SIH \u201922" },
      { value: "6", label: "teammates, first-year me leading" },
      { value: "3", label: "\u201ccool\u201d features cut to nail one" },
      { value: "6mo", label: "from idea to judges\u2019 table" },
    ],
    sections: [
      {
        heading: "The problem worth solving",
        paragraphs: [
          "NDRF responds to disasters across India but had no fast, structured way to mobilize trained volunteers on the ground. Meanwhile, NCC and NSS cadets — millions of them, many already trained for emergencies — sat as a huge untapped resource. The gap was a communication and coordination layer.",
        ],
      },
      {
        heading: "The insight that shaped the app",
        paragraphs: [
          "An app that only opens during emergencies is an app nobody opens. So the engagement layer came first: interest-based groups, updates, and community year-round — with disaster response built on top of an already-active network.",
        ],
        bullets: [
          "NDRF broadcast alerts and identified cadets in proximity to a disaster zone",
          "Cadets opted into specific response tasks based on training and availability",
          "Full Figma prototype before serious code; built with Flutter + Django",
        ],
      },
      {
        heading: "How I ran the team",
        paragraphs: [
          "I talked to each of my 6 teammates about what they wanted to learn and split roles around that — frontend, backend, design, integration — instead of just dumping tasks on people. I owned the product side: who this is for, what the core flow is, what gets cut.",
        ],
      },
    ],
    stack: ["Flutter", "Django", "Figma", "Team leadership"],
    quote:
      "The moment we cut three cool features to nail the one that mattered — that was the first time I thought like a PM.",
  },
  {
    id: "fieldwork",
    title: "Fieldwork Before Features",
    subtitle: "User research + ML pipeline with 56 farming households",
    kind: "Research · IIT Kharagpur",
    year: "2025",
    role: "Research Intern — User Research + ML Pipeline",
    image: "images/case-farm.jpg",
    tagline:
      "Most ML projects start with a clean Kaggle dataset. Mine started with sitting across from 56 farming households in UP, understanding their lives first.",
    metrics: [
      { value: "56", label: "farming households interviewed" },
      { value: "30", label: "variables per household" },
      { value: "6", label: "categorical features engineered" },
      { value: "8", label: "EDA visualizations produced" },
    ],
    sections: [
      {
        heading: "Doing the part most engineers skip",
        paragraphs: [
          "Under Prof. Ankit Shekhar (AgFE, IIT KGP), I designed the survey instrument and worked on the ground across Kanpur Nagar and Dehat — collecting primary data from farmers. This was as much user research as it was data collection.",
        ],
      },
      {
        heading: "From muddy reality to model",
        bullets: [
          "Cleaned the dataset across 3 structured sections — missing values, duplicates, schema mismatches",
          "Feature engineering on 6 categorical variables, including income normalization and government-scheme grouping",
          "Statistical modeling with Scikit-learn and Statsmodels — correlation matrices, 3D scatters, heatmaps, pairplots",
        ],
      },
      {
        heading: "Findings that became recommendations",
        paragraphs: [
          "Landholding size predicted income better than family size did. Education level was the strongest predictor of climate-change awareness. I turned both into actionable policy recommendations for the department — because an insight nobody acts on is just trivia.",
        ],
      },
    ],
    stack: ["Python", "Pandas", "NumPy", "Scikit-learn", "Statsmodels", "Seaborn"],
    quote: "You can\u2019t build for users you\u2019ve never met.",
  },
  {
    id: "smb-business",
    title: "Selling AI to Six Countries",
    subtitle: "Independent AI solutions business for SMBs",
    kind: "Founder · Services",
    year: "2026",
    role: "Founder & Product Builder",
    image: "images/case-smb.jpg",
    tagline:
      "Selling and shipping AI-built websites and ad creatives to small businesses across the USA, Canada, Germany, UAE, Singapore, and India.",
    metrics: [
      { value: "6", label: "countries, different buyer psychology" },
      { value: "45min", label: "to scope a full engagement" },
      { value: "7 ads", label: "delivered in 10 days (recent)" },
      { value: "3", label: "feedback rounds to final ship" },
    ],
    sections: [
      {
        heading: "Translation is the real product",
        paragraphs: [
          "Small business owners know what they want the outcome to be, but rarely know what the deliverable should look like. Every engagement starts with a 30–45 minute discovery call where I figure out what the business actually needs — sometimes a landing page that converts, sometimes ads for a launch, sometimes both. That translation work is where most of the value is.",
        ],
      },
      {
        heading: "AI as leverage, not as the product",
        paragraphs: [
          "I use AI across design, copy, image generation, and video editing — but every output gets a human pass before delivery. That one habit has protected me from the AI-slop problem that kills client trust.",
        ],
        bullets: [
          "US e-commerce brand: 4 educational + 3 UGC-style ads, scoped from one call",
          "First cut in 4 days, 3 rounds of client feedback, shipped final versions on day 9",
        ],
      },
      {
        heading: "What six markets taught me about product",
        paragraphs: [
          "A US e-commerce founder cares about different things than a UAE service business or an Indian D2C brand — and the AI tools that work brilliantly for one can fall flat for another. Every project has been a mini lesson in market fit, pricing psychology, and how buyers evaluate AI products when the hype wears off.",
        ],
      },
    ],
    stack: ["Creative direction", "AI design & video tools", "Project management", "Cross-cultural communication"],
    quote: "Every project is a live case study in what buyers actually value in AI.",
  },
];

/* --------------------------------------------------------- PM ARTIFACTS */
export const artifactTypes = ["PRD", "Teardown", "Automation", "Dashboard", "Research", "Framework", "Other"] as const;
export type ArtifactType = (typeof artifactTypes)[number];

export interface Artifact {
  id: string;
  type: ArtifactType;
  title: string;
  desc: string;
  tags: string[];
  link?: string;
  custom?: boolean;
}

export const artifacts: Artifact[] = [
  {
    id: "a1",
    type: "PRD",
    title: "AI Buddy V2 — Product Requirements Doc",
    desc: "Scoping the next version of my own SaaS: what earned a place in V2, what stayed cut, and the reasoning behind each call.",
    tags: ["Scoping", "Prioritization", "LLM features"],
  },
  {
    id: "a2",
    type: "Teardown",
    title: "AI Product Teardown Series",
    desc: "Breaking down how real AI products onboard, retain, and price — published as I learn, on LinkedIn.",
    tags: ["Onboarding", "Retention", "Pricing"],
    link: "https://www.linkedin.com/in/dipankar-yadav",
  },
  {
    id: "a3",
    type: "Automation",
    title: "Lead-Generation Workflow",
    desc: "An n8n pipeline that automates my outbound lead generation end to end — small project, real time savings.",
    tags: ["n8n", "Outbound", "Systems thinking"],
  },
  {
    id: "a4",
    type: "Automation",
    title: "Job-Hunt Pipeline",
    desc: "A Google Opal workflow that tracks applications and follow-ups — product thinking applied to my own life.",
    tags: ["Google Opal", "Tracking", "Process design"],
  },
  {
    id: "a5",
    type: "Dashboard",
    title: "Stakeholder Decision Dashboard",
    desc: "Tableau build from the Deloitte simulation — designed around the questions stakeholders actually ask, not the charts that look impressive.",
    tags: ["Tableau", "Storytelling", "Analytics → decision"],
  },
  {
    id: "a6",
    type: "Research",
    title: "56-Household Field Survey Instrument",
    desc: "The survey design + data cleaning playbook from the UP fieldwork — 30 variables across 3 structured sections, built for messy reality.",
    tags: ["Survey design", "Primary research", "Data cleaning"],
  },
];

/* ----------------------------------------------------------------- SKILLS */
export const skillGroups = [
  {
    title: "Product",
    icon: "Compass",
    items: ["Discovery & scoping", "PRDs", "Product teardowns", "V1 / V2 tradeoffs", "User research & fieldwork", "Roadmapping", "Stakeholder communication", "Pricing & market-fit intuition"],
  },
  {
    title: "Data & ML",
    icon: "Brain",
    items: ["Python", "Pandas · NumPy", "Scikit-learn · Statsmodels", "EDA & data storytelling", "Tableau & Excel analytics", "LLM APIs (Gemini)", "Collaborative filtering", "DenseNet · Deep Q-Networks"],
  },
  {
    title: "Build & Ship",
    icon: "Hammer",
    items: ["Flutter (Android + iOS)", "Firebase", "Django", "Figma prototyping", "n8n automation", "Google Opal", "AI image & video tooling", "Deployment & edge cases"],
  },
  {
    title: "Sell & Communicate",
    icon: "Megaphone",
    items: ["Ad creative production", "AI-powered design", "Small business sales", "Discovery calls", "Cross-cultural communication", "Pitching to judges & clients"],
  },
];

export const mlBuilds = [
  { title: "Spam classifier", metric: "97.68%", metricLabel: "accuracy", desc: "NLP classification pipeline, tuned end to end", stack: "Python · Scikit-learn" },
  { title: "Recommendation engine", metric: "CF", metricLabel: "collaborative filtering", desc: "User-item recommender built from scratch", stack: "Python · Pandas" },
  { title: "Cancer image classifier", metric: "DenseNet201", metricLabel: "transfer learning", desc: "Medical image classification on deep features", stack: "Python · Deep learning" },
  { title: "AI trading bot", metric: "DQN", metricLabel: "deep Q-networks", desc: "Reinforcement learning agent for trade decisions", stack: "Python · RL" },
];

/* -------------------------------------------------------------- EDUCATION */
export const education = [
  {
    id: "iit",
    school: "Indian Institute of Technology, Kharagpur",
    monogram: "IIT",
    program: "Dual Degree (B.Tech + M.Tech)",
    field: "Agricultural & Food Engineering · Agricultural Systems Management",
    period: "Dec 2021 — Jul 2026",
    notes: [
      "Micro-specialization: Innovation & Entrepreneurship",
      "Activities: Smart India Hackathon 2022 (National Finalist) · Silver Medalist — Hardware Modelling (TechGC 2022-23) · Gymkhana Technical Activities · Winter School of Coding",
      "An agricultural engineering degree at IIT taught me to think about systems with messy inputs — weather, soil, human behavior, supply chains, policy. Turns out that\u2019s not far from products: complex systems where the user isn\u2019t always rational and the variables don\u2019t always behave.",
    ],
    highlights: [
      "Top 2.8% in JEE Advanced 2021 — of ~2,50,000 candidates",
      "Top 2% in JEE Mains 2021 — of ~12,00,000 candidates",
      "Machine Learning Specialization — Andrew Ng (Stanford / DeepLearning.AI, Coursera)",
    ],
  },
  {
    id: "aps",
    school: "Army Public School, Kanpur",
    monogram: "APS",
    program: "Senior Secondary (Class XII & X) — CBSE",
    field: "Science: Physics, Chemistry, Mathematics",
    period: "Apr 2017 — May 2020",
    notes: [
      "Class XII: 92.6% · Class X: 91.4%",
      "Winner — CBSE National Science Exhibition 2018-19 (Regional & National rounds), an early aptitude for research and innovation",
    ],
    highlights: [],
  },
];

/* --------------------------------------------------------- CERTIFICATIONS */
export const certCategories = ["All", "Product", "Data & AI", "Technical"] as const;

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  category: "Product" | "Data & AI" | "Technical";
  credId?: string;
  link?: string;
  skills?: string[];
  custom?: boolean;
}

/* ADD NEW CERTIFICATIONS HERE (or use the "+ Add" card on the site) */
export const certifications: Certification[] = [
  { id: "c1", name: "AI for Product Management", issuer: "Pendo.io", date: "Jun 2026", category: "Product" },
  { id: "c2", name: "Generative AI for Product Managers", issuer: "LinkedIn", date: "Jun 2026", category: "Product", skills: ["AI", "AI for Business Analysis"] },
  { id: "c3", name: "Data-Driven Product Management", issuer: "LinkedIn", date: "Jun 2026", category: "Product", skills: ["Data-driven decisions", "Product Management"] },
  { id: "c4", name: "Becoming a Product Manager: A Complete Guide", issuer: "LinkedIn", date: "Jun 2026", category: "Product", skills: ["Product Management"] },
  { id: "c5", name: "Deloitte Australia — Data Analytics Job Simulation", issuer: "Forage", date: "May 2026", category: "Data & AI", credId: "c7muAPuRzQX3Rqohk" },
  { id: "c10", name: "Machine Learning Specialization — Andrew Ng", issuer: "Stanford / DeepLearning.AI · Coursera", date: "Completed", category: "Data & AI" },
  { id: "c6", name: "AI for India 2.0", issuer: "National Skill Development Corporation", date: "Aug 2023", category: "Data & AI" },
  { id: "c7", name: "Flutter & Dart — The Complete Guide (2021 Edition)", issuer: "Self-paced course", date: "Completed", category: "Technical" },
  { id: "c8", name: "Intellectual Property: Inventors, Entrepreneurs, Creators", issuer: "Self-paced course", date: "Completed", category: "Technical" },
  { id: "c9", name: "AI Tools Workshop", issuer: "Workshop", date: "Completed", category: "Data & AI" },
];

/* ----------------------------------------------------------------- AWARDS */
export const awards = [
  { year: "2022", icon: "Trophy", title: "National Finalist", org: "Smart India Hackathon 2022", note: "Grand Finale · 3rd place (campus)" },
  { year: "2023", icon: "Medal", title: "3rd Position — Pitch Premier", org: "Techkriti '23, IIT Kanpur", note: "National pitch competition" },
  { year: "2023", icon: "Award", title: "Silver Medal — Hardware Modelling", org: "TechGC 2022-23, IIT Kharagpur", note: "Inter-hall tech championship" },
  { year: "2019", icon: "FlaskConical", title: "Winner — National Science Exhibition", org: "CBSE 2018-19", note: "Regional & national rounds" },
  { year: "2023", icon: "Trophy", title: "General Championship", org: "Lawn Tennis '23, IIT Kharagpur", note: "Inter-hall sports" },
  { year: "2021", icon: "Target", title: "Top 2.8% — JEE Advanced", org: "IIT entrance, ~2.5L candidates", note: "Top 2% in JEE Mains (~12L)" },
];

export const contact = {
  heading: ["Let\u2019s build products", "people actually need."],
  blurb:
    "If you\u2019re hiring for APM, Associate PM, or AI PM roles — or just want to talk about AI products, building things, or the messy work of figuring out what users actually need — I\u2019d love to connect.",
};
