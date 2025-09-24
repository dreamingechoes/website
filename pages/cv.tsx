import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function CV() {
  return (
    <>
      <PageSEO
        title={`CV - ${siteMetadata.author}`}
        description="Curriculum Vitae and professional resume"
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Curriculum Vitae
          </h1>
        </div>
        <div className="container py-12">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold flex items-center">
              Professional Resume
              <span className="ml-2 px-2 py-1 text-xs font-medium text-white bg-green-600 rounded-full font-semibold">
                Open to Work
              </span>
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Here’s my journey as a <b>Senior Software Engineer</b> and <b>Engineering Lead</b>.
              Over the years, I’ve tackled complex technical challenges, mentored people, and built
              strong, supportive, and healthy teams that deliver.
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              What drives me is the mix of problem-solving and collaboration, writing reliable code
              while creating an environment where people can do their best work. This resume brings
              together the skills, projects, and experiences that have shaped my career so far.
            </p>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Last updated: September 2025 • PDF format • 3 pages
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={siteMetadata.resume || '/static/resume.pdf'}
                download
                className="inline px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-purple hover:bg-purple-700 dark:hover:bg-purple-500"
              >
                Download PDF
              </a>
              <a
                href={siteMetadata.resume || '/static/resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline px-4 py-2 text-sm font-medium leading-5 transition-colors duration-150 bg-stone-50 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-stone hover:bg-stone-200 dark:hover:bg-stone-100 dark:hover:text-gray-800 text-gray-700"
              >
                View Online
              </a>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="font-semibold">Experience</h3>
              <ul className="mt-3 list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                <li>Over 15 years in software engineering</li>
                <li>Led and scaled remote teams</li>
                <li>
                  Specialized in{' '}
                  <a
                    href="https://elixir-lang.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    Elixir
                  </a>
                  ,{' '}
                  <a
                    href="https://phoenixframework.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    Phoenix
                  </a>
                  , and distributed systems
                </li>
                <li>Built and scaled HR and EdTech platforms from scratch</li>
                <li>
                  Engineering leadership at{' '}
                  <a
                    href="https://remote.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    Remote
                  </a>
                  ,{' '}
                  <a
                    href="https://factorialhr.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    Factorial HR
                  </a>{' '}
                  &{' '}
                  <a
                    href="https://lingokids.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    Lingokids
                  </a>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="font-semibold">Education & Community</h3>
              <ul className="mt-3 list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                <li>Computer Science Engineering — Oviedo University</li>
                <li>AI Expert Program — U.N.E.D.</li>
                <li>
                  Mentor at{' '}
                  <a
                    href="https://mentorcruise.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    MentorCruise
                  </a>{' '}
                  &{' '}
                  <a
                    href="https://www.linkedin.com/company/coding-coach/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    Coding Coach
                  </a>
                </li>
                <li>
                  Co-founder of{' '}
                  <a
                    href="https://folkswhocode.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    Folks Who Code
                  </a>
                  ,{' '}
                  <a
                    href="https://www.fabadaconf.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    FabadaConf
                  </a>{' '}
                  &{' '}
                  <a
                    href="https://elixirasturias.github.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    Elixir Asturias
                  </a>
                </li>
                <li>Advocate for DEI, mental health & inclusive tech communities</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            For specific questions about my experience or to discuss opportunities, feel free to{' '}
            <a href={`mailto:${siteMetadata.email}`} className="text-primary-500 hover:underline">
              get in touch
            </a>
            .
          </div>
        </div>
      </div>
    </>
  )
}
