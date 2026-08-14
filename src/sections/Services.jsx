import { useEffect, useRef } from 'react'
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

function ServiceIcon({ type }) {
  const paths = {
    web: <><circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c2.4 2.2 3.5 4.9 3.5 8s-1.1 5.8-3.5 8c-2.4-2.2-3.5-4.9-3.5-8S9.6 6.2 12 4Z"/></>,
    marketing: <><path d="M4 20v-6h4v6M10 20V9h4v11M16 20V4h4v16M3 10l5-4 4 2 8-6"/></>,
    brand: <><path d="M5 16c-1 2-2.5 3-3 3 0-.5 1-2 3-3ZM9 15l-3-3 8-8c3-3 7-2 8-2 0 1 1 5-2 8l-8 8-3-3Z"/><circle cx="16" cy="8" r="1.5"/></>,
    social: <><rect x="6" y="3" width="12" height="18" rx="2"/><path d="M9 6h6M10 17l2 1.5 2-1.5v-4h-4v4Z"/></>,
    ai: <path d="m13 2-7 11h5l-1 9 8-12h-5V2Z"/>,
    seo: <><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/></>,
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 fill-none stroke-current stroke-[1.6] stroke-linecap-round stroke-linejoin-round">{paths[type]}</svg>
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
    <section id="services" ref={sectionRef} className="relative scroll-mt-20 bg-transparent px-5 pb-16 pt-10 sm:px-8 sm:pt-12 lg:px-14 lg:pb-20 lg:pt-14" aria-labelledby="services-title">
      <div className="mx-auto max-w-6xl rounded-[2.4rem] border border-white/80 bg-white/20 px-5 py-12 shadow-[0_30px_80px_rgba(35,102,171,.06)] backdrop-blur-[2px] sm:px-8 lg:px-10 lg:py-16">
        <header ref={headingRef} className="mx-auto max-w-3xl text-center">
          <p className="mx-auto inline-flex rounded-full bg-blue-100/70 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#167bd7]">Nos expertises</p>
          <h2 id="services-title" className="mt-4 text-[1.75rem] font-extrabold leading-[1.08] tracking-[-0.045em] text-[#073b78] min-[375px]:text-3xl sm:text-4xl lg:text-5xl">Une gamme complète de services<br className="hidden sm:block" /> pour <span className="text-[#087ef1]">booster votre activité</span></h2>
        </header>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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

        <div data-services-cta className="mt-6 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/90 bg-white/75 px-6 py-6 shadow-[0_14px_40px_rgba(25,88,155,.07)] backdrop-blur-lg sm:flex-row lg:px-10">
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
