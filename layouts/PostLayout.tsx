import { ArrowUp, Clock } from 'lucide-react'
import { ReactNode, useEffect, useState } from 'react'

import { AuthorFrontMatter } from 'types/AuthorFrontMatter'
import { BlogSEO } from '@/components/SEO'
import Comments from '@/components/comments'
import Image from '@/components/Image'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import { PostFrontMatter } from 'types/PostFrontMatter'
import SectionContainer from '@/components/SectionContainer'
import { SeriesContext } from '@/lib/series'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`
const kofiUrl = () => `${siteMetadata.kofi}`
const mentorCruiseUrl = () => `${siteMetadata.mentorCruise}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface Props {
  frontMatter: PostFrontMatter
  authorDetails: AuthorFrontMatter[]
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
  seriesContext?: SeriesContext | null
  children: ReactNode
}

export default function PostLayout({
  frontMatter,
  authorDetails,
  next,
  prev,
  seriesContext,
  children,
}: Props) {
  const { slug, fileName, date, title, tags, readingTime } = frontMatter
  const seriesDetails = seriesContext && seriesContext.currentIndex !== -1 ? seriesContext : null
  const previousInSeries =
    seriesDetails && seriesDetails.currentIndex > 0
      ? seriesDetails.posts[seriesDetails.currentIndex - 1]
      : null

  const nextInSeries =
    seriesDetails &&
    seriesDetails.currentIndex > -1 &&
    seriesDetails.currentIndex < seriesDetails.posts.length - 1
      ? seriesDetails.posts[seriesDetails.currentIndex + 1]
      : null

  const readingTimeMinutes = readingTime ? Math.max(1, Math.round(readingTime.minutes)) : null
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const yOffset = window.scrollY || document.documentElement.scrollTop
      setShowScrollTop(yOffset > 400)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-4 text-center">
              <dl className="space-y-6">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <PageTitle>{title}</PageTitle>
            </div>
          </header>
          <div
            className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <dl className="pt-6 pb-10 xl:pt-11 xl:border-b xl:border-gray-200 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex justify-center space-x-8 xl:block sm:space-x-12 xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                    <li className="flex items-center space-x-2" key={author.name}>
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width={38}
                          height={38}
                          alt="avatar"
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      <dl className="text-sm font-medium leading-5 whitespace-nowrap">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              href={author.twitter}
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            >
                              {author.twitter.replace('https://x.com/', '@')}
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
              <div className="pt-10 pb-8">
                {readingTimeMinutes && (
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    <span>
                      Estimated reading time: {readingTimeMinutes}{' '}
                      {readingTimeMinutes === 1 ? 'minute' : 'minutes'}
                    </span>
                  </div>
                )}
                <div className="prose dark:prose-dark max-w-none">{children}</div>
              </div>
              <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
                <Link href={editUrl(fileName)}>{'View on GitHub'}</Link>
                <span className="mr-2 ml-2">·</span>
                <Link href={kofiUrl()}>{'Buy me a coffee'}</Link>
                <span className="mr-2 ml-2">·</span>
                <Link href={mentorCruiseUrl()}>{'Request a mentoring session'}</Link>
              </div>
              <Comments frontMatter={frontMatter} />
            </div>
            <footer>
              <div className="text-sm font-medium leading-5 divide-gray-200 xl:divide-y dark:divide-gray-700 xl:col-start-1 xl:row-start-2">
                {seriesDetails && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                      Series
                    </h2>
                    <div className="mt-1 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                      <p>
                        You&apos;re reading part {seriesDetails.currentIndex + 1} of{' '}
                        {seriesDetails.posts.length} in{' '}
                        <Link
                          href={`/series/${seriesDetails.meta.slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {seriesDetails.meta.title}
                        </Link>
                        .
                      </p>
                      {seriesDetails.meta.summary && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {seriesDetails.meta.summary}
                        </p>
                      )}
                      <div className="space-y-2">
                        {previousInSeries && (
                          <div>
                            <span className="font-semibold text-gray-700 dark:text-gray-200">
                              Previous in series
                            </span>
                            <div>
                              <Link
                                href={`/blog/${previousInSeries.slug}`}
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                              >
                                {previousInSeries.title}
                              </Link>
                            </div>
                          </div>
                        )}
                        {nextInSeries && (
                          <div>
                            <span className="font-semibold text-gray-700 dark:text-gray-200">
                              Next in series
                            </span>
                            <div>
                              <Link
                                href={`/blog/${nextInSeries.slug}`}
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                              >
                                {nextInSeries.title}
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Previous Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href="/blog"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
      {showScrollTop && (
        <button
          type="button"
          aria-label="Back to top"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg transition hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 dark:bg-primary-400 dark:text-gray-900 dark:hover:bg-primary-300"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </SectionContainer>
  )
}
