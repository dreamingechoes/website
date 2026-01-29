import { ChevronDown, Pause, Play, Square, Volume2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

function chunkText(text: string, maxLen = 180): string[] {
  // Split by sentences and then by approximate length
  const sentences = text.replace(/\s+/g, ' ').split(/(?<=[.!?])\s+/)
  const chunks: string[] = []
  let buf = ''

  for (const s of sentences) {
    if ((buf + ' ' + s).trim().length > maxLen && buf.trim()) {
      chunks.push(buf.trim())
      buf = s
    } else {
      buf = (buf + ' ' + s).trim()
    }
  }

  if (buf.trim()) chunks.push(buf.trim())
  return chunks
}

// Estimate reading time in seconds based on character count
// Average speaking rate is about 150 words per minute, ~5 chars per word = 750 chars/min = 12.5 chars/sec
function estimateReadingTime(text: string): number {
  return Math.ceil(text.length / 12.5)
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

interface TextToSpeechProps {
  contentSelector?: string
}

export default function TextToSpeech({ contentSelector = '.prose' }: TextToSpeechProps) {
  const [supported, setSupported] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [paused, setPaused] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [showVoiceSelector, setShowVoiceSelector] = useState(false)
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0)
  const [totalChunks, setTotalChunks] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [totalTime, setTotalTime] = useState(0)

  const queueRef = useRef<SpeechSynthesisUtterance[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const chunkTimesRef = useRef<number[]>([])
  const voiceSelectorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window)

    const loadVoices = () => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
      const availableVoices = window.speechSynthesis.getVoices()
      if (availableVoices.length > 0) {
        // Filter to only high-quality UK English voices
        const preferredVoiceNames = [
          'uk english male',
          'uk english female',
          'kate',
          'oliver',
          'libby',
        ]
        const filteredVoices = availableVoices.filter((v) => {
          const nameLower = v.name.toLowerCase()
          return v.lang === 'en-GB' && preferredVoiceNames.some((name) => nameLower.includes(name))
        })

        // If no preferred voices found, fallback to any en-GB voice
        const finalVoices =
          filteredVoices.length > 0
            ? filteredVoices
            : availableVoices.filter((v) => v.lang === 'en-GB')

        setVoices(finalVoices)
        // Auto-select first voice if none selected
        if (!selectedVoice && finalVoices.length > 0) {
          setSelectedVoice(finalVoices[0])
        }
      }
    }

    loadVoices()
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
        window.speechSynthesis.onvoiceschanged = null
      }
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [selectedVoice])

  // Close voice selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (voiceSelectorRef.current && !voiceSelectorRef.current.contains(event.target as Node)) {
        setShowVoiceSelector(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getTextContent = useCallback(() => {
    if (typeof document === 'undefined') return ''
    const contentElement = document.querySelector(contentSelector)
    if (!contentElement) return ''

    const clone = contentElement.cloneNode(true) as HTMLElement

    // Remove elements we don't want to read aloud
    const selectorsToRemove = [
      'pre', // Code blocks
      'code', // Inline code
      '.sr-only', // Screen reader only elements
      'script', // Scripts
      'style', // Styles
      'noscript', // Noscript fallbacks
      'svg', // SVG graphics
      'img', // Images (alt text might be read)
      'figure', // Figure elements (often contain code/images)
      'figcaption', // Figure captions
      'button', // Buttons
      'nav', // Navigation
      'aside', // Sidebars
      '[role="navigation"]',
      '[role="button"]',
      '[aria-hidden="true"]',
      '.mermaid', // Mermaid diagrams
      '.katex', // Math formulas
      '.math', // Math blocks
      'table', // Tables (can be confusing when read)
      '.toc', // Table of contents
      '.callout-title', // Callout titles (icons/emojis)
    ]
    selectorsToRemove.forEach((selector) => {
      clone.querySelectorAll(selector).forEach((el) => el.remove())
    })

    // Get text and clean it up
    let text = clone.textContent?.trim() || ''
    // Remove multiple spaces and normalize whitespace
    text = text.replace(/\s+/g, ' ').trim()

    return text
  }, [contentSelector])

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)
  }

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const buildQueue = () => {
    const text = getTextContent()
    if (!text) return

    const chunks = chunkText(text)
    setTotalChunks(chunks.length)
    setCurrentChunkIndex(0)
    setElapsedTime(0)

    // Calculate estimated time for each chunk and total
    const chunkTimes = chunks.map((c) => estimateReadingTime(c))
    chunkTimesRef.current = chunkTimes
    setTotalTime(chunkTimes.reduce((a, b) => a + b, 0))

    queueRef.current = chunks.map((c, idx) => {
      const u = new SpeechSynthesisUtterance(c)
      u.lang = selectedVoice?.lang || 'en-GB'
      u.rate = 0.95
      u.pitch = 1
      if (selectedVoice) {
        u.voice = selectedVoice
      }

      u.onstart = () => {
        setSpeaking(true)
        setPaused(false)
        setCurrentChunkIndex(idx)
        startTimer()
      }

      u.onend = () => {
        if (idx === chunks.length - 1) {
          setSpeaking(false)
          setPaused(false)
          stopTimer()
          setCurrentChunkIndex(0)
          setElapsedTime(0)
        }
      }

      u.onerror = () => {
        setSpeaking(false)
        setPaused(false)
        stopTimer()
      }

      return u
    })
  }

  const play = () => {
    if (!supported) return
    const synth = window.speechSynthesis

    // If we're in paused state, resume
    if (paused) {
      synth.resume()
      setPaused(false)
      setSpeaking(true)
      startTimer()
      return
    }

    // If not currently speaking or paused, start fresh
    if (!speaking) {
      synth.cancel()
      buildQueue()
      if (queueRef.current.length === 0) return
      for (const u of queueRef.current) synth.speak(u)
    }
  }

  const pause = () => {
    if (!supported) return
    const synth = window.speechSynthesis
    if (speaking) {
      synth.pause()
      setPaused(true)
      setSpeaking(false)
      stopTimer()
    }
  }

  const stop = () => {
    if (!supported) return
    window.speechSynthesis.cancel()
    setSpeaking(false)
    setPaused(false)
    stopTimer()
    setCurrentChunkIndex(0)
    setElapsedTime(0)
  }

  if (!supported) return null

  const progress = totalChunks > 0 ? ((currentChunkIndex + 1) / totalChunks) * 100 : 0
  const isActive = speaking || paused

  const getVoiceDisplayName = (voice: SpeechSynthesisVoice) => {
    return voice.name
      .replace(/Microsoft /g, '')
      .replace(/Google /g, '')
      .replace(/ Online$/g, '')
  }

  return (
    <div className="w-full rounded-2xl bg-gray-100 dark:bg-gray-800 p-3">
      {/* Progress bar */}
      <div className="mb-3">
        <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary-500 dark:bg-primary-400 transition-all duration-300"
            style={{ width: isActive ? `${progress}%` : '0%' }}
          />
        </div>
        {isActive && (
          <div className="mt-1.5 flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{formatTime(elapsedTime)}</span>
            <span>{formatTime(totalTime)}</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Play/Pause button */}
        <button
          type="button"
          onClick={isActive && !paused ? pause : play}
          aria-label={paused ? 'Resume' : speaking ? 'Pause' : 'Play'}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:bg-primary-600 dark:bg-primary-400 dark:text-gray-900 dark:hover:bg-primary-300"
        >
          {speaking ? (
            <Pause className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" aria-hidden="true" />
          )}
        </button>

        {/* Status text */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {paused ? 'Paused' : speaking ? 'Playing...' : 'Listen to article'}
          </div>
          {isActive && totalChunks > 0 && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Section {currentChunkIndex + 1} of {totalChunks}
            </div>
          )}
          {!isActive && selectedVoice && (
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Volume2 className="h-3 w-3" aria-hidden="true" />
              <span>{getVoiceDisplayName(selectedVoice)}</span>
            </div>
          )}
        </div>

        {/* Voice selector (only when not active) */}
        {!isActive && voices.length > 1 && (
          <div className="relative" ref={voiceSelectorRef}>
            <button
              type="button"
              onClick={() => setShowVoiceSelector(!showVoiceSelector)}
              aria-label="Select voice"
              aria-expanded={showVoiceSelector}
              className="flex h-9 items-center gap-1 rounded-full px-3 text-xs text-gray-600 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <span>Voice</span>
              <ChevronDown className="h-3 w-3" aria-hidden="true" />
            </button>
            {showVoiceSelector && (
              <div className="absolute right-0 bottom-full mb-2 z-50 w-64 max-h-64 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <div className="p-1">
                  {voices.map((v) => (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => {
                        setSelectedVoice(v)
                        setShowVoiceSelector(false)
                      }}
                      className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                        selectedVoice?.name === v.name
                          ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="font-medium truncate">{getVoiceDisplayName(v)}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{v.lang}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stop button (only when active) */}
        {isActive && (
          <button
            type="button"
            onClick={stop}
            aria-label="Stop"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-300 text-gray-600 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <Square className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}
