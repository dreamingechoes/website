export type SeriesReference = {
  slug: string
  order?: number
}

export type PostFrontMatter = {
  title: string
  date: string
  tags: string[]
  lastmod?: string
  draft?: boolean
  summary?: string
  images?: string[]
  authors?: string[]
  layout?: string
  slug: string
  fileName: string
  cover?: string
  series?: SeriesReference | null
}
