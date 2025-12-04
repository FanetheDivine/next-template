'use client'

import { FC, PropsWithChildren } from 'react'
import { StyleProvider } from '@ant-design/cssinjs'

export const ClientAntdProvider: FC<PropsWithChildren> = (props) => {
  return <StyleProvider layer>{props.children}</StyleProvider>
}
