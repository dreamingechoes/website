import Github from './github.svg'
import Gitlab from './gitlab.svg'
import Linkedin from './linkedin.svg'
import Linktree from './linktree.svg'
import Twitter from './twitter.svg'

const components = {
  github: Github,
  linkedin: Linkedin,
  linktree: Linktree,
  twitter: Twitter,
  gitlab: Gitlab,
}

const SocialIcon = ({ kind, href, size = 8 }) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 dark:text-gray-200 dark:hover:text-primary-600 h-${size} w-${size}`}
      />
    </a>
  )
}

export default SocialIcon
