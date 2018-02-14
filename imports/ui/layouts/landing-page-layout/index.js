import React from 'react';
import { element, oneOfType, arrayOf, object } from 'prop-types';

const LandingPageLayout = ({ children }) => (
  <div>
    {children}
  </div>
);

LandingPageLayout.propTypes = {
  children: oneOfType([arrayOf(element), object]).isRequired,
};

export default LandingPageLayout;
