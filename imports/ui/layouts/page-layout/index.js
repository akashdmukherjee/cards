import React, { Fragment } from 'react';
import { element, oneOfType, arrayOf, object } from 'prop-types';

const PageLayout = ({ children }) => (
  <Fragment>
    {children}
  </Fragment>
);

PageLayout.propTypes = {
  children: oneOfType([arrayOf(element), object]).isRequired,
};

export default PageLayout;
