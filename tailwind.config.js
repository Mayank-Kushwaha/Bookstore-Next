const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bggray': '#EDF4F4',
        'textgray': '#333333',
        'primary': '#F9FFFF'
      },
     fontFamily: {
      sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
      MyFont: ['var(--font-quicksand)', ...defaultTheme.fontFamily.sans],
      main: ['var(--font-fraunces)', ...defaultTheme.fontFamily.sans]
     }
    }
  },
  plugins: [],
}
