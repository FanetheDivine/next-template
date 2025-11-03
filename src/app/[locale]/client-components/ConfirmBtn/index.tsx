'use client'

import { App, Button, DatePicker } from 'antd'

export const ConfirmBtn = () => {
  const { modal } = App.useApp()
  return (
    <Button onClick={() => modal.confirm({ content: <DatePicker.TimePicker /> })}>confrim</Button>
  )
}
