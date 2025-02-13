import { FC } from 'react'
import { absoluteCenter } from '@/styles'
import { Button } from 'antd'
import classnames from 'classnames'

const Page: FC = () => {
  return (
    <Button type='primary' className={classnames(absoluteCenter, 'bg-black')}>
      Test Page
    </Button>
  )
}

export default Page
