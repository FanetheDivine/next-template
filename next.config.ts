import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import nextAnalyzer from '@next/bundle-analyzer'

const nextConfig: NextConfig = {
  output: process.env.EXPORT === 'true' ? 'export' : undefined,
  typescript: {
    ignoreBuildErrors: process.env.DISABLE_TYPE_CHECK === 'true',
  },
}

const withNextIntl = createNextIntlPlugin()
const withAnalyzer = nextAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withAnalyzer(withNextIntl(nextConfig))
