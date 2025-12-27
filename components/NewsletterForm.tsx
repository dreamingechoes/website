import { Mail, Send } from 'lucide-react'
import React, { useRef, useState } from 'react'

import siteMetadata from '@/data/siteMetadata'

const NewsletterForm = () => {
  const inputEl = useRef<HTMLInputElement>(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch(`/api/${siteMetadata.newsletter.provider}`, {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error } = await res.json()
    if (error) {
      setError(true)
      setMessage('Your e-mail address is invalid or you are already subscribed!')
      return
    }

    inputEl.current.value = ''
    setError(false)
    setSubscribed(true)
    setMessage('Successfully! 🎉 You are now subscribed.')
  }

  return (
    <div className="not-prose rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-6 shadow-sm dark:border-primary-500/30 dark:from-primary-900/20 dark:to-gray-900 sm:p-8">
      {subscribed ? (
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <span className="text-3xl">🎉</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">You're in!</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Thanks for subscribing. I'll keep you posted with new articles and insights.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 text-center sm:text-left">
            <div className="mb-3 flex items-center justify-center gap-2 sm:justify-start">
              <Mail className="h-5 w-5 text-primary-500" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Stay in the loop
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Get notified when I publish new articles about engineering leadership, remote teams,
              and building better tech cultures. No spam, unsubscribe anytime.
            </p>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={subscribe}>
            <label className="sr-only" htmlFor="email-input">
              Email address
            </label>
            <input
              autoComplete="email"
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-primary-400"
              id="email-input"
              name="email"
              placeholder="your@email.com"
              ref={inputEl}
              required
              type="email"
            />
            <button
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-600 dark:hover:bg-primary-500 dark:focus:ring-offset-gray-900"
              type="submit"
            >
              <Send className="h-4 w-4" />
              Subscribe
            </button>
          </form>
          {error && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{message}</p>}
        </>
      )}
    </div>
  )
}

export default NewsletterForm

export const BlogNewsletterForm = () => (
  <div className="flex items-center justify-center">
    <div className="p-6 bg-gray-100 dark:bg-gray-800 sm:px-14 sm:py-8">
      <NewsletterForm />
    </div>
  </div>
)
