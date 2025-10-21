export type SeriesDefinition = {
  slug: string
  title: string
  summary?: string
  description?: string
  cta?: {
    label?: string | null
    href?: string | null
  } | null
}

export const seriesData: Record<string, SeriesDefinition> = {
  'empathetic-remote-management': {
    slug: 'empathetic-remote-management',
    title: 'Empathetic Remote Management',
    summary:
      'Practical reflections on building trust, coaching people, and leading remote teams at a sustainable pace.',
    description:
      'From high-impact 1:1s to people-first coaching styles, this series walks through the daily habits and guardrails that keep remote teams healthy, connected, and shipping. Each installment gives you practical rituals to strengthen psychological safety while protecting your own energy as a leader.',
    cta: {
      label: null,
      href: null,
    },
  },
  'cross-functional-glue-em-product-design': {
    slug: 'cross-functional-glue-em-product-design',
    title: 'Cross-Functional Glue: EM x Product x Design',
    summary:
      'Operating rhythms, artifacts, and guardrails that make triads click: less ping-pong, clearer decisions, happier teams.',
    description:
      'Practical playbook for Engineering Managers partnering with Product and Design. From PRD-to-prod handoffs to weekly bets, 45-minute qual+quant reviews, and post-launch care windows, each post includes guides and examples you can use without burning the team.',
    cta: {
      label: null,
      href: null,
    },
  },
}

export const ensureSeriesDefinition = (slug: string): SeriesDefinition => {
  const definition = seriesData[slug]
  if (definition) {
    return definition
  }

  const humanized = slug
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ')

  return {
    slug,
    title: humanized,
  }
}
