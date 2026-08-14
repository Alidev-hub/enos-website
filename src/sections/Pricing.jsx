import { useEffect, useRef } from 'react'
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

        <div className="mt-12 grid items-stretch gap-6 lg:mt-20 lg:grid-cols-3 lg:gap-7">
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
