import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const offers = [
  {
    name: 'Essentiel',
    price: '990 €',
    number: 'I',
    benefits: ['Audit digital & stratégie', 'Site vitrine jusqu’à 5 pages', 'Design responsive sur mesure', 'SEO technique essentiel', 'Support pendant 30 jours'],
  },
  {
    name: 'Business',
    price: '1 490 €',
    number: 'II',
    featured: true,
    benefits: ['Stratégie digitale complète', 'Site performant jusqu’à 10 pages', 'Identité visuelle personnalisée', 'Campagne d’acquisition initiale', 'Analytics & suivi des conversions'],
  },
  {
    name: 'Premium',
    price: '2 490 €',
    number: 'III',
    benefits: ['Direction de marque complète', 'Expérience web 100 % sur mesure', 'Automatisations & intégrations IA', 'Stratégie SEO avancée', 'Accompagnement prioritaire'],
  },
]

function MobilePricingSelector() {
  const [activePlan, setActivePlan] = useState(0)
  const offer = offers[activePlan]

  return (
    <div className="mt-12 lg:hidden">
      <div className="border-y border-blue-200/80">
        {offers.map((item, index) => {
          const isActive = activePlan === index
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => setActivePlan(index)}
              aria-pressed={isActive}
              aria-controls="mobile-pricing-details"
              className="group grid min-h-[70px] w-full grid-cols-[44px_1fr_34px] items-center gap-3 border-b border-blue-200/80 text-start outline-none transition-colors last:border-b-0 hover:bg-white/35 focus-visible:bg-blue-50/80"
            >
              <span className={`font-serif text-xl transition-colors motion-reduce:transition-none ${isActive ? 'text-[#087ef1]' : 'text-blue-300'}`}>{item.number}</span>
              <span className={`text-xl font-extrabold tracking-[-.03em] transition-colors motion-reduce:transition-none ${isActive ? 'text-[#087ef1]' : 'text-[#073b78]'}`}>{item.name}</span>
              <span className="relative h-8 w-8 text-[#073b78]" aria-hidden="true"><span className={`absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current transition-transform motion-reduce:transition-none ${isActive ? 'rotate-180' : ''}`} /><span className={`absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-all motion-reduce:transition-none ${isActive ? 'rotate-90 opacity-0' : ''}`} /></span>
            </button>
          )
        })}
      </div>

      <article id="mobile-pricing-details" aria-live="polite" className="relative isolate mt-5 overflow-hidden border-s-2 border-[#087ef1] bg-[linear-gradient(130deg,rgba(255,255,255,.9),rgba(229,243,255,.82))] px-5 pb-6 pt-6 shadow-[0_20px_50px_rgba(27,91,158,.11)] min-[390px]:px-7 sm:px-9 sm:pb-8 sm:pt-8">
        <span className="pointer-events-none absolute -end-3 -top-10 -z-10 font-serif text-[11rem] leading-none text-blue-200/35" aria-hidden="true">{offer.number}</span>
        <p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-[#5b95c8]">Offre ENOS</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-x-5 gap-y-2">
          <h3 className="text-[clamp(1.7rem,7vw,2.15rem)] font-extrabold tracking-[-.045em] text-[#073b78]">{offer.name}</h3>
          <p className="font-serif text-[clamp(2.25rem,10vw,3rem)] font-medium leading-none text-[#073b78]">{offer.price}</p>
        </div>
        <p className="mt-2 text-[13px] font-semibold uppercase tracking-[.12em] text-[#7890af]">À partir de</p>

        <div className="my-5 flex items-center" aria-hidden="true"><span className="h-px flex-1 bg-blue-200/80" /><span className="h-1.5 w-1.5 rounded-full bg-[#168ee9]" /><span className="h-px flex-1 bg-blue-200/80" /></div>

        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-x-7">
          {offer.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3 text-[15px] leading-[1.55] text-[#58759c]">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e5f3ff] text-xs font-bold text-[#087ef1]">✓</span>
              {benefit}
            </li>
          ))}
        </ul>

        <a href="#contact" className={`mt-6 inline-flex min-h-[50px] w-full items-center justify-center gap-5 rounded-full px-6 text-[15px] font-bold transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#073b78] motion-reduce:transition-none ${offer.featured ? 'bg-gradient-to-r from-[#078cf0] to-[#0872e9] text-white shadow-[0_12px_28px_rgba(8,126,238,.24)]' : 'border border-blue-200 bg-white/65 text-[#0873d7]'}`}>Choisir cette offre <span aria-hidden="true">→</span></a>
      </article>
    </div>
  )
}

function Pricing() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-pricing-card]')
      gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 72%', once: true },
        defaults: { ease: 'power3.out' },
      })
        .fromTo(headingRef.current.children, { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.1 })
        .fromTo(cards, { autoAlpha: 0, y: 65, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.14 }, '-=0.25')
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section id="tarifs" ref={sectionRef} className="relative isolate scroll-mt-20 overflow-hidden bg-transparent px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-20" aria-labelledby="pricing-title">
      <span className="pointer-events-none absolute left-1/2 top-10 -z-10 -translate-x-1/2 font-serif text-[18rem] leading-none text-blue-100/20 lg:text-[30rem]" aria-hidden="true">III</span>

      <div className="mx-auto max-w-6xl">
        <header ref={headingRef} className="mx-auto max-w-3xl text-center">
          <p className="mx-auto inline-flex rounded-full bg-blue-100/70 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#167bd7]">TARIFS</p>
          <h2 id="pricing-title" className="mt-5 text-3xl font-extrabold leading-[1.06] tracking-[-0.05em] text-[#073b78] min-[375px]:text-4xl sm:text-5xl lg:text-6xl">Des offres claires pour <span className="text-[#087ef1]">chaque ambition</span></h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#58759c] sm:text-lg">Choisissez la formule adaptée à vos besoins et à votre niveau de croissance.</p>
        </header>

        <MobilePricingSelector />

        <div className="mt-20 hidden items-stretch gap-7 lg:grid lg:grid-cols-3">
          {offers.map((offer) => (
            <article
              key={offer.name}
              data-pricing-card
              className={`relative flex min-w-0 flex-col overflow-hidden rounded-[1.6rem] border bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,.98),rgba(244,249,255,.9)_60%,rgba(230,242,253,.82))] px-6 py-7 backdrop-blur-xl sm:rounded-[2rem] sm:px-7 sm:py-8 lg:min-h-[530px] lg:px-8 lg:py-9 ${
                offer.featured
                  ? 'border-blue-300/80 shadow-[0_30px_75px_rgba(21,111,207,.19)] ring-1 ring-white lg:relative lg:-top-5'
                  : 'border-white/90 shadow-[0_20px_55px_rgba(27,91,158,.1)]'
              }`}
            >
              {offer.featured && <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0759be] via-[#0798ef] to-[#51c5f3]" />}
              <span className="absolute end-7 top-6 font-serif text-4xl text-blue-200">{offer.number}</span>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5b95c8]">Offre ENOS</p>
                <h3 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] text-[#073b78]">{offer.name}</h3>
                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.14em] text-[#7890af]">À partir de</p>
                <p className="mt-2 font-serif text-4xl font-medium text-[#073b78] min-[375px]:text-5xl">{offer.price}</p>
              </div>

              <div className="my-8 flex items-center" aria-hidden="true">
                <span className="h-px flex-1 bg-blue-200/80" /><span className="h-1.5 w-1.5 rounded-full bg-[#168ee9]" /><span className="h-px flex-1 bg-blue-200/80" />
              </div>

              <ul className="space-y-4">
                {offer.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm leading-relaxed text-[#58759c]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e5f3ff] text-[11px] font-bold text-[#087ef1]">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>

              <a href="#contact" className={`mt-8 inline-flex min-h-[50px] w-full items-center justify-center gap-5 rounded-full px-6 py-3.5 text-sm font-bold transition hover:-translate-y-0.5 lg:mt-auto ${
                offer.featured
                  ? 'bg-gradient-to-r from-[#078cf0] to-[#0872e9] text-white shadow-[0_12px_28px_rgba(8,126,238,.24)]'
                  : 'border border-blue-200 bg-white/55 text-[#0873d7] hover:border-blue-400'
              }`}>Choisir cette offre <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
