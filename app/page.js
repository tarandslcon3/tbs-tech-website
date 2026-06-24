import dynamic from 'next/dynamic'
import Nav from '@/components/Nav'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Testimonials from '@/components/Testimonials'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'
import ChatBot from '@/components/ChatBot'
import CursorFollower from '@/components/CursorFollower'

const Hero = dynamic(() => import('@/components/Hero'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-[#0a0f1e]" />,
})

const ROICalculator = dynamic(() => import('@/components/ROICalculator'), {
  ssr: false,
  loading: () => <div className="py-24 bg-[#0a0f1e]" />,
})

export default function Home() {
  return (
    <>
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <LoadingScreen />
      <CursorFollower />
      <main>
        <Nav />
        <Hero />
        <Services />
        <Portfolio />
        <Testimonials />
        <ROICalculator />
        <ContactForm />
        <Footer />
      </main>
      <ChatBot />
    </>
  )
}
