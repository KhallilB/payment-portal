import type { Config } from 'tailwindcss'

const config: Config = {
  content: {
    files: [
      './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
      './src/styles/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
  },
  theme: {},
  plugins: [],
}
export default config
