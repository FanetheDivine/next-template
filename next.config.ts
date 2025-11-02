import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import nextAnalyzer from '@next/bundle-analyzer'

const nextConfig: NextConfig = {}

const withNextIntl = createNextIntlPlugin()
const withAnalyzer = nextAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withAnalyzer(withNextIntl(nextConfig))
