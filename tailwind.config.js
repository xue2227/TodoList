/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        'xxs': '.5rem',
      },
    },
  },
  options: {
      safelist: [
        'text-gray-500',
        'bg-gray-500',
        'text-yellow-500',
        'bg-yellow-500',
        'text-green-500',
        'bg-green-500',
      ],
    },
  plugins: [],
};