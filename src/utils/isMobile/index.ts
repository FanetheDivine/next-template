import { headers } from 'next/headers'
import { cache } from 'react'
import mobile from 'is-mobile'

/** 服务端判断设备是不是移动端 */
export const isMobile = cache(async () => {
  const h = await headers()
  const ua = h.get('user-agent') ?? ''
  const uaMobile = h.get('sec-ch-ua-mobile')
  return uaMobile === '?1' || mobile({ ua })
})
