/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
      colors: {
        'bggray': '#EDF4F4',
        'textgray': '#333333',
        'primary': '#F9FFFF'
      },
     fontFamily: {
      sans: ['var(--font-inter)'],
      MyFont: ['var(--font-quicksand)'],
      main: ['var(--font-fraunces)']
     }
  },
  plugins: [],
}
