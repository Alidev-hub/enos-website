import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { supportedLanguages } from '../data/languages'
import ar from '../locales/ar/translation.json'
import de from '../locales/de/translation.json'
import en from '../locales/en/translation.json'
import es from '../locales/es/translation.json'
import fr from '../locales/fr/translation.json'
import it from '../locales/it/translation.json'
import nl from '../locales/nl/translation.json'

const resources = {
  fr: { translation: fr },
  en: { translation: en },
  ar: { translation: ar },
  nl: { translation: nl },
  de: { translation: de },
  it: { translation: it },
  es: { translation: es },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: supportedLanguages,
    fallbackLng: 'fr',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'enos-language',
    },
  })

export default i18n
