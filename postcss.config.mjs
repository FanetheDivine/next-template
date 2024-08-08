/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    'postcss-increase-specificity': {
      repeat: 1,
    }
  },
};

export default config;