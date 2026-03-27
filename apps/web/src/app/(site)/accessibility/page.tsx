import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'Our commitment to digital accessibility for all users.',
}

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-[#E6EDF3]">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold mb-8">Accessibility Statement</h1>

        <div className="space-y-6 text-[#8B949E] leading-relaxed">
          <p>
            We are committed to ensuring digital accessibility for people of all abilities.
            We continually improve the user experience for everyone and apply the relevant
            accessibility standards.
          </p>

          <h2 className="text-xl font-semibold text-[#E6EDF3] mt-8">Our Commitment</h2>
          <p>
            We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1
            at Level AA. These guidelines explain how to make web content more accessible
            for people with disabilities and more user-friendly for everyone.
          </p>

          <h2 className="text-xl font-semibold text-[#E6EDF3] mt-8">Measures We Take</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Semantic HTML structure for screen reader compatibility</li>
            <li>Skip-to-content navigation link</li>
            <li>Minimum 44px touch targets on all interactive elements</li>
            <li>Sufficient color contrast ratios throughout the site</li>
            <li>Alt text on all meaningful images</li>
            <li>Keyboard-navigable interface</li>
            <li>ARIA labels where appropriate</li>
            <li>Responsive design that works across devices and zoom levels</li>
          </ul>

          <h2 className="text-xl font-semibold text-[#E6EDF3] mt-8">Feedback</h2>
          <p>
            We welcome feedback on the accessibility of this site. If you encounter
            accessibility barriers, please contact us:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email: <a href="mailto:CEO@epicai.ai" className="text-[#D4A853] hover:underline">CEO@epicai.ai</a></li>
          </ul>

          <h2 className="text-xl font-semibold text-[#E6EDF3] mt-8">Technical Specifications</h2>
          <p>
            This website is built with Next.js and follows modern web standards.
            It relies on the following technologies for accessibility:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>HTML5</li>
            <li>WAI-ARIA</li>
            <li>CSS</li>
            <li>JavaScript</li>
          </ul>

          <p className="text-sm mt-12 text-[#6E7681]">
            This statement was last updated on March 26, 2026.
          </p>
        </div>
      </div>
    </div>
  )
}
