import { ComponentType, FC, ReactNode, Suspense } from 'react'
import { DefaultLoadingFallback } from '@/components/DefaultLoadingFallback'
import { isReactNode } from '../isReactNode'

/** 为一个ReactNode包裹Suspense */
export function withSuspense(children: ReactNode, fallback?: ReactNode): ReactNode
/** 为一个react组件包裹Suspense */
export function withSuspense<T extends ComponentType<any>>(Comp: T, fallback?: ReactNode): T

export function withSuspense<T extends ComponentType<any>>(
  arg: ReactNode | T,
  fallback: ReactNode = <DefaultLoadingFallback />,
) {
  if (isReactNode(arg)) {
    const children: ReactNode = arg
    return <Suspense fallback={fallback}>{children}</Suspense>
  } else {
    const Comp: any = arg
    const CompWithSuspense: FC<any> = (props) => {
      return (
        <Suspense fallback={fallback}>
          <Comp {...props} />
        </Suspense>
      )
    }
    return CompWithSuspense as unknown as T
  }
}
