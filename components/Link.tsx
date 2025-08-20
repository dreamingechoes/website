import Link from 'next/link'
import React from 'react'

type CustomLinkProps = React.ComponentProps<typeof Link> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>

const CustomLink = ({ href = '', children, ...rest }: CustomLinkProps) => {
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
  return (
    <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
      {children}
    </a>
  )
}

export default CustomLink
