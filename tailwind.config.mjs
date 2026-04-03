import headlessui from '@headlessui/tailwindcss';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  plugins: [
    headlessui,
  ],
  theme: {
    extend: {},
  },
};

export default config;
