import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import enosWordmark from '../assets/enos-wordmark.png'

gsap.registerPlugin(ScrollTrigger)

const navigation = [
  ['Accueil', '#accueil'],
  ['Nos Packs', '#packs'],
  ['Services', '#services'],
  ['À propos', '#a-propos'],
  ['Réalisations', '#realisations'],
  ['Tarifs', '#tarifs'],
  ['Contact', '#contact'],
]

const services = ['Création de sites web', 'Marketing digital', 'Branding', 'Réseaux sociaux', 'SEO', 'IA & Automatisation']

function FooterLink({ href, children }) {
  return <a href={href} className="group inline-flex items-center gap-2 text-sm text-[#58759c] transition hover:translate-x-1 hover:text-[#087ef1]"><span className="h-px w-0 bg-[#087ef1] transition-all group-hover:w-3" />{children}</a>
}

function Footer() {
  const footerRef = useRef(null)
  const gridRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    const footer = footerRef.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const context = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: footer, start: 'top 88%', once: true } })
        .fromTo(gridRef.current.children, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.11, ease: 'power3.out' })
        .fromTo(bottomRef.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.2')
    }, footer)

    return () => context.revert()
  }, [])

  return (
    <footer id="footer" ref={footerRef} className="relative isolate overflow-hidden border-t border-white/70 bg-[linear-gradient(145deg,rgba(233,245,253,.98),rgba(214,234,249,.96))] px-5 pb-7 pt-10 text-[#073b78] sm:px-8 lg:px-14 lg:pt-12">
      <img src={enosWordmark} alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-20 left-1/2 -z-10 w-[min(90vw,1050px)] -translate-x-1/2 opacity-[0.035]" />
      <div className="absolute inset-0 -z-20 opacity-25 [background-image:repeating-linear-gradient(120deg,transparent_0,transparent_42px,rgba(56,137,205,.07)_43px,transparent_45px)]" />

      <div className="mx-auto max-w-7xl">
        <div ref={gridRef} className="grid gap-9 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[1.35fr_.8fr_1fr_1fr] lg:gap-10">
          <div>
            <a href="#accueil" aria-label="Retour à l’accueil" className="inline-flex">
              <img src={enosWordmark} alt="ENOS" className="w-40" />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-[1.8] text-[#58759c]">Nous accompagnons les entreprises dans leur croissance digitale grâce à des solutions créatives, stratégiques et performantes.</p>
            <div className="mt-7 flex gap-3">
              {['in', 'ig', 'f'].map((social) => (
                <a key={social} href="#contact" aria-label={`Réseau social ${social}`} className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-200/80 bg-white/55 text-xs font-extrabold uppercase text-[#087ef1] transition hover:-translate-y-1 hover:border-transparent hover:bg-[#087ef1] hover:text-white hover:shadow-[0_10px_24px_rgba(8,126,238,.2)]">{social}</a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#073b78]">Navigation rapide</h2>
            <nav className="mt-6 flex flex-col items-start gap-3.5" aria-label="Navigation du pied de page">
              {navigation.map(([label, href]) => <FooterLink key={label} href={href}>{label}</FooterLink>)}
            </nav>
          </div>

          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#073b78]">Services</h2>
            <div className="mt-6 flex flex-col items-start gap-3.5">
              {services.map((service) => <FooterLink key={service} href="#services">{service}</FooterLink>)}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#073b78]">Contact</h2>
            <address className="mt-6 space-y-5 not-italic">
              <p><span className="block text-[10px] font-bold uppercase tracking-[0.13em] text-[#7d98b5]">Email</span><a href="mailto:hello@enos.agency" className="mt-1.5 inline-block break-all text-sm font-semibold transition hover:text-[#087ef1]">hello@enos.agency</a></p>
              <p><span className="block text-[10px] font-bold uppercase tracking-[0.13em] text-[#7d98b5]">Téléphone</span><a href="tel:+3220000000" className="mt-1.5 inline-block text-sm font-semibold transition hover:text-[#087ef1]">+32 (0) 2 000 00 00</a></p>
              <p><span className="block text-[10px] font-bold uppercase tracking-[0.13em] text-[#7d98b5]">Adresse</span><span className="mt-1.5 block text-sm font-semibold">Bruxelles · Europe</span></p>
              <p><span className="block text-[10px] font-bold uppercase tracking-[0.13em] text-[#7d98b5]">Réseaux sociaux</span><span className="mt-1.5 block text-sm font-semibold">LinkedIn · Instagram</span></p>
            </address>
          </div>
        </div>

        <div ref={bottomRef} className="mt-14 flex flex-col gap-4 border-t border-blue-200/65 pt-6 text-xs text-[#6883a3] sm:flex-row sm:items-center sm:justify-between lg:mt-20">
          <p>© 2026 ENOS. Tous droits réservés.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#footer" className="transition hover:text-[#087ef1]">Politique de confidentialité</a>
            <a href="#footer" className="transition hover:text-[#087ef1]">Conditions d’utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
