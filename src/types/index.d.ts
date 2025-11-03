export {}

declare global {
  /** className和style */
  type Style = {
    className?: string
    style?: React.CSSProperties
  }
  /** 判断一个类型是否可能是函数 */
  type isFunction<T> = T extends (...args: any[]) => any ? true : false
}
