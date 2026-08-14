import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import packPillar from '../assets/pack-pillar.png'
import enosWordmark from '../assets/enos-wordmark.png'

gsap.registerPlugin(ScrollTrigger)

const packs = [
  { name: 'Pack Start', number: 'I' },
  { name: 'Pack Growth', number: 'II', featured: true },
  { name: 'Pack Premium', number: 'III' },
]

function PackPlaque({ pack, content }) {
  return (
    <article
      className={`relative flex min-h-[380px] w-[min(88vw,330px)] flex-col overflow-hidden rounded-[1.6rem] border bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.98),rgba(244,249,255,.91)_58%,rgba(229,241,253,.88))] px-7 py-8 text-center shadow-[0_22px_55px_rgba(35,102,171,.14)] backdrop-blur-xl sm:min-h-[350px] sm:w-[240px] sm:px-5 sm:py-7 lg:min-h-[405px] lg:w-[330px] lg:px-8 lg:py-9 ${
        pack.featured ? 'border-[#8dc9f4]/80 ring-1 ring-white' : 'border-white/90'
      }`}
    >
      <span className="absolute start-6 top-6 font-serif text-3xl font-semibold text-blue-200 lg:text-4xl">{pack.number}</span>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4f8fd2]">{content.label}</p>
      <span className="mx-auto mt-4 h-px w-7 bg-blue-200" aria-hidden="true" />
      <h2 className="mt-6 text-2xl font-extrabold tracking-[-0.04em] text-[#0a3d78] lg:text-[1.7rem]">{pack.name}</h2>
      <p className="mx-auto mt-6 line-clamp-2 min-h-11 max-w-[245px] text-sm leading-relaxed text-[#647fa8] sm:text-xs lg:text-sm">{content.description}</p>
      <div className="mx-auto mt-6 flex w-[72%] items-center" aria-hidden="true">
        <span className="h-px flex-1 bg-blue-200/80" />
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
        <span className="h-px flex-1 bg-blue-200/80" />
      </div>
      <strong className="mt-6 block font-serif text-3xl font-medium text-[#0a3d78] lg:text-4xl">{content.price}</strong>
      <div className="mt-auto pt-6">
        <a href="#contact" className={`mx-auto inline-flex min-h-12 w-[78%] items-center justify-center gap-8 rounded-full border border-blue-200 px-5 text-sm font-bold transition hover:-translate-y-0.5 ${pack.featured ? 'border-transparent bg-gradient-to-r from-[#2d82ec] to-[#5b9bf2] text-white shadow-[0_10px_25px_rgba(45,130,236,.22)]' : 'bg-white/50 text-[#277ad5]'}`}>
          {content.cta}<span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  )
}

function Pillars() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const context = gsap.context(() => {
      const items = gsap.utils.toArray('[data-pack-item]')
      const cards = gsap.utils.toArray('[data-pack-card]')

      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 130 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.25,
          stagger: 0.18,
          ease: 'power4.out',
          scrollTrigger: { trigger: section, start: 'top 70%', once: true },
        },
      )

      cards.forEach((card, index) => {
        gsap.to(card, { y: -7, duration: 3.1 + index * 0.35, delay: index * 0.22, ease: 'sine.inOut', repeat: -1, yoyo: true })
      })
    }, section)

    return () => context.revert()
  }, [])

  const packContent = t('sections.packs.items', { returnObjects: true })

  return (
    <section
      id="packs"
      ref={sectionRef}
      className="relative isolate min-h-screen scroll-mt-20 overflow-hidden bg-transparent px-5 py-12 text-enos-950 sm:px-8 lg:px-14 lg:py-16"
      aria-label={t('sections.pillars')}
    >
      <img src={enosWordmark} alt="" aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-4 -z-10 mx-auto w-[min(82vw,1000px)] opacity-[0.025]" />
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-10 text-center sm:mb-12">
          <p className="mx-auto inline-flex rounded-full bg-blue-100/65 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#187bd5]">NOS PACKS</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-[-0.05em] text-[#073b78] min-[375px]:text-4xl sm:text-5xl lg:text-6xl">
            Les piliers de votre<br /><span className="text-[#087ef1]">croissance digitale</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#47648b] sm:text-base">Trois solutions conçues pour accompagner votre entreprise à chaque étape de sa croissance.</p>
        </header>

        <div className="grid w-full gap-16 md:grid-cols-3 md:gap-2 lg:gap-8">
          {packs.map((pack, index) => (
            <div key={pack.name} data-pack-item className="relative h-[720px] min-w-0 sm:h-[760px] lg:h-[860px]">
              <img
                src={packPillar}
                alt=""
                aria-hidden="true"
                className="absolute start-1/2 top-0 z-10 h-[680px] w-auto max-w-none -translate-x-1/2 object-contain drop-shadow-[0_20px_25px_rgba(76,139,201,.08)] sm:h-[720px] lg:h-[820px]"
              />
              <div data-pack-card className="absolute inset-x-0 top-[190px] z-20 flex justify-center sm:top-[210px] lg:top-[245px]">
                <PackPlaque pack={pack} content={Array.isArray(packContent) ? packContent[index] : {}} />
              </div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-2 max-w-md text-center text-xs leading-relaxed text-[#617da5] sm:text-sm">Chaque pilier est modulable selon vos besoins.<br />Discutons de la solution qui vous correspond.</p>
      </div>
    </section>
  )
}

export default Pillars
