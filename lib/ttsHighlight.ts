/**
 * Painting and scrolling helpers for the text-to-speech player.
 *
 * Highlighting goes through the CSS Custom Highlight API rather than wrapping
 * text in spans: it leaves the DOM untouched, so React's rendered MDX is never
 * mutated, nothing reflows, and the accessibility tree is unaffected. Styling
 * lives in `css/styles.css` under `::highlight()`.
 */

export const SENTENCE_HIGHLIGHT = 'tts-sentence'

/* The API is recent enough that we always guard before using it. */
interface HighlightRegistry {
  set(name: string, highlight: unknown): void
  delete(name: string): void
}

type HighlightConstructor = new (...ranges: Range[]) => unknown

function registry(): HighlightRegistry | null {
  if (typeof CSS === 'undefined') return null
  const highlights = (CSS as unknown as { highlights?: HighlightRegistry }).highlights
  return highlights ?? null
}

function highlightConstructor(): HighlightConstructor | null {
  const ctor = (globalThis as unknown as { Highlight?: HighlightConstructor }).Highlight
  return ctor ?? null
}

export function highlightsSupported(): boolean {
  return registry() !== null && highlightConstructor() !== null
}

export function paintHighlight(name: string, range: Range | null): void {
  const highlights = registry()
  const Ctor = highlightConstructor()
  if (!highlights || !Ctor) return

  if (!range) {
    highlights.delete(name)
    return
  }

  try {
    highlights.set(name, new Ctor(range))
  } catch {
    highlights.delete(name)
  }
}

export function clearHighlights(): void {
  registry()?.delete(SENTENCE_HIGHLIGHT)
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Keeps the spoken sentence inside a comfortable band of the viewport.
 *
 * Nothing moves while the sentence is already comfortably visible — scrolling on
 * every sentence would be far more distracting than the occasional catch-up.
 */
export function scrollRangeIntoView(range: Range | null): void {
  if (!range || typeof window === 'undefined') return

  const rect = range.getBoundingClientRect()
  if (rect.height === 0 && rect.width === 0) return

  const viewport = window.innerHeight
  const bandTop = viewport * 0.25
  const bandBottom = viewport * 0.72

  const comfortable = rect.top >= bandTop && rect.bottom <= bandBottom
  if (comfortable) return

  const target = window.scrollY + rect.top - viewport * 0.38
  window.scrollTo({
    top: Math.max(0, target),
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })
}
