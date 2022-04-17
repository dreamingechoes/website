import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center mt-16">
        <div className="flex mb-8 space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`${siteMetadata.title} © ${new Date().getFullYear()}`}</div>
        </div>
      </div>
    </footer>
  )
}
