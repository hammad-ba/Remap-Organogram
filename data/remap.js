/*
 * REMAP — organisation data for the Human + AI Operating Model.
 *
 * This file is the only REMAP-specific part of the project. To build the
 * organogram for another organisation, copy this file, replace the content,
 * and point index.html at the new file. See README.md for the schema.
 *
 * Sources: REMAP BOS v1.7 (Accountability Chart, Scorecard, Priorities),
 * Seat Charters (Revenue & Partnerships v1.0, Marketing & Demand Gen v1.2,
 * AI Architecture & Technology v1.0, Delivery & Client Ops v1.1,
 * Finance & Legal v1.2), Ideal Client & Referral Partner Profile v1.2.
 * The AIS Value Model v0.2 is a draft and is deliberately not included.
 *
 * Item modes:  "human"    = Human-led
 *              "assisted" = AI-assisted (only where a source says so)
 *              "led"      = AI-led (an Agent-led responsibility in BOS)
 *
 * "pending" marks an assumption awaiting CEO confirmation; the value shown
 * is the recommended answer from the open-questions list.
 */
window.ORG_DATA = {
  meta: {
    organisation: "REMAP",
    title: "Human + AI Operating Model",
    subtitle: "Humans lead and decide. AI assists, executes, monitors and amplifies.",
    asOf: "October 2026",
    version: "BOS v1.7 · seat charters September 2026",
    classification: "Internal"
  },

  brand: {
    human: "#E86020",
    ai: "#3B82F6"
  },

  legend: [
    { mode: "human", label: "Human-led" },
    { mode: "assisted", label: "AI-assisted" },
    { mode: "led", label: "AI-led" },
    { mode: "link", label: "Human + AI collaboration" }
  ],

  /* Tier 1 has no charters yet; cards are derived from BOS and the
     "Not this seat" / approval lines of the Tier 2 charters. */
  leadership: [
    {
      id: "visionary",
      name: "Visionary / CEO",
      status: "filled",
      derived: true,
      summary: "Direction, the biggest relationships, and final approval on money, capital and core positioning."
    },
    {
      id: "integrator",
      name: "Integrator / COO",
      status: "vacant",
      interim: "Visionary",
      derived: true,
      summary: "Runs the operating rhythm; every Tier 2 function reports here. Escalations reach this seat within 24 hours."
    }
  ],

  strategicLayer: {
    title: "Human leadership + AI intelligence",
    human: [
      { text: "Weekly Leadership Sync: surface, diagnose, resolve", mode: "human" },
      { text: "Quarterly priorities and seat decisions", mode: "human" },
      { text: "Approvals above delegated authority", mode: "human" }
    ],
    ai: [
      { text: "Scorecard snapshot before every Monday sync", mode: "led", pending: "Q12" },
      { text: "Priority and action tracking", mode: "assisted" },
      { text: "Financial health reporting", mode: "assisted" }
    ],
    aiName: "COO Agent"
  },

  functions: [
    {
      id: "revenue",
      name: "Revenue & Partnerships",
      metric: "New seat MRR added each month",
      status: "filled",
      interim: "Visionary",
      pending: "Q10",
      human: [
        { text: "Discovery calls and closing", mode: "human" },
        { text: "Deal shape inside the rate card", mode: "human" },
        { text: "Referral partner terms and alliances", mode: "human" },
        { text: "Lead qualification and booking", mode: "human" }
      ],
      ai: [
        { text: "Proposal page in the client's inbox within 2 hours", mode: "assisted" },
        { text: "CRM hygiene and pipeline reporting", mode: "led" },
        { text: "Meeting scheduling", mode: "led" }
      ],
      handoffs: [
        { to: "finance", what: "Signed Order Form, funds received" },
        { to: "delivery", what: "Client with roadmap and start date" }
      ]
    },
    {
      id: "marketing",
      name: "Marketing & Demand Gen",
      metric: "Qualified leads entering Revenue",
      status: "filled",
      human: [
        { text: "Referral partner recruitment", mode: "human" },
        { text: "Brand voice and publishing approval", mode: "human" },
        { text: "Monthly Practical AI workshop", mode: "human" },
        { text: "Channel mix and attribution rules", mode: "human" }
      ],
      ai: [
        { text: "Outreach sequences and reply triage", mode: "led" },
        { text: "Search and AI-answer visibility", mode: "led" },
        { text: "Webinar and event logistics", mode: "led" }
      ],
      handoffs: [
        { to: "revenue", what: "Positive replies, same day" }
      ]
    },
    {
      id: "technology",
      name: "AI Architecture & Technology",
      metric: "Solution quality, uptime, product shipped",
      status: "filled",
      human: [
        { text: "Solution architecture for every engagement", mode: "human" },
        { text: "Platform security and reliability", mode: "human" },
        { text: "Internal technology roadmap", mode: "human" },
        { text: "Technical quality of specialists", mode: "human" }
      ],
      ai: [
        { text: "Uptime checks, alerts and deployment runs", mode: "led" },
        { text: "Product feedback and roadmap synthesis", mode: "led", pending: "Q7" },
        { text: "Builds and maintains every agent on this chart", mode: "assisted" }
      ],
      handoffs: [
        { to: "revenue", what: "Closers: AI Strategist and Architects" },
        { to: "delivery", what: "Quality reviews and bench interviews" }
      ]
    },
    {
      id: "delivery",
      name: "Delivery & Client Ops",
      metric: "AIS utilisation and client retention",
      status: "vacant",
      interim: "Integrator",
      note: "Project Manager collects the scorecard",
      human: [
        { text: "Specialist working within 10 days of funds", mode: "human" },
        { text: "Weekly client value loop", mode: "human" },
        { text: "Specialist standards and delivery governance", mode: "human" },
        { text: "Client-at-risk escalation", mode: "human" }
      ],
      ai: [
        { text: "L1 client support and triage", mode: "led" },
        { text: "Bench and capacity monitoring", mode: "led" },
        { text: "Onboarding and offboarding flows", mode: "led" },
        { text: "Candidate screening", mode: "assisted" }
      ],
      handoffs: [
        { to: "integrator", what: "At-risk clients within 24 hours" }
      ]
    },
    {
      id: "finance",
      name: "Finance & Legal",
      metric: "Cash position accuracy and contract integrity",
      status: "filled",
      human: [
        { text: "Cash, treasury and payment release", mode: "human" },
        { text: "Contract deviations and counsel", mode: "human" },
        { text: "No seat starts before funds arrive", mode: "human" },
        { text: "Capital and specialist advisers", mode: "human" }
      ],
      ai: [
        { text: "Contract generation, NDA and MSA tracking", mode: "led" },
        { text: "Filing deadlines and audit trail", mode: "led" },
        { text: "Bookkeeping and reconciliation support", mode: "assisted" }
      ],
      handoffs: [
        { to: "integrator", what: "Monthly pack and scorecard lines" }
      ]
    }
  ],

  /* Capabilities that run across functions. Kept to what exists today. */
  sharedAI: [
    { name: "Operating rhythm", detail: "Scorecard snapshot and action tracking", usedBy: ["all"] },
    { name: "Client lifecycle CRM", detail: "One record from first touch to renewal", usedBy: ["marketing", "revenue", "delivery"] },
    { name: "Workflow automation", detail: "n8n runs every agent", usedBy: ["all"] },
    { name: "Platform monitoring", detail: "Alerts, uptime, deployments", usedBy: ["technology", "delivery"] },
    { name: "Agent build backlog", detail: "Built and maintained by Technology", usedBy: ["all"] }
  ],

  /* Human -> AI -> Human workflows shown on the overview. */
  workflows: [
    {
      id: "lead-to-proposal",
      title: "From reply to proposal",
      steps: [
        { actor: "Marketing", text: "Runs the outreach campaign", mode: "human" },
        { actor: "Outreach agent", text: "Sends sequences, triages replies", mode: "led" },
        { actor: "BD Rep", text: "Qualifies on five checks and books", mode: "human" },
        { actor: "Proposal AI", text: "Drafts the proposal page", mode: "assisted" },
        { actor: "Closer", text: "Reviews and issues within 2 hours", mode: "human" }
      ]
    },
    {
      id: "client-support",
      title: "Client support",
      steps: [
        { actor: "L1 agent", text: "Answers first-touch queries", mode: "led" },
        { actor: "Client Success", text: "Resolves; escalates past 48 hours", mode: "human" },
        { actor: "Integrator", text: "Decides on at-risk clients", mode: "human" }
      ]
    },
    {
      id: "contracts",
      title: "Contracts",
      steps: [
        { actor: "Closer", text: "Agrees terms on the rate card", mode: "human" },
        { actor: "Contracts agent", text: "Generates the Order Form", mode: "led" },
        { actor: "Finance & Legal", text: "Reviews and countersigns", mode: "human" }
      ]
    }
  ],

  /* Level 2 detail: every seat and responsibility on the Accountability Chart.
     execution: "human" | "agent";  status: "filled" | "vacant" | "fractional" */
  seats: [
    /* Revenue & Partnerships */
    { id: "strategic-partnerships", name: "Strategic Partnerships Lead", function: "revenue", execution: "human", status: "filled", pending: "Q5",
      summary: "Strategic and co-selling relationships, networking groups and alliances; referral partner terms within the standard ceiling." },
    { id: "bd-rep", name: "Business Development Rep", function: "revenue", execution: "human", status: "vacant",
      summary: "Turns positive outreach replies into booked discovery calls; qualifies on five checks in two exchanges; prepares the pre-call brief." },
    { id: "referral-partner-mgmt", name: "Referral Partner Management", function: "revenue", execution: "human", status: "vacant",
      summary: "Onboards partners, keeps them supplied with material and landing pages, reactivates partners quiet for 90 days." },
    { id: "saas-ae", name: "SaaS Account Executive — Private AI", function: "revenue", execution: "human", status: "vacant",
      summary: "Subscription sales, trial-to-paid conversion, account expansion." },
    { id: "sales-coordinator", name: "Sales Coordinator", function: "revenue", execution: "agent", status: "filled",
      summary: "CRM hygiene, pipeline reporting, meeting scheduling across the full client lifecycle." },

    /* Marketing & Demand Gen */
    { id: "community-lead", name: "Community & Thought Leadership Lead", function: "marketing", execution: "human", status: "filled",
      reportsTo: "visionary", dotted: [{ to: "marketing", label: "scheduled and amplified by" }], pending: "Q4",
      summary: "Monthly workshop host, EO Agentic AI group, in-person events, public AI educator positioning." },
    { id: "partner-acquisition", name: "Partner Acquisition", function: "marketing", execution: "human", status: "filled", heldBy: "Marketing Lead", pending: "Q11",
      summary: "Campaigns to partner audiences to recruit referral partners; terms and signing sit with Revenue." },
    { id: "content-creator", name: "Content Creator", function: "marketing", execution: "human", status: "filled",
      summary: "Content production, client education material, thought leadership support." },
    { id: "aeo-seo", name: "AEO / GEO & SEO Coordinator", function: "marketing", execution: "agent", status: "filled",
      summary: "Publishing, analytics, AI and search visibility monitoring." },
    { id: "outreach-coordinator", name: "Outreach Coordinator", function: "marketing", execution: "agent", status: "filled",
      summary: "Lead generation campaigns and email sequences; hands engaged leads to the BD Rep." },
    { id: "events-coordinator", name: "Events & Webinar Coordinator", function: "marketing", execution: "agent", status: "filled",
      summary: "Monthly webinar production and in-person event logistics." },

    /* AI Architecture & Technology */
    { id: "ai-strategist", name: "AI Strategist", function: "technology", execution: "human", status: "filled", interim: "Visionary",
      dotted: [{ to: "revenue", label: "lead closer for" }], pending: "Q9",
      summary: "Client discovery, AI roadmaps, adoption pathways, business-to-technical translation." },
    { id: "architect-solutions", name: "AI Architect (Solutions)", function: "technology", execution: "human", status: "filled",
      dotted: [{ to: "revenue", label: "joins discovery for" }], pending: "Q6",
      summary: "Solution design for client engagements, technical pre-sales, architecture standards." },
    { id: "architect-platform", name: "AI Architect (Platform)", function: "technology", execution: "human", status: "filled", pending: "Q6",
      summary: "Private AI platform, infrastructure and data residency." },
    { id: "devops", name: "DevOps / Infrastructure Engineer", function: "technology", execution: "human", status: "filled",
      summary: "Infrastructure, deployment pipelines, Private AI platform health and maintenance." },
    { id: "product-manager", name: "Product Manager", function: "technology", execution: "agent", status: "filled", pending: "Q7",
      summary: "Feedback and roadmap synthesis; the Technology Lead makes the product decisions." },
    { id: "internal-engineer", name: "Internal Engineer", function: "technology", execution: "human", status: "filled",
      summary: "Build, patching and maintenance of internal tools and products." },
    { id: "rnd-engineer", name: "R&D Engineer", function: "technology", execution: "human", status: "vacant",
      summary: "Experimental builds, new tool evaluation, the Agent Build Backlog and R&D workshops." },
    { id: "security-engineer", name: "Security & Compliance Engineer", function: "technology", execution: "human", status: "fractional", pending: "Q8",
      summary: "Infrastructure security, vulnerability monitoring, data residency, compliance controls." },
    { id: "tool-monitoring", name: "Internal Tool Monitoring & Deployment", function: "technology", execution: "agent", status: "filled",
      summary: "Automated alerts, uptime checks, deployment pipeline runs." },

    /* Delivery & Client Ops */
    { id: "project-manager", name: "Project Manager", function: "delivery", execution: "human", status: "filled",
      summary: "Delivery tracking, client reporting, risk escalation and the roadmap cadence; collects the scorecard while the seat is vacant." },
    { id: "client-success", name: "Client Success", function: "delivery", execution: "human", status: "filled",
      summary: "Joins at discovery; owns follow-up, onboarding, the weekly value loop and the ongoing relationship." },
    { id: "hr-recruiter", name: "HR Recruiter", function: "delivery", execution: "human", status: "filled",
      summary: "Bench sourcing, screening and technical interview coordination." },
    { id: "business-analyst", name: "Business Analyst", function: "delivery", execution: "human", status: "filled",
      summary: "BOS data, operational intelligence, process documentation; operates the BOS agent." },
    { id: "ais-pool", name: "AIS Pool", function: "delivery", execution: "human", status: "filled",
      summary: "Billable AI Specialists embedded with clients." },
    { id: "l1-support", name: "L1 Client Support Interface", function: "delivery", execution: "agent", status: "filled", reviewers: ["client-success"], pending: "Q13",
      summary: "First-touch client queries, triage and escalation to Client Success." },
    { id: "bench-monitoring", name: "Bench & Capacity Monitoring", function: "delivery", execution: "agent", status: "filled", reviewers: ["hr-recruiter"], pending: "Q13",
      summary: "Utilisation tracking, availability forecasting, capacity alerts." },
    { id: "onboarding", name: "Onboarding & Offboarding", function: "delivery", execution: "agent", status: "filled", reviewers: ["hr-recruiter", "client-success"],
      summary: "Specialist and client onboarding and exit flows." },

    /* Finance & Legal */
    { id: "finance-coordinator", name: "Finance Coordinator", function: "finance", execution: "human", status: "filled",
      summary: "Bookkeeping, reconciliation and invoicing, with agentic support." },
    { id: "legal-contracts", name: "Legal & Contracts Coordinator", function: "finance", execution: "agent", status: "filled",
      summary: "Contract generation, NDA and MSA tracking." },
    { id: "compliance-calendar", name: "Compliance Calendar & Audit Trail", function: "finance", execution: "agent", status: "filled",
      summary: "Filing deadlines, regulatory calendar, audit log generation." }
  ],

  /* Assumptions shown until the CEO answers the open questions. */
  pending: {
    Q4: "Community & Thought Leadership reports to the Visionary, dotted to Marketing.",
    Q5: "Strategic Partnerships sits in Revenue.",
    Q6: "Two AI Architects (Solutions, Platform), both filled.",
    Q7: "Product Manager is agent-led.",
    Q8: "Security & Compliance Engineer is filled on a fractional basis.",
    Q9: "AI Strategist sits in Technology, held by the Visionary, lead closer for Revenue.",
    Q10: "Revenue Lead seat is covered by the Visionary on an interim basis.",
    Q11: "Partner Acquisition is held by the Marketing Lead.",
    Q12: "The COO Agent and the BOS agent are the same agent; the Business Analyst operates it.",
    Q13: "HR Recruiter reviews Bench & Capacity; Client Success reviews L1 Support."
  }
};
