'use client'

import { useRouter } from 'next/navigation'
import { Button } from 'antd'
import { fullBox, positionCenter, } from '@/styles'

export default function Home() {
  const router = useRouter()
  return (
    <main className={fullBox}>
      <Button className={positionCenter} type={'primary'} onClick={() => router.push('/example')}>example</Button>
    </main>
  )
}
