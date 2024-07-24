'use client'

import { redirect } from 'next/navigation'
import { FC, useEffect } from 'react'
import { DefaultLoadingFallback } from '@/components/DefaultLoadingFallback'
import { routing } from '@/i18n/routing'

const Page: FC = () => {
  useEffect(() => {
    const lng =
      navigator.languages.find((l) => routing.locales.includes(l as any)) ?? routing.defaultLocale
    redirect(`/${lng}`)
  }, [])

  return (
    <html lang='en'>
      <body>
        <DefaultLoadingFallback />
      </body>
    </html>
  )
}

export default Page
