'use client'

import { redirect } from 'next/navigation'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { DefaultLoadingFallback } from '@/components/DefaultLoadingFallback'
import { routing } from '@/i18n/routing'

const Page: FC = () => {
  useEffect(() => {
    const lng = navigator.languages.find((l) => routing.locales.includes(l as any))
    redirect('/' + (lng ?? routing.defaultLocale))
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
