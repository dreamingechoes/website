import { Github, Gitlab, Link as LinkIcon, Linkedin, Twitter } from 'lucide-react'

import { AuthorFrontMatter } from 'types/AuthorFrontMatter'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  frontMatter: AuthorFrontMatter
}

export default function AuthorLayout({ children, frontMatter }: Props) {
  const { name, avatar, occupation, company, twitter, github, gitlab, linkedin, linktree } =
    frontMatter

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8 space-x-2">
            <Image
              src={avatar}
              alt="avatar"
              width={192}
              height={192}
              className="w-48 h-48 rounded-full"
            />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex pt-6 gap-2">
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-primary-50 hover:text-primary-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {twitter && (
                <a
                  href={twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  title="X (Twitter)"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-primary-50 hover:text-primary-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-primary-50 hover:text-primary-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {gitlab && (
                <a
                  href={gitlab}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitLab"
                  title="GitLab"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-primary-50 hover:text-primary-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
                >
                  <Gitlab className="h-4 w-4" />
                </a>
              )}
              {linktree && (
                <a
                  href={linktree}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Linktree"
                  title="Linktree"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-primary-50 hover:text-primary-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
                >
                  <LinkIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
          <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">{children}</div>
        </div>
      </div>
    </>
  )
}
