import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { key: 'web', title: 'Création de sites web', description: 'Des sites modernes, rapides et optimisés pour offrir la meilleure expérience à vos visiteurs.' },
  { key: 'marketing', title: 'Marketing digital', description: 'Stratégies sur-mesure, campagnes performantes et acquisition de clients qualifiés.' },
  { key: 'brand', title: 'Branding & Identité', description: 'Création d’identités visuelles fortes qui reflètent vos valeurs et vous distinguent.' },
  { key: 'social', title: 'Réseaux sociaux', description: 'Gestion et création de contenu pour développer votre présence et engager votre communauté.' },
  { key: 'ai', title: 'Automatisation et IA', description: 'Automatisez vos processus et gagnez du temps grâce à des solutions intelligentes.' },
  { key: 'seo', title: 'SEO & Référencement', description: 'Améliorez votre visibilité sur Google et attirez un trafic qualifié sur le long terme.' },
]

function ServiceIcon({ type, className = 'h-8 w-8' }) {
  const paths = {
    web: <><circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c2.4 2.2 3.5 4.9 3.5 8s-1.1 5.8-3.5 8c-2.4-2.2-3.5-4.9-3.5-8S9.6 6.2 12 4Z"/></>,
    marketing: <><path d="M4 20v-6h4v6M10 20V9h4v11M16 20V4h4v16M3 10l5-4 4 2 8-6"/></>,
    brand: <><path d="M5 16c-1 2-2.5 3-3 3 0-.5 1-2 3-3ZM9 15l-3-3 8-8c3-3 7-2 8-2 0 1 1 5-2 8l-8 8-3-3Z"/><circle cx="16" cy="8" r="1.5"/></>,
    social: <><rect x="6" y="3" width="12" height="18" rx="2"/><path d="M9 6h6M10 17l2 1.5 2-1.5v-4h-4v4Z"/></>,
    ai: <path d="m13 2-7 11h5l-1 9 8-12h-5V2Z"/>,
    seo: <><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/></>,
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true" className={`${className} fill-none stroke-current stroke-[1.6] stroke-linecap-round stroke-linejoin-round`}>{paths[type]}</svg>
}

function MobileServiceSelector() {
  const [activeService, setActiveService] = useState(0)

  return (
    <div className="mt-10 overflow-hidden border-y border-blue-200/75 lg:hidden">
      {services.map((service, index) => {
        const isActive = activeService === index
        const number = String(index + 1).padStart(2, '0')
        const panelId = `mobile-service-panel-${service.key}`

        return (
          <article key={service.key} className="relative border-b border-blue-200/75 last:border-b-0">
            <button
              type="button"
              aria-expanded={isActive}
              aria-controls={panelId}
              onClick={() => setActiveService(index)}
              className="group grid min-h-[70px] w-full grid-cols-[28px_42px_1fr_32px] items-center gap-2 text-start text-[#073b78] outline-none transition focus-visible:bg-blue-50/80 sm:grid-cols-[34px_48px_1fr_36px] sm:gap-3"
            >
              <span className={`font-serif text-sm transition-colors motion-reduce:transition-none ${isActive ? 'text-[#087ef1]' : 'text-blue-300'}`}>{number}</span>
              <span className={`flex h-10 w-10 items-center justify-center transition-colors ${isActive ? 'text-[#087ef1]' : 'text-[#6b91b8] group-hover:text-[#087ef1]'}`}><ServiceIcon type={service.key} className="h-6 w-6" /></span>
              <span className={`min-w-0 text-[18px] font-extrabold leading-tight tracking-[-.025em] transition-colors sm:text-xl ${isActive ? 'text-[#087ef1]' : 'text-[#073b78]'}`}>{service.title}</span>
              <span className="relative h-8 w-8" aria-hidden="true"><span className={`absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current transition-transform ${isActive ? 'rotate-180' : ''}`} /><span className={`absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-all ${isActive ? 'rotate-90 opacity-0' : ''}`} /></span>
            </button>

            <div id={panelId} aria-hidden={!isActive} className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <div className="relative isolate mb-4 overflow-hidden border-s-2 border-[#087ef1] bg-[linear-gradient(125deg,rgba(255,255,255,.78),rgba(229,244,255,.78))] px-5 pb-6 pt-5 shadow-[0_16px_35px_rgba(25,88,155,.07)] sm:px-7 sm:pb-7">
                  <span className="pointer-events-none absolute -end-2 -top-7 -z-10 font-serif text-[8.5rem] leading-none text-blue-200/35" aria-hidden="true">{number}</span>
                  <div className="flex items-start gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center text-[#087ef1]"><ServiceIcon type={service.key} className="h-10 w-10" /></span>
                    <div className="min-w-0 pt-1">
                      <p className="font-serif text-sm text-[#5f94c1]">Service {number}</p>
                      <h3 className="mt-1 text-[clamp(1.5rem,6vw,1.8rem)] font-extrabold leading-[1.08] tracking-[-.04em] text-[#073b78]">{service.title}</h3>
                    </div>
                  </div>
                  <p className="mt-5 max-w-xl text-[15px] leading-[1.7] text-[#526f94] sm:text-base">{service.description}</p>
                  <a href="#contact" tabIndex={isActive ? 0 : -1} className="mt-5 inline-flex min-h-11 items-center gap-3 text-[15px] font-extrabold text-[#087ef1] outline-none transition hover:gap-4 focus-visible:ring-2 focus-visible:ring-[#087ef1] motion-reduce:transition-none">En savoir plus <span aria-hidden="true">→</span></a>
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

function Services() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-service-card]')
      gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 72%', once: true } })
        .fromTo(headingRef.current.children, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out' })
        .fromTo(cards, { autoAlpha: 0, y: 42 }, { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out' }, '-=0.25')
        .fromTo('[data-services-cta]', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.2')
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="relative scroll-mt-20 bg-transparent px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:pb-20 lg:pt-14" aria-labelledby="services-title">
      <div className="mx-auto max-w-6xl lg:rounded-[2.4rem] lg:border lg:border-white/80 lg:bg-white/20 lg:px-10 lg:py-16 lg:shadow-[0_30px_80px_rgba(35,102,171,.06)] lg:backdrop-blur-[2px]">
        <header ref={headingRef} className="max-w-3xl text-start lg:mx-auto lg:text-center">
          <p className="mx-auto inline-flex rounded-full bg-blue-100/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#167bd7] lg:text-[9px]">Nos expertises</p>
          <h2 id="services-title" className="mt-4 text-[1.75rem] font-extrabold leading-[1.08] tracking-[-0.045em] text-[#073b78] min-[375px]:text-3xl sm:text-4xl lg:text-5xl">Une gamme complète de services<br className="hidden sm:block" /> pour <span className="text-[#087ef1]">booster votre activité</span></h2>
        </header>

        <MobileServiceSelector />

        <div className="mt-12 hidden grid-cols-3 gap-5 lg:grid">
          {services.map((service) => (
            <article key={service.key} data-service-card className="group min-w-0 rounded-2xl border border-white/90 bg-white/80 p-5 shadow-[0_14px_40px_rgba(25,88,155,.08)] backdrop-blur-lg transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(25,88,155,.13)] sm:p-6">
              <div className="flex flex-col items-start gap-4 min-[375px]:flex-row min-[375px]:gap-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#eaf5ff] text-[#087ef1]"><ServiceIcon type={service.key} /></span>
                <div className="min-w-0">
                  <h3 className="text-lg font-extrabold tracking-[-0.025em] text-[#073b78]">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#607a9f]">{service.description}</p>
                  <a href="#contact" className="mt-5 inline-flex items-center gap-3 text-xs font-bold text-[#087ef1]">En savoir plus <span aria-hidden="true">→</span></a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div data-services-cta className="mt-6 hidden items-center justify-between gap-6 rounded-2xl border border-white/90 bg-white/75 px-6 py-6 shadow-[0_14px_40px_rgba(25,88,155,.07)] backdrop-blur-lg lg:flex lg:px-10">
          <div className="flex items-center gap-5 text-center sm:text-start">
            <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#eaf5ff] text-[#087ef1] sm:flex"><ServiceIcon type="marketing" /></span>
            <p className="text-sm text-[#4e6b92]">Besoin d’une solution sur-mesure ?<strong className="mt-1 block text-base text-[#073b78]">Nos experts sont là pour vous accompagner.</strong></p>
          </div>
          <a href="#contact" className="inline-flex min-h-12 min-w-[210px] items-center justify-center gap-8 rounded-full bg-gradient-to-r from-[#078bf0] to-[#0872e9] px-7 text-sm font-bold text-white shadow-[0_12px_28px_rgba(8,126,238,.22)] transition hover:-translate-y-0.5">Obtenir un devis <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  )
}

export default Services
