import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Terms() {
  return (
    <div className="bg-background text-on-surface antialiased selection:bg-secondary selection:text-on-secondary min-h-screen flex flex-col justify-between overflow-x-hidden">
      <Header />
      <main className="w-full pt-28 md:pt-36 flex-grow px-margin md:px-margin-desktop pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant font-medium tracking-wide uppercase">
              Terms &amp; Conditions
            </span>
          </div>

          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-extrabold tracking-tight">
            Terms of Service
          </h1>

          <div className="prose prose-invert max-w-none text-on-surface-variant space-y-6 font-body-md text-body-md leading-relaxed border-t border-on-surface/15 pt-8">
            <p>
              By accessing the website and digital properties operated by Anamorphic (&ldquo;Anamorphic&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;), you agree to comply with and be bound by the following terms and conditions.
            </p>

            <h2 className="font-headline-md text-xl font-bold text-on-surface pt-4">
              1. Engineering Engagements &amp; Statement of Work
            </h2>
            <p>
              All software development, consulting, cloud infrastructure, game programming, and architectural engineering services provided by Anamorphic are performed under distinct Master Services Agreements (MSA) and project-specific Statements of Work (SOW). Deadlines, deliverables, and financial considerations are defined in those respective documents.
            </p>

            <h2 className="font-headline-md text-xl font-bold text-on-surface pt-4">
              2. Intellectual Property
            </h2>
            <p>
              Unless otherwise specified in a commercial agreement, all code, designs, and systems created specifically for clients are transferred upon final invoice settlement. Pre-existing proprietary libraries, open-source modules, and standard studio tooling retain their original licensing structures.
            </p>

            <h2 className="font-headline-md text-xl font-bold text-on-surface pt-4">
              3. Accuracy of Case Studies &amp; Demonstrations
            </h2>
            <p>
              The case studies and metrics published on this site reflect real production milestones, architecture patterns, and verified engineering telemetry. They are presented for demonstrative and portfolio purposes to illustrate engineering capabilities.
            </p>

            <h2 className="font-headline-md text-xl font-bold text-on-surface pt-4">
              4. Governing Law &amp; Contact
            </h2>
            <p>
              For legal inquiries regarding these terms, contact{' '}
              <a href="mailto:hello@anamorphic.studio" className="text-secondary font-semibold hover:underline">
                hello@anamorphic.studio
              </a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
