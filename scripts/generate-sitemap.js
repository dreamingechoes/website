const fs = require('fs')
const globby = require('globby')
const prettier = require('prettier')
const siteMetadata = require('../data/siteMetadata')

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

  const allFiles = [...pageFiles, ...blogFiles, ...tagFiles]

  // Files to exclude from sitemap
  const excludePatterns = [/pages\/404/, /pages\/blog\/\[/, /pages\/tags\/\[/, /pages\/series\/\[/]

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${allFiles
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
                return `
                        <url>
                            <loc>${siteMetadata.siteUrl}${route}</loc>
                        </url>
                    `
              })
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
