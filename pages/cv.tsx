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
            <h2 className="text-lg font-semibold">Professional Resume</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Comprehensive overview of my professional experience, technical skills, and others.
            </p>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Last updated: May 2025 • PDF format • 3 pages
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={siteMetadata.resume || '/static/resume.pdf'}
                download
                className="inline-flex items-center px-3 py-2 bg-black text-white rounded hover:opacity-90"
              >
                Download PDF
              </a>
              <a
                href={siteMetadata.resume || '/static/resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                View Online
              </a>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="font-semibold">Experience</h3>
              <ul className="mt-3 list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                <li>15+ years in software engineering</li>
                <li>Led and scaled remote teams up to 8 engineers</li>
                <li>Specialized in Elixir, Phoenix, and distributed systems</li>
                <li>Built and scaled HR and EdTech platforms from scratch</li>
                <li>Engineering leadership at Remote, Factorial HR & Lingokids</li>
              </ul>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="font-semibold">Education & Community</h3>
              <ul className="mt-3 list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                <li>Computer Science Engineering — Oviedo University</li>
                <li>AI Expert Program — U.N.E.D.</li>
                <li>Mentor at MentorCruise & Coding Coach</li>
                <li>Co-founder of Folks Who Code, FabadaConf & Elixir Asturias</li>
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
