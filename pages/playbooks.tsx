import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'
import playbooksData from '@/data/playbooksData'
import siteMetadata from '@/data/siteMetadata'

export default function Playbooks() {
  return (
    <>
      <PageSEO
        title={`Playbooks - ${siteMetadata.author}`}
        description="Practical, opinionated operating systems for engineering leaders and builders — frameworks, templates, and systems you can put to work immediately."
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Playbooks
          </h1>
        </div>
        <div className="container py-12">
          <div className="flex flex-wrap -m-4">
            {playbooksData.map((d) => (
              <Card
                key={d.slug}
                title={d.title}
                description={d.summary}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
