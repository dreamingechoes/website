import { AuthorFrontMatter } from 'types/AuthorFrontMatter'
import Head from 'next/head'
import { PostFrontMatter } from 'types/PostFrontMatter'
import siteMetadata from '@/data/siteMetadata'
import { useRouter } from 'next/router'

const getRuntimeSiteUrl = () =>
  (process.env.NEXT_PUBLIC_SITE_URL || siteMetadata.siteUrl).replace(/\/$/, '')

interface CommonSEOProps {
  title: string
  description: string
  ogType: string
  ogImage:
    | string
    | {
        '@type': string
        url: string
      }[]
  twImage: string
}

const CommonSEO = ({ title, description, ogType, ogImage, twImage }: CommonSEOProps) => {
  const router = useRouter()
  const siteUrl = getRuntimeSiteUrl()
  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={description} />
      <meta property="og:url" content={`${siteUrl}${router.asPath}`} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      {Array.isArray(ogImage) ? (
        ogImage.map(({ url }) => <meta property="og:image" content={url} key={url} />)
      ) : (
        <meta property="og:image" content={ogImage} key={ogImage} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteMetadata.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twImage} />
    </Head>
  )
}

interface PageSEOProps {
  title: string
  description: string
}

export const PageSEO = ({ title, description }: PageSEOProps) => {
  const siteUrl = getRuntimeSiteUrl()
  const ogImageUrl = siteUrl + siteMetadata.socialBanner
  const twImageUrl = siteUrl + siteMetadata.socialBanner
  return (
    <CommonSEO
      title={title}
      description={description}
      ogType="website"
      ogImage={ogImageUrl}
      twImage={twImageUrl}
    />
  )
}

export const TagSEO = ({ title, description }: PageSEOProps) => {
  const siteUrl = getRuntimeSiteUrl()
  const ogImageUrl = siteUrl + siteMetadata.socialBanner
  const twImageUrl = siteUrl + siteMetadata.socialBanner
  const router = useRouter()
  return (
    <>
      <CommonSEO
        title={title}
        description={description}
        ogType="website"
        ogImage={ogImageUrl}
        twImage={twImageUrl}
      />
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${description} - RSS feed`}
          href={`${siteUrl}${router.asPath}/feed.xml`}
        />
      </Head>
    </>
  )
}

interface BlogSeoProps extends PostFrontMatter {
  authorDetails?: AuthorFrontMatter[]
  url: string
}

export const BlogSEO = ({
  authorDetails,
  title,
  summary,
  date,
  lastmod,
  url,
  tags,
  images = [],
}: BlogSeoProps) => {
  const router = useRouter()
  const siteUrl = getRuntimeSiteUrl()
  const publishedAt = new Date(date).toISOString()
  const modifiedAt = new Date(lastmod || date).toISOString()
  const resolvedImages = (typeof images === 'string' ? [images] : images).filter(Boolean)
  const titleForImage = title.slice(0, 140)
  const summaryForImage = (summary ?? siteMetadata.description)?.replace(/\s+/g, ' ').slice(0, 200)
  const ogParams = new URLSearchParams({ title: titleForImage })
  if (summaryForImage) ogParams.set('summary', summaryForImage)
  const dynamicOgImageUrl = `${siteUrl}/api/og?${ogParams.toString()}`

  const resolveImageUrl = (img: string) => (img.startsWith('http') ? img : `${siteUrl}${img}`)

  const ogImageUrls =
    resolvedImages.length > 0
      ? resolvedImages.map((img) => resolveImageUrl(img))
      : [dynamicOgImageUrl]

  const featuredImages = ogImageUrls.map((url) => {
    return {
      '@type': 'ImageObject',
      url,
    }
  })

  let authorList
  if (authorDetails) {
    authorList = authorDetails.map((author) => {
      return {
        '@type': 'Person',
        name: author.name,
      }
    })
  } else {
    authorList = {
      '@type': 'Person',
      name: siteMetadata.author,
    }
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    image: featuredImages,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: authorList,
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.author,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
      },
    },
    description: summary,
  }

  const twImageUrl = ogImageUrls[0]

  return (
    <>
      <CommonSEO
        title={title}
        description={summary}
        ogType="article"
        ogImage={featuredImages}
        twImage={twImageUrl}
      />
      <Head>
        {date && <meta property="article:published_time" content={publishedAt} />}
        {lastmod && <meta property="article:modified_time" content={modifiedAt} />}
        <link rel="canonical" href={`${siteUrl}${router.asPath}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
        />
      </Head>
    </>
  )
}
