import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Code2,
  Download,
  ExternalLink,
  Sparkles,
  Zap,
} from 'lucide-react'

import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

function Card({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 rounded-md border-opacity-60 dark:border-gray-700 p-6">
      <h2 className="text-xl text-gray-900 dark:text-gray-100">{title}</h2>
      {children}
    </div>
  )
}

export default function CV() {
  return (
    <>
      <PageSEO
        title={`CV - ${siteMetadata.author}`}
        description="Engineering Leader, Product Engineer, and Senior Software Engineer with over 15 years of experience building product software, shaping technical direction, and helping teams turn ambiguity into clear, sustainable execution."
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Curriculum Vitae
          </h1>
        </div>

        <div className="container py-12 space-y-8">
          {/* Hero / Intro + PDF */}
          <Card title="Professional Resume">
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              I build product software at the intersection of{' '}
              <b>engineering, product, and people</b>. Over the last 15+ years, I've worked across
              backend systems, platform foundations, product development, and engineering leadership
              — helping teams turn ambiguity into clear, sustainable execution.
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              My work combines <b>technical depth, product thinking, and people-first leadership</b>
              . I'm most effective in environments where I can contribute beyond implementation:
              shaping ideas early, defining scope, navigating trade-offs, and helping build systems
              and teams that can evolve without unnecessary complexity.
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              More recently, I've also been exploring <b>AI-native product development</b> — using
              AI not just to speed up coding, but to improve the full path from ideation and product
              definition to technical proposals, scope slicing, implementation, testing, and
              delivery.
            </p>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Last updated: April 2026 • PDF format • 3 pages
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="/static/RESUME_IVAN_GONZALEZ_SAIZ.pdf"
                download
                className="inline-flex items-center gap-2 px-4 py-2 font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-purple hover:bg-purple-700 dark:hover:bg-purple-500"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
              <a
                href="/static/RESUME_IVAN_GONZALEZ_SAIZ.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 font-medium leading-5 transition-colors duration-150 bg-stone-50 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-stone hover:bg-stone-200 dark:hover:bg-stone-100 dark:hover:text-gray-800 text-gray-700 shadow focus:shadow-outline-stone"
              >
                <ExternalLink className="w-4 h-4" />
                View Online
              </a>
            </div>
          </Card>

          {/* Current Focus */}
          <Card title="Current Focus">
            <p className="mt-3 mb-6 text-gray-600 dark:text-gray-300">
              My work today is organized around three connected areas that reinforce each other in
              practice.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-primary-500" />
                  Product engineering
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  At{' '}
                  <a
                    href="https://sequra.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    seQura
                  </a>
                  , I work in the Merchant Experience team in a <b>0→1 product engineering role</b>{' '}
                  spanning ideation, product definition, technical decisions, and execution. I'm
                  drawn to shaping ideas early, making trade-offs explicit, and turning ambiguous
                  opportunities into useful, maintainable product experiences.
                </p>
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary-500" />
                  0→1 building
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  As <b>Co-Founder &amp; Product Engineer at Avenida</b>, I build a product end to
                  end in close collaboration with Product. It's a space where I stay deeply hands-on
                  across architecture, implementation, delivery, and product shaping — where
                  engineering judgment and product thinking live in the same person.
                </p>
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary-500" />
                  AI-native workflows
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  A growing part of my work is designing <b>AI-native ways of building products</b>:
                  practical workflows that improve clarity, decision-making, and execution across
                  the full lifecycle — from idea to production. The interest isn't speed alone, but
                  using AI to build with more deliberateness and less noise.
                </p>
              </div>
            </div>
          </Card>

          {/* How I Work */}
          <Card title="How I Work">
            <p className="mt-3 mb-6 text-gray-600 dark:text-gray-300">
              I work best where <b>engineering, product, and execution</b> are treated as part of
              the same system — not as separate concerns handed off between silos.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary-500" />
                  Start from the problem
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  I prefer beginning with the problem space, user need, and product context — not
                  just the backlog. Good engineering starts with better framing. I try to align on
                  what success looks like before defining what to build, because that clarity almost
                  always produces better systems downstream.
                </p>
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary-500" />
                  Make scope and trade-offs explicit
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Ambiguity is expensive. I invest in shaping ideas early, reducing uncertainty, and
                  making trade-offs visible — to the team and to stakeholders. Clarity upstream
                  usually creates better systems and healthier delivery downstream.
                </p>
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary-500" />
                  Build systems that can evolve
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  I value simplicity, maintainability, and operational clarity. Systems should be
                  robust enough for growth but simple enough to remain understandable by the people
                  maintaining them. Accidental complexity compounds quietly — and it's usually
                  avoidable.
                </p>
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary-500" />
                  Prefer sustainable execution over heroics
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  High-performing teams don't need constant intensity. They need clear ownership,
                  good context, strong feedback loops, and ways of working that hold up over time.
                  Sustainable pace is not a concession — it's a precondition for quality.
                </p>
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary-500" />
                  Use AI as a workflow capability
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  I'm interested in AI not just as a coding assistant, but as a way to improve how
                  software gets built — across ideation, definition, slicing, implementation,
                  testing, and delivery. The question I keep asking isn't "how fast can I ship?" but
                  "how can I think and decide more clearly?"
                </p>
              </div>
            </div>
          </Card>

          {/* Leadership Style */}
          <Card title="Leadership Style">
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              A big part of my career has been about people leadership. I care deeply about creating
              healthy engineering environments where{' '}
              <b>psychological safety, clear ownership, high standards, and honest communication</b>{' '}
              can coexist. My style is people-first but direct: strong teams do their best work when
              expectations are clear, trust is real, and execution is sustainable rather than
              heroic.
            </p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              I'm especially interested in the kind of leadership that connects product direction,
              technical judgment, team health, and delivery discipline — not as separate concerns,
              but as parts of the same operating model.
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
                      Focus on lead time, reliability, and execution clarity — not vanity metrics.
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
              <blockquote className="mt-4 border-l-4 border-primary-500 pl-4 italic text-gray-500 dark:text-gray-400">
                "Culture eats strategy for breakfast." — Peter Drucker
                <br />
                <span className="text-xs not-italic">
                  Great strategies endure only when everyday behaviors make them real.
                </span>
              </blockquote>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
