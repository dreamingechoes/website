import { ExternalLink, Github } from 'lucide-react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import projectsData, { ProjectData } from '@/data/projectsData'

import Image from '@/components/Image'
import ImageSlider from '@/components/ImageSlider'
import Link from '@/components/Link'
import { ProjectSEO } from '@/components/SEO'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: projectsData.map((project) => ({
      params: { slug: project.slug },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{ project: ProjectData }> = async (context) => {
  const slug = context.params?.slug as string
  const project = projectsData.find((p) => p.slug === slug)

  if (!project) {
    return { notFound: true }
  }

  return { props: { project } }
}

export default function ProjectDetail({ project }: InferGetStaticPropsType<typeof getStaticProps>) {
  const hasImages = project.images && project.images.length > 0
  const hasSingleImage = project.imgSrc && !hasImages

  return (
    <>
      <ProjectSEO
        title={project.title}
        summary={project.summary}
        slug={project.slug}
        images={hasImages ? project.images : project.imgSrc ? [project.imgSrc] : []}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {project.title}
          </h1>
        </div>

        <div className="pt-8 pb-8 space-y-8">
          {/* Summary */}
          <p className="pl-4 text-xl italic leading-relaxed text-gray-600 border-l-4 border-primary-500 dark:text-gray-300">
            {project.summary}
          </p>

          {/* Image or Slider */}
          {hasImages && <ImageSlider images={project.images} alt={project.title} />}
          {hasSingleImage && (
            <div className="overflow-hidden rounded-lg">
              <Image
                src={project.imgSrc}
                alt={project.title}
                width={1200}
                height={675}
                className="object-cover w-full"
              />
            </div>
          )}

          {/* Description */}
          <div className="prose max-w-none dark:prose-dark">
            <p>{project.description}</p>
          </div>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Technologies
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          {(project.href || project.repo) && (
            <div className="flex flex-wrap gap-4 pt-4">
              {project.href && (
                <Link
                  href={project.href}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors rounded-lg bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:ring-offset-gray-900"
                  aria-label={`Visit ${project.title}`}
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit project
                </Link>
              )}
              {project.repo && (
                <Link
                  href={project.repo}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors border border-gray-300 rounded-lg dark:text-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:ring-offset-gray-900"
                  aria-label={`View source code for ${project.title}`}
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
