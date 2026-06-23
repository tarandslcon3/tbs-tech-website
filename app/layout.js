import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Websites and Automation for Trades Businesses | LeadForge',
  description:
    'LeadForge builds AI-powered websites and automation for HVAC, plumbing, electrical and roofing companies across USA and Canada. Get a free demo today.',
  openGraph: {
    title: 'AI Websites and Automation for Trades Businesses | LeadForge',
    description:
      'LeadForge builds AI-powered websites and automation for HVAC, plumbing, electrical and roofing companies across USA and Canada. Get a free demo today.',
    url: 'https://leadforge-website-inky.vercel.app',
    type: 'website',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'LeadForge',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Brantford',
    addressRegion: 'Ontario',
    addressCountry: 'CA',
  },
  areaServed: ['United States', 'Canada'],
  serviceType: ['Web Design', 'AI Automation', 'Lead Generation'],
  url: 'https://leadforge-website-inky.vercel.app',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do you build websites for HVAC companies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We specialize in AI-powered websites for HVAC companies across USA and Canada. Every site includes lead capture forms, instant SMS alerts when someone submits a request, and automation workflows to follow up automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you serve clients in the USA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We serve trades businesses across the entire United States and Canada, including HVAC, plumbing, electrical, and roofing companies in every state and province.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does an AI website cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our AI-powered websites are priced for trades businesses and start at a fraction of what traditional agencies charge. We offer transparent pricing with no surprises. Request a free demo to get a custom quote for your business.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build a website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We deliver a complete AI-powered website within 7 to 14 business days after project kickoff. We start by building you a free demo so you can see it before paying anything.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer free demos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We build a free personalized demo website for your business before you pay a single dollar. Fill out our form and receive your demo within 24 hours.',
      },
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
