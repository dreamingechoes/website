/**
 * Builds a character-indexed map of an article's readable text that keeps a link
 * back to the DOM nodes it came from.
 *
 * The text-to-speech player needs two things at once: a flat string to feed to
 * the speech synthesiser, and a way to turn a character offset in that string
 * back into a Range it can highlight. Flattening with `textContent` gives the
 * first and destroys the second, so we walk the live tree instead and remember
 * where every character came from.
 */

/** Elements whose text is never spoken. Kept in sync with the player. */
export const EXCLUDED_SELECTORS = [
  'pre',
  'code',
  '.sr-only',
  'script',
  'style',
  'noscript',
  'svg',
  'img',
  'figure',
  'figcaption',
  'button',
  'nav',
  'aside',
  '[role="navigation"]',
  '[role="button"]',
  '[aria-hidden="true"]',
  '.mermaid',
  '.katex',
  '.math',
  'table',
  '.toc',
  '.callout-title',
]

const BLOCK_TAGS = new Set([
  'ADDRESS',
  'ARTICLE',
  'ASIDE',
  'BLOCKQUOTE',
  'DD',
  'DIV',
  'DL',
  'DT',
  'FIELDSET',
  'FIGCAPTION',
  'FIGURE',
  'FOOTER',
  'FORM',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'HEADER',
  'HR',
  'LI',
  'MAIN',
  'NAV',
  'OL',
  'P',
  'PRE',
  'SECTION',
  'TABLE',
  'TD',
  'TH',
  'TR',
  'UL',
])

/**
 * A run of characters in the flat string that maps to one DOM text node.
 * `node` is null for synthetic separators inserted between blocks.
 */
interface TextSegment {
  node: Text | null
  /** Offset of this segment's first character within the flat string. */
  start: number
  /** Number of characters this segment contributes to the flat string. */
  length: number
  /** Flat-string index (relative to `start`) to raw offset inside `node.data`. */
  offsets: number[] | null
}

export interface TextRange {
  start: number
  end: number
}

export interface SpeechChunk extends TextRange {
  text: string
}

export interface ContentIndex {
  /** The full readable text, with whitespace collapsed. */
  text: string
  segments: TextSegment[]
  /** Sentence boundaries. A sentence never spans two block elements. */
  sentences: TextRange[]
}

const WHITESPACE = /\s/

/**
 * Abbreviations that end in a period without ending a sentence. Deliberately
 * short — a missed split costs a slightly long highlight, a wrong split costs a
 * highlight that stops mid-thought.
 */
const ABBREVIATIONS =
  /(?:^|\s)(?:mr|mrs|ms|dr|prof|sr|jr|st|vs|etc|approx|fig|no|al|ie|eg|i\.e|e\.g)\.$/i

/** A single capital letter before the period, as in "J. R. R." */
const INITIAL = /(?:^|\s)[A-Z]\.$/

function closestBlock(node: Node, root: Element): Element {
  let current: Node | null = node.parentElement
  while (current && current !== root) {
    if (current instanceof Element && BLOCK_TAGS.has(current.tagName)) return current
    current = current.parentElement
  }
  return root
}

/**
 * Splits a block's text into sentences, returning offsets relative to the flat
 * string. Falls back to the whole block when no boundary is found.
 */
function splitSentences(text: string, blockStart: number, blockEnd: number): TextRange[] {
  const source = text.slice(blockStart, blockEnd)
  const ranges: TextRange[] = []
  const boundary = /[.!?…]["'”’)\]]*(?=\s|$)/g
  let sentenceStart = 0
  let match: RegExpExecArray | null

  while ((match = boundary.exec(source)) !== null) {
    const end = match.index + match[0].length
    const preceding = source.slice(sentenceStart, end)

    // "1.0" and "$4.99" are not sentence ends.
    const beforePeriod = source[match.index - 1]
    const afterPeriod = source[end]
    const isDecimal = /\d/.test(beforePeriod || '') && /\d/.test(afterPeriod || '')

    if (isDecimal || ABBREVIATIONS.test(preceding) || INITIAL.test(preceding)) continue

    // Skip the whitespace that follows the terminator.
    let next = end
    while (next < source.length && WHITESPACE.test(source[next])) next += 1

    ranges.push({ start: blockStart + sentenceStart, end: blockStart + end })
    sentenceStart = next
    boundary.lastIndex = next
  }

  if (sentenceStart < source.length) {
    ranges.push({ start: blockStart + sentenceStart, end: blockEnd })
  }

  return ranges.length > 0 ? ranges : [{ start: blockStart, end: blockEnd }]
}

/**
 * Walks `root`, skipping the excluded subtrees, and returns the readable text
 * along with the mapping needed to turn offsets back into DOM ranges.
 */
export function buildContentIndex(root: Element): ContentIndex {
  const excludeSelector = EXCLUDED_SELECTORS.join(',')
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node: Node) {
      const parent = (node as Text).parentElement
      if (!parent) return NodeFilter.FILTER_REJECT
      if (parent.closest(excludeSelector)) return NodeFilter.FILTER_REJECT
      return NodeFilter.FILTER_ACCEPT
    },
  })

  const segments: TextSegment[] = []
  const blocks: { start: number; end: number }[] = []
  let text = ''
  let previousBlock: Element | null = null
  let blockStart = 0

  let current = walker.nextNode() as Text | null
  while (current) {
    const block = closestBlock(current, root)

    if (previousBlock && block !== previousBlock) {
      if (text.length > blockStart) blocks.push({ start: blockStart, end: text.length })
      // A synthetic space keeps words from two blocks from fusing together.
      if (text.length > 0 && !WHITESPACE.test(text[text.length - 1])) {
        segments.push({ node: null, start: text.length, length: 1, offsets: null })
        text += ' '
      }
      blockStart = text.length
    }

    const raw = current.data
    let collapsed = ''
    const offsets: number[] = []

    for (let i = 0; i < raw.length; i += 1) {
      const char = raw[i]
      if (WHITESPACE.test(char)) {
        const previousChar =
          collapsed.length > 0 ? collapsed[collapsed.length - 1] : text[text.length - 1]
        if (previousChar !== undefined && !WHITESPACE.test(previousChar)) {
          collapsed += ' '
          offsets.push(i)
        }
      } else {
        collapsed += char
        offsets.push(i)
      }
    }

    if (collapsed.length > 0) {
      segments.push({ node: current, start: text.length, length: collapsed.length, offsets })
      text += collapsed
    }

    previousBlock = block
    current = walker.nextNode() as Text | null
  }

  if (text.length > blockStart) blocks.push({ start: blockStart, end: text.length })

  const sentences: TextRange[] = []
  blocks.forEach((block) => {
    // Trim trailing whitespace so a sentence never ends on the synthetic space.
    let end = block.end
    while (end > block.start && WHITESPACE.test(text[end - 1])) end -= 1
    if (end > block.start) sentences.push(...splitSentences(text, block.start, end))
  })

  return { text, segments, sentences }
}

/** Index of the range containing `position`, or -1. Ranges must be sorted. */
export function findRangeIndex(ranges: TextRange[], position: number): number {
  let low = 0
  let high = ranges.length - 1

  while (low <= high) {
    const mid = (low + high) >> 1
    if (position < ranges[mid].start) high = mid - 1
    else if (position >= ranges[mid].end) low = mid + 1
    else return mid
  }

  // Between two sentences (on separator whitespace): prefer the one just passed.
  return Math.min(low, ranges.length - 1)
}

function locate(segments: TextSegment[], position: number, forward: boolean) {
  let low = 0
  let high = segments.length - 1
  let found = -1

  while (low <= high) {
    const mid = (low + high) >> 1
    const segment = segments[mid]
    if (position < segment.start) high = mid - 1
    else if (position >= segment.start + segment.length) low = mid + 1
    else {
      found = mid
      break
    }
  }

  if (found === -1) found = forward ? low : high
  if (found < 0 || found >= segments.length) return null

  // Synthetic separators have no node; slide to the nearest real segment.
  let index = found
  while (index >= 0 && index < segments.length && !segments[index].node) {
    index += forward ? 1 : -1
  }
  if (index < 0 || index >= segments.length) return null

  const segment = segments[index]
  const local = index === found ? position - segment.start : forward ? 0 : segment.length - 1

  return {
    node: segment.node as Text,
    offset: segment.offsets ? segment.offsets[Math.max(0, Math.min(local, segment.length - 1))] : 0,
  }
}

/** Turns a flat-string range into a live DOM Range, or null if it cannot map. */
export function createDomRange(index: ContentIndex, start: number, end: number): Range | null {
  if (end <= start) return null

  const from = locate(index.segments, start, true)
  const to = locate(index.segments, end - 1, false)
  if (!from || !to) return null

  try {
    const range = document.createRange()
    range.setStart(from.node, from.offset)
    range.setEnd(to.node, to.offset + 1)
    return range.collapsed ? null : range
  } catch {
    return null
  }
}

/**
 * One utterance per sentence.
 *
 * Keeping the chunk and the sentence the same unit is what lets the player
 * highlight from `onstart` alone, with no dependence on boundary events — which
 * several engines emit unreliably or stop emitting mid-utterance.
 *
 * The exception is a sentence longer than `maxLength`: those are split at clause
 * boundaries, because engines are known to truncate very long utterances. The
 * highlight still covers the whole sentence while its pieces are spoken, since
 * the player looks the sentence up from the chunk's start offset.
 */
export function buildChunks(index: ContentIndex, maxLength = 180): SpeechChunk[] {
  const chunks: SpeechChunk[] = []

  /** Pushes a chunk whose text is exactly `index.text.slice(start, end)`. */
  const push = (from: number, to: number) => {
    let s = from
    let e = to
    while (s < e && WHITESPACE.test(index.text[s])) s += 1
    while (e > s && WHITESPACE.test(index.text[e - 1])) e -= 1
    if (e > s) chunks.push({ start: s, end: e, text: index.text.slice(s, e) })
  }

  index.sentences.forEach((sentence) => {
    if (sentence.end - sentence.start <= maxLength) {
      push(sentence.start, sentence.end)
      return
    }

    const source = index.text
    const clause = /[,;:—–]\s/g
    clause.lastIndex = sentence.start
    let clauseStart = sentence.start
    let match: RegExpExecArray | null

    while ((match = clause.exec(source)) !== null && match.index < sentence.end) {
      const clauseEnd = match.index + match[0].length
      if (clauseEnd - clauseStart >= maxLength / 2) {
        push(clauseStart, clauseEnd)
        clauseStart = clauseEnd
      }
    }

    push(clauseStart, sentence.end)
  })

  return chunks
}
