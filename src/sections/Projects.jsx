import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import portfolioGrid from '../assets/portfolio-projects-grid.png'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { name: 'Villa Aurea', category: 'Site Web', position: '0% 0%' },
  { name: 'Maison Éclat', category: 'Branding', position: '50% 0%', featured: true },
  { name: 'Sélène', category: 'Identité visuelle', position: '100% 0%' },
  { name: 'Nexo Finance', category: 'Application & Site Web', position: '0% 100%' },
  { name: 'Aera Studio', category: 'Marketing digital', position: '50% 100%' },
  { name: 'Optima', category: 'SEO & Data', position: '100% 100%' },
]

function Projects() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-project-card]')
      gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 72%', once: true },
        defaults: { ease: 'power3.out' },
      })
        .fromTo(headingRef.current.children, { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.1 })
        .fromTo(cards, { autoAlpha: 0, y: 55, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.11 }, '-=0.25')
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section id="realisations" ref={sectionRef} className="relative isolate scroll-mt-20 overflow-hidden bg-transparent px-5 py-14 sm:px-8 lg:px-14 lg:py-20" aria-labelledby="projects-title">
      <span className="pointer-events-none absolute -start-10 top-16 -z-10 font-serif text-[18rem] leading-none text-blue-100/25 lg:text-[28rem]" aria-hidden="true">Ω</span>
      <span className="pointer-events-none absolute -end-8 bottom-8 -z-10 font-serif text-[15rem] leading-none text-blue-100/20 lg:text-[24rem]" aria-hidden="true">Σ</span>

      <div className="mx-auto max-w-7xl">
        <header ref={headingRef} className="mx-auto max-w-3xl text-center">
          <p className="mx-auto inline-flex rounded-full bg-blue-100/70 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#167bd7]">RÉALISATIONS</p>
          <h2 id="projects-title" className="mt-5 text-3xl font-extrabold leading-[1.06] tracking-[-0.05em] text-[#073b78] min-[375px]:text-4xl sm:text-5xl lg:text-6xl">Des projets qui parlent <span className="text-[#087ef1]">d’eux-mêmes</span></h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#58759c] sm:text-lg">Découvrez quelques réalisations conçues pour développer la visibilité et la croissance de nos clients.</p>
        </header>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-7">
          {projects.map((project) => (
            <article
              key={project.name}
              data-project-card
              className={`group relative min-w-0 overflow-hidden rounded-[1.5rem] border bg-white/75 p-2.5 backdrop-blur-lg transition duration-500 hover:-translate-y-2 sm:rounded-[1.75rem] sm:p-3 ${
                project.featured
                  ? 'border-blue-300/80 shadow-[0_26px_70px_rgba(22,111,206,.18)] ring-1 ring-white'
                  : 'border-white/90 shadow-[0_18px_50px_rgba(27,91,158,.1)] hover:shadow-[0_26px_65px_rgba(27,91,158,.16)]'
              }`}
            >
              {project.featured && <span className="absolute inset-x-10 top-0 z-20 h-1 rounded-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />}
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-blue-50">
                <div
                  className="absolute inset-0 bg-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  style={{ backgroundImage: `url(${portfolioGrid})`, backgroundSize: '300% 200%', backgroundPosition: project.position }}
                  role="img"
                  aria-label={`Aperçu du projet ${project.name}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061d3d]/20 via-transparent to-white/5 opacity-50 transition group-hover:opacity-30" />
                <span className="absolute end-4 top-4 rounded-full border border-white/70 bg-white/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0a5a9e] backdrop-blur-md">{project.category}</span>
              </div>

              <div className="flex items-center justify-between gap-5 px-3 pb-3 pt-5 sm:px-4 sm:pb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6d9bc5]">Projet ENOS</p>
                  <h3 className="mt-1 text-xl font-extrabold tracking-[-0.035em] text-[#073b78] min-[375px]:text-2xl">{project.name}</h3>
                </div>
                <a href="#contact" aria-label={`Voir le projet ${project.name}`} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-white/80 text-xl text-[#087ef1] transition group-hover:border-transparent group-hover:bg-[#087ef1] group-hover:text-white">↗</a>
              </div>

              <a href="#contact" className="mx-3 mb-3 inline-flex items-center gap-3 text-xs font-bold text-[#087ef1] sm:mx-4 sm:mb-4">Voir le projet <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
