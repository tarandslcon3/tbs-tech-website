export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: 'https://tbstechservices.vercel.app/sitemap.xml',
  }
}
