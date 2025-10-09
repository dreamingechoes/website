import { ArrowRight, CircleSmall, IndentDecrease, Layers, ListTree } from 'lucide-react'
import { Children, Fragment, cloneElement, isValidElement } from 'react'
import type { HTMLAttributes, LiHTMLAttributes, ReactNode } from 'react'

const join = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' ')

type HeadingProps = HTMLAttributes<HTMLHeadingElement>

type ListProps = HTMLAttributes<HTMLUListElement>
type ListItemProps = LiHTMLAttributes<HTMLLIElement>

const INLINE_TAGS = new Set(['strong', 'b', 'em', 'code', 'span', 'a', 'i', 'u', 'small', 'mark'])
const INLINE_MDX_TYPES = new Set(['a', 'strong', 'em', 'code', 'span', 'small', 'mark'])

const isInlineNode = (node: ReactNode): boolean => {
  if (node === null || typeof node === 'boolean') return false
  if (typeof node === 'number') return true
  if (typeof node === 'string') return node.trim().length > 0

  if (isValidElement(node)) {
    if (node.type === Fragment) {
      const fragmentChildren = Children.toArray(node.props.children)
      return fragmentChildren.every(isInlineNode)
    }

    if (typeof node.type === 'string') {
      if (INLINE_TAGS.has(node.type)) {
        return true
      }

      if (node.type === 'br') {
        return true
      }
    }

    const mdxType = (node.props as { mdxType?: string; href?: string })?.mdxType
    if (mdxType && INLINE_MDX_TYPES.has(mdxType)) {
      return true
    }

    if ('href' in (node.props as { href?: string })) {
      return true
    }
  }

  return false
}

export const H2 = ({ className, children, ...props }: HeadingProps) => {
  return (
    <h2
      className={join(
        'mt-12 flex scroll-mt-28 items-center gap-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100',
        className
      )}
      {...props}
    >
      <span className="rounded-full border border-primary-500/40 bg-primary-500/10 p-2 text-primary-500">
        <Layers className="h-4 w-4" aria-hidden="true" />
      </span>
      <span>{children}</span>
    </h2>
  )
}

export const H3 = ({ className, children, ...props }: HeadingProps) => {
  return (
    <h3
      className={join(
        'mt-10 flex scroll-mt-24 items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-gray-100',
        className
      )}
      {...props}
    >
      <span className="rounded-md bg-primary-500/10 px-2 py-1 text-primary-500">
        <ListTree className="h-4 w-4" aria-hidden="true" />
      </span>
      <span>{children}</span>
    </h3>
  )
}

export const H4 = ({ className, children, ...props }: HeadingProps) => {
  return (
    <h4
      className={join(
        'mt-8 flex scroll-mt-20 items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-100',
        className
      )}
      {...props}
    >
      <span className="rounded bg-primary-500/10 p-1.5 text-primary-500">
        <IndentDecrease className="h-3 w-3" aria-hidden="true" />
      </span>
      <span>{children}</span>
    </h4>
  )
}

export const H5 = ({ className, children, ...props }: HeadingProps) => {
  return (
    <h5
      className={join(
        'mt-6 flex scroll-mt-20 items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100',
        className
      )}
      {...props}
    >
      <span className="flex h-3 w-3 items-center justify-center text-primary-500">
        <CircleSmall className="h-3 w-3" aria-hidden="true" />
      </span>
      <span>{children}</span>
    </h5>
  )
}

export const UnorderedList = ({ className, ...props }: ListProps) => (
  <ul className={join('pl-0 space-y-3', className)} {...props} />
)

export const OrderedList = ({ className, ...props }: ListProps) => (
  <ol className={join('pl-0 space-y-3', className)} {...props} />
)

export const ListItem = ({ className, children, ...props }: ListItemProps) => {
  const childArray = Children.toArray(children)
  const filteredChildren = childArray.filter((child) => {
    if (child === null || typeof child === 'boolean') return false
    if (typeof child === 'string') return child.trim().length > 0
    return true
  })
  const normalizedChildren: ReactNode[] = []
  let inlineBuffer: ReactNode[] = []

  const flushInlineBuffer = () => {
    if (!inlineBuffer.length) return
    const bufferIndex = normalizedChildren.length
    normalizedChildren.push(
      <p key={`inline-${bufferIndex}`} className="m-0">
        {inlineBuffer.map((node, idx) => (
          <Fragment key={idx}>{node}</Fragment>
        ))}
      </p>
    )
    inlineBuffer = []
  }

  filteredChildren.forEach((child, index) => {
    if (typeof child === 'string' || typeof child === 'number' || isInlineNode(child)) {
      inlineBuffer.push(child)
      return
    }

    if (isValidElement(child) && typeof child.type === 'string') {
      if (['p', 'ul', 'ol', 'div', 'blockquote'].includes(child.type)) {
        flushInlineBuffer()
        normalizedChildren.push(
          cloneElement(child, {
            className: join(child.props.className, 'm-0'),
            key: `block-${index}`,
          })
        )
        return
      }
    }

    flushInlineBuffer()
    normalizedChildren.push(child)
  })

  flushInlineBuffer()

  return (
    <li className={join('list-none', className)} {...props}>
      <div className="flex items-start gap-3">
        <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-primary-500" aria-hidden="true" />
        <div className="flex-1 space-y-2 leading-relaxed text-gray-700 dark:text-gray-300 [&_a]:text-primary-600 [&_a:hover]:underline">
          {normalizedChildren}
        </div>
      </div>
    </li>
  )
}
