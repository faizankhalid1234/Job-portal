/** @type {import('tailwindcss').Config} */
export default {
  // Scan these files for class names
  content: [
    './index.html',
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,css}',
  ],
  // Force include specific classes while diagnosing config loading
  safelist: [
    'text-green-500',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
