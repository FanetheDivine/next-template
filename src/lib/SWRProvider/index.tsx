'use client'

import { FC, PropsWithChildren } from 'react'
import { SWRConfig } from 'swr'

/** useSWR全局配置 */
export const SWRProvider: FC<PropsWithChildren> = (props) => {
  return <SWRConfig>{props.children}</SWRConfig>
}
