import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { languages } from '../data/languages'
import enosWordmark from '../assets/enos-wordmark.png'

function Logo() {
  return <img src={enosWordmark} alt="" className="w-[100px] max-w-none sm:w-[135px] lg:w-[178px]" />
}

function Navbar() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const links = [
    { key: 'home', href: '#accueil' },
    { key: 'services', href: '#services' },
    { key: 'about', href: '#a-propos' },
    { key: 'work', href: '#realisations' },
    { key: 'pricing', href: '#tarifs' },
    { key: 'contact', href: '#contact' },
  ]

  return (
    <header className="absolute inset-x-0 top-0 z-50 h-[68px] bg-transparent text-[#06356f] lg:h-[78px]">
      <nav className="mx-auto flex h-full max-w-[1340px] items-center justify-between gap-3 px-3 sm:px-6 lg:gap-8 lg:px-10" aria-label={t('navigation.ariaLabel')}>
        <a href="#accueil" aria-label="ENOS" className="shrink-0"><Logo /></a>

        <div className="hidden items-center gap-[clamp(1.7rem,3.6vw,3.8rem)] lg:flex">
          {links.map((link) => <a key={link.key} href={link.href} className="text-[15px] font-bold transition hover:text-[#0797ef]">{t(`navigation.${link.key}`)}</a>)}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="#contact" className="inline-flex min-h-[46px] items-center rounded-full bg-[#0797ef] px-8 text-[14px] font-semibold text-white transition hover:bg-[#067fd0]">{t('navigation.quote')}</a>
          <select value={i18n.resolvedLanguage || 'fr'} onChange={(event) => i18n.changeLanguage(event.target.value)} aria-label={t('language.label')} className="bg-transparent text-xs font-bold text-[#073b78] outline-none">
            {languages.map((language) => <option key={language.code} value={language.code}>{language.code.toUpperCase()}</option>)}
          </select>
        </div>

        <div className="flex items-center gap-1.5 lg:hidden">
          <select value={i18n.resolvedLanguage || 'fr'} onChange={(event) => i18n.changeLanguage(event.target.value)} aria-label={t('language.label')} className="h-9 w-[45px] rounded-full border border-blue-100 bg-white/65 px-1 text-center text-[10px] font-bold text-[#073b78] outline-none backdrop-blur">
            {languages.map((language) => <option key={language.code} value={language.code}>{language.code.toUpperCase()}</option>)}
          </select>
          <a href="#contact" className="inline-flex h-9 items-center rounded-full bg-[#0797ef] px-3 text-[11px] font-bold text-white shadow-[0_8px_18px_rgba(7,151,239,.2)]">Devis</a>
          <button type="button" className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-full border border-blue-100 bg-white/55 backdrop-blur" aria-expanded={open} aria-label="Menu" onClick={() => setOpen((value) => !value)}>
            <span className="h-0.5 w-4 bg-[#073b78]"/><span className="h-0.5 w-4 bg-[#073b78]"/><span className="h-0.5 w-4 bg-[#073b78]"/>
          </button>
        </div>
      </nav>

      {open && (
        <div className="absolute inset-x-3 top-[62px] max-h-[calc(100svh-72px)] overflow-y-auto rounded-2xl border border-blue-100 bg-white/95 p-5 shadow-xl backdrop-blur-xl sm:inset-x-6 lg:hidden">
          <div className="grid gap-3">{links.map((link) => <a key={link.key} href={link.href} onClick={() => setOpen(false)} className="font-semibold">{t(`navigation.${link.key}`)}</a>)}</div>
          <a href="#contact" onClick={() => setOpen(false)} className="mt-5 flex w-full items-center justify-center rounded-full bg-[#0797ef] px-5 py-2.5 text-sm font-semibold text-white">{t('navigation.quote')}</a>
        </div>
      )}
    </header>
  )
}

export default Navbar
