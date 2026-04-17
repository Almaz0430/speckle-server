import en from '~/lang/en'
import ru from '~/lang/ru'
import type { Translations } from '~/lang/en'

type LocaleCode = 'en' | 'ru'

const translations: Record<LocaleCode, Translations> = { en, ru }

const LOCALE_COOKIE = 'pm-locale'

export const useLocale = () => {
  const locale = useCookie<LocaleCode>(LOCALE_COOKIE, {
    default: () => 'en',
    watch: true
  })

  const setLocale = (code: LocaleCode) => {
    locale.value = code
  }

  const t = computed(() => {
    return translations[locale.value] ?? en
  })

  return { locale, setLocale, t }
}
