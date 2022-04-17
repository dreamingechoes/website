import Dev from './devto.svg'
import Facebook from './facebook.svg'
import Github from './github-icon-1.svg'
import Gitlab from './gitlab.svg'
import Linkedin from './linkedin.svg'
import Mail from './mail.svg'
import Twitter from './twitter-6.svg'
import Youtube from './youtube.svg'

// Icons taken from: https://simpleicons.org/

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  gitlab: Gitlab,
  dev: Dev,
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
