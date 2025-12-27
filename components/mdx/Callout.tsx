import { AlertTriangle, CheckCircle2, Info as InfoIcon, Lightbulb, LucideIcon } from 'lucide-react'

import { ReactNode } from 'react'

const iconMap: Record<CalloutVariant, LucideIcon> = {
  info: InfoIcon,
  warning: AlertTriangle,
  success: CheckCircle2,
  idea: Lightbulb,
}

const variantStyles: Record<CalloutVariant, string> = {
  info: 'border-primary-200 bg-primary-50 text-primary-900 dark:border-primary-500/40 dark:bg-primary-900/20 dark:text-primary-50',
  warning:
    'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/40 dark:bg-amber-900/20 dark:text-amber-50',
  success:
    'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-900/20 dark:text-emerald-50',
  idea: 'border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-500/40 dark:bg-sky-900/20 dark:text-sky-50',
}

export type CalloutVariant = 'info' | 'warning' | 'success' | 'idea'

type CalloutProps = {
  title?: string
  variant?: CalloutVariant
  children: ReactNode
}

const defaultTitle: Record<CalloutVariant, string> = {
  info: 'Info',
  warning: 'Heads up',
  success: 'All good',
  idea: 'Idea',
}

const Callout = ({ title, variant = 'info', children }: CalloutProps) => {
  const Icon = iconMap[variant]
  const heading = title || defaultTitle[variant]

  return (
    <div
      className={`not-prose my-6 overflow-hidden rounded-2xl border shadow-sm ring-1 ring-black/5 dark:ring-white/10 ${variantStyles[variant]}`}
    >
      <div className="flex items-center gap-3 border-b border-white/40 px-3 py-2 text-sm font-semibold uppercase tracking-wide text-black/70 dark:text-white/80">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-primary-600 dark:bg-white/20 dark:text-primary-100">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        {heading}
      </div>
      <div className="callout-content bg-white/70 px-5 py-4 text-base text-gray-800 dark:bg-white/10 dark:text-gray-100">
        {children}
      </div>
    </div>
  )
}

export default Callout
