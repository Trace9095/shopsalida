import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'Our commitment to web accessibility for all users.',
}

export default function AccessibilityPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Accessibility Statement</h1>
      <p className="text-sm opacity-60 mb-10">Last updated: March 2026</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">Our Commitment</h2>
          <p className="opacity-80">
            Shop Salida is committed to ensuring digital accessibility for people with disabilities.
            We continually improve the user experience for everyone and apply relevant accessibility standards.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Standards</h2>
          <p className="opacity-80">
            We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
            These guidelines explain how to make web content more accessible to people with disabilities.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Technical Specifications</h2>
          <p className="opacity-80 mb-3">
            Shop Salida relies on the following technologies for conformance with WCAG 2.1:
          </p>
          <ul className="list-disc pl-6 opacity-80 space-y-1">
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>WAI-ARIA</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Known Limitations</h2>
          <p className="opacity-80">
            While we strive for full accessibility, some third-party content and embedded maps
            may not meet all accessibility standards. We are actively working to address these limitations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Feedback &amp; Contact</h2>
          <p className="opacity-80">
            We welcome your feedback on the accessibility of Shop Salida. If you experience
            any barriers or have suggestions for improvement, please contact us through our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Assessment Approach</h2>
          <p className="opacity-80">
            Shop Salida assesses the accessibility of this website through self-evaluation
            and ongoing development reviews.
          </p>
        </section>
      </div>
    </div>
  )
}
