export interface ProjectData {
  slug: string
  title: string
  summary: string
  description: string
  imgSrc: string | null
  images: string[]
  href: string | null
  repo: string | null
  technologies: string[]
}

const projectsData: ProjectData[] = [
  {
    slug: 'avenida',
    title: 'Avenida',
    summary: 'Shop smarter. Save any product from any marketplace in one click.',
    description:
      'Avenida is a smart shopping companion that lets you save, organize, and track products from any online marketplace in a single place. With a browser extension and a clean dashboard, you can create wishlists, compare prices, and never lose track of something you want to buy again. Built with a focus on simplicity and speed, Avenida turns scattered browser tabs into a calm, curated shopping experience.',
    imgSrc: null,
    images: [
      '/static/images/projects/avenida/1.png',
      '/static/images/projects/avenida/2.png',
      '/static/images/projects/avenida/3.png',
      '/static/images/projects/avenida/4.png',
      '/static/images/projects/avenida/5.png',
      '/static/images/projects/avenida/6.png',
      '/static/images/projects/avenida/7.png',
      '/static/images/projects/avenida/8.png',
    ],
    href: 'https://www.avenida.so/',
    repo: 'https://github.com/avenidaeng',
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'PostgreSQL',
      'Vercel',
      'Supabase',
      'AI',
      'React Native',
      'Browser Extension',
    ],
  },
  {
    slug: 'engineering-leadership-playbook',
    title: 'Engineering Leadership Playbook',
    summary:
      'A handbook for engineering leaders to help them navigate the challenges of leading software teams.',
    description:
      'The Engineering Leadership Playbook is an open, opinionated handbook distilled from over 15 years of building and leading software teams. It covers everything from running effective one-on-ones and structuring delivery cadences to scaling engineering culture and navigating organizational design. Written as a living reference, the playbook offers practical frameworks, templates, and operating principles for engineering managers, tech leads, and directors who want to lead with clarity and empathy.',
    imgSrc: null,
    images: ['/static/images/projects/engineering-leadership-playbook/1.jpeg'],
    href: 'https://dreamingecho.es/playbook/',
    repo: 'https://github.com/dreamingechoes/engineering-leadership-playbook',
    technologies: ['MDX', 'Next.js', 'Tailwind CSS'],
  },
  {
    slug: 'awesome-mental-health',
    title: 'Awesome Mental Health',
    summary:
      'A curated list of awesome articles, websites, and resources about mental health in the software industry.',
    description:
      'Awesome Mental Health is a community-driven, open-source collection of carefully curated articles, talks, websites, and resources focused on mental health in the software industry. Created to raise awareness and reduce stigma, the repository covers topics like burnout, anxiety, depression, impostor syndrome, and workplace wellbeing. It has become one of the go-to references for developers and engineering leaders looking for trustworthy, non-clinical mental health resources.',
    imgSrc: null,
    images: ['/static/images/projects/awesome-mental-health/1.jpg'],
    href: 'https://dreamingechoes.github.io/awesome-mental-health/',
    repo: 'https://github.com/dreamingechoes/awesome-mental-health',
    technologies: ['Markdown', 'GitHub Pages', 'Open Source'],
  },
  {
    slug: 'awesome-diversity',
    title: 'Awesome Diversity',
    summary:
      'A curated list of amazingly awesome articles, websites and resources about diversity in technology.',
    description:
      'Awesome Diversity is a collaboratively maintained list of articles, organizations, conferences, and actionable resources dedicated to promoting diversity and inclusion in the technology industry. Part of the Folks Who Code community initiative, it provides a structured starting point for anyone—individuals, teams, or organizations—looking to learn about and actively support underrepresented groups in tech.',
    imgSrc: null,
    images: ['/static/images/projects/folks-who-code/1.jpg'],
    href: null,
    repo: 'https://github.com/folkswhocode/awesome-diversity',
    technologies: ['Markdown', 'GitHub', 'Open Source'],
  },
  {
    slug: 'neilipsum',
    title: 'Neilipsum',
    summary: 'Lorem ipsum single page application with Neil deGrasse Tyson quotes.',
    description:
      'Neilipsum is a playful lorem ipsum generator that replaces the traditional placeholder text with real quotes from astrophysicist Neil deGrasse Tyson. Built as a lightweight single-page application, it lets designers and developers generate paragraphs of science-flavored filler text for mockups and prototypes. Simple, fun, and a little nerdy.',
    imgSrc: null,
    images: ['/static/images/projects/neilipsum/1.png'],
    href: 'https://neilipsum.pw',
    repo: 'https://github.com/dreamingechoes/neilipsum',
    technologies: ['JavaScript', 'HTML', 'CSS'],
  },
  {
    slug: 'shoegaze-bot',
    title: 'Shoegaze Bot',
    summary: 'Bot that sends a new tweet every day with a new shoegaze song.',
    description:
      'Shoegaze Bot is a Twitter bot built to share a new shoegaze song every single day. Running on a scheduled automation, it picks from a curated library of tracks spanning the genre—from classic My Bloody Valentine and Slowdive cuts to obscure lo-fi gems—and posts them to its timeline. A small love letter to one of the most beautiful and underappreciated music genres.',
    imgSrc: null,
    images: ['/static/images/projects/shoegaze-bot/1.jpg'],
    href: 'https://twitter.com/ShoegazeBot_',
    repo: null,
    technologies: ['Elixir', 'Twitter API', 'Cron'],
  },
  {
    slug: 'fabada-conference',
    title: 'Fabada Conference',
    summary: 'Annual software engineering conference located in Gijón, Asturias.',
    description:
      "Fabada Conference is an annual software engineering event held in Gijón, Asturias. Born from the local tech community, the conference brings together developers, designers, and product people for a day of talks, workshops, and conversations about building better software and healthier teams. The name is a nod to the region's iconic dish—because great things happen when people gather around a good table.",
    imgSrc: null,
    images: ['/static/images/projects/fabada-conf/1.jpg'],
    href: 'https://fabadaconf.com/',
    repo: 'https://github.com/fabadaconf',
    technologies: ['Community', 'Events', 'Asturias'],
  },
  {
    slug: 'elixir-asturias',
    title: 'Elixir Asturias',
    summary:
      'Community for Elixir enthusiasts in Asturias, organizing meetups, talks, and projects to learn.',
    description:
      'Elixir Asturias is a local community group for anyone interested in the Elixir programming language and the broader BEAM ecosystem, based in Asturias, Spain. The group organizes regular meetups, talks, and collaborative coding sessions to explore functional programming, concurrency, and distributed systems. Whether you are a beginner or an experienced Elixir developer, the community is a welcoming space to learn, share, and build together.',
    imgSrc: null,
    images: ['/static/images/projects/elixir-asturias/1.jpg'],
    href: 'https://elixirasturias.github.io/',
    repo: 'https://github.com/elixirasturias',
    technologies: ['Elixir', 'Phoenix', 'BEAM', 'Community'],
  },
]

export default projectsData
