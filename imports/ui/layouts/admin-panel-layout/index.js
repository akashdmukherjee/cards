import React from 'react';
import { element, oneOfType, arrayOf, object } from 'prop-types';

const AdminPanelLayout = ({ children }) => (
  <div>
    {children}
  </div>
);

AdminPanelLayout.propTypes = {
  children: oneOfType([arrayOf(element), object]).isRequired,
};

export default AdminPanelLayout;
