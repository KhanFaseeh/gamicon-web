import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Privacy() {
  return (
    <div className="bg-background text-on-surface antialiased selection:bg-secondary selection:text-on-secondary min-h-screen flex flex-col justify-between overflow-x-hidden">
      <Header />
      <main className="w-full pt-28 md:pt-36 flex-grow px-margin md:px-margin-desktop pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant font-medium tracking-wide uppercase">
              Legal Disclosures
            </span>
          </div>

          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-extrabold tracking-tight">
            Privacy Policy
          </h1>

          <div className="prose prose-invert max-w-none text-on-surface-variant space-y-6 font-body-md text-body-md leading-relaxed border-t border-on-surface/15 pt-8">
            <p>
              Anamorphic (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;studio&rdquo;) is an independent software and game engineering studio. We value the privacy of our visitors and clients. This privacy policy describes the types of information we collect and how we utilize it.
            </p>

            <h2 className="font-headline-md text-xl font-bold text-on-surface pt-4">
              1. Direct Inquiries &amp; Information Collection
            </h2>
            <p>
              When you submit a project inquiry or contact us via email, we collect your name, email address, company details, and project technical specifications solely to evaluate engineering feasibility and respond to your scoping request. We do not sell, rent, or trade your contact information with any third-party marketing entities.
            </p>

            <h2 className="font-headline-md text-xl font-bold text-on-surface pt-4">
              2. Technical Telemetry &amp; Hosting
            </h2>
            <p>
              Like most standard web platforms, our hosting infrastructure may record standard server log information, including your IP address, browser type, referring URLs, and timestamps. This telemetry is collected solely for security auditing, DDoS mitigation, and ensuring stable network performance.
            </p>

            <h2 className="font-headline-md text-xl font-bold text-on-surface pt-4">
              3. Client Confidentiality &amp; Code Ownership
            </h2>
            <p>
              All proprietary systems, schemas, architectural blueprints, and intellectual property developed for our clients are governed by explicit non-disclosure agreements (NDAs) and commercial contracts. Project artifacts remain strictly confidential.
            </p>

            <h2 className="font-headline-md text-xl font-bold text-on-surface pt-4">
              4. Contact Us
            </h2>
            <p>
              For privacy-related inquiries or requests regarding your personal data, reach out directly to our engineering team at{' '}
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
