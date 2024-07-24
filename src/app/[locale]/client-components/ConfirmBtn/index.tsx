'use client'

import { useEffect } from 'react'
import { App, Button, DatePicker } from 'antd'

export const ConfirmBtn = () => {
  const { modal } = App.useApp()
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_TEST)
  }, [])
  return (
    <Button onClick={() => modal.confirm({ content: <DatePicker.TimePicker /> })}>confrim</Button>
  )
}
