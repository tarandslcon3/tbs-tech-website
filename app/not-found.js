import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Page Not Found | TBS Tech Services',
}

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#0a0f1e] flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] mb-4">
            404
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Page not found</h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            The page you are looking for does not exist or has been moved. Let us get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-[#3b82f6] text-white font-bold rounded-xl hover:bg-blue-500 transition-colors"
            >
              Go Home
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 border border-[#1e2a4a] text-gray-300 font-semibold rounded-xl hover:border-[#3b82f6]/40 transition-colors"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
