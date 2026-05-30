const fs = require('fs')
const globby = require('globby')
const prettier = require('prettier')
const siteMetadata = require('../data/siteMetadata')

// Extract project slugs from TypeScript data file
function getProjectSlugs() {
  const content = fs.readFileSync('./data/projectsData.ts', 'utf-8')
  const slugMatches = content.matchAll(/slug:\s*['"]([^'"]+)['"]/g)
  return [...slugMatches].map((m) => m[1])
}

// Extract playbook slugs from TypeScript data file
function getPlaybookSlugs() {
  const content = fs.readFileSync('./data/playbooksData.ts', 'utf-8')
  const slugMatches = content.matchAll(/slug:\s*['"]([^'"]+)['"]/g)
  return [...slugMatches].map((m) => m[1])
}

;(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')

  // Static pages (ts/tsx/js/jsx)
  const pageFiles = await globby([
    'pages/**/*.{ts,tsx,js,jsx}',
    '!pages/_*.{ts,tsx,js,jsx}',
    '!pages/api/**',
    '!pages/**/[*.{ts,tsx,js,jsx}',
    '!pages/**/*.d.ts',
  ])

  // Blog posts (mdx/md)
  const blogFiles = await globby(['data/blog/**/*.{mdx,md}'])

  // Tag feeds
  const tagFiles = await globby(['public/tags/**/*.xml'])

  // Project detail pages (generated from data)
  const projectSlugs = getProjectSlugs()
  const projectPaths = projectSlugs.map((slug) => `/projects/${slug}`)

  // Playbook canonical pages (generated from data)
  const playbookSlugs = getPlaybookSlugs()
  const playbookPaths = playbookSlugs.map((slug) => `/playbooks/${slug}`)

  const allFiles = [...pageFiles, ...blogFiles, ...tagFiles]

  // Files to exclude from sitemap
  const excludePatterns = [
    /pages\/404/,
    /pages\/blog\/\[/,
    /pages\/tags\/\[/,
    /pages\/series\/\[/,
    /pages\/projects\/\[/,
  ]

  const fileUrls = allFiles
    .filter((page) => !excludePatterns.some((pattern) => pattern.test(page)))
    .map((page) => {
      const path = page
        .replace('pages/', '/')
        .replace('data/blog', '/blog')
        .replace('public/', '/')
        .replace(/\.(tsx|ts|jsx|js)$/, '')
        .replace(/\.mdx?$/, '')
        .replace('/feed.xml', '')
      const route = path === '/index' ? '' : path
      return `${siteMetadata.siteUrl}${route}`
    })

  const projectUrls = projectPaths.map((path) => `${siteMetadata.siteUrl}${path}`)
  const playbookUrls = playbookPaths.map((path) => `${siteMetadata.siteUrl}${path}`)

  const allUrls = [...fileUrls, ...projectUrls, ...playbookUrls]

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${allUrls
              .map(
                (url) => `
                        <url>
                            <loc>${url}</loc>
                        </url>
                    `
              )
              .join('')}
        </urlset>
    `

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })

  // eslint-disable-next-line no-sync
  fs.writeFileSync('public/sitemap.xml', formatted)
})()
