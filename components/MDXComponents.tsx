import { H2, H3, H4, H5, ListItem, OrderedList, UnorderedList } from './mdx/Typography'
/* eslint-disable react/display-name */
import React, { useMemo } from 'react'

import { BlogNewsletterForm } from './NewsletterForm'
import Callout from './mdx/Callout'
import CustomLink from './Link'
import Image from './Image'
import Pre from './Pre'
import TOCInline from './TOCInline'
import { getMDXComponent } from 'mdx-bundler/client'

const Wrapper: React.ComponentType<{ layout: string }> = ({ layout, ...rest }) => {
  const Layout = require(`../layouts/${layout}`).default
  return <Layout {...rest} />
}

const MDXLink: React.FC<React.ComponentProps<typeof CustomLink>> = (props) => (
  <CustomLink withExternalIcon {...props} />
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MDXComponents: Record<string, React.ComponentType<any>> = {
  Image,
  //@ts-ignore
  TOCInline,
  a: MDXLink,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  pre: Pre,
  wrapper: Wrapper,
  //@ts-ignore
  BlogNewsletterForm,
  Callout,
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
