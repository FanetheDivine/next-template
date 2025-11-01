import axios from 'axios'
import type { AxiosResponse, AxiosRequestConfig, AxiosProgressEvent } from 'axios'
import { Observable } from 'rxjs'
import { match } from 'ts-pattern'

/** 流数据类型 包括progress事件和请求的结果 */
export type AjaxProgressData<T = any, R = AxiosResponse<T>> =
  | {
      type: 'upload' | 'download'
      event: AxiosProgressEvent
    }
  | {
      type: 'response'
      response: R
    }

type RequestFnName = 'get' | 'post' | 'put'

function getAjaxProgressObservable<T, R, D>(
  type: RequestFnName,
  url: string,
  data?: D,
  config: AxiosRequestConfig<D> = {},
): Observable<AjaxProgressData<T, R>> {
  const { signal, onUploadProgress, onDownloadProgress } = config
  return new Observable((subscriber) => {
    const controller = new AbortController()
    const onAbort = () => controller.abort()
    signal?.addEventListener?.('abort', onAbort)

    subscriber.add(() => {
      controller.abort()
      signal?.removeEventListener?.('abort', onAbort)
    })

    const newConfig: AxiosRequestConfig<D> = {
      ...config,
      signal: controller.signal,
      onUploadProgress: (event) => {
        onUploadProgress?.(event)
        subscriber.next({ type: 'upload', event })
      },
      onDownloadProgress: (event) => {
        onDownloadProgress?.(event)
        subscriber.next({ type: 'download', event })
      },
    }
    try {
      match(type)
        .with('get', () => axios.get<T, R, D>(url, newConfig))
        .with('post', () => axios.post<T, R, D>(url, data, newConfig))
        .with('put', () => axios.put<T, R, D>(url, data, newConfig))
        .exhaustive()
        .then((response) => {
          subscriber.next({ type: 'response', response })
          subscriber.complete()
        })
        .catch((e) => {
          subscriber.error(e)
        })
    } catch (e) {
      subscriber.error(e)
    }
  })
}

const get = <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>) =>
  getAjaxProgressObservable<T, R, D>('post', url, undefined, config)

const post = <T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
) => getAjaxProgressObservable<T, R, D>('post', url, data, config)

const put = <T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
) => getAjaxProgressObservable<T, R, D>('put', url, data, config)

/**
 * 将网络请求转化为数据上传/下载情况的流
 * @exmple
 * ```
 * declare const stream$: Observable<AjaxProgressData>
 *
 * stream$.subscribe((v) => {
 *   switch (v.type) {
 *     case 'upload': {
 *       const { event } = v
 *       console.log(`upload: loaded:${event.loaded} total:${event.total}`)
 *       break
 *     }
 *     case 'download': {
 *       const { event } = v
 *       console.log(`download: loaded:${event.loaded} total:${event.total}`)
 *       break
 *     }
 *     case 'response': {
 *       const { response } = v
 *       console.log(`response: ${response}`)
 *       break
 *     }
 *   }
 * })
 * ```
 */
export const ajaxProgress = {
  get,
  post,
  put,
}
