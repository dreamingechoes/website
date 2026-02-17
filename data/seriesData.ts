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
  'human-latency-in-ai-accelerated-teams': {
    slug: 'human-latency-in-ai-accelerated-teams',
    title: 'Human Latency in AI-Accelerated Teams',
    summary:
      'What happens when AI compresses delivery cycles but humans still need time to think, feel, and align.',
    description:
      "A series exploring the growing gap between machine speed and human processing in engineering teams. AI shrinks cycle times, but trust, clarity, and emotional integration don't compress at the same rate. Each post examines where that gap shows up — in decisions, in team dynamics, in the quiet weight people carry between sprints — and offers practical ways to close it without slowing down.",
    cta: {
      label: null,
      href: null,
    },
  },
  'philosophy-for-builders': {
    slug: 'philosophy-for-builders',
    title: 'Philosophy for Builders',
    summary:
      'Turning philosophical ideas into practical tools for building software — prioritization, design, delivery, and culture.',
    description:
      'A series that applies philosophy as an engineering lens: not as abstract theory, but as a way to make clearer trade-offs, build more sustainable systems, and lead with more intention. Each post starts with a concept (Stoicism, memento mori, Socratic method...) and translates it into concrete frameworks, questions, and habits you can actually use while shipping.',
    cta: {
      label: null,
      href: null,
    },
  },
  'the-quiet-side-of-tech': {
    slug: 'the-quiet-side-of-tech',
    title: 'The Quiet Side of Tech',
    summary:
      'Exploring the emotional side of building software — burnout, identity, ambition, loneliness, and healing inside modern tech culture.',
    description:
      'A reflective series on mental health awareness in tech, exploring the quiet struggles behind high performance, productivity, and constant delivery. Each post gives language to emotions many feel but rarely name — not to “fix” people, but to better understand ourselves and the culture we work in.',
    cta: {
      label: null,
      href: null,
    },
  },
  'cross-functional-glue-em-product-design': {
    slug: 'cross-functional-glue-em-product-design',
    title: 'Cross-Functional Glue: EM x Product x Design',
    summary:
      'Operating rhythms, artifacts, and guardrails that make triads click — fewer hand-offs, clearer decisions, happier teams.',
    description:
      'Practical playbook for Engineering Managers partnering with Product and Design. From PRD-to-prod handoffs to weekly bets, 45-minute qual+quant reviews, and post-launch care windows, each post includes frameworks and examples you can use without burning the team.',
    cta: {
      label: null,
      href: null,
    },
  },
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
