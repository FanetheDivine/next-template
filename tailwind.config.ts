import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx,vue}'],
  theme: {},
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
export default config
