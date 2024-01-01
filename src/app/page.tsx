'use client'

import { useRouter } from 'next/navigation'
import { Button } from 'antd'
import styles from './module/styles.module.scss'

export default function Home() {
  const router = useRouter()
  return (
    <main className={styles.main}>
      <Button type={'primary'} onClick={() => router.push('/example')}>example</Button>
    </main>
  )
}
