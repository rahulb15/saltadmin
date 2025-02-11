// src/components/Alert/Alert.jsx
import React from 'react';

const alertVariants = {
  default: 'bg-gray-100 border-gray-200 text-gray-800',
  primary: 'bg-blue-100 border-blue-200 text-blue-800',
  success: 'bg-green-100 border-green-200 text-green-800',
  warning: 'bg-yellow-100 border-yellow-200 text-yellow-800',
  destructive: 'bg-red-100 border-red-200 text-red-800',
};

const Alert = ({ 
  children, 
  variant = 'default', 
  className = '',
  onClose,
  ...props 
}) => {
  return (
    <div
      role="alert"
      className={`
        flex items-center justify-between
        px-4 py-3 rounded-lg border
        ${alertVariants[variant] || alertVariants.default}
        ${className}
      `}
      {...props}
    >
      <div className="flex items-center">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-gray-500 hover:text-gray-700"
          aria-label="Close alert"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;