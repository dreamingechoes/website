import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type NextLinkProps = React.ComponentProps<typeof Link>

type CustomLinkProps = (Omit<NextLinkProps, 'href'> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: NextLinkProps['href'] | null
  }) & {
  withExternalIcon?: boolean
}

const CustomLink = ({ href, children, withExternalIcon = false, ...rest }: CustomLinkProps) => {
  const normalizedHref = typeof href === 'string' ? href : ''
  const hasHref = normalizedHref.length > 0

  if (!hasHref) {
    return <span {...rest}>{children}</span>
  }

  const isInternalLink = normalizedHref.startsWith('/')
  const isAnchorLink = normalizedHref.startsWith('#')

  if (isInternalLink || isAnchorLink) {
    // If children is an <a> element, extract its props and apply to Link to avoid nesting <a> inside <Link>
    if (
      React.isValidElement(children) &&
      (children.type === 'a' || (children as React.ReactElement).type === 'a')
    ) {
      const childProps = (children as React.ReactElement).props || {}
      const { children: childChildren, ...anchorProps } = childProps
      return (
        <Link href={normalizedHref} {...anchorProps} {...rest}>
          {childChildren}
        </Link>
      )
    }

    // Default: pass props to Link (Next will render <a> internally)
    return (
      <Link href={normalizedHref} {...rest}>
        {children}
      </Link>
    )
  }

  // External link
  const { className, title, ...anchorRest } = rest

  let derivedTitle = title
  if (!derivedTitle) {
    try {
      const url = new URL(normalizedHref)
      derivedTitle = `Open external link (${url.hostname})`
    } catch {
      derivedTitle = 'Open external link in a new tab'
    }
  }

  const combinedClassName = withExternalIcon
    ? ['inline-flex items-center gap-1', className].filter(Boolean).join(' ')
    : className

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={normalizedHref}
      title={derivedTitle}
      aria-label={derivedTitle}
      className={combinedClassName}
      {...anchorRest}
    >
      {withExternalIcon ? (
        <>
          <span>{children}</span>
          <ExternalLink className="h-4 w-4 text-current" aria-hidden="true" />
        </>
      ) : (
        children
      )}
    </a>
  )
}

export default CustomLink
