import locales from '@/../messages/zh.json'
import { formats } from './request'
import { routing } from './routing'

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof locales
    Formats: typeof formats
  }
}
