import { useEffect, useRef, useState } from 'react'
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
      className={`relative flex min-h-[330px] w-full flex-col overflow-hidden rounded-[1.6rem] border bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.98),rgba(244,249,255,.91)_58%,rgba(229,241,253,.88))] px-6 py-7 text-start shadow-[0_18px_45px_rgba(35,102,171,.11)] backdrop-blur-xl sm:px-7 lg:min-h-[405px] lg:w-[330px] lg:px-8 lg:py-9 lg:text-center lg:shadow-[0_22px_55px_rgba(35,102,171,.14)] ${
        pack.featured ? 'border-[#8dc9f4]/80 ring-1 ring-white' : 'border-white/90'
      }`}
    >
      <span className="absolute start-6 top-6 font-serif text-3xl font-semibold text-blue-200 lg:text-4xl">{pack.number}</span>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4f8fd2]">{content.label}</p>
      <span className="mt-4 h-px w-9 bg-blue-300 lg:mx-auto lg:w-7" aria-hidden="true" />
      <h2 className="mt-6 text-2xl font-extrabold tracking-[-0.04em] text-[#0a3d78] lg:text-[1.7rem]">{pack.name}</h2>
      <p className="mt-5 max-w-[290px] text-[15px] leading-relaxed text-[#647fa8] lg:mx-auto lg:mt-6 lg:line-clamp-2 lg:min-h-11 lg:max-w-[245px] lg:text-sm">{content.description}</p>
      <div className="mt-6 flex w-full items-center lg:mx-auto lg:w-[72%]" aria-hidden="true">
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

function MobilePackOrbit({ content, isRtl }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStart = useRef(null)
  const total = packs.length
  const move = (direction) => setActiveIndex((current) => (current + direction + total) % total)
  const previousIndex = (activeIndex - 1 + total) % total
  const nextIndex = (activeIndex + 1) % total
  const activePack = packs[activeIndex]
  const activeContent = content[activeIndex] || {}

  const handleTouchEnd = (event) => {
    if (touchStart.current === null) return
    const distance = event.changedTouches[0].clientX - touchStart.current
    touchStart.current = null
    if (Math.abs(distance) < 42) return
    const direction = distance < 0 ? 1 : -1
    move(isRtl ? -direction : direction)
  }

  return (
    <div
      className="relative mx-auto h-[620px] w-full max-w-[430px] touch-pan-y overflow-hidden sm:h-[650px] lg:hidden"
      onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }}
      onTouchEnd={handleTouchEnd}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px]" aria-hidden="true">
        <div className="absolute left-1/2 top-[54px] h-[290px] w-[290px] -translate-x-1/2 rounded-full border border-blue-200/70 sm:h-[320px] sm:w-[320px]" />
        <div className="absolute left-1/2 top-[82px] h-[235px] w-[235px] -translate-x-1/2 rounded-full border border-dashed border-blue-200/55 sm:h-[260px] sm:w-[260px]" />
        <img src={packPillar} alt="" className="absolute left-1/2 top-[-16px] h-[445px] max-w-none -translate-x-1/2 opacity-50 drop-shadow-[0_20px_30px_rgba(35,102,171,.12)] sm:h-[475px]" />
      </div>

      <button type="button" onClick={() => move(isRtl ? 1 : -1)} aria-label={packs[previousIndex].name} className="absolute start-0 top-[118px] z-20 flex h-[76px] w-[92px] -rotate-6 flex-col items-center justify-center rounded-2xl border border-white/90 bg-white/80 px-2 text-center shadow-[0_14px_35px_rgba(35,102,171,.12)] backdrop-blur-md transition active:scale-95 sm:start-4">
        <span className="font-serif text-lg text-blue-300">{packs[previousIndex].number}</span>
        <span className="text-[10px] font-extrabold text-[#426b98]">{packs[previousIndex].name}</span>
      </button>
      <button type="button" onClick={() => move(isRtl ? -1 : 1)} aria-label={packs[nextIndex].name} className="absolute end-0 top-[118px] z-20 flex h-[76px] w-[92px] rotate-6 flex-col items-center justify-center rounded-2xl border border-white/90 bg-white/80 px-2 text-center shadow-[0_14px_35px_rgba(35,102,171,.12)] backdrop-blur-md transition active:scale-95 sm:end-4">
        <span className="font-serif text-lg text-blue-300">{packs[nextIndex].number}</span>
        <span className="text-[10px] font-extrabold text-[#426b98]">{packs[nextIndex].name}</span>
      </button>

      <article key={activeIndex} aria-live="polite" className="absolute inset-x-2 top-[190px] z-30 flex min-h-[365px] animate-[pack-enter_.45s_ease-out] flex-col overflow-hidden rounded-[1.8rem] border border-white/90 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,.98),rgba(242,249,255,.94)_62%,rgba(226,241,253,.9))] px-6 pb-6 pt-7 text-center shadow-[0_28px_70px_rgba(22,93,164,.18)] backdrop-blur-xl min-[390px]:inset-x-5 sm:top-[205px]">
        <span className="absolute start-6 top-6 font-serif text-4xl text-blue-200">{activePack.number}</span>
        <p className="text-[10px] font-extrabold uppercase tracking-[.21em] text-[#4f8fd2]">{activeContent.label}</p>
        <span className="mx-auto mt-4 h-px w-9 bg-blue-300" aria-hidden="true" />
        <h3 className="mt-5 text-[1.7rem] font-extrabold tracking-[-.045em] text-[#0a3d78]">{activePack.name}</h3>
        <p className="mx-auto mt-4 max-w-[285px] text-[15px] leading-[1.6] text-[#647fa8]">{activeContent.description}</p>
        <div className="mx-auto mt-5 flex w-[72%] items-center" aria-hidden="true"><span className="h-px flex-1 bg-blue-200" /><span className="h-1.5 w-1.5 rounded-full bg-blue-500" /><span className="h-px flex-1 bg-blue-200" /></div>
        <strong className="mt-4 block font-serif text-4xl font-medium text-[#0a3d78]">{activeContent.price}</strong>
        <a href="#contact" className={`mx-auto mt-5 inline-flex min-h-[50px] w-full max-w-[260px] items-center justify-center gap-5 rounded-full border px-5 text-sm font-bold ${activePack.featured ? 'border-transparent bg-gradient-to-r from-[#2d82ec] to-[#5b9bf2] text-white shadow-[0_10px_25px_rgba(45,130,236,.22)]' : 'border-blue-200 bg-white/70 text-[#277ad5]'}`}>{activeContent.cta}<span aria-hidden="true">→</span></a>
      </article>

      <div className="absolute inset-x-0 bottom-0 z-40 flex items-center justify-center gap-3" aria-label="Choisir un pack">
        {packs.map((pack, index) => <button key={pack.name} type="button" onClick={() => setActiveIndex(index)} aria-label={pack.name} aria-current={index === activeIndex ? 'true' : undefined} className={`h-3 rounded-full transition-all ${index === activeIndex ? 'w-10 bg-[#087ef1]' : 'w-3 bg-blue-200 hover:bg-blue-300'}`} />)}
      </div>
    </div>
  )
}

function Pillars() {
  const { t, i18n } = useTranslation()
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
      className="relative isolate scroll-mt-20 overflow-hidden bg-transparent px-5 py-20 text-enos-950 sm:px-8 sm:py-24 lg:min-h-screen lg:px-14 lg:py-16"
      aria-label={t('sections.pillars')}
    >
      <img src={enosWordmark} alt="" aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-4 -z-10 mx-auto w-[min(82vw,1000px)] opacity-[0.025]" />
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-10 text-start sm:mb-12 lg:text-center">
          <p className="mx-auto inline-flex rounded-full bg-blue-100/65 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#187bd5]">NOS PACKS</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-[-0.05em] text-[#073b78] min-[375px]:text-4xl sm:text-5xl lg:text-6xl">
            Les piliers de votre<br /><span className="text-[#087ef1]">croissance digitale</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#47648b] sm:text-base">Trois solutions conçues pour accompagner votre entreprise à chaque étape de sa croissance.</p>
        </header>

        {Array.isArray(packContent) && <MobilePackOrbit content={packContent} isRtl={i18n.dir() === 'rtl'} />}

        <div className="hidden w-full gap-8 lg:grid lg:grid-cols-3">
          {packs.map((pack, index) => (
            <div key={pack.name} data-pack-item className="relative min-w-0 lg:h-[860px]">
              <img
                src={packPillar}
                alt=""
                aria-hidden="true"
                className="absolute start-1/2 top-0 z-10 hidden h-[820px] w-auto max-w-none -translate-x-1/2 object-contain drop-shadow-[0_20px_25px_rgba(76,139,201,.08)] lg:block"
              />
              <div data-pack-card className="relative z-20 flex justify-center lg:absolute lg:inset-x-0 lg:top-[245px]">
                <PackPlaque pack={pack} content={Array.isArray(packContent) ? packContent[index] : {}} />
              </div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-md text-center text-xs leading-relaxed text-[#617da5] sm:text-sm lg:mt-2">Chaque pilier est modulable selon vos besoins.<br />Discutons de la solution qui vous correspond.</p>
      </div>
    </section>
  )
}

export default Pillars
