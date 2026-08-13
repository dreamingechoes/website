/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og'
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import siteMetadata from '../../data/siteMetadata'

/**
 * This route runs on the Node.js runtime rather than the edge one. @vercel/og
 * ships a 1.3 MB resvg.wasm, which on its own does not fit inside the 1 MB edge
 * function limit, and the edge runtime is deprecated besides.
 *
 * The fonts live in public/fonts/og and are pulled into the function bundle by
 * outputFileTracingIncludes in next.config.js. Satori reads woff, ttf and otf,
 * so these cannot be the woff2 files the site itself serves.
 */
const fontDir = path.join(process.cwd(), 'public', 'fonts', 'og')
const nunitoFont = fs.readFileSync(path.join(fontDir, 'nunito-800.woff'))
const interFont = fs.readFileSync(path.join(fontDir, 'inter-400.woff'))

const sanitize = (value?: string | null) => (value ? value.replace(/\s+/g, ' ').trim() : '')

const truncate = (value: string, maxLength: number, appendEllipsis = false) => {
  if (!value) return ''
  if (value.length <= maxLength) return value
  if (!appendEllipsis) {
    return value.slice(0, maxLength)
  }
  const safeLength = Math.max(0, maxLength - 3)
  return `${value.slice(0, safeLength)}...`
}

const LogoIcon = () => (
  <svg
    width="92"
    height="92"
    viewBox="0 0 237 237"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-hidden="true"
  >
    <path
      d="M118.5 1.0079e-05C87.0718 1.14528e-05 56.9309 12.4848 34.7078 34.7079C12.4848 56.9309 -4.18081e-06 87.0718 -5.1798e-06 118.5C-6.17879e-06 149.928 12.4848 180.069 34.7078 202.292C56.9309 224.515 87.0718 237 118.5 237L118.5 118.5L118.5 1.0079e-05Z"
      fill="#4E2A8E"
      fillOpacity="0.8"
    />
    <path
      d="M118.5 237C149.928 237 180.069 224.515 202.292 202.292C224.515 180.069 237 149.928 237 118.5C237 87.0719 224.515 56.9309 202.292 34.7079C180.069 12.4848 149.928 9.3949e-07 118.5 -5.1798e-06L118.5 118.5L118.5 237Z"
      fill="#4E2A8E"
      fillOpacity="0.6"
    />
    <g clipPath="url(#logoClip0)">
      <path
        d="M160.85 104.938H131.279L142.195 71.727C143.22 67.8379 140.273 64 136.25 64H99.35C96.275 64 93.6613 66.2771 93.2513 69.3219L85.0513 130.728C84.5644 134.412 87.4344 137.688 91.15 137.688H121.567L109.754 187.452C108.831 191.341 111.804 195 115.724 195C117.877 195 119.927 193.874 121.054 191.93L166.154 114.148C168.538 110.08 165.591 104.938 160.85 104.938Z"
        fill="#F9F871"
      />
    </g>
    <defs>
      <clipPath id="logoClip0">
        <rect width="82" height="131" fill="white" transform="translate(85 64)" />
      </clipPath>
    </defs>
  </svg>
)

const firstValue = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const titleParam = sanitize(firstValue(req.query.title)) || siteMetadata.title
    const summaryParam = sanitize(firstValue(req.query.summary)) || siteMetadata.description
    const domain = siteMetadata.siteUrl.replace(/^https?:\/\//, '')

    const image = new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '32px 32px',
            backgroundColor: '#ffffff',
            color: '#171717',
            fontFamily: 'Inter, sans-serif',
            border: '10px solid #e9d5ff',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 28,
              }}
            >
              <div
                style={{
                  width: 92,
                  height: 92,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LogoIcon />
              </div>
              <span
                style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 800,
                  fontSize: 64,
                }}
              >
                {siteMetadata.headerTitle}
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                width: '100%',
                height: 6,
                backgroundColor: '#4e2a8e',
                margin: '36px 0 36px',
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 12 }}>
              <div
                style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 800,
                  fontSize: 48,
                  lineHeight: 1.05,
                  maxWidth: 1100,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {truncate(titleParam, 120)}
              </div>
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: 32,
                  lineHeight: 1.35,
                  color: '#111827',
                  maxWidth: 1100,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {truncate(summaryParam, 255, true)}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: 32,
                color: '#111827',
                marginTop: 'auto',
                paddingTop: 32,
              }}
            >
              <span>{siteMetadata.author}</span>
              <span>{domain}</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Nunito',
            data: nunitoFont,
            style: 'normal',
            weight: 800,
          },
          {
            name: 'Inter',
            data: interFont,
            style: 'normal',
            weight: 400,
          },
        ],
      }
    )

    // ImageResponse is a web Response; the Node runtime needs a buffer instead.
    const body = Buffer.from(await image.arrayBuffer())

    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=3600')
    res.status(200).send(body)
  } catch (error) {
    res.status(500).send('Failed to generate the image.')
  }
}
