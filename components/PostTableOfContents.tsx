import { ChevronDown, ListTree } from 'lucide-react'

import { Toc } from 'types/Toc'

interface PostTableOfContentsProps {
  toc?: Toc
}

const getIndentClass = (depth: number) => {
  if (depth >= 4) return 'pl-8'
  if (depth === 3) return 'pl-4'
  return ''
}

export default function PostTableOfContents({ toc = [] }: PostTableOfContentsProps) {
  const headings = toc.filter((heading) => heading.depth >= 2 && heading.depth <= 4)

  if (headings.length === 0) return null

  return (
    <details className="toc group overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/60">
      <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-700/50 [&::-webkit-details-marker]:hidden">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300">
          <ListTree className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="flex-1">Table of contents</span>
        <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
          {headings.length} {headings.length === 1 ? 'section' : 'sections'}
        </span>
        <ChevronDown
          className="h-4 w-4 text-gray-500 transition-transform group-open:rotate-180 dark:text-gray-400"
          aria-hidden="true"
        />
      </summary>
      <nav
        className="border-t border-gray-200 px-4 py-3 dark:border-gray-700"
        aria-label="Table of contents"
      >
        <ul className="space-y-1">
          {headings.map((heading, index) => (
            <li key={`${heading.url}-${index}`} className={getIndentClass(heading.depth)}>
              <a
                href={heading.url}
                className="block rounded-md px-2 py-1.5 text-sm text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-700 dark:text-gray-300 dark:hover:bg-primary-900/30 dark:hover:text-primary-300"
              >
                {heading.value}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  )
}
