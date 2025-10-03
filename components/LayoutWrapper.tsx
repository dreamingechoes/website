import Footer from './Footer'
import Link from './Link'
import Logo from '@/data/logo.svg'
import MobileNav from './MobileNav'
import { ReactNode } from 'react'
import SectionContainer from './SectionContainer'
import ThemeSwitch from './ThemeSwitch'
import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import { useRouter } from 'next/router'

interface Props {
  children: ReactNode
}

const LayoutWrapper = ({ children }: Props) => {
  const router = useRouter()

  const getActiveLinkClass = (href: string) => {
    const basePath = `/${router.pathname.split('/')[1]}` // Extract the first part of the path
    const hrefPath = `/${href.split('/')[1]}` // Extract the first part of the href

    return basePath == hrefPath ? 'decoration-4 decoration-primary-500 underline' : ''
  }

  return (
    <SectionContainer>
      <div className="flex flex-col justify-between h-screen">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label="Tailwind CSS Blog">
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Logo />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden header-title h-8 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className={`p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100 hover:underline underline-offset-4 hover:decoration-4 decoration-yellow-300 ${getActiveLinkClass(
                    link.href
                  )}`}
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
