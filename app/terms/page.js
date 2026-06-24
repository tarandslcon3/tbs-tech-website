import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Terms of Service | LeadForge',
  description: 'LeadForge terms of service — the rules and agreements that govern your use of our website.',
}

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#0a0f1e] pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-black text-white mb-4">Terms of Service</h1>
          <p className="text-gray-500 text-sm mb-12">Last updated: June 23, 2025</p>

          <div className="prose-content space-y-8">
            <section>
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using the LeadForge website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
              </p>
            </section>

            <section>
              <h2>2. Services Description</h2>
              <p>
                LeadForge provides AI-powered websites, automation systems, and digital marketing services for trades businesses. The specific scope, deliverables, and terms of each engagement are defined in separate written agreements between LeadForge and each client.
              </p>
            </section>

            <section>
              <h2>3. Free Demo</h2>
              <p>
                We offer free demo websites to prospective clients. These demos are created for evaluation purposes only and are not production-ready. No payment is required to receive a demo. Requesting a demo does not obligate you to purchase any services.
              </p>
            </section>

            <section>
              <h2>4. Intellectual Property</h2>
              <p>
                All content on this website — including text, graphics, logos, and software — is the property of LeadForge and protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>
            </section>

            <section>
              <h2>5. User Conduct</h2>
              <p>By using our website, you agree not to:</p>
              <ul>
                <li>Submit false or misleading information</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use our services for any illegal or unauthorized purpose</li>
                <li>Transmit spam, viruses, or any malicious code</li>
              </ul>
            </section>

            <section>
              <h2>6. Disclaimer of Warranties</h2>
              <p>
                This website and its content are provided on an &quot;as is&quot; basis without warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.
              </p>
            </section>

            <section>
              <h2>7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, LeadForge shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of this website.
              </p>
            </section>

            <section>
              <h2>8. Results Disclaimer</h2>
              <p>
                Case studies, testimonials, and results shown on this website represent individual client experiences and are not guarantees of future results. Your results may vary based on your business, market, and implementation.
              </p>
            </section>

            <section>
              <h2>9. Changes to Terms</h2>
              <p>
                We reserve the right to update these Terms of Service at any time. Continued use of the website following changes constitutes your acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2>10. Governing Law</h2>
              <p>
                These Terms of Service are governed by applicable laws. Any disputes shall be resolved through good-faith negotiation, and if necessary, binding arbitration.
              </p>
            </section>

            <section>
              <h2>11. Contact</h2>
              <p>
                Questions about these terms? Contact us at{' '}
                <a href="mailto:tbstechservices@gmail.com" className="text-[#3b82f6] hover:text-blue-400">
                  tbstechservices@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
