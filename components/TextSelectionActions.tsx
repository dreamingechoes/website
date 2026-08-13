import { Check, Copy } from 'lucide-react'
import { ReactNode, useEffect, useRef, useState } from 'react'

import XLogo from '@/components/icons/XLogo'

const MAX_SHARE_LENGTH = 210

interface Props {
  children: ReactNode
  postUrl: string
}

interface ToolbarPosition {
  above: boolean
  left: number
  top: number
}

function makeShareText(selection: string) {
  const normalized = selection.replace(/\s+/g, ' ').trim()
  const excerpt =
    normalized.length > MAX_SHARE_LENGTH
      ? `${normalized.slice(0, MAX_SHARE_LENGTH - 1).trimEnd()}…`
      : normalized

  return `“${excerpt}” — @dreamingechoes`
}

function getSelectionEndRect(selection: Selection) {
  if (!selection.focusNode) return null

  try {
    const endRange = document.createRange()
    endRange.setStart(selection.focusNode, selection.focusOffset)
    endRange.collapse(true)
    const endRect = endRange.getBoundingClientRect()

    if (endRect.height || endRect.width) return endRect
  } catch {
    // Fall back to the complete selection below.
  }

  if (selection.rangeCount === 0) return null

  const range = selection.getRangeAt(0)
  const rects = range.getClientRects()
  return rects[rects.length - 1] ?? range.getBoundingClientRect()
}

export default function TextSelectionActions({ children, postUrl }: Props) {
  const contentRef = useRef<HTMLDivElement>(null)
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [selectedText, setSelectedText] = useState('')
  const [copied, setCopied] = useState(false)
  const [position, setPosition] = useState<ToolbarPosition | null>(null)

  useEffect(() => {
    const updateSelection = () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current)

      resetTimerRef.current = setTimeout(() => {
        const selection = window.getSelection()
        const content = contentRef.current

        if (
          !selection ||
          selection.isCollapsed ||
          !selection.anchorNode ||
          !selection.focusNode ||
          !content?.contains(selection.anchorNode) ||
          !content.contains(selection.focusNode)
        ) {
          setSelectedText('')
          setCopied(false)
          setPosition(null)
          return
        }

        const text = selection.toString()
        const rect = getSelectionEndRect(selection)

        if (!text.trim() || !rect) {
          setSelectedText('')
          setCopied(false)
          setPosition(null)
          return
        }

        const horizontalMargin = 16
        const estimatedHalfWidth = 116
        const left = Math.min(
          window.innerWidth - horizontalMargin - estimatedHalfWidth,
          Math.max(horizontalMargin + estimatedHalfWidth, rect.left + rect.width / 2)
        )
        const above = rect.top >= 72

        setSelectedText(text)
        setCopied(false)
        setPosition({
          above,
          left,
          top: above ? rect.top - 12 : rect.bottom + 12,
        })
      }, 120)
    }

    const dismiss = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return

      window.getSelection()?.removeAllRanges()
      setSelectedText('')
      setCopied(false)
      setPosition(null)
    }

    document.addEventListener('selectionchange', updateSelection)
    window.addEventListener('resize', updateSelection)
    window.addEventListener('scroll', updateSelection, { passive: true })
    window.addEventListener('keydown', dismiss)

    return () => {
      document.removeEventListener('selectionchange', updateSelection)
      window.removeEventListener('resize', updateSelection)
      window.removeEventListener('scroll', updateSelection)
      window.removeEventListener('keydown', dismiss)
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current)
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selectedText)
      setCopied(true)
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current)
      copiedTimerRef.current = setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy selected text:', error)
    }
  }

  const shareUrl = `https://x.com/intent/post?text=${encodeURIComponent(
    makeShareText(selectedText)
  )}&url=${encodeURIComponent(postUrl)}`

  return (
    <div>
      <div ref={contentRef}>{children}</div>
      {selectedText && position && (
        <div
          role="toolbar"
          aria-label="Selected text actions"
          style={{ left: position.left, top: position.top }}
          className={`fixed z-50 flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm ring-1 ring-black/5 dark:border-gray-700 dark:bg-gray-800 dark:ring-white/10 ${
            position.above ? '-translate-y-full' : ''
          }`}
        >
          <button
            type="button"
            onPointerDown={(event) => event.preventDefault()}
            onClick={handleCopy}
            className="inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:text-gray-300 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 dark:focus-visible:ring-offset-gray-800"
          >
            {copied ? (
              <Check
                className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                aria-hidden="true"
              />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
            <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <span className="h-6 w-px bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            onPointerDown={(event) => event.preventDefault()}
            className="inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:text-gray-300 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 dark:focus-visible:ring-offset-gray-800"
          >
            <XLogo className="h-4 w-4" />
            <span>Share on X</span>
          </a>
        </div>
      )}
    </div>
  )
}
