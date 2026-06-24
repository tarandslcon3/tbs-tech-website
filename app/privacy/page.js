import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Privacy Policy | LeadForge',
  description: 'LeadForge privacy policy — how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#0a0f1e] pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-black text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-500 text-sm mb-12">Last updated: June 23, 2025</p>

          <div className="prose-content space-y-8">
            <section>
              <h2>1. Information We Collect</h2>
              <p>
                When you submit a form on our website, we collect the information you provide, including your name, email address, phone number, and business details. We also collect standard web analytics data such as page views, referral sources, and device type.
              </p>
            </section>

            <section>
              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to your inquiries and provide our services</li>
                <li>Send you a free personalized demo website</li>
                <li>Follow up with you about your business needs</li>
                <li>Improve our website and services</li>
                <li>Send you relevant updates (you may opt out at any time)</li>
              </ul>
            </section>

            <section>
              <h2>3. Information Sharing</h2>
              <p>
                We do not sell, rent, or trade your personal information to third parties. We may share information with trusted service providers who assist us in operating our website and delivering our services, under strict confidentiality agreements.
              </p>
            </section>

            <section>
              <h2>4. Cookies and Tracking</h2>
              <p>
                Our website may use cookies and similar tracking technologies to improve your experience and analyze traffic. You can control cookie settings through your browser preferences. We use Google Analytics to understand how visitors use our site.
              </p>
            </section>

            <section>
              <h2>5. Data Security</h2>
              <p>
                We implement reasonable technical and organizational measures to protect your information from unauthorized access, disclosure, or loss. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2>6. Your Rights</h2>
              <p>
                You have the right to access, correct, or delete the personal information we hold about you. To exercise these rights, contact us at{' '}
                <a href="mailto:tbstechservices@gmail.com" className="text-[#3b82f6] hover:text-blue-400">
                  tbstechservices@gmail.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2>7. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h2>8. Contact Form Provider</h2>
              <p>
                Our contact form is powered by JotForm. Submissions are subject to{' '}
                <a href="https://www.jotform.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-[#3b82f6] hover:text-blue-400">
                  JotForm&#39;s Privacy Policy
                </a>
                .
              </p>
            </section>

            <section>
              <h2>9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any significant changes by updating the date at the top of this page.
              </p>
            </section>

            <section>
              <h2>10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{' '}
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
