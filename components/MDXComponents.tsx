/* eslint-disable react/display-name */
import React, { useMemo } from 'react'

import { BlogNewsletterForm } from './NewsletterForm'
import CustomLink from './Link'
import Image from './Image'
import Pre from './Pre'
import TOCInline from './TOCInline'
import { getMDXComponent } from 'mdx-bundler/client'

const Wrapper: React.ComponentType<{ layout: string }> = ({ layout, ...rest }) => {
  const Layout = require(`../layouts/${layout}`).default
  return <Layout {...rest} />
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MDXComponents: Record<string, React.ComponentType<any>> = {
  Image,
  //@ts-ignore
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,
  //@ts-ignore
  BlogNewsletterForm,
}

interface Props {
  layout: string
  mdxSource: string
  [key: string]: unknown
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: Props) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
