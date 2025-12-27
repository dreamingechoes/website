import '@/css/tailwind.css'
import '@/css/katex.min.css'
import '@/css/fonts.css'
import '@/css/prism.css'
import '@/css/styles.css'

import Analytics from '@/components/analytics'
import type { AppProps } from 'next/app'
import { ClientReload } from '@/components/ClientReload'
import Head from 'next/head'
import LayoutWrapper from '@/components/LayoutWrapper'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from 'next-themes'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'
import siteMetadata from '@/data/siteMetadata'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <LayoutWrapper>
        <Component {...pageProps} />
        <Analytics />
        <VercelAnalytics />
        <SpeedInsights />
      </LayoutWrapper>
    </ThemeProvider>
  )
}
