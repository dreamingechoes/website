import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type CustomLinkProps = (React.ComponentProps<typeof Link> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>) & {
  withExternalIcon?: boolean
}

const CustomLink = ({
  href = '',
  children,
  withExternalIcon = false,
  ...rest
}: CustomLinkProps) => {
  const isInternalLink = href.startsWith('/')
  const isAnchorLink = href.startsWith('#')

  if (isInternalLink || isAnchorLink) {
    // If children is an <a> element, extract its props and apply to Link to avoid nesting <a> inside <Link>
    if (
      React.isValidElement(children) &&
      (children.type === 'a' || (children as React.ReactElement).type === 'a')
    ) {
      const childProps = (children as React.ReactElement).props || {}
      const { children: childChildren, ...anchorProps } = childProps
      return (
        <Link href={href} {...anchorProps} {...rest}>
          {childChildren}
        </Link>
      )
    }

    // Default: pass props to Link (Next will render <a> internally)
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    )
  }

  // External link
  const { className, title, ...anchorRest } = rest

  let derivedTitle = title
  if (!derivedTitle) {
    try {
      const url = new URL(href)
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
      href={href}
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
