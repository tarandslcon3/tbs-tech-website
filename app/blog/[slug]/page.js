import { notFound } from 'next/navigation'
import { posts, getPostBySlug } from '../posts/data'
import BlogPostClient from './BlogPostClient'

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  const baseUrl = 'https://tbstechservices.vercel.app'
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.date,
      ...(post.image && {
        images: [{ url: `${baseUrl}${post.image}`, width: 1200, height: 900 }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      ...(post.image && { images: [`${baseUrl}${post.image}`] }),
    },
  }
}

export default function BlogPost({ params }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const otherPosts = posts.filter((p) => p.slug !== post.slug)

  return <BlogPostClient post={post} otherPosts={otherPosts} />
}
