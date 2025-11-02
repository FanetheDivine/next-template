export {}

declare global {
  import type { AppConfig } from 'next-intl'
  /** className和style */
  type Style = {
    className?: string
    style?: React.CSSProperties
  }
  /** 判断一个类型是否可能是函数 */
  type isFunction<T> = T extends (...args: any[]) => any ? true : false
  /** 具有locale的params 用于描述服务端组件的props */
  type ParamsWithLocale<T = object> = { params: Promise<{ locale: AppConfig['Locale'] } & T> }
}
