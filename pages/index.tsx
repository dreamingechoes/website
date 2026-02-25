import Head from 'next/head'
import Image from 'next/image'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function Home() {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Iván González Sáiz',
    url: siteMetadata.siteUrl,
    jobTitle: 'Engineering Lead',
    sameAs: [siteMetadata.github, siteMetadata.twitter, siteMetadata.linkedin].filter(Boolean),
  }

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd, null, 2) }}
        />
      </Head>

      {/* Hero */}
      <div className="pt-6 pb-4 text-center">
        <Image
          src="/static/images/avatar.svg"
          alt="Iván González Sáiz"
          width={192}
          height={192}
          className="mx-auto w-48 h-48 rounded-full"
          loading="eager"
        />
        <h1 className="mt-2 xl:text-3xl text-1xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          Iván González Sáiz
        </h1>
        <h2 className="xl:text-2xl text-1xl tracking-tight text-gray-500 dark:text-gray-100">
          Engineering Lead
        </h2>
      </div>

      <div className="mt-4 mx-auto max-w-3xl text-center">
        <h3 className="xl:text-1xl text-lg tracking-tight text-gray-700 dark:text-gray-100">
          Helping teams build better products
        </h3>
        <p className="mt-2 text-lg leading-7 text-gray-500 dark:text-gray-400">
          My name is{' '}
          <strong className="underline underline-offset-4 decoration-4 decoration-yellow-300">
            Iván
          </strong>
          , a <strong>Senior Software Engineer</strong> and <strong>Engineering Lead</strong> from
          the north of Spain, committed to promoting{' '}
          <strong className="underline underline-offset-4 decoration-4 decoration-rose-300">
            diversity
          </strong>{' '}
          and{' '}
          <strong className="underline underline-offset-4 decoration-4 decoration-green-300">
            mental health
          </strong>{' '}
          awareness in the tech community. I'm dedicated to fostering a culture of{' '}
          <strong className="underline underline-offset-4 decoration-4 decoration-purple-300">
            inclusivity
          </strong>{' '}
          and{' '}
          <strong className="underline underline-offset-4 decoration-4 decoration-blue-300">
            support
          </strong>{' '}
          within my teams.
        </p>
        <p className="mt-3 text-base leading-7 text-gray-500 dark:text-gray-400">
          Through writing, mentoring, and practical leadership frameworks, I share what I've learned
          about building strong teams, better decisions, and more sustainable ways of working.
        </p>

        {/* CTAs */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/cv"
            className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Let's work together
          </Link>
          <Link
            href="/playbook"
            className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-200 bg-stone-50 dark:bg-gray-800 rounded-lg hover:bg-stone-200 dark:hover:bg-gray-700 transition-colors duration-150 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Explore my Playbook
          </Link>
        </div>
      </div>
    </>
  )
}
