import { redirect } from 'next/navigation'
import { FC } from 'react'
import { routing } from '@/i18n/routing'

const Page: FC = () => {
  redirect('/' + routing.defaultLocale)
}

export default Page
