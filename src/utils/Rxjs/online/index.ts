import { Observable, retry, share } from 'rxjs'

/** 网络重连时触发流 */
export const online$ = new Observable<void>((subscriber) => {
  const handleOnline = () => {
    subscriber.next()
  }
  window.addEventListener('online', handleOnline)
  subscriber.add(() => window.removeEventListener('online', handleOnline))
}).pipe(share())

const getIsOfflineByNavigator = () => !navigator.onLine

/**
 * rxjs管道运算符 进行断网重试
 * @param getIsOffline 判断当前是否断网的函数 接受当前的异常作为参数
 * @example
 * ```
 * defer(() => fetchSomething())
 *  .pipe(retryWhenOffline())
 *  .subscribe(console.log)
 * ```
 */
export function retryWhenOffline<T>(
  getIsOffline: (e: unknown) => boolean = getIsOfflineByNavigator,
) {
  return retry<T>({
    delay: (e) => {
      if (getIsOffline(e)) return online$
      throw e
    },
  })
}
