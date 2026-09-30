import { createContext, useContext, useState } from 'react'
import { strings } from '../i18n/lang'
const LangCtx = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem('vm-lang') || 'en'
  )
  // Falls back to English if a key is missing in the selected language
  const t = key => strings[lang]?.[key] || strings['en'][key] || key
  const changeLang = l => { setLang(l); localStorage.setItem('vm-lang', l) }
  return (
    <LangCtx.Provider value={{ lang, changeLang, t }}>
      {children}
    </LangCtx.Provider>
  )
}
export const useLang = () => useContext(LangCtx)
