import { ArrowRight, CheckCircle2, Download, ExternalLink, Sparkles } from 'lucide-react'

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
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold flex items-center">
              Professional Resume
              <span className="ml-2 px-2 py-1 text-xs font-medium text-white bg-green-600 rounded-full font-semibold">
                Open to Work
              </span>
            </h2>
            <p className="mt-2  text-gray-500 dark:text-gray-400">
              Here's my journey as a <b>Senior Software Engineer</b> and <b>Engineering Lead</b>.
              I've tackled complex technical challenges, mentored people, and built supportive, and
              healthy teams that deliver.
            </p>
            <p className="mt-2  text-gray-500 dark:text-gray-400">
              What drives me is the mix of problem-solving and collaboration, writing reliable code
              while creating an environment where people can do their best work. This resume brings
              together the skills, projects, and experiences that have shaped my career so far.
            </p>
            <p className="mt-4  text-gray-500 dark:text-gray-400">
              Last updated: September 2025 • PDF format • 3 pages
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="/static/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-4 py-2  font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-purple hover:bg-purple-700 dark:hover:bg-purple-500"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
              <a
                href="/static/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2  font-medium leading-5 transition-colors duration-150 bg-stone-50 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-stone hover:bg-stone-200 dark:hover:bg-stone-100 dark:hover:text-gray-800 text-gray-700 shadow focus:shadow-outline-stone"
              >
                <ExternalLink className="w-4 h-4" />
                View Online
              </a>
            </div>
          </div>

          <div className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold">Leadership Style</h2>
            <p className="mt-2  text-gray-500 dark:text-gray-400">
              I lead with people-first clarity and technical depth. Over the years, I've learned
              that high performance comes from psychological safety, ownership, and well-understood
              systems. My style blends inclusive, servant leadership with pragmatic engineering: set
              context, co-create standards, remove friction, and let great people do their best
              work.
            </p>

            <div className="mt-6">
              <h3 className="font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary-500" />
                What this looks like in practice
              </h3>

              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  Intentional remote leadership
                </h4>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Clear goals, written context, and transparent decisions so no one is blocked
                      by time zones.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Rituals that reinforce alignment: roadmap reviews, architecture forums, and
                      predictable delivery cadences.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  Coaching and growth
                </h4>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span>
                      1:1s as a safe space for development: career paths, feedback, and early
                      signals of burnout or friction.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Fair distribution of high-impact work and sponsorship that makes talent
                      visible.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  Pragmatic technical leadership
                </h4>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Architectures that favor reliability, observability, and maintainability over
                      accidental complexity.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Guardrails and standards (ADRs, code review norms, incident/postmortem
                      quality) that balance speed and quality.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  Outcome-driven delivery
                </h4>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Tight partnership with Product and Design to solve real user problems.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Focus on lead time, reliability, and execution clarity, not vanity metrics.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  Inclusive by design
                </h4>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Diversity as a transversal practice: how we collaborate, give credit, assign
                      projects, and honor different realities.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Accessible communication: agendas in advance, notes/recordings, clear
                      language, and organized documentation.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary-500" />
                Principles I live by
              </h3>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                  <ArrowRight className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Clarity over control: Set context and constraints; empower teams to decide.
                  </span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                  <ArrowRight className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Fewer, better systems: Reduce complexity to make reliability repeatable.
                  </span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                  <ArrowRight className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>Feedback as a habit: Make it frequent, specific, and growth-oriented.</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                  <ArrowRight className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Consistency {'>'} heroics: Reliable processes beat last-minute pushes.
                  </span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                  <ArrowRight className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Inclusion is operational: Design rituals and communication that welcome, hear,
                    and reflect every voice in decisions.
                  </span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                  <ArrowRight className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Psychological safety: Enable candid debate, asking for help, and thoughtful
                    risk-taking without fear of blame.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary-500" />
                Favorite quote
              </h3>
              <blockquote className="mt-4 border-l-4 border-primary-500 pl-4 italic  text-gray-500 dark:text-gray-400">
                "Culture eats strategy for breakfast." — Peter Drucker
                <br />
                <span className="text-xs not-italic">
                  Great strategies endure only when everyday behaviors make them real.
                </span>
              </blockquote>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="font-semibold">Experience</h3>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>Over 15 years in software engineering</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>Led and scaled remote teams</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>
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
                  </span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>Built and scaled HR and EdTech platforms from scratch</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Eng. leadership at{' '}
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
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="font-semibold">Education & Community</h3>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>Computer Science Engineering — Oviedo University</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>AI Expert Program — U.N.E.D.</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>
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
                  </span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Co-founder of{' '}
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
                  </span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>Advocate for DEI & mental health in tech</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8  text-gray-500 dark:text-gray-400">
            For specific questions about my experience or to discuss opportunities, feel free to{' '}
            <a href="mailto:hi@dreamingecho.es" className="text-primary-500 hover:underline">
              get in touch
            </a>
            .
          </div>
        </div>
      </div>
    </>
  )
}
