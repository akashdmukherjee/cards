import React, { Fragment } from 'react';
import { element, oneOfType, arrayOf, object } from 'prop-types';
import Alert from 'react-s-alert';

const LandingPageLayout = ({ children }) => (
  <Fragment>
    {children}
    <Alert position="top-right" stack effect="slide" />
  </Fragment>
);

LandingPageLayout.propTypes = {
  children: oneOfType([arrayOf(element), object]).isRequired,
};

export default LandingPageLayout;
