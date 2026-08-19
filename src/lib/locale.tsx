import { createContext, use, useMemo, useState, type ReactNode } from 'react'
import type { Locale, Text } from '../content/types'

type LocaleApi = {
  locale: Locale
  setLocale: (locale: Locale) => void
  tx: (text: Text) => string
}

const LocaleContext = createContext<LocaleApi | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('ru')
  const value = useMemo<LocaleApi>(
    () => ({
      locale,
      setLocale,
      tx: (text) => text[locale],
    }),
    [locale],
  )
  return <LocaleContext value={value}>{children}</LocaleContext>
}

export function useLocale() {
  const ctx = use(LocaleContext)
  if (!ctx) throw new Error('LocaleProvider missing')
  return ctx
}
