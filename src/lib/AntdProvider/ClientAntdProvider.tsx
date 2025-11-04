'use client'

import { FC, PropsWithChildren, useEffect } from 'react'
import { StyleProvider } from '@ant-design/cssinjs'

export const ClientAntdProvider: FC<PropsWithChildren> = (props) => {
  useEffect(() => {
    import('@ant-design/v5-patch-for-react-19')
  }, [])
  return <StyleProvider layer>{props.children}</StyleProvider>
}
