'use client'

import dynamic from 'next/dynamic'

export const DynamicApp = dynamic(() => import('antd/es/app'), { ssr: false })
