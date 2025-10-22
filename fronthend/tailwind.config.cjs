/** @type {import('tailwindcss').Config} */
const path = require('path');
module.exports = {
  // Scan these files for class names (resolved to absolute paths)
  content: [
    path.resolve(__dirname, 'index.html'),
    path.resolve(__dirname, 'public', '**', '*.html'),
    path.resolve(__dirname, 'src', '**', '*.{js,jsx,ts,tsx,css}'),
  ],
  // Force include specific classes while diagnosing config loading
  safelist: [
    'text-green-500',
    'text-red-500',
    'text-center',
    'text-blue-500',
    'text-blue-600',
    // include all text utilities for development debugging
    { pattern: /text-.*/ },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
