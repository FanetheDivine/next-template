import { FC } from 'react'
import { Button } from 'antd'
import { AbsoluteCenter } from '@/styles'
import { Link } from '@/i18n/navigation'
import { sleep } from '@/utils/sleep'

const Page: FC = async () => {
  await sleep(2000)
  return 1
}

export default Page
