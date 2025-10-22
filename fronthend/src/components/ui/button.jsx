import React from 'react';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300',
    ghost: 'bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-gray-300',
  };
  const cls = [base, variants[variant] || variants.primary, className].join(' ');
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
