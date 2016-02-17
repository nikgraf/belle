import React from 'react';

/**
 * Returns a the provided component as themed component.
 *
 * Note: defaultProps could be useful for default special behavioural in
 * different ui libraries.
 */
export default (Component, theme, defaultProps) => (props) => {
  return <Component {...defaultProps} theme={theme} {...props} />;
};
