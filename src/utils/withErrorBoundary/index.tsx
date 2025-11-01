import { ComponentType, forwardRef, ReactNode } from 'react'
import {
  ErrorBoundary,
  ErrorBoundaryPropsWithComponent,
  ErrorBoundaryPropsWithFallback,
  ErrorBoundaryPropsWithRender,
} from 'react-error-boundary'
import { Result } from 'antd'
import { isReactNode } from '../isReactNode'

/** ErrorBoundary不包含children的props */
export type ErrorBoundaryPropsWithoutChildren =
  | Omit<ErrorBoundaryPropsWithFallback, 'children'>
  | Omit<ErrorBoundaryPropsWithComponent, 'children'>
  | Omit<ErrorBoundaryPropsWithRender, 'children'>

/** 为一个ReactNode包裹ErrorBoundary */
export function withErrorBoundary(
  children: ReactNode,
  errorBoundaryProps?: ErrorBoundaryPropsWithoutChildren,
): ReactNode
/** 为一个react组件包裹ErrorBoundary */
export function withErrorBoundary<T extends ComponentType<any>>(
  Comp: T,
  errorBoundaryProps?: ErrorBoundaryPropsWithoutChildren,
): T

export function withErrorBoundary<T extends ComponentType<any>>(
  arg: ReactNode | T,
  errorBoundaryProps: ErrorBoundaryPropsWithoutChildren = {
    fallback: <Result status='error' />,
  },
) {
  if (isReactNode(arg)) {
    const children: ReactNode = arg
    return <ErrorBoundary {...errorBoundaryProps}>{children}</ErrorBoundary>
  } else {
    const Comp: any = arg
    const CompWithErrorBoundary = forwardRef(function CompWithErrorBoundary(props, ref) {
      return (
        <ErrorBoundary {...errorBoundaryProps}>
          <Comp {...props} ref={ref} />
        </ErrorBoundary>
      )
    })
    return CompWithErrorBoundary as unknown as T
  }
}
