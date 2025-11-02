import nextAnalyzer from '@next/bundle-analyzer'

const withAnalyzer = nextAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})
const nextConfig = withAnalyzer({})

export default nextConfig
