/**
 * Single source of truth for identity facts shown on the site, in JSON-LD,
 * in llms.txt and in the AI assistant's knowledge base.
 * Every statement here was checked against public evidence on 2 Nov 2026
 * (GitHub, releases, Microsoft Store, live URLs). Nothing is estimated.
 */
export const profile = {
  name: "Dhrubojyoti Gangopadhyay",
  shortName: "Dhrubo",
  businessName: "Dhrubo AI Builder",
  headline: "Forward Deployed & Applied AI Engineer",
  tagline: "Agentic systems, MCP integration and enterprise workflow automation. Built in the open, gated by human approval.",
  location: { city: "Kolkata", region: "West Bengal", country: "India", countryCode: "IN" },
  availability: "Open to forward deployed / applied AI engineering roles (India or remote) and scoped AI implementation engagements.",
  email: "dhrubojyoti.gangopadhyay@gmail.com",
  phoneDisplay: "+91 82408 01921",
  phoneE164: "+918240801921",
  whatsapp: "https://wa.me/918240801921",
  github: "https://github.com/ganguydhrubo",
  linkedin: "https://www.linkedin.com/in/dhrubojyoti-gangopadhyay/",
  x: "https://x.com/DhruboZ4U",
  youtube: "https://www.youtube.com/@DhruboZ",
  instagram: "https://www.instagram.com/dhruboz4u/",
  facebook: "https://www.facebook.com/DhruboZ",
  devto: "https://dev.to/dhrubojyoti",
  resumePath: "/Dhrubojyoti_Gangopadhyay_CV.pdf",
  portrait: "/dhrubo-portrait.jpg",
  yearsEnterprise: 16,
  languages: ["English", "Hindi", "Bengali"],
  education: {
    degree: "MBA, Operations Management & Marketing",
    school: "University of Kalyani",
    years: "2005 – 2007",
  },
  roles: [
    {
      title: "Forward Deployed AI Engineer",
      org: "1XL Universe",
      period: "Jul 2026 – present",
      summary:
        "Owns AI adoption across HR, sales, marketing, operations, support, finance and technology: turns departmental problems into scoped LLM workflows, writes role-specific AI curricula and field manuals, and advises on WhatsApp and agentic-workflow infrastructure.",
    },
    {
      title: "Founder & Applied AI Engineer",
      org: "Dhrubo AI Studio (self-employed)",
      period: "Jan 2024 – present",
      summary:
        "Built and shipped Sahkarmi and three live web products (atittle.com, auraleads.online, zappy.rest), plus a dozen public LangGraph and RAG prototypes.",
    },
    {
      title: "AGM, Revenue Operations & Commercial Execution",
      org: "Shyam Steel / Tech Nirman Ispat",
      period: "Nov 2022 – Dec 2023",
      summary: "Worked inside dealer and distributor teams to turn fulfilment and collection problems into reporting frameworks.",
    },
    {
      title: "AGM, Revenue Operations & Channel Performance",
      org: "Star Cement",
      period: "Feb 2021 – Nov 2022",
      summary: "Grew share across a multi-state North East India distributor network through pipeline visibility and execution discipline.",
    },
    {
      title: "Senior Manager, Market Intelligence & Revenue Systems",
      org: "MP Birla Cement",
      period: "Jun 2016 – Jan 2021",
      summary: "Built audit-ready dealer rebate and incentive systems and corrected structural calculation errors across a national network.",
    },
    {
      title: "Channel and revenue roles",
      org: "Lafarge India, ACC Limited, Ramco Cements, Johnson & Johnson",
      period: "2007 – 2016",
      summary: "Territory, channel and distribution roles in building materials and consumer healthcare.",
    },
  ],
  /** Verified public numbers, with the date they were checked. */
  proof: [
    { value: "50", label: "tagged Sahkarmi releases", detail: "v0.3.0 (19 Oct 2026) to v0.17.1 (2 Nov 2026)", href: "https://github.com/ganguydhrubo/sahakarmi/releases" },
    { value: "277", label: "commits, 72 merged PRs", detail: "github.com/ganguydhrubo/sahakarmi, checked 2 Nov 2026", href: "https://github.com/ganguydhrubo/sahakarmi/pulls?q=is%3Apr+is%3Amerged" },
    { value: "3", label: "live web products", detail: "atittle.com, auraleads.online, zappy.rest", href: "/projects" },
    { value: "16", label: "years enterprise revenue ops", detail: "2007 – 2023, AGM level in cement and steel", href: "/about" },
  ],
  verifiedOn: "2026-11-02",
} as const;

export type Profile = typeof profile;
