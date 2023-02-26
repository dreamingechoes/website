import { GetStaticProps, InferGetStaticPropsType } from 'next'

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

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Hi folks!
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8 space-x-2">
            <Image
              src="/static/images/avatar.svg"
              alt="avatar"
              width="192px"
              height="192px"
              className="w-48 h-48 rounded-full"
            />
          </div>
          <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              My name is Iván González, a Software Engineer committed to promoting diversity and
              mental health awareness in the workplace. I am dedicated to fostering a culture of
              inclusivity and support within my teams.
            </p>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              As a product-focused engineer, I am driven to solve complex problems and deliver
              exceptional software solutions. I am also highly focused on team management,
              empowering and supporting engineers to reach their full potential while growing and
              developing their skills. I have successfully managed teams since 2020, and my team
              members have consistently exceeded expectations.
            </p>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              Since 2016, I have worked fully remote, enabling me to develop excellent remote
              collaboration skills and to adapt quickly to new tools and technologies. I am highly
              adaptable, flexible, and committed to delivering exceptional results. Whether working
              independently or as part of a team, I always strive to do my best, delivering
              high-quality software solutions.
            </p>
          </div>
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
