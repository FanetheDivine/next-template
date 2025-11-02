'use client'

import Error from 'next/error'
import { FC } from 'react'

const RootNotFound: FC = () => {
  return (
    <html lang='en'>
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  )
}

export default RootNotFound
