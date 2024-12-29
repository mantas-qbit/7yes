/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./node_modules/preline/preline.js,",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          'primary': '#448c74', //# 448c74
          'light-gray': '#999999' // 666666
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}

