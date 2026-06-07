import { groq } from 'next-sanity'

export const ALL_BLOGS_QUERY = groq`
  *[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    category,
    summary,
    readingTime
  }
`

export const BLOG_BY_SLUG_QUERY = groq`
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    publishedAt,
    category,
    summary,
    content,
    readingTime
  }
`

export const ALL_PROJECTS_QUERY = groq`
  *[_type == "project"] {
    _id,
    title,
    "slug": slug.current,
    description,
    atmosphere,
    githubUrl,
    liveUrl,
    "coverImageUrl": coverImage.asset->url
  }
`
