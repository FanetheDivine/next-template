import Link from 'next/link'
import { useEffect, useRef, type FC } from 'react'
import { Button } from 'antd'
import { AbsoluteCenter } from '@/styles'
import { cn } from '@/utils'
import { sleep } from '@/utils/sleep'

const Page: FC = async () => {
  await sleep(2000)
  return (
    <Link href='/test1'>
      <Button type='primary' className={cn(AbsoluteCenter, 'bg-black')}>
        Test Page
      </Button>
    </Link>
  )
}

export default Page
