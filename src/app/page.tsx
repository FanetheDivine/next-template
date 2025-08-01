import { FC } from 'react'
import Link from 'next/link'
import { Button } from 'antd'
import { absoluteCenterClass } from '@/styles'
import classnames from '@/utils/classnames'
import { sleep } from '@/utils/sleep'

const Page: FC = async () => {
  await sleep(2000)
  return (
    <Link href='/test1'>
      <Button type='primary' className={classnames(absoluteCenterClass, 'bg-black')}>
        Test Page
      </Button>
    </Link>
  )
}

export default Page
