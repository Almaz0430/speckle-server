import en from '~/lang/en'
import ru from '~/lang/ru'
import type { Translations } from '~/lang/en'

type LocaleCode = 'en' | 'ru'
type CompatibleTranslations = Translations & { value: Translations }

const translations: Record<LocaleCode, Translations> = { en, ru }

const LOCALE_COOKIE = 'pm-locale'

function pluralizeRu(text: string, count: number): string {
  const forms = text.split('|').map((f) => f.trim())
  if (forms.length !== 3) return text.replace('{count}', count.toString())
  
  const n = count % 100
  const n1 = n % 10
  
  if (n > 10 && n < 20) return forms[2].replace('{count}', count.toString())
  if (n1 > 1 && n1 < 5) return forms[1].replace('{count}', count.toString())
  if (n1 === 1) return forms[0].replace('{count}', count.toString())
  return forms[2].replace('{count}', count.toString())
}

function pluralizeEn(text: string, count: number): string {
  const forms = text.split('|').map((f) => f.trim())
  if (forms.length !== 2) return text.replace('{count}', count.toString())
  
  return (count === 1 ? forms[0] : forms[1]).replace('{count}', count.toString())
}

export const useLocale = () => {
  const locale = useCookie<LocaleCode>(LOCALE_COOKIE, {
    default: () => 'en',
    watch: true
  })

  const setLocale = (code: LocaleCode) => {
    locale.value = code
  }

  const pluralize = (text: string, count: number): string => {
    return locale.value === 'ru' ? pluralizeRu(text, count) : pluralizeEn(text, count)
  }

  const source = reactive<Translations>({ ...(translations[locale.value] ?? en) })

  watch(locale, (newLocale) => {
    Object.assign(source, translations[newLocale] ?? en)
  })

  // Compatibility shim: supports both `t.viewer` and legacy `t.value.viewer`.
  const t = new Proxy(source as CompatibleTranslations, {
    get(target, prop, receiver) {
      if (prop === 'value') return target
      return Reflect.get(target, prop, receiver)
    }
  })

  return { locale, setLocale, t, pluralize }
}
