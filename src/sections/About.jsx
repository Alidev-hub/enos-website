import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import greekStatue from '../assets/greek-statue.png'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    title: 'Créativité',
    description: 'Des idées fortes pour construire des identités qui marquent les esprits.',
    icon: <><path d="M12 3a6 6 0 0 0-3.7 10.7c.8.6 1.2 1.3 1.2 2.3h5c0-1 .4-1.7 1.2-2.3A6 6 0 0 0 12 3Z"/><path d="M9.5 19h5M10 16h4M12 1v1M4.2 4.2l1.4 1.4M18.4 5.6l1.4-1.4M3 12h2M19 12h2"/></>,
  },
  {
    title: 'Performance',
    description: 'Des décisions guidées par les données pour transformer chaque action en résultat.',
    icon: <><path d="M4 20V10h4v10M10 20V6h4v14M16 20V3h4v17M2 20h20"/><path d="m3 8 5-4 4 2 7-5"/></>,
  },
  {
    title: 'Accompagnement',
    description: 'Une équipe engagée à vos côtés, de la stratégie jusqu’au déploiement.',
    icon: <><circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2.5 20v-2a5.5 5.5 0 0 1 11 0v2M14 15.5a4 4 0 0 1 7 2.5v2"/></>,
  },
]

function About() {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const contentRef = useRef(null)
  const statueRef = useRef(null)
  const valuesRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const context = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 70%', once: true },
        defaults: { ease: 'power3.out' },
      })
        .fromTo(cardRef.current, { autoAlpha: 0, y: 65, scale: 0.985 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.9 })
        .fromTo(contentRef.current.children, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.1 }, '-=0.55')
        .fromTo(statueRef.current, { autoAlpha: 0, x: 75 }, { autoAlpha: 1, x: 0, duration: 1 }, '-=0.65')
        .fromTo(valuesRef.current.children, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.12 }, '-=0.45')

      gsap.to(statueRef.current, { y: -7, duration: 4.2, ease: 'sine.inOut', repeat: -1, yoyo: true })
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section id="a-propos" ref={sectionRef} className="relative scroll-mt-20 bg-transparent px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-20" aria-labelledby="about-title">
      <div
        ref={cardRef}
        className="relative isolate mx-auto max-w-6xl overflow-hidden px-0 lg:rounded-[2.5rem] lg:border lg:border-white/90 lg:bg-white/45 lg:px-14 lg:pb-12 lg:pt-16 lg:shadow-[0_35px_90px_rgba(26,91,159,.1)] lg:backdrop-blur-md"
      >
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_82%_32%,rgba(179,220,252,.42),transparent_35%),linear-gradient(135deg,rgba(255,255,255,.82),rgba(238,247,255,.55))]" />
        <div className="absolute inset-0 -z-10 opacity-25 [background-image:repeating-linear-gradient(115deg,transparent_0,transparent_34px,rgba(66,141,209,.08)_35px,transparent_37px)]" />
        <span className="pointer-events-none absolute -start-6 top-10 -z-10 font-serif text-[11rem] leading-none text-blue-100/35 sm:text-[15rem] lg:text-[20rem]" aria-hidden="true">E</span>

        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div ref={contentRef} className="relative z-20 max-w-2xl">
            <p className="inline-flex rounded-full bg-blue-100/75 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#167bd7]">À PROPOS</p>
            <h2 id="about-title" className="mt-5 text-3xl font-extrabold leading-[1.05] tracking-[-0.05em] text-[#073b78] min-[375px]:text-4xl sm:mt-6 sm:text-5xl lg:text-[3.5rem]">Une agence créative pensée pour faire grandir les marques</h2>
            <p className="mt-7 max-w-xl text-base leading-[1.8] text-[#58759c] sm:text-lg">ENOS accompagne les entreprises dans leur présence digitale grâce à une approche stratégique, créative et orientée résultats.</p>
          </div>

          <div className="relative z-10 mx-auto -mt-5 h-[330px] w-full max-w-[390px] sm:h-[430px] sm:max-w-[400px] lg:mt-0 lg:h-[500px]">
            <div className="absolute bottom-3 left-1/2 h-20 w-3/4 -translate-x-1/2 rounded-[50%] bg-blue-500/10 blur-2xl" />
            <img ref={statueRef} src={greekStatue} alt="" aria-hidden="true" className="absolute inset-x-0 bottom-[-18%] mx-auto h-[130%] w-auto max-w-none object-contain drop-shadow-[0_30px_35px_rgba(20,75,135,.16)]" />
          </div>
        </div>

        <div ref={valuesRef} className="relative z-30 mt-5 grid gap-4 md:grid-cols-3 lg:mt-0">
          {values.map((value) => (
            <article key={value.title} className="rounded-2xl border border-white/90 bg-white/75 p-5 shadow-[0_15px_38px_rgba(28,91,157,.08)] backdrop-blur-lg sm:p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f4ff] text-[#087ef1]">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-[1.7] stroke-linecap-round stroke-linejoin-round">{value.icon}</svg>
              </span>
              <h3 className="mt-5 text-lg font-extrabold text-[#073b78]">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6881a2]">{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
