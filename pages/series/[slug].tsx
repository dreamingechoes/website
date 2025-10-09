import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { SeriesWithPosts, collectSeriesFromPosts } from '@/lib/series'

import { Layers } from 'lucide-react'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import formatDate from '@/lib/utils/formatDate'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllFilesFrontMatter('blog')
  const series = collectSeriesFromPosts(posts)

  return {
    paths: series.map((item) => ({
      params: { slug: item.slug },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{ series: SeriesWithPosts }> = async (context) => {
  const slug = context.params?.slug as string
  const posts = await getAllFilesFrontMatter('blog')
  const seriesList = collectSeriesFromPosts(posts)
  const series = seriesList.find((item) => item.slug === slug)

  if (!series) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      series,
    },
  }
}

const partNumberForPost = (index: number, postOrder?: number) =>
  typeof postOrder === 'number' ? postOrder : index + 1

export default function SeriesDetail({ series }: InferGetStaticPropsType<typeof getStaticProps>) {
  const totalPartsLabel = `${series.posts.length} ${series.posts.length === 1 ? 'Post' : 'Posts'}`

  return (
    <>
      <PageSEO
        title={`${series.title} - ${siteMetadata.title}`}
        description={
          series.summary ||
          series.description ||
          `A curated collection of ${series.posts.length} posts from ${siteMetadata.author}.`
        }
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-tight">
            {series.title}
          </h1>
        </div>
        <div className="pt-8 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-primary-600 uppercase dark:text-primary-400">
              <Layers className="w-4 h-4" aria-hidden="true" />
              <span>{totalPartsLabel}</span>
            </div>
            {series.description && (
              <p className="text-base text-gray-600 dark:text-gray-300">{series.description}</p>
            )}
            {series.cta?.href && series.cta?.label && (
              <p className="text-sm">
                <Link
                  href={series.cta.href}
                  className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  {series.cta.label}
                </Link>
              </p>
            )}
          </div>
          <ol className="space-y-8">
            {series.posts.map((post, index) => {
              const partNumber = partNumberForPost(index, post.series?.order)
              return (
                <li
                  key={post.slug}
                  className="p-6 border border-gray-200 rounded-lg dark:border-gray-700 bg-white/70 dark:bg-gray-900/40 backdrop-blur"
                >
                  <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-baseline sm:justify-between">
                    <div className="inline-flex self-start items-center px-2.5 py-1 text-xs font-semibold tracking-wide uppercase rounded-md text-primary-700 bg-primary-100/70 dark:bg-primary-900/40 dark:text-primary-300">
                      Part {partNumber}
                    </div>
                    <time
                      dateTime={post.date}
                      className="text-sm font-medium text-gray-500 dark:text-gray-400"
                    >
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <div className="mt-4 space-y-3">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    {post.summary && (
                      <p className="text-sm text-gray-600 dark:text-gray-300">{post.summary}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </>
  )
}
