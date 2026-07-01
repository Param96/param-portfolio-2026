import { groq } from 'next-sanity';

// Blogs
export const ALL_BLOGS_QUERY = groq`
  *[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
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
  *[_type == "blog" && isFeatured == true] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    category,
    summary,
    readingTime,
    "coverImageUrl": coverImage.asset->url
  }
`;

export const BLOG_BY_SLUG_QUERY = groq`
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
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
  *[_type == "research"] | order(publishedAt desc) {
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
  *[_type == "research" && slug.current == $slug][0] {
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
