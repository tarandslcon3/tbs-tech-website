import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://leadforge-website-inky.vercel.app'),
  title: 'AI Websites & Automation for Trades Businesses | LeadForge',
  description:
    'LeadForge builds AI-powered websites and automation for HVAC, plumbing, electrical and roofing companies across USA and Canada. Get a free consultation today.',
  keywords: 'AI websites trades, HVAC website, plumbing website, electrical contractor website, roofing website, lead generation trades',
  openGraph: {
    title: 'AI Websites & Automation for Trades Businesses | LeadForge',
    description:
      'LeadForge builds AI-powered websites and automation for HVAC, plumbing, electrical and roofing companies across USA and Canada.',
    url: 'https://leadforge-website-inky.vercel.app',
    siteName: 'LeadForge',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Websites & Automation for Trades Businesses | LeadForge',
    description:
      'AI-powered websites and automation for HVAC, plumbing, electrical and roofing companies.',
  },
  alternates: {
    canonical: 'https://leadforge-website-inky.vercel.app',
  },
}

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'LeadForge',
  description: 'AI-powered websites and automation for trades businesses',
  areaServed: ['United States', 'Canada'],
  serviceType: ['Web Design', 'AI Automation', 'Lead Generation', 'Digital Marketing'],
  url: 'https://leadforge-website-inky.vercel.app',
  email: 'tbstechservices@gmail.com',
  priceRange: 'Contact for details',
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'LeadForge',
  url: 'https://leadforge-website-inky.vercel.app',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://leadforge-website-inky.vercel.app/blog?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
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
        text: 'Yes. We specialize in AI-powered websites for HVAC companies across USA and Canada. Every site includes lead capture forms, instant SMS alerts, and automation workflows.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you serve clients in the USA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We serve trades businesses across the entire United States and Canada, including HVAC, plumbing, electrical, and roofing companies.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does an AI website cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer custom pricing based on your business needs. Contact us for a free consultation and personalized quote.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build a website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We deliver a complete AI-powered website within 7 to 14 business days after project kickoff. We start with a free demo so you can see it before committing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer free demos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We build a free personalized demo website for your business before you pay anything. Fill out our form and receive your demo within 24 hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'What trades do you specialize in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We specialize in HVAC, plumbing, electrical, and roofing businesses. Our sites are built from the ground up for trades companies.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide AI chatbots?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every LeadForge website includes an AI chatbot that captures leads 24/7, even when your office is closed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you integrate with my existing CRM?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We integrate with popular CRMs including HubSpot, GoHighLevel, and others. Contact us to discuss your specific needs.',
      },
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className={inter.className}>
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
