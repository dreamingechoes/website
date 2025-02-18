import { GetStaticProps } from 'next'
import Image from 'next/image'
import NewsletterForm from '@/components/NewsletterForm'
import { PageSEO } from '@/components/SEO'
import { PostFrontMatter } from 'types/PostFrontMatter'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'

export const getStaticProps: GetStaticProps<{ posts: PostFrontMatter[] }> = async () => {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home() {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="grid xl:grid-cols-3 grid-cols-1 gap-x-8 pt-6 xl:pb-4 pb-2 space-y-2 text-center">
        <div className="xl:col-span-1 xl:col-start-2">
          <Image
            src="/static/images/avatar.svg"
            alt="avatar"
            width="192px"
            height="192px"
            className="w-48 h-48 rounded-full"
          />
          <h1 className="xl:text-3xl text-1xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            Iván González Sáiz
          </h1>
          <h2 className="xl:text-2xl text-1xl tracking-tight text-gray-500 dark:text-gray-100">
            Software Engineer
          </h2>
        </div>
      </div>

      <div className="grid xl:grid-cols-5 grid-cols-1 space-y-2 gap-x-8 space-y-0">
        <div className="xl:col-span-3 xl:col-start-2 pt-4 pb-4 prose dark:prose-dark max-w-none text-center">
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            My name is{' '}
            <strong className="underline underline-offset-4 decoration-4 decoration-yellow-300">
              Iván
            </strong>
            , an engineering team leader from the north of Spain, committed to promoting{' '}
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
      </div>
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
