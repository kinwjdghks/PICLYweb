import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'pico_default' : '#444452',
        'pico_darker' : '#282830',
        'pico_blue' : '#8cb4f3',

      }  
    
    },
  },
  safelist:[
    {pattern: /bg-pico_(default|darker|blue)/}
  ],
  plugins: [require('tailwind-scrollbar-hide')],
}
export default config
