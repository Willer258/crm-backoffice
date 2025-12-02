import { defineRouting } from 'next-intl/routing'

export const locales = ['en', 'fr'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'fr'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
}

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
})
