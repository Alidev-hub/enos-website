import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Pillars from './sections/Pillars'
import Services from './sections/Services'
import About from './sections/About'
import Projects from './sections/Projects'
import Pricing from './sections/Pricing'
import Contact from './sections/Contact'
import sideStatue from './assets/hero-side-statue.png'

function App() {
  const { i18n } = useTranslation()
  const isRtl = i18n.resolvedLanguage === 'ar'

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage || 'fr'
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
  }, [i18n.resolvedLanguage, isRtl])

  return (
    <div className="enos-page-background flex min-h-screen flex-col overflow-x-clip text-slate-950">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <img
          src={sideStatue}
          alt=""
          className="absolute -start-[18rem] -top-[8rem] h-[40rem] max-w-none scale-x-[-1] opacity-15 drop-shadow-[0_20px_30px_rgba(0,121,220,.1)] sm:-start-[20rem] sm:h-[48rem] sm:opacity-20 xl:-start-[23rem] xl:-top-[16rem] xl:h-[69rem] xl:opacity-55"
        />
        <img
          src={sideStatue}
          alt=""
          className="absolute -end-[17rem] top-[48vh] h-[36rem] max-w-none opacity-15 drop-shadow-[0_20px_30px_rgba(0,121,220,.1)] sm:-end-[19rem] sm:h-[46rem] sm:opacity-20 lg:-end-[11rem] lg:top-[34vh] lg:h-[63rem] lg:opacity-60"
        />
      </div>
      <Navbar />
      <main className="relative z-10 flex-1">
        <Hero />
        <Pillars />
        <Services />
        <About />
        <Projects />
        <Pricing />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}

export default App
