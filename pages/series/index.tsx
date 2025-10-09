import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { SeriesWithPosts, collectSeriesFromPosts } from '@/lib/series'

import { Layers } from 'lucide-react'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import formatDate from '@/lib/utils/formatDate'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'

export const getStaticProps: GetStaticProps<{ series: SeriesWithPosts[] }> = async () => {
  const posts = await getAllFilesFrontMatter('blog')
  const series = collectSeriesFromPosts(posts)

  return {
    props: {
      series,
    },
  }
}

const formatPartCount = (count: number) => `${count} ${count === 1 ? 'post' : 'posts'}`

export default function SeriesIndex({ series }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={`Series - ${siteMetadata.author}`}
        description="Curated multi-part deep dives and themed explorations from the blog."
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Series Library
          </h1>
        </div>
        <div className="container py-12">
          {series.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">
              No series yet. Check back soon for new long-form explorations.
            </p>
          ) : (
            <div className="flex flex-wrap -m-4">
              {series.map((item) => (
                <div key={item.slug} className="w-full p-4 md:w-1/2" style={{ maxWidth: '544px' }}>
                  <article className="flex h-full flex-col border-2 border-gray-200 rounded-md border-opacity-60 dark:border-gray-700 bg-white/80 p-6 shadow-sm transition-shadow dark:border-gray-700 dark:bg-gray-900/40 backdrop-blur-sm">
                    <div className="flex-1 space-y-3 text-left">
                      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">
                        <Layers className="w-4 h-4" aria-hidden="true" />
                        <span>{formatPartCount(item.posts.length)}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        <Link href={`/series/${item.slug}`} className="hover:underline">
                          {item.title}
                        </Link>
                      </h2>
                      {item.summary && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">{item.summary}</p>
                      )}
                      {!item.summary && item.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                          {item.description}
                        </p>
                      )}
                      <div className="space-y-3">
                        {item.posts.slice(0, 2).map((post) => {
                          const partNumber =
                            post.series?.order ??
                            item.posts.findIndex((p) => p.slug === post.slug) + 1

                          return (
                            <div
                              key={post.slug}
                              className="text-sm text-gray-500 dark:text-gray-400"
                            >
                              <div className="font-medium text-gray-800 dark:text-gray-200">
                                <Link
                                  href={`/blog/${post.slug}`}
                                  className="hover:text-primary-600 dark:hover:text-primary-400"
                                >
                                  {post.title}
                                </Link>
                              </div>
                              <div className="text-xs">
                                {formatDate(post.date)} · Part {partNumber}
                              </div>
                            </div>
                          )
                        })}
                        {item.posts.length > 2 && (
                          <Link
                            href={`/series/${item.slug}`}
                            className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                          >
                            View all parts →
                          </Link>
                        )}
                      </div>
                    </div>
                    {item.cta?.href && item.cta?.label && (
                      <div className="mt-4 border-t border-gray-200 pt-4 text-sm dark:border-gray-700">
                        <Link
                          href={item.cta.href}
                          className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                          {item.cta.label}
                        </Link>
                      </div>
                    )}
                  </article>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
