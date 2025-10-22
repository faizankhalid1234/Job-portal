/** @type {import('tailwindcss').Config} */
export default {
  // Scan these files for class names
  content: [
    './index.html',
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,css}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors for both old and new schemes
        'old-text': '#000000', // black
        'new-text': '#519e08', // green
        'old-bg': '#f3f4f6',   // gray-100
        'new-bg': '#f3f4f6',   // same background
      },
    },
  },
};
