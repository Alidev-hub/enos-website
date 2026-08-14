import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import greekStatue from '../assets/greek-statue.png'
import enosWordmark from '../assets/enos-wordmark.png'

gsap.registerPlugin(ScrollTrigger)

const contactDetails = [
  {
    label: 'Email',
    value: 'hello@enos.agency',
    icon: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
  },
  {
    label: 'Téléphone',
    value: '+32 (0) 2 000 00 00',
    icon: <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-1-2 2c-4-1.5-7.5-5-9-9l2-2-1-4Z"/>,
  },
  {
    label: 'Localisation',
    value: 'Bruxelles · Europe',
    icon: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  },
  {
    label: 'Disponibilité',
    value: 'Réponse sous 24h',
    icon: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  },
]

function Field({ label, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-[#5d7fa4]">{label}</span>
      {children}
    </label>
  )
}

const inputClass = 'w-full rounded-xl border border-blue-100/90 bg-white/70 px-4 py-3.5 text-sm text-[#073b78] outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100/60'

function Contact() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const columnsRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const context = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 72%', once: true },
        defaults: { ease: 'power3.out' },
      })
        .fromTo(headingRef.current.children, { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.1 })
        .fromTo(columnsRef.current.children, { autoAlpha: 0, y: 55 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.16 }, '-=0.25')
        .fromTo(ctaRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.2')
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="relative isolate scroll-mt-20 overflow-hidden bg-transparent px-5 py-14 sm:px-8 lg:px-14 lg:py-20" aria-labelledby="contact-title">
      <img src={enosWordmark} alt="" aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-8 -z-10 mx-auto w-[min(88vw,1100px)] opacity-[0.025]" />

      <div className="mx-auto max-w-6xl">
        <header ref={headingRef} className="mx-auto max-w-3xl text-center">
          <p className="mx-auto inline-flex rounded-full bg-blue-100/70 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#167bd7]">CONTACT</p>
          <h2 id="contact-title" className="mt-5 text-3xl font-extrabold leading-[1.06] tracking-[-0.05em] text-[#073b78] min-[375px]:text-4xl sm:text-5xl lg:text-6xl">Parlons de votre <span className="text-[#087ef1]">prochain projet</span></h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#58759c] sm:text-lg">Expliquez-nous vos objectifs et nous reviendrons vers vous avec une stratégie adaptée à votre entreprise.</p>
        </header>

        <div ref={columnsRef} className="mt-14 grid items-stretch gap-6 lg:mt-20 lg:grid-cols-[.82fr_1.18fr] lg:gap-8">
          <aside className="relative isolate min-h-[530px] overflow-hidden rounded-[1.6rem] border border-white/90 bg-white/55 p-5 shadow-[0_25px_65px_rgba(27,91,158,.11)] backdrop-blur-xl min-[375px]:p-7 sm:min-h-[600px] sm:rounded-[2rem] sm:p-9">
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_70%_75%,rgba(157,211,251,.42),transparent_38%),linear-gradient(145deg,rgba(255,255,255,.9),rgba(232,244,255,.55))]" />
            <img src={greekStatue} alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-[18%] -end-[32%] -z-10 h-[76%] max-w-none opacity-30 grayscale" />

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5c96c8]">Échangeons</p>
            <h3 className="mt-4 max-w-xs text-2xl font-extrabold leading-tight tracking-[-0.04em] text-[#073b78] min-[375px]:text-3xl">Une idée en tête ?<br />Construisons-la ensemble.</h3>

            <div className="relative z-10 mt-10 space-y-4">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/85 bg-white/65 p-3 backdrop-blur-md min-[375px]:gap-4 min-[375px]:p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e7f4ff] text-[#087ef1]">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-none stroke-current stroke-[1.7] stroke-linecap-round stroke-linejoin-round">{detail.icon}</svg>
                  </span>
                  <p className="min-w-0"><span className="block text-[10px] font-bold uppercase tracking-[0.13em] text-[#7890ad]">{detail.label}</span><strong className="mt-1 block break-words text-xs text-[#073b78] min-[375px]:text-sm">{detail.value}</strong></p>
                </div>
              ))}
            </div>
          </aside>

          <form onSubmit={(event) => event.preventDefault()} className="min-w-0 rounded-[1.6rem] border border-white/90 bg-[radial-gradient(circle_at_15%_5%,rgba(255,255,255,.98),rgba(241,248,255,.84)_65%,rgba(226,241,253,.72))] p-5 shadow-[0_25px_65px_rgba(27,91,158,.11)] backdrop-blur-xl sm:rounded-[2rem] sm:p-9 lg:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nom"><input type="text" name="name" autoComplete="name" placeholder="Votre nom" className={inputClass} /></Field>
              <Field label="Email"><input type="email" name="email" autoComplete="email" placeholder="vous@entreprise.com" className={inputClass} /></Field>
              <Field label="Entreprise"><input type="text" name="company" autoComplete="organization" placeholder="Nom de votre entreprise" className={inputClass} /></Field>
              <Field label="Service recherché">
                <select name="service" defaultValue="" className={inputClass}>
                  <option value="" disabled>Sélectionnez un service</option>
                  <option>Création de site web</option><option>Marketing digital</option><option>Branding & Identité</option><option>Réseaux sociaux</option><option>Automatisation et IA</option><option>SEO & Référencement</option>
                </select>
              </Field>
              <Field label="Message" className="sm:col-span-2"><textarea name="message" rows="7" placeholder="Parlez-nous de votre projet, de vos objectifs et de vos délais…" className={`${inputClass} resize-none`} /></Field>
            </div>
            <button type="submit" className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-6 rounded-full bg-gradient-to-r from-[#078cf0] to-[#0872e9] px-7 py-4 text-sm font-bold text-white shadow-[0_14px_32px_rgba(8,126,238,.24)] transition hover:-translate-y-0.5">Envoyer ma demande <span aria-hidden="true">→</span></button>
            <p className="mt-4 text-center text-xs text-[#7890ad]">Vos informations restent confidentielles. Réponse sous 24 heures ouvrées.</p>
          </form>
        </div>

        <div ref={ctaRef} className="mt-7 flex flex-col items-center justify-between gap-5 rounded-[1.5rem] border border-white/90 bg-white/70 px-5 py-6 shadow-[0_20px_55px_rgba(27,91,158,.09)] backdrop-blur-xl sm:flex-row sm:rounded-[1.75rem] sm:px-7 sm:py-7 lg:px-10">
          <p className="text-center text-xl font-extrabold tracking-[-0.025em] text-[#073b78] sm:text-start lg:text-2xl">Prêt à développer votre présence digitale ?</p>
          <a href="#contact" className="inline-flex min-h-12 w-full items-center justify-center gap-7 rounded-full bg-gradient-to-r from-[#078cf0] to-[#0872e9] px-7 text-sm font-bold text-white shadow-[0_12px_28px_rgba(8,126,238,.22)] transition hover:-translate-y-0.5 sm:w-auto sm:min-w-[210px]">Obtenir un devis <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  )
}

export default Contact
