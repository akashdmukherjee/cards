import React, { Fragment } from 'react';
import { element, oneOfType, arrayOf, object } from 'prop-types';
import Alert from 'react-s-alert';

const MainLayout = ({ children }) => (
  <Fragment>
    {children}
    <Alert position="top-right" stack effect="slide" />
  </Fragment>
);

MainLayout.propTypes = {
  children: oneOfType([arrayOf(element), object]).isRequired,
};

export default MainLayout;
