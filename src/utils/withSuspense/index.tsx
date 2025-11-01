import { ComponentType, forwardRef, ReactNode, Suspense } from 'react'
import { DefaultLoading } from '@/components/DefaultLoading'
import { isReactNode } from '../isReactNode'

/** 为一个ReactNode包裹Suspense */
export function withSuspense(children: ReactNode, fallback?: ReactNode): ReactNode
/** 为一个react组件包裹Suspense */
export function withSuspense<T extends ComponentType<any>>(Comp: T, fallback?: ReactNode): T

export function withSuspense<T extends ComponentType<any>>(
  arg: ReactNode | T,
  fallback: ReactNode = <DefaultLoading />,
) {
  if (isReactNode(arg)) {
    const children: ReactNode = arg
    return <Suspense fallback={fallback}>{children}</Suspense>
  } else {
    const Comp: any = arg
    const CompWithSuspense = forwardRef(function CompWithSuspense(props, ref) {
      return (
        <Suspense fallback={fallback}>
          <Comp {...props} ref={ref} />
        </Suspense>
      )
    })
    return CompWithSuspense as unknown as T
  }
}
