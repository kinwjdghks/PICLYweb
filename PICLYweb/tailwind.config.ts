import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      color: {
        'picly_default' : '#444452',
        'picly_lighter' : '#565667',
        'picly_darker' : '#282830',
        'picly_blue' : '#8cb4f3',
      },
      backgroundColor: {
        'picly_default' : '#444452',
        'picly_lighter' : '#565667',
        'picly_darker' : '#282830',
        'picly_blue' : '#8cb4f3',

      },
      
    
    },
  },
  safelist:[
    {pattern: /(bg|from|via|to|text|border)-picly_(default|lighter|darker|blue)/},

  ],
  plugins: [require('tailwind-scrollbar-hide')],
}
export default config
