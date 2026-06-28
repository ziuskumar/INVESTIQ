import React from 'react';

/**
 * ThemeProvider — Simply renders children.
 * Design tokens are loaded via globals.css (token.css import).
 * Inter font is loaded via @import in globals.css.
 */
const ThemeProvider = ({ children }) => {
  return <>{children}</>;
};

export default ThemeProvider;
