/**
 * Central SEO Constants & Structured Data Helpers
 * Single source of truth for all SEO-related configuration across the portfolio.
 */

export const SITE_URL = "https://www.parampatel.in";
export const SITE_NAME = "Param Patel";
export const AUTHOR_NAME = "Param Patel";
export const AUTHOR_EMAIL = "paramppatel100@gmail.com";

export const SOCIAL_PROFILES = {
  github: "https://github.com/Param96",
  linkedin: "https://www.linkedin.com/in/paramp06/",
  instagram: "https://www.instagram.com/param_230/",
} as const;

/**
 * Complete Person JSON-LD schema — used globally in the root layout.
 * Enriched for Google Knowledge Panel and E-E-A-T signals.
 */
export const PERSON_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: AUTHOR_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/founder.jpg`,
  description:
    "AI/ML Engineer, Full Stack Engineer, and Builder creating agentic AI systems, intelligent products, and scalable software from India.",
  jobTitle: ["AI/ML Engineer", "Full Stack Engineer", "Software Engineer"],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Agentic AI Systems",
    "Full Stack Development",
    "Deep Learning",
    "Natural Language Processing",
    "Computer Vision",
    "Intelligent Systems",
    "Software Engineering",
    "Startup Building",
    "Python",
    "TypeScript",
    "Next.js",
    "React",
  ],
  sameAs: [
    SOCIAL_PROFILES.github,
    SOCIAL_PROFILES.linkedin,
    SOCIAL_PROFILES.instagram,
  ],
  nationality: {
    "@type": "Country",
    name: "India",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "University",
  },
};

/**
 * ProfilePage JSON-LD — signals to Google this is the authoritative profile page.
 */
export const PROFILE_PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  mainEntity: { "@id": `${SITE_URL}/#person` },
  name: `${AUTHOR_NAME} — Portfolio`,
  url: SITE_URL,
  description:
    "Official portfolio of Param Patel — AI/ML Engineer, Full Stack Engineer, and Builder based in India.",
};

/**
 * WebSite JSON-LD — used on the homepage for sitelinks eligibility.
 */
export const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#person` },
  inLanguage: "en-US",
};

/**
 * Generates BreadcrumbList JSON-LD from an array of breadcrumb items.
 */
export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; href: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href.startsWith("http") ? item.href : `${SITE_URL}${item.href}`,
    })),
  };
}

/**
 * Generates BlogPosting JSON-LD for a blog article.
 */
export function generateBlogPostingJsonLd(article: {
  title: string;
  summary?: string;
  publishedAt?: string;
  updatedAt?: string;
  slug: string;
  coverImageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.summary || article.title,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${article.slug}`,
    },
    url: `${SITE_URL}/blog/${article.slug}`,
    ...(article.coverImageUrl && {
      image: {
        "@type": "ImageObject",
        url: article.coverImageUrl,
      },
    }),
  };
}

/**
 * Generates Article JSON-LD for a research article.
 */
export function generateArticleJsonLd(research: {
  title: string;
  description?: string;
  publishedAt?: string;
  updatedAt?: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: research.title,
    description: research.description || research.title,
    datePublished: research.publishedAt,
    dateModified: research.updatedAt || research.publishedAt,
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/research/${research.slug}`,
    },
    url: `${SITE_URL}/research/${research.slug}`,
  };
}

/**
 * Generates CollectionPage JSON-LD for listing pages.
 */
export function generateCollectionPageJsonLd(page: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: page.name,
    description: page.description,
    url: page.url.startsWith("http") ? page.url : `${SITE_URL}${page.url}`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
  };
}
