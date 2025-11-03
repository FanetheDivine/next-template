import { Locale } from 'next-intl'
import locales from '@/../messages/zh.json'
import { formats } from './request'
import { routing } from './routing'

/** 具有locale的路径参数 */
export type LocaleParams<T extends object = object> = {
  params: Promise<{ locale: Locale } & T>
}
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof locales
    Formats: typeof formats
  }
}
