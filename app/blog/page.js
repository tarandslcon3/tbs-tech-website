import Link from 'next/link'
import { posts } from './posts/data'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BlogListClient from './BlogListClient'

export const metadata = {
  title: 'Blog — AI Websites & Automation Tips | TBS Tech Services',
  description:
    'Practical guides on websites, AI automation, and getting more leads for any business.',
}

export default function BlogPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#0a0f1e] pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-full px-4 py-2 text-[#3b82f6] text-sm font-medium mb-6">
              Resources for Growing Businesses
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              The TBS Tech Services Blog
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Practical guides on AI, websites, and automation for any business.
            </p>
          </div>

          <BlogListClient posts={posts} />

          <div className="mt-16 bg-gradient-to-r from-[#3b82f6]/10 to-[#06b6d4]/10 border border-[#3b82f6]/20 rounded-2xl p-10 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Ready to grow your business?
            </h3>
            <p className="text-gray-400 mb-6">
              Get a free personalized demo built for your business within 24 hours.
            </p>
            <Link
              href="/#contact"
              className="inline-flex px-8 py-3 bg-[#3b82f6] text-white font-bold rounded-xl hover:bg-blue-500 transition-colors"
            >
              Get My Free Demo
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
