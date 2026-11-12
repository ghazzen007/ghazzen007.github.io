/**
 * Project catalogue used by the Home and Projects pages.
 * Edit this file to add, remove or reorder projects — no HTML changes needed.
 *
 * category: "fullstack" | "ai" | "automation" | "internship"
 * links:    only the links you fill in are shown on the card
 */

const GITHUB = "https://github.com/ghazzen007";

window.PROJECTS = [
  {
    id: "sentinelle",
    title: "SENTINELLE",
    category: "ai",
    year: "2026",
    badge: { label: "National hackathon finalist", award: true },
    featured: true,
    summary:
      "Built with team TASHIL for the national “AI & Public Finance” hackathon. The platform reads company financial statements with OCR, flags anomalies, scores each company’s compliance risk and writes an audit note that explains the score, so tax inspectors know where to look first.",
    stack: ["OCR", "Python", "Node.js", "Groq LLM", "PostgreSQL"],
    links: {},
    thumb: "assets/img/projects/sentinelle.svg",
  },
  {
    id: "credishield",
    title: "CrediShield AI",
    category: "fullstack",
    year: "2026",
    featured: true,
    summary:
      "A multi-tenant credit-risk platform for financial analysts. It imports balance sheets from Excel (French or English labels), runs a deterministic ratio engine, drafts an AI credit memo and exports it to PDF, with an approval workflow and a full audit log.",
    stack: ["TypeScript", "Node.js", "Express", "Drizzle ORM", "PostgreSQL", "Next.js", "JWT"],
    links: {},
    thumb: "assets/img/projects/credishield.svg",
  },
  {
    id: "sweven-store",
    title: "Sweven Store",
    category: "internship",
    year: "2026",
    badge: { label: "Auspify internship" },
    featured: true,
    summary:
      "A full-stack e-commerce site for a streetwear brand: product catalogue with search and filters, persistent cart, checkout, order history and an admin area to manage products, stock and order status.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    links: { code: `${GITHUB}/auspify-ecommerce-website`, demo: "" },
    thumb: "assets/img/projects/sweven-store.png",
  },
  {
    id: "mizan",
    title: "Mizan expense tracker",
    category: "internship",
    year: "2026",
    badge: { label: "Auspify internship" },
    summary:
      "A personal finance app with secure accounts. Users log income and expenses, set monthly budgets per category and read clear reports: balance, monthly trends and where the money goes.",
    stack: ["React", "Recharts", "Node.js", "Express", "MongoDB", "JWT"],
    links: { code: `${GITHUB}/auspify-expense-tracker`, demo: "" },
    thumb: "assets/img/projects/mizan.png",
  },
  {
    id: "campus-registry",
    title: "Campus Registry",
    category: "internship",
    year: "2026",
    badge: { label: "Auspify internship" },
    summary:
      "A student management system for a school office: add, edit and remove student records, search and filter by programme, year or status, and open a full profile for each student.",
    stack: ["React", "Node.js", "Express", "MongoDB", "REST API"],
    links: { code: `${GITHUB}/auspify-student-management`, demo: "" },
    thumb: "assets/img/projects/campus-registry.png",
  },
  {
    id: "jarvis",
    title: "Financial AI Agent",
    category: "ai",
    year: "2026",
    summary:
      "A desktop agent that takes a scanned PDF of financial statements, recognises each section (balance sheet, income statement, cash flow, notes), splits it into separate files named after the company and files them in the right folders.",
    stack: ["Python", "PyMuPDF", "Tesseract OCR", "Groq LLM", "SQLite", "CustomTkinter"],
    links: {},
    thumb: "assets/img/projects/jarvis.svg",
  },
  {
    id: "smartspace",
    title: "SmartSpace",
    category: "fullstack",
    year: "2026",
    summary:
      "A REST API for booking campus rooms and equipment, built in a team of five. Clean layered architecture, MySQL persistence with JPA and every endpoint covered by a Postman collection.",
    stack: ["Java", "Spring Boot", "Spring Data JPA", "MySQL", "Postman"],
    links: {},
    thumb: "assets/img/projects/smartspace.svg",
  },
  {
    id: "internship-radar",
    title: "Internship radar",
    category: "automation",
    year: "2026",
    summary:
      "A scheduled job that scans internship postings from several job sites every morning, keeps the remote offers that match my profile and sends the shortlist to my phone through a Telegram bot. Runs for free on GitHub Actions.",
    stack: ["GitHub Actions", "Web scraping", "Telegram Bot API"],
    links: {},
    thumb: "assets/img/projects/radar.svg",
  },
  {
    id: "cart-recovery",
    title: "Abandoned-cart recovery",
    category: "automation",
    year: "2025",
    summary:
      "An n8n workflow that spots abandoned online carts and sends the customer a friendly reminder through a Telegram bot. Self-hosted with Docker to keep the running cost at zero.",
    stack: ["n8n", "Docker", "Telegram Bot API", "Webhooks"],
    links: {},
    thumb: "assets/img/projects/cart-recovery.svg",
  },
  {
    id: "pharmacy",
    title: "Neighbourhood pharmacy manager",
    category: "fullstack",
    year: "2025",
    summary:
      "A web application for a small pharmacy: medicine stock, sales and suppliers, with alerts for low stock and expiry dates.",
    stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    links: {},
    thumb: "assets/img/projects/pharmacy.svg",
  },
];

window.PROJECT_FILTERS = [
  { id: "all", label: "All work" },
  { id: "internship", label: "Internship projects" },
  { id: "fullstack", label: "Full-stack" },
  { id: "ai", label: "AI & documents" },
  { id: "automation", label: "Automation" },
];
