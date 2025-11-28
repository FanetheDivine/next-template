export {}

declare global {
  /** className和style */
  type Style = {
    className?: string
    style?: React.CSSProperties
  }
  /** 判断一个类型是否可能是函数 */
  type isFunction<T> = T extends (...args: any[]) => any ? true : false

  /**
   * 适用于一个函数接受不同复杂类型参数的情况\
   * 将
   * ```ts
   * type ActionMap = { a:number; b:undefined; c?:number }
   * ```
   * 转化为
   * ```ts
   * type ActionType = { type: 'a'; value: number } | { type: 'b', value?:undefined } | { type: 'c'; value?: number }
   * ```
   * 函数可以通过type判断应当执行什么操作
   */
  type ActionType<ActionMap> = {
    [K in keyof Required<ActionMap>]: { type: K } & (ActionMap[K] extends undefined
      ? { value?: ActionMap[K] }
      : { value: ActionMap[K] })
  }[keyof Required<ActionMap>]
}
