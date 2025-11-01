import { useRef } from 'react'

/** ImmediateEffect的副作用函数 接受旧的依赖项 可选择返回一个清理函数 */
export type ImmediateEffect<Deps extends any[]> = (oldDeps?: Deps) => ImmediateEffectCleanup
/** ImmediateEffect的清理函数 */
export type ImmediateEffectCleanup = (() => any) | undefined | void

/**
 * 用法类似`useEffect` 但副作用函数和清理函数会立刻执行 而非在本次渲染之后\
 * 副作用函数可以取得旧的依赖数组\
 * 用于"监听状态的变更" 并同步地执行一些操作\
 * @example
 * ```
 * // 以下代码依次输出 'ImmediateEffect' 'Effect' 'FC end'
 * const [state] = useState(0)
 *
 * useImmediateEffect((prevDeps)=>{
 *    // 第一个参数是旧的依赖项
 *    const [prevState] = prevDeps
 *    console.log('ImmediateEffect')
 *    // as const避免类型扩大
 * },[state] as const)
 *
 * useEffect(()=>{
 *    console.log('Effect')
 * })
 *
 * console.log('FC end')
 *
 * ```
 */
export function useImmediateEffect<Deps extends any[]>(effect: ImmediateEffect<Deps>, deps: Deps) {
  const prevDepsRef = useRef<Deps>()
  const prevCleanupRef = useRef<ImmediateEffectCleanup>()
  if (isDepsChanged(prevDepsRef.current, deps)) {
    prevCleanupRef.current?.()
    prevCleanupRef.current = effect(prevDepsRef.current)
  }
  prevDepsRef.current = deps
}

/** 使用`Object.is`判断依赖项是否变更 */
function isDepsChanged<Deps extends any[]>(prevDeps: Deps | undefined, deps: Deps) {
  if (!prevDeps || prevDeps.length !== deps.length) return true
  return prevDeps.some((prevValue, i) => !Object.is(prevValue, deps[i]))
}
