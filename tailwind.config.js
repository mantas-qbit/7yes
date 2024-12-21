/** @type {import('tailwindcss').Config} */
export default {
  content: [
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
          'primary': '#448c74',
          'light-gray': '#666666'
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

