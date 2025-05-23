import React from 'react';

/**
 * Card is a basic container with padding, rounded corners, and shadow.
 */
export const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * CardContent is a utility wrapper for consistent padding inside the Card.
 * Optional, but useful for semantic structure.
 */
export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};
