import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { languages } from '../data/languages'
import enosWordmark from '../assets/enos-wordmark.png'

function Logo() {
  return <img src={enosWordmark} alt="" className="w-[100px] max-w-none sm:w-[135px] lg:w-[178px]" />
}

function Navbar() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const links = [
    { key: 'home', href: '#accueil' },
    { key: 'services', href: '#services' },
    { key: 'about', href: '#a-propos' },
    { key: 'work', href: '#realisations' },
    { key: 'pricing', href: '#tarifs' },
    { key: 'contact', href: '#contact' },
  ]

  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menuRef.current?.querySelector('a')?.focus()
    const closeOnEscape = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  return (
    <>
    <header className="absolute inset-x-0 top-0 z-[60] h-[68px] bg-white/35 text-[#06356f] backdrop-blur-[8px] lg:h-[78px] lg:bg-transparent lg:backdrop-blur-none">
      <nav className="mx-auto flex h-full max-w-[1340px] items-center justify-between gap-3 px-5 sm:px-7 lg:gap-8 lg:px-10" aria-label={t('navigation.ariaLabel')}>
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

        <div className="flex items-center gap-2 lg:hidden">
          <select value={i18n.resolvedLanguage || 'fr'} onChange={(event) => i18n.changeLanguage(event.target.value)} aria-label={t('language.label')} className="h-11 w-[52px] rounded-full border border-blue-100/80 bg-white/60 px-1 text-center text-xs font-extrabold text-[#073b78] outline-none backdrop-blur focus-visible:ring-2 focus-visible:ring-[#0797ef]">
            {languages.map((language) => <option key={language.code} value={language.code}>{language.code.toUpperCase()}</option>)}
          </select>
          <button type="button" className="relative flex h-11 w-11 items-center justify-center rounded-full border border-blue-100/80 bg-white/60 backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0797ef]" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => setOpen((value) => !value)}>
            <span className={`absolute h-0.5 w-[18px] bg-[#073b78] transition ${open ? 'rotate-45' : '-translate-y-[5px]'}`}/><span className={`absolute h-0.5 w-[18px] bg-[#073b78] transition ${open ? 'opacity-0' : ''}`}/><span className={`absolute h-0.5 w-[18px] bg-[#073b78] transition ${open ? '-rotate-45' : 'translate-y-[5px]'}`}/>
          </button>
        </div>
      </nav>

    </header>

    {createPortal(
      <div className={`fixed inset-x-0 bottom-0 top-[68px] z-50 h-[calc(100dvh-68px)] bg-[#f6fbff]/98 px-5 pb-7 pt-7 backdrop-blur-2xl transition duration-300 lg:hidden ${open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'}`} aria-hidden={!open}>
        <div id="mobile-navigation" ref={menuRef} className="mx-auto flex h-full max-w-lg flex-col overflow-y-auto">
          <p className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#0797ef]">Navigation</p>
          <div className="mt-6 flex flex-col border-t border-blue-100/80">{links.map((link, index) => <a tabIndex={open ? 0 : -1} key={link.key} href={link.href} onClick={() => setOpen(false)} className="group flex min-h-[57px] items-center justify-between border-b border-blue-100/80 text-[clamp(1.45rem,7vw,2rem)] font-extrabold tracking-[-.04em] text-[#073b78] outline-none transition hover:text-[#0797ef] focus-visible:text-[#0797ef]"><span>{t(`navigation.${link.key}`)}</span><span className="text-sm font-medium text-blue-300">0{index + 1}</span></a>)}</div>
          <div className="mt-auto pt-7">
            <a tabIndex={open ? 0 : -1} href="#contact" onClick={() => setOpen(false)} className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#0797ef] px-6 text-[15px] font-bold text-white shadow-[0_14px_30px_rgba(7,151,239,.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#073b78]">{t('navigation.quote')}</a>
          </div>
        </div>
      </div>,
      document.body,
    )}
    </>
  )
}

export default Navbar
