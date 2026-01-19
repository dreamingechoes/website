import { Link2, Linkedin, Twitter } from 'lucide-react'

import { useState } from 'react'

interface SocialShareProps {
  title: string
  slug: string
  siteUrl: string
}

export default function SocialShare({ title, slug, siteUrl }: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const postUrl = `${siteUrl}/blog/${slug}`

  const shareLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://x.com/intent/post?text="${title}" by @dreamingechoes&url=${encodeURIComponent(
        postUrl
      )}`,
    },
  ]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(postUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Share it!</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {shareLinks.map((link) => {
          const Icon = link.icon
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${link.name}`}
              className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 transition-all hover:border-primary-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-600"
              title={`Share on ${link.name}`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors group-hover:bg-primary-50 group-hover:text-primary-600 dark:bg-gray-700 dark:text-gray-300 dark:group-hover:bg-primary-900/30 dark:group-hover:text-primary-400">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">{link.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Share article</div>
              </div>
            </a>
          )
        })}
        <button
          onClick={handleCopy}
          className={`group flex items-center gap-3 rounded-xl border px-4 py-3 transition-all ${
            copied
              ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-900/20'
              : 'border-gray-200 bg-white hover:border-primary-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-600'
          }`}
          title="Copy link to clipboard"
        >
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
              copied
                ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                : 'bg-gray-100 text-gray-600 group-hover:bg-primary-50 group-hover:text-primary-600 dark:bg-gray-700 dark:text-gray-300 dark:group-hover:bg-primary-900/30 dark:group-hover:text-primary-400'
            }`}
          >
            {copied ? <span className="text-sm font-bold">✓</span> : <Link2 className="h-5 w-5" />}
          </div>
          <div>
            <div
              className={`font-medium ${
                copied
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-gray-900 dark:text-gray-100'
              }`}
            >
              {copied ? 'Copied!' : 'Copy link'}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">To clipboard</div>
          </div>
        </button>
      </div>
    </div>
  )
}
