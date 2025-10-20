import { Code2, Download, RefreshCcw, ZoomIn, ZoomOut } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

let mermaidInitialized = false

const generateId = () => `mermaid-${Math.random().toString(36).slice(2, 11)}`

interface MermaidProps {
  chart: string
}

const Mermaid = ({ chart }: MermaidProps) => {
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [scale, setScale] = useState(1)
  const svgWrapperRef = useRef<HTMLDivElement | null>(null)
  const [intrinsicSize, setIntrinsicSize] = useState<{ width: number; height: number } | null>(null)
  const [showCode, setShowCode] = useState(false)
  const [codeHovered, setCodeHovered] = useState(false)
  const [codeCopied, setCodeCopied] = useState(false)

  useEffect(() => {
    let mounted = true

    const render = async () => {
      try {
        const mermaid = (await import('mermaid')).default

        if (!mermaidInitialized) {
          mermaid.initialize({
            startOnLoad: false,
            theme: 'neutral',
            securityLevel: 'strict',
          })
          mermaidInitialized = true
        }

        const { svg: generatedSvg } = await mermaid.render(generateId(), chart)
        if (mounted) {
          setSvg(generatedSvg)
          setError(null)
          setScale(1)
          setIntrinsicSize(null)
        }
      } catch (err) {
        if (mounted) {
          setError('Unable to render diagram')
        }
        // eslint-disable-next-line no-console
        console.error('[Mermaid] Failed to render diagram', err)
      }
    }

    render()

    return () => {
      mounted = false
    }
  }, [chart])

  useEffect(() => {
    if (!showCode) {
      setCodeHovered(false)
      setCodeCopied(false)
    }
  }, [showCode])
  if (error) {
    return (
      <div className="my-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-900/30 dark:text-red-200">
        {error}
      </div>
    )
  }

  if (!svg) {
    return (
      <div className="my-6 rounded-lg border border-primary-200 bg-primary-50/60 p-4 text-sm text-primary-700 dark:border-primary-400/40 dark:bg-primary-900/20 dark:text-primary-200">
        Rendering diagram…
      </div>
    )
  }

  const zoomIn = () => setScale((current) => Math.min(current + 0.25, 3))
  const zoomOut = () => setScale((current) => Math.max(current - 0.25, 0.5))
  const resetZoom = () => setScale(1)

  const downloadDiagram = () => {
    if (!svg) return
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'mermaid-diagram.svg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const zoomLabel = `${Math.round(scale * 100)}%`

  const measureSvg = (element: HTMLDivElement | null) => {
    if (element && !intrinsicSize) {
      const svgElement = element.querySelector('svg')
      if (svgElement) {
        const width = svgElement.viewBox.baseVal?.width || svgElement.clientWidth
        const height = svgElement.viewBox.baseVal?.height || svgElement.clientHeight
        if (width && height) {
          setIntrinsicSize({ width, height })
        }
      }
    }
  }

  const effectiveHeight = intrinsicSize ? intrinsicSize.height * scale : undefined

  return (
    <div className="my-6">
      <div className="mb-2 flex items-center justify-end gap-2">
        <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-900/40 dark:text-primary-200">
          {zoomLabel}
        </span>
        <button
          type="button"
          aria-label="Zoom out diagram"
          title="Zoom out"
          onClick={zoomOut}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary-200 bg-white text-primary-600 transition hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 dark:border-primary-500/40 dark:bg-gray-900/40 dark:text-primary-200 dark:hover:bg-primary-900/30"
        >
          <ZoomOut className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Zoom in diagram"
          title="Zoom in"
          onClick={zoomIn}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary-200 bg-white text-primary-600 transition hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 dark:border-primary-500/40 dark:bg-gray-900/40 dark:text-primary-200 dark:hover:bg-primary-900/30"
        >
          <ZoomIn className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Reset zoom"
          title="Reset zoom"
          onClick={resetZoom}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary-200 bg-white text-primary-600 transition hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 dark:border-primary-500/40 dark:bg-gray-900/40 dark:text-primary-200 dark:hover:bg-primary-900/30"
        >
          <RefreshCcw className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Download diagram as SVG"
          title="Download SVG"
          onClick={downloadDiagram}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary-200 bg-white text-primary-600 transition hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 dark:border-primary-500/40 dark:bg-gray-900/40 dark:text-primary-200 dark:hover:bg-primary-900/30"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label={showCode ? 'Hide Mermaid source' : 'Show Mermaid source'}
          title={showCode ? 'Hide source' : 'Show source'}
          onClick={() =>
            setShowCode((current) => {
              if (current) {
                setCodeHovered(false)
                setCodeCopied(false)
              }
              return !current
            })
          }
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary-200 text-primary-600 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 dark:border-primary-500/40 dark:text-primary-200 ${
            showCode
              ? 'bg-primary-100/80 dark:bg-primary-900/40'
              : 'bg-white hover:bg-primary-50 dark:bg-gray-900/40 dark:hover:bg-primary-900/30'
          }`}
        >
          <Code2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <div className="mermaid-diagram overflow-auto rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900/60 dark:ring-gray-700">
        <div
          ref={(node) => {
            svgWrapperRef.current = node
            measureSvg(node)
          }}
          className="mx-auto inline-block w-full max-w-full"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            height: effectiveHeight,
          }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
      {showCode && (
        <details className="not-prose mt-4 group rounded-xl border border-gray-200 bg-gray-50 shadow-sm dark:border-gray-700 dark:bg-gray-900/40">
          <summary className="cursor-pointer select-none px-4 py-3 text-sm font-semibold text-primary-700 transition group-open:border-b group-open:border-gray-200 dark:text-primary-200">
            Mermaid source
          </summary>
          <div
            onMouseEnter={() => setCodeHovered(true)}
            onMouseLeave={() => {
              setCodeHovered(false)
              setCodeCopied(false)
            }}
            className="relative border-t border-gray-200 bg-gray-900/95 px-0 py-0 text-sm text-gray-100 dark:border-gray-700"
          >
            {codeHovered && (
              <button
                aria-label="Copy code"
                type="button"
                className={`absolute right-3 top-3 h-8 w-8 rounded border-2 bg-gray-900/90 p-1 ${
                  codeCopied
                    ? 'border-green-400 focus:border-green-400 focus:outline-none'
                    : 'border-gray-600'
                }`}
                onClick={() => {
                  navigator.clipboard.writeText(chart).then(() => {
                    setCodeCopied(true)
                    setTimeout(() => setCodeCopied(false), 2000)
                  })
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                  className={codeCopied ? 'text-green-400' : 'text-gray-300'}
                >
                  {codeCopied ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  )}
                </svg>
              </button>
            )}
            <pre className="mx-0 overflow-x-auto px-4 py-4 font-mono text-sm leading-relaxed">
              <code className="language-mermaid code-highlight">{chart}</code>
            </pre>
          </div>
        </details>
      )}
    </div>
  )
}

export default Mermaid
