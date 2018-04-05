import React, { Fragment } from 'react';
import { element, oneOfType, arrayOf, object } from 'prop-types';

const PostLayout = ({ children }) => (
  <Fragment>
    {children}
  </Fragment>
);

PostLayout.propTypes = {
  children: oneOfType([arrayOf(element), object]).isRequired,
};

export default PostLayout;
