'use client'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function BlogPostClient({ post, otherPosts }) {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#0a0f1e] pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link
              href="/blog"
              className="text-[#3b82f6] text-sm hover:text-blue-400 transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>

          <article>
            <header className="mb-12">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6">
                {post.title}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed border-l-2 border-[#3b82f6] pl-5">
                {post.excerpt}
              </p>
            </header>

            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          <div className="mt-16 bg-gradient-to-r from-[#3b82f6]/10 to-[#06b6d4]/10 border border-[#3b82f6]/20 rounded-2xl p-10 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Want a website that actually works for your business?
            </h3>
            <p className="text-gray-400 mb-6">
              We build a free demo for your specific business — no cost, no commitment, no pressure.
            </p>
            <Link
              href="/#demo"
              className="inline-flex px-8 py-3 bg-[#3b82f6] text-white font-bold rounded-xl hover:bg-blue-500 transition-colors"
            >
              Get My Free Demo
            </Link>
          </div>

          {otherPosts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-white font-bold text-lg mb-6">More Articles</h3>
              <div className="space-y-4">
                {otherPosts.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="block group">
                    <div className="bg-[#0f172a] border border-[#1e2a4a] group-hover:border-[#3b82f6]/40 rounded-xl p-6 transition-all duration-200">
                      <p className="text-gray-500 text-xs mb-2">{p.readTime}</p>
                      <h4 className="text-white font-semibold group-hover:text-[#3b82f6] transition-colors">
                        {p.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
