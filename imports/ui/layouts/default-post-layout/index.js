import React from 'react';
import { element, oneOfType, arrayOf, object } from 'prop-types';

const DefaultPostLayout = ({ children }) => (
  <div className="default-post-layout container">
    {children}
  </div>
);

DefaultPostLayout.propTypes = {
  children: oneOfType([arrayOf(element), object]).isRequired,
};

export default DefaultPostLayout;
