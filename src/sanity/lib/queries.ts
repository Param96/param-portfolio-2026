import { groq } from 'next-sanity';

// Lab Notes (AI Lab Corkboard)
export const LAB_NOTES_QUERY = groq`
  *[_type == "labNote"] | order(publishedAt desc) {
    _id,
    title,
    body,
    color,
    pinStyle,
    tag,
    publishedAt
  }
`;

// Shared eligibility for article lists, detail routes, and the public sitemap.
// Sanity's published perspective additionally excludes drafts and release versions.
const PUBLIC_ARTICLE_FILTER = groq`defined(slug.current) && slug.current != "" && defined(title) && (!defined(publishedAt) || dateTime(publishedAt) <= dateTime(now()))`;

export const SITEMAP_QUERY = groq`
  *[_type in ["blog", "research"] && ${PUBLIC_ARTICLE_FILTER}] {
    "type": _type, "slug": slug.current, _updatedAt
  }
`;

// Blogs
export const ALL_BLOGS_QUERY = groq`
  *[_type == "blog" && ${PUBLIC_ARTICLE_FILTER}] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    _updatedAt,
    category,
    atmosphere,
    isFeatured,
    summary,
    readingTime,
    "coverImageUrl": coverImage.asset->url,
    "featuredImageUrl": featuredImage.asset->url
  }
`;

export const FEATURED_BLOGS_QUERY = groq`
  *[_type == "blog" && ${PUBLIC_ARTICLE_FILTER} && isFeatured == true] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    _updatedAt,
    category,
    summary,
    readingTime,
    "coverImageUrl": coverImage.asset->url
  }
`;

export const BLOG_BY_SLUG_QUERY = groq`
  *[_type == "blog" && ${PUBLIC_ARTICLE_FILTER} && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    _updatedAt,
    category,
    atmosphere,
    isFeatured,
    tableOfContents,
    summary,
    content,
    readingTime,
    "coverImageUrl": coverImage.asset->url,
    "featuredImageUrl": featuredImage.asset->url,
    relatedArticles[]->{
      _id,
      title,
      "slug": slug.current,
      "coverImageUrl": coverImage.asset->url
    },
    seo
  }
`;

// Projects
export const ALL_PROJECTS_QUERY = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    status,
    atmosphere,
    featured,
    githubUrl,
    liveUrl,
    techStack,
    "coverImageUrl": coverImage.asset->url
  }
`;

export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    status,
    atmosphere,
    githubUrl,
    liveUrl,
    techStack,
    "coverImageUrl": coverImage.asset->url,
    "architectureDiagramUrl": architectureDiagram.asset->url,
    gallery[]{
      "url": asset->url,
      caption,
      alt
    },
    content,
    seo
  }
`;

export const REPOSITORY_GALAXY_QUERY = groq`
  *[_type == "project"] {
    _id,
    title,
    "slug": slug.current,
    status,
    techStack,
    category
  }
`;

// Lab Notes
export const ALL_LAB_NOTES_QUERY = groq`
  *[_type == "labNote"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    experimentStatus,
    mood,
    tags,
    excerpt,
    linkedProject->{
      _id,
      title,
      "slug": slug.current
    }
  }
`;

export const LAB_NOTE_BY_SLUG_QUERY = groq`
  *[_type == "labNote" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    experimentStatus,
    mood,
    tags,
    excerpt,
    content,
    linkedProject->{
      _id,
      title,
      "slug": slug.current,
      atmosphere
    },
    seo
  }
`;

// Research
export const RESEARCH_PAGE_QUERY = groq`
  *[_type == "researchPage"][0] {
    roleTitle,
    roleDescription,
    node1,
    node2
  }
`;
export const ALL_RESEARCH_QUERY = groq`
  *[_type == "research" && ${PUBLIC_ARTICLE_FILTER}] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    status,
    domains,
    publishedAt
  }
`;

export const RESEARCH_BY_SLUG_QUERY = groq`
  *[_type == "research" && ${PUBLIC_ARTICLE_FILTER} && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    status,
    domains,
    role,
    contributions,
    systemVisualization,
    publishedAt,
    _updatedAt,
    institution,
    collaborators,
    content,
    relatedProjects[]->{
      _id,
      title,
      "slug": slug.current,
      atmosphere,
      "coverImageUrl": coverImage.asset->url
    },
    seo
  }
`;

// Pages
export const PAGE_BY_SLUG_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    modules[]{
      ...,
      _type == "researchShowcase" => {
        "researchProject": researchProject->{
          title,
          "slug": slug.current,
          description,
          status,
          domains
        }
      },
      _type == "mediaGallery" => {
        items[]{
          "url": asset->url,
          caption
        }
      }
    },
    seo
  }
`;

export const HOMEPAGE_QUERY = groq`
  *[_type == "page" && slug.current == "home"][0] {
    _id,
    title,
    "slug": slug.current,
    modules[]{
      ...,
      _type == "researchShowcase" => {
        "researchProject": researchProject->{
          title,
          "slug": slug.current,
          description,
          status,
          domains
        }
      },
      _type == "mediaGallery" => {
        items[]{
          "url": asset->url,
          caption
        }
      }
    },
    seo
  }
`;

// Settings
export const SETTINGS_QUERY = groq`
  *[_type == "settings"][0] {
    siteName,
    globalSeo,
    navigation,
    footer,
    socialLinks,
    contactEmail,
    cursorStyle,
    globalAtmosphere,
    analyticsId
  }
`;
