import '@/css/tailwind.css'
import '@/css/prism.css'
import '@/css/styles.css'

import Analytics from '@/components/analytics'
import type { AppProps } from 'next/app'
import { ClientReload } from '@/components/ClientReload'
import Head from 'next/head'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ThemeProvider } from 'next-themes'
import siteMetadata from '@/data/siteMetadata'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

export default function App({ Component, pageProps }: AppProps) {
  const isProduction = process.env.NODE_ENV === 'production'
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
        <Head>
          <>
            <meta content="width=device-width, initial-scale=1" name="viewport" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          </>
        </Head>
        {isDevelopment && isSocket && <ClientReload />}
        {isProduction && <Analytics />}
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </ThemeProvider>
    </>
  )
}
