import React from 'react';

/**
 * Simple spinner using Runway design tokens.
 * Uses amber signal color for the animated ring.
 */
const LoadingSpinner = ({ size = 20 }) => (
  <div
    style={{
      width: size,
      height: size,
      border: '2.5px solid #e3dfd5',
      borderTopColor: '#f9a600',
      borderRadius: '50%',
      animation: 'spin 0.7s linear infinite',
      display: 'inline-block',
    }}
  />
);

export default LoadingSpinner;
