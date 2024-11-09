import React from 'react';
import { FaSpinner } from 'react-icons/fa';

interface ButtonProps {
  children: React.ReactNode; // Text or other elements inside the button
  onClick?: () => void; // Click handler
  type?: 'button' | 'submit' | 'reset'; // Button type
  disabled?: boolean; // Disable state
  isLoading?: boolean; // Loading state
  className?: string; // Additional CSS classes
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  isLoading = false,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`px-4 py-2 rounded-md font-medium text-white transition duration-200 shadow-md ${
        disabled || isLoading
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
      } ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <FaSpinner className="animate-spin mr-2" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
