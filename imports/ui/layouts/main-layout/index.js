import React from 'react';
import { element, oneOfType, arrayOf, object } from 'prop-types';
import Alert from 'react-s-alert';

const MainLayout = ({ children }) => (
  <div>
    {children}
    <Alert position="top-right" stack effect="slide" />
  </div>
);

MainLayout.propTypes = {
  children: oneOfType([arrayOf(element), object]).isRequired,
};

export default MainLayout;
