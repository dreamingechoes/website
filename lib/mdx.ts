import { PostFrontMatter, SeriesReference } from 'types/PostFrontMatter'

import { AuthorFrontMatter } from 'types/AuthorFrontMatter'
import { Toc } from 'types/Toc'
import { bundleMDX } from 'mdx-bundler'
import fs from 'fs'
import getAllFilesRecursively from './utils/files'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCitation from 'rehype-citation'
import rehypeKatex from 'rehype-katex'
import rehypePrismPlus from 'rehype-prism-plus'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import remarkCodeTitles from './remark-code-title'
import remarkFootnotes from 'remark-footnotes'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkImgToJsx from './remark-img-to-jsx'
import remarkMath from 'remark-math'
import remarkTocHeadings from './remark-toc-headings'

const root = process.cwd()

const parseSeriesReference = (value: unknown): SeriesReference | null => {
  if (!value || typeof value !== 'object') {
    return null
  }

  const { slug, order } = value as { slug?: unknown; order?: unknown }
  if (typeof slug !== 'string' || slug.trim().length === 0) {
    return null
  }

  const ref: SeriesReference = { slug: slug.trim() }

  if (order !== undefined) {
    const parsedOrder = Number(order)
    if (!Number.isNaN(parsedOrder)) {
      ref.order = parsedOrder
    }
  }

  return ref
}

export function getFiles(type: 'blog' | 'authors') {
  const prefixPaths = path.join(root, 'data', type)
  const files = getAllFilesRecursively(prefixPaths)
  // Only want to return blog/path and ignore root, replace is needed to work on Windows
  return files.map((file) => file.slice(prefixPaths.length + 1).replace(/\\/g, '/'))
}

export function formatSlug(slug: string) {
  return slug.replace(/\.(mdx|md)/, '')
}

export function dateSortDesc(a: string, b: string) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export async function getFileBySlug<T extends Record<string, unknown>>(
  type: 'authors' | 'blog',
  slug: string | string[]
): Promise<{
  mdxSource: string
  toc: Toc
  frontMatter: T & {
    slug: string | string[] | null
    fileName: string
  }
}> {
  const mdxPath = path.join(root, 'data', type, `${slug}.mdx`)
  const mdPath = path.join(root, 'data', type, `${slug}.md`)
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, 'utf8')
    : fs.readFileSync(mdPath, 'utf8')

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'esbuild.exe')
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'bin', 'esbuild')
  }

  const toc: Toc = []

  // Parsing frontmatter here to pass it in as options to rehype plugin
  const { content, data: frontmatter } = matter(source)
  const { code } = await bundleMDX({
    source,
    // mdx imports can be automatically source from the components directory
    cwd: path.join(root, 'components'),
    mdxOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        [remarkTocHeadings, { exportRef: toc }],
        remarkGfm,
        remarkCodeTitles,
        [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
        remarkImgToJsx,
      ] as any[]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
        [
          rehypeCitation,
          { bibliography: frontmatter?.bibliography, path: path.join(root, 'data') },
        ],
        [rehypePrismPlus, { ignoreMissing: true }],
      ] as any[]
      return options
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        '.js': 'jsx',
      }
      return options
    },
  })

  const safe = (value) => (value === undefined ? null : value)
  if (type === 'authors') {
    const authorFrontMatter = {}
    Object.keys(frontmatter).forEach((key) => {
      authorFrontMatter[key] = safe(frontmatter[key])
    })
    const frontMatterResult = {
      mdxSource: code,
      toc,
      frontMatter: {
        ...authorFrontMatter,
        slug: slug || null,
        fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      },
    }
    return (frontMatterResult as unknown) as {
      mdxSource: string
      toc: Toc
      frontMatter: T & {
        slug: string | string[] | null
        fileName: string
      }
    }
  } else {
    const { title, summary, tags, authors, draft, date, series } = frontmatter
    const normalizedSeries = parseSeriesReference(series)
    const frontMatterResult = {
      mdxSource: code,
      toc,
      frontMatter: {
        readingTime:
          frontmatter?.readingTime && typeof frontmatter.readingTime === 'object'
            ? frontmatter.readingTime
            : readingTime(content),
        slug: slug || null,
        fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
        title: safe(title),
        summary: safe(summary),
        tags: safe(tags),
        authors: safe(authors),
        draft: safe(draft),
        date: date ? new Date(date).toISOString() : null,
        series: normalizedSeries,
      },
    }
    return (frontMatterResult as unknown) as {
      mdxSource: string
      toc: Toc
      frontMatter: T & {
        slug: string | string[] | null
        fileName: string
      }
    }
  }
}

export async function getAllFilesFrontMatter(folder: 'blog') {
  const prefixPaths = path.join(root, 'data', folder)

  const files = getAllFilesRecursively(prefixPaths)

  const safe = (value) => (value === undefined ? null : value)
  const allFrontMatter: PostFrontMatter[] = []

  files.forEach((file: string) => {
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
    if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
      return
    }
    const source = fs.readFileSync(file, 'utf8')
    const matterFile = matter(source)
    const frontmatter = matterFile.data as AuthorFrontMatter | PostFrontMatter
    if ('draft' in frontmatter && frontmatter.draft !== true) {
      const normalizedSeries = parseSeriesReference((frontmatter as PostFrontMatter).series)
      // Only include necessary fields and sanitize them
      allFrontMatter.push({
        title: safe(frontmatter.title),
        summary: safe(frontmatter.summary),
        tags: safe(frontmatter.tags),
        authors: safe(frontmatter.authors),
        draft: safe(frontmatter.draft),
        slug: safe(formatSlug(fileName)),
        date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
        fileName: safe(fileName),
        cover: safe(frontmatter.cover), // If cover exists in frontmatter
        series: normalizedSeries,
      })
    }
  })

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}
