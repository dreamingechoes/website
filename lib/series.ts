import { SeriesDefinition, ensureSeriesDefinition, seriesData } from '@/data/seriesData'

import { PostFrontMatter } from 'types/PostFrontMatter'

const SERIES_POST_ORDER_FALLBACK = Number.MAX_SAFE_INTEGER

const normalizeOrder = (post: PostFrontMatter) => {
  if (post.series?.order === undefined || post.series?.order === null) {
    return SERIES_POST_ORDER_FALLBACK
  }

  const parsed = Number(post.series.order)
  return Number.isNaN(parsed) ? SERIES_POST_ORDER_FALLBACK : parsed
}

const sortSeriesPosts = (posts: PostFrontMatter[]) =>
  [...posts].sort((a, b) => {
    const orderDelta = normalizeOrder(a) - normalizeOrder(b)
    if (orderDelta !== 0) {
      return orderDelta
    }

    // Fallback to publish date desc (earlier first)
    if (a.date && b.date) {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    }

    return (a.title ?? '').localeCompare(b.title ?? '')
  })

export type SeriesWithPosts = SeriesDefinition & {
  posts: PostFrontMatter[]
}

export const collectSeriesFromPosts = (posts: PostFrontMatter[]): SeriesWithPosts[] => {
  const grouped = posts.reduce<Record<string, PostFrontMatter[]>>((acc, post) => {
    const slug = post.series?.slug
    if (!slug) {
      return acc
    }
    if (!acc[slug]) {
      acc[slug] = []
    }
    acc[slug].push(post)
    return acc
  }, {})

  return Object.entries(grouped)
    .map(([slug, seriesPosts]) => ({
      ...ensureSeriesDefinition(slug),
      posts: sortSeriesPosts(seriesPosts),
    }))
    .sort((a, b) => a.title.localeCompare(b.title))
}

export type SeriesContext = {
  meta: SeriesDefinition
  posts: PostFrontMatter[]
  currentIndex: number
}

export const buildSeriesContext = (
  allPosts: PostFrontMatter[],
  seriesSlug: string,
  currentSlug: string
): SeriesContext | null => {
  const matchingPosts = allPosts.filter((post) => post.series?.slug === seriesSlug)
  if (matchingPosts.length === 0) {
    return null
  }

  const orderedPosts = sortSeriesPosts(matchingPosts)
  const currentIndex = orderedPosts.findIndex((post) => post.slug === currentSlug)

  return {
    meta: ensureSeriesDefinition(seriesSlug),
    posts: orderedPosts,
    currentIndex,
  }
}

export const getSeriesMeta = (slug: string): SeriesDefinition => ensureSeriesDefinition(slug)

export const listAvailableSeries = (): SeriesDefinition[] =>
  Object.keys(seriesData).map((slug) => ensureSeriesDefinition(slug))
