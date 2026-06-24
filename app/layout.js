import { Inter } from 'next/font/google'
import Script from 'next/script'
import ScrollLine from '@/components/ScrollLine'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://leadforge-website-inky.vercel.app'),
  title: 'AI Websites & Automation for Any Business | LeadForge',
  description:
    'LeadForge builds AI-powered websites, automation and custom tools for any business worldwide. Get a free consultation today.',
  keywords: 'AI websites, business automation, lead generation, AI chatbot, web design agency, digital marketing',
  openGraph: {
    title: 'AI Websites & Automation for Any Business | LeadForge',
    description:
      'LeadForge builds AI-powered websites, automation and custom tools for any business worldwide.',
    url: 'https://leadforge-website-inky.vercel.app',
    siteName: 'LeadForge',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Websites & Automation for Any Business | LeadForge',
    description: 'AI-powered websites, automation and custom tools for any business worldwide.',
  },
  alternates: {
    canonical: 'https://leadforge-website-inky.vercel.app',
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'LeadForge',
  description: 'Digital agency building AI-powered websites, automation and custom tools for any business worldwide',
  areaServed: 'Worldwide',
  serviceType: ['Web Design', 'AI Automation', 'Lead Generation', 'Digital Marketing', 'Business Automation'],
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
      name: 'What kinds of businesses do you build websites for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We build AI-powered websites for any business worldwide — small businesses, SaaS companies, e-commerce, finance, real estate, law firms, restaurants, and more.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with international clients?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We serve businesses worldwide. No matter where you are located, we can build and deliver your AI-powered website and automation system.',
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
      name: 'What industries do you work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We work with any business — small businesses, SaaS companies, e-commerce stores, real estate, finance, law firms, restaurants, consultants, and more.',
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
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="mask-icon" href="/favicon.svg" color="#3b82f6" />
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
        <ScrollLine />
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
