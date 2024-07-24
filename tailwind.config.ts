import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,mdx}',
  ],
  theme: {},
  plugins: [],
  corePlugins: {
    preflight: false
  }
};
export default config;
