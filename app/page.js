import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import DemoForm from '@/components/DemoForm'
import ROICalculator from '@/components/ROICalculator'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <ROICalculator />
      <DemoForm />
      <Footer />
    </main>
  )
}
