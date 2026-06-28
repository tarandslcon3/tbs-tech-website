import dynamic from 'next/dynamic'
import Nav from '@/components/Nav'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Testimonials from '@/components/Testimonials'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'
import ChatBot from '@/components/ChatBot'
import HashScroller from '@/components/HashScroller'
import ScrollReveal from '@/components/ScrollReveal'

const Hero = dynamic(() => import('@/components/Hero'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-[#0a0f1e]" />,
})

const ROICalculator = dynamic(() => import('@/components/ROICalculator'), {
  ssr: false,
  loading: () => <div className="py-24 bg-[#0a0f1e]" />,
})

const SpaceTravel = dynamic(() => import('@/components/SpaceTravel'), { ssr: false })

export default function Home() {
  return (
    <>
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <LoadingScreen />
      <HashScroller />
      <ScrollReveal />
      <SpaceTravel />
      <main>
        <Nav />
        <Hero />
        <div className="reveal-3d">
          <Services />
        </div>
        <div className="reveal-3d">
          <Portfolio />
        </div>
        <div className="reveal-3d">
          <Testimonials />
        </div>
        <ROICalculator />
        <div className="reveal-3d relative overflow-hidden">
          <div className="blob-bg" aria-hidden="true" />
          <ContactForm />
        </div>
        <Footer />
      </main>
      <ChatBot />
    </>
  )
}
