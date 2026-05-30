import Head from 'next/head'
import Image from 'next/image'
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
          Engineering Leader
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
          , an <strong>Engineering Leader</strong> and <strong>Senior Software Engineer</strong>{' '}
          from the north of Spain, committed to promoting{' '}
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
      </div>
    </>
  )
}
