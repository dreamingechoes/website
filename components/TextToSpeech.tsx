import {
  ContentIndex,
  SpeechChunk,
  buildChunks,
  buildContentIndex,
  createDomRange,
  findRangeIndex,
} from '@/lib/ttsContent'
import {
  SENTENCE_HIGHLIGHT,
  clearHighlights,
  highlightsSupported,
  paintHighlight,
  scrollRangeIntoView,
} from '@/lib/ttsHighlight'
import { ChevronDown, Crosshair, Pause, Play, Square, Volume2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

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
  const [canHighlight, setCanHighlight] = useState(false)
  const [following, setFollowing] = useState(true)

  const queueRef = useRef<SpeechSynthesisUtterance[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const chunkTimesRef = useRef<number[]>([])
  const voiceSelectorRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  const indexRef = useRef<ContentIndex | null>(null)
  const chunksRef = useRef<SpeechChunk[]>([])
  const activeSentenceRef = useRef(-1)
  const followingRef = useRef(true)

  useEffect(() => {
    followingRef.current = following
  }, [following])

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window)
    setCanHighlight(highlightsSupported())
  }, [])

  useEffect(() => {
    const loadVoices = () => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
      const availableVoices = window.speechSynthesis.getVoices()
      if (availableVoices.length > 0) {
        // Good UK English voices across macOS, Windows and Chrome, in the order
        // they are offered. The network voices lead because they read long-form
        // prose best; the locally installed ones follow as an offline fallback.
        const preferredVoiceNames = [
          'uk english female',
          'uk english male',
          'daniel',
          'kate',
          'oliver',
          'serena',
          'arthur',
          'martha',
          'libby',
          'george',
          'hazel',
        ]
        const filteredVoices = availableVoices.filter((v) => {
          const nameLower = v.name.toLowerCase()
          return v.lang === 'en-GB' && preferredVoiceNames.some((name) => nameLower.includes(name))
        })

        // If no preferred voices found, fallback to any en-GB voice
        const fallbackVoices =
          filteredVoices.length > 0
            ? filteredVoices
            : availableVoices.filter((v) => v.lang === 'en-GB')

        // Remove duplicate voices by name (keep first occurrence)
        const uniqueVoices = fallbackVoices.filter(
          (voice, index, self) => index === self.findIndex((v) => v.name === voice.name)
        )

        const orderedVoices = [...uniqueVoices].sort(
          (a, b) =>
            preferredVoiceNames.findIndex((n) => a.name.toLowerCase().includes(n)) -
            preferredVoiceNames.findIndex((n) => b.name.toLowerCase().includes(n))
        )

        setVoices(orderedVoices)
        setSelectedVoice((current) => current ?? orderedVoices[0] ?? null)
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
      clearHighlights()
    }
  }, [])

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

  // Any deliberate scroll hands control back to the reader. Listening to intent
  // events rather than 'scroll' avoids mistaking our own scrolling for theirs.
  useEffect(() => {
    const surrender = () => setFollowing(false)
    const onKeyDown = (event: KeyboardEvent) => {
      const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ']
      if (keys.includes(event.key)) surrender()
    }

    window.addEventListener('wheel', surrender, { passive: true })
    window.addEventListener('touchmove', surrender, { passive: true })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('wheel', surrender)
      window.removeEventListener('touchmove', surrender)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const getContentIndex = useCallback(
    (rebuild = false) => {
      if (typeof document === 'undefined') return null
      if (!rebuild && indexRef.current) return indexRef.current

      const contentElement = document.querySelector(contentSelector)
      if (!contentElement) return null

      const index = buildContentIndex(contentElement)
      indexRef.current = index.text ? index : null
      return indexRef.current
    },
    [contentSelector]
  )

  const clearReadingPosition = useCallback(() => {
    activeSentenceRef.current = -1
    clearHighlights()
  }, [])

  /** Paints the sentence being read and, when following, keeps it on screen. */
  const showReadingPosition = useCallback(
    (sentence: { start: number; end: number } | null) => {
      const index = indexRef.current
      if (!index || !canHighlight) return

      const range = sentence ? createDomRange(index, sentence.start, sentence.end) : null
      paintHighlight(SENTENCE_HIGHLIGHT, range)

      if (followingRef.current) scrollRangeIntoView(range)
    },
    [canHighlight]
  )

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

  const buildQueue = (startFromChunk = 0, rebuildIndex = false) => {
    const index = getContentIndex(rebuildIndex)
    if (!index) return

    const chunks = buildChunks(index)
    chunksRef.current = chunks
    setTotalChunks(chunks.length)
    setCurrentChunkIndex(startFromChunk)

    // Calculate estimated time for each chunk and total
    const chunkTimes = chunks.map((c) => estimateReadingTime(c.text))
    chunkTimesRef.current = chunkTimes
    setTotalTime(chunkTimes.reduce((a, b) => a + b, 0))

    // Calculate elapsed time up to startFromChunk
    const elapsedUpToStart = chunkTimes.slice(0, startFromChunk).reduce((a, b) => a + b, 0)
    setElapsedTime(elapsedUpToStart)

    // Only create utterances from startFromChunk onwards
    queueRef.current = chunks.slice(startFromChunk).map((chunk, idx) => {
      const actualIdx = startFromChunk + idx
      const u = new SpeechSynthesisUtterance(chunk.text)
      u.lang = selectedVoice?.lang || 'en-GB'
      u.rate = 1
      u.pitch = 1
      if (selectedVoice) {
        u.voice = selectedVoice
      }

      u.onstart = () => {
        setSpeaking(true)
        setPaused(false)
        setCurrentChunkIndex(actualIdx)
        startTimer()

        // A chunk is one sentence, or a piece of an over-long one. Either way
        // the sentence it belongs to is the reading position, so a long sentence
        // stays lit across the two or three utterances that speak it.
        const sentenceIndex = findRangeIndex(index.sentences, chunk.start)
        const sentence = index.sentences[sentenceIndex]
        if (sentenceIndex === activeSentenceRef.current) return

        activeSentenceRef.current = sentenceIndex
        showReadingPosition(sentence ?? { start: chunk.start, end: chunk.end })
      }

      u.onend = () => {
        if (actualIdx === chunks.length - 1) {
          setSpeaking(false)
          setPaused(false)
          stopTimer()
          setCurrentChunkIndex(0)
          setElapsedTime(0)
          clearReadingPosition()
        }
      }

      u.onerror = () => {
        setSpeaking(false)
        setPaused(false)
        stopTimer()
        clearReadingPosition()
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
      setFollowing(true)
      buildQueue(0, true)
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
    clearReadingPosition()
  }

  const seekToChunk = (chunkIndex: number) => {
    if (!supported || chunkIndex < 0 || chunkIndex >= totalChunks) return

    const synth = window.speechSynthesis
    synth.cancel()
    stopTimer()
    clearReadingPosition()

    // Rebuild queue starting from the selected chunk
    buildQueue(chunkIndex)

    if (queueRef.current.length === 0) return

    // Start playing from the new position
    for (const u of queueRef.current) synth.speak(u)
  }

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || totalChunks === 0) return

    const rect = progressBarRef.current.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const percentage = clickX / rect.width
    const targetChunk = Math.floor(percentage * totalChunks)

    seekToChunk(Math.max(0, Math.min(targetChunk, totalChunks - 1)))
  }

  const resumeFollowing = () => {
    setFollowing(true)
    const index = indexRef.current
    const sentence = index?.sentences[activeSentenceRef.current]
    const chunk = chunksRef.current[currentChunkIndex]
    const target = sentence ?? chunk
    if (index && target) scrollRangeIntoView(createDomRange(index, target.start, target.end))
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
        <div
          ref={progressBarRef}
          onClick={isActive ? handleProgressClick : undefined}
          onKeyDown={
            isActive
              ? (e) => {
                  if (e.key === 'ArrowLeft') {
                    seekToChunk(Math.max(0, currentChunkIndex - 1))
                  } else if (e.key === 'ArrowRight') {
                    seekToChunk(Math.min(totalChunks - 1, currentChunkIndex + 1))
                  } else if (e.key === 'Home') {
                    seekToChunk(0)
                  } else if (e.key === 'End') {
                    seekToChunk(totalChunks - 1)
                  } else if (e.key === 'Enter' || e.key === ' ') {
                    // Optionally, play/pause on Enter/Space
                    isActive && paused ? play() : pause()
                  }
                }
              : undefined
          }
          tabIndex={isActive ? 0 : -1}
          className={`h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden ${
            isActive ? 'cursor-pointer' : ''
          }`}
          role={isActive ? 'slider' : undefined}
          aria-label={isActive ? 'Seek position' : undefined}
          aria-valuemin={isActive ? 0 : undefined}
          aria-valuemax={isActive ? totalChunks : undefined}
          aria-valuenow={isActive ? currentChunkIndex + 1 : undefined}
        >
          <div
            className="h-full rounded-full bg-primary-500 dark:bg-primary-400 transition-all duration-300"
            style={{ width: isActive ? `${progress}%` : '0%' }}
          />
        </div>
        {isActive && (
          <div className="mt-1.5 flex justify-between text-xs text-gray-600 dark:text-gray-400">
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
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Section {currentChunkIndex + 1} of {totalChunks}
            </div>
          )}
          {!isActive && selectedVoice && (
            <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <Volume2 className="h-3 w-3" aria-hidden="true" />
              <span>{getVoiceDisplayName(selectedVoice)}</span>
            </div>
          )}
        </div>

        {/* Re-follow the reading position after a manual scroll */}
        {isActive && canHighlight && !following && (
          <button
            type="button"
            onClick={resumeFollowing}
            aria-label="Follow the reading position"
            title="Follow the reading position"
            className="flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <Crosshair className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Follow</span>
          </button>
        )}

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
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {v.lang}
                        {!v.localService && ' · needs a connection'}
                      </div>
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
