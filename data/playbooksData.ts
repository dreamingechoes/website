export interface PlaybookData {
  slug: string
  title: string
  summary: string
  imgSrc: string | null
  href: string | null
  repo: string | null
}

const playbooksData: PlaybookData[] = [
  {
    slug: 'engineering-leadership',
    title: 'Engineering Leadership Playbook',
    summary:
      'A practical, copy-pastable operating system for healthy, high-performing engineering teams in remote-first SaaS environments.',
    imgSrc: null,
    href: '/playbooks/engineering-leadership',
    repo: 'https://github.com/dreamingechoes/engineering-leadership-playbook',
  },
]

export default playbooksData
