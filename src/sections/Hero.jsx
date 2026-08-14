import { useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import philosopherStatue from '../assets/hero-philosopher.png'
import enosWordmark from '../assets/enos-wordmark.png'

const icons = {
  target: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M14 10l7-7"/></svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10h4v10M10 20V6h4v14M16 20V3h4v17M2 20h20"/><path d="m3 8 5-4 4 2 7-5"/></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20v-2a5 5 0 0 1 10 0v2M14 15a4 4 0 0 1 7 3v2H3"/></svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5c3-3 6-3 7-3 0 1 0 4-3 7l-5 5-5-4 6-5Z"/><path d="m8 10-4 1-2 3 6 1M13 14l-1 6-3 2-1-7M14 7l3 3"/><circle cx="15.5" cy="7.5" r="1"/></svg>
  ),
}

function Hero() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const brandRef = useRef(null)
  const statueWrapRef = useRef(null)
  const statueRef = useRef(null)
  const copyRef = useRef(null)
  const ctasRef = useRef(null)
  const statsRef = useRef(null)
  const mobileRef = useRef(null)
  const mobileStatueRef = useRef(null)

  const stats = useMemo(() => t('hero.stats', { returnObjects: true }), [t])

  useEffect(() => {
    const section = sectionRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const context = gsap.context(() => {
      if (window.innerWidth < 1024) {
        gsap.fromTo(mobileRef.current.children, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.09, ease: 'power3.out' })
        gsap.to(mobileStatueRef.current, { y: -6, duration: 3.8, ease: 'sine.inOut', repeat: -1, yoyo: true })
        return
      }

      const titleLines = copyRef.current.querySelectorAll('[data-title-line]')
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      timeline
        .fromTo(brandRef.current, { autoAlpha: 0, scale: 0.88 }, { autoAlpha: 1, scale: 1, duration: 1.15 })
        .fromTo(titleLines, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.7 }, '-=0.7')
        .fromTo(statueWrapRef.current, { autoAlpha: 0, y: 130 }, { autoAlpha: 1, y: 0, duration: 1.25, ease: 'power4.out' }, '-=0.7')
        .fromTo(statsRef.current.children, { autoAlpha: 0, x: 24 }, { autoAlpha: 1, x: 0, stagger: 0.1, duration: 0.55 }, '-=0.55')
        .fromTo(ctasRef.current.children, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.55 }, '-=0.2')

      gsap.to(statueRef.current, { y: -8, duration: 3.8, ease: 'sine.inOut', repeat: -1, yoyo: true })
    }, section)

    const handlePointerMove = (event) => {
      const bounds = section.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      gsap.to(statueWrapRef.current, { x: x * 12, y: y * 7, duration: 1.2, ease: 'power2.out', overwrite: 'auto' })
      gsap.to(brandRef.current, { x: x * -3, y: y * -2, duration: 1.5, ease: 'power2.out', overwrite: 'auto' })
    }

    const hasFinePointer = window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches
    if (hasFinePointer) section.addEventListener('pointermove', handlePointerMove)
    return () => {
      if (hasFinePointer) section.removeEventListener('pointermove', handlePointerMove)
      context.revert()
    }
  }, [])

  return (
    <section id="accueil" ref={sectionRef} className="relative isolate min-h-[100svh] scroll-mt-20 overflow-hidden bg-transparent text-[#06356f] [contain:paint] lg:h-[max(100svh,760px)]" aria-labelledby="hero-title">

      <div ref={mobileRef} className="relative z-20 px-4 pb-10 pt-[82px] sm:px-7 lg:hidden">
        <div className="relative z-30 rounded-[1.6rem] border border-white/80 bg-white/70 p-5 shadow-[0_18px_48px_rgba(5,58,118,.08)] backdrop-blur-md">
          <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#008cf0]">{t('hero.eyebrow')}</p>
          <h1 className="mt-3 text-[clamp(2rem,10vw,2.75rem)] font-extrabold leading-[.96] tracking-[-0.05em] text-[#083a78]">
            <span className="block">{t('hero.title.line1')}</span><span className="block">{t('hero.title.line2')}</span><span className="block text-[#0495ef]">{t('hero.title.line3')}</span>
          </h1>
          <p className="mt-3 text-[12px] font-medium leading-[1.5] text-[#123f75]">{t('hero.description')}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a href="#services" className="flex min-h-10 items-center justify-center rounded-full bg-[#0797ef] px-2 text-center text-[10px] font-bold text-white">{t('hero.primaryCta')}</a>
            <a href="#realisations" className="flex min-h-10 items-center justify-center rounded-full border border-[#0b4d98] bg-white/60 px-2 text-center text-[10px] font-bold text-[#073c7b]">{t('hero.secondaryCta')}</a>
          </div>
        </div>

        <div className="relative -mt-2 h-[310px] overflow-hidden sm:h-[380px]">
          <img src={enosWordmark} alt="" aria-hidden="true" className="absolute left-1/2 top-12 w-[145%] max-w-none -translate-x-1/2 opacity-25" />
          <img ref={mobileStatueRef} src={philosopherStatue} alt="" aria-hidden="true" className="absolute bottom-[-72px] left-1/2 h-[440px] max-w-none -translate-x-1/2 object-contain drop-shadow-[0_22px_24px_rgba(16,38,66,.2)] sm:bottom-[-90px] sm:h-[530px]" />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {Array.isArray(stats) && stats.map((stat, index) => (
            <div key={stat.label} className="flex min-w-0 items-center gap-2.5 rounded-xl border border-white/85 bg-white/70 p-3 shadow-[0_10px_28px_rgba(5,58,118,.06)] backdrop-blur">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e1f1ff] text-[#008ef1] [&_svg]:h-5 [&_svg]:w-5 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:stroke-[1.8]">{icons[['target', 'chart', 'users', 'rocket'][index]]}</span>
              <span className="min-w-0"><strong className="block text-base font-extrabold leading-none text-[#073b78]">{stat.value}</strong><span className="mt-1 block text-[9px] leading-tight text-[#174578]">{stat.label}</span></span>
            </div>
          ))}
        </div>
      </div>

      <div ref={brandRef} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[2%] z-0 mx-auto hidden justify-center lg:flex">
        <img src={enosWordmark} alt="" className="w-[min(68vw,1030px)] min-w-[810px] max-w-none" />
      </div>

      <div ref={statueWrapRef} className="pointer-events-none absolute inset-x-0 top-[78px] z-10 mx-auto hidden h-[calc(100%-78px)] items-end justify-center lg:flex">
        <img ref={statueRef} src={philosopherStatue} alt="" className="h-[94%] w-auto max-w-none translate-y-[10%] object-contain object-bottom drop-shadow-[0_28px_24px_rgba(16,38,66,.25)] sm:h-[103%] sm:translate-y-[8%] lg:h-[110%] lg:translate-y-[7%]" />
      </div>

      <div className="relative z-20 mx-auto hidden h-full max-w-[1270px] grid-cols-[1fr_1.7fr_1fr] items-end gap-10 px-14 pb-16 pt-[78px] lg:grid">
        <div ref={copyRef} className="relative z-30 max-w-[315px] justify-self-start rounded-3xl bg-white/70 p-5 shadow-[0_15px_45px_rgba(5,58,118,.07)] backdrop-blur-[2px] lg:top-[48px] lg:mb-2 lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.19em] text-[#008cf0]">{t('hero.eyebrow')}</p>
          <h1 id="hero-title" className="text-[clamp(2.15rem,3.1vw,3.25rem)] font-extrabold leading-[1.03] tracking-[-0.045em] text-[#083a78]">
            <span data-title-line className="block">{t('hero.title.line1')}</span>
            <span data-title-line className="block">{t('hero.title.line2')}</span>
            <span data-title-line className="block text-[#0495ef]">{t('hero.title.line3')}</span>
          </h1>
          <p className="mt-4 max-w-[305px] text-[13px] font-medium leading-[1.55] text-[#123f75]">{t('hero.description')}</p>
          <div ref={ctasRef} className="mt-5 flex max-w-[220px] flex-col gap-3">
            <a href="#services" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0797ef] px-6 text-[13px] font-semibold text-white shadow-[0_8px_22px_rgba(0,142,235,.22)] transition hover:-translate-y-0.5 hover:bg-[#067fd0]">{t('hero.primaryCta')}</a>
            <a href="#realisations" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#0b4d98] bg-white/50 px-5 text-[13px] font-semibold text-[#073c7b] transition hover:-translate-y-0.5 hover:bg-white">
              <span className="text-[12px]">▶</span>{t('hero.secondaryCta')}
            </a>
          </div>
        </div>

        <div aria-hidden="true" />

        <div ref={statsRef} className="relative z-30 grid grid-cols-2 gap-x-5 gap-y-7 rounded-3xl bg-white/75 p-5 shadow-[0_15px_45px_rgba(5,58,118,.07)] backdrop-blur-sm sm:grid-cols-4 lg:mb-12 lg:me-14 lg:grid-cols-1 lg:justify-self-end lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none">
          {Array.isArray(stats) && stats.map((stat, index) => (
            <div key={stat.label} className="flex min-w-0 items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#e1f1ff] text-[#008ef1] [&_svg]:h-7 [&_svg]:w-7 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:stroke-[1.8] [&_svg]:stroke-linecap-round [&_svg]:stroke-linejoin-round">{icons[['target', 'chart', 'users', 'rocket'][index]]}</span>
              <span>
                <strong className="block text-[22px] font-extrabold leading-none text-[#073b78]">{stat.value}</strong>
                <span className="mt-1 block text-[12px] font-medium text-[#174578]">{stat.label}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
