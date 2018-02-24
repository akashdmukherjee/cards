import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const CommonPage = ({ page }) => (
  <Fragment>
    {page.title}
    <span dangerouslySetInnerHTML={{ __html: page.contents }} />
    <span dangerouslySetInnerHTML={{ __html: page.footer }} />
  </Fragment>
);

CommonPage.propTypes = {
  page: PropTypes.object.isRequired,
};

export default CommonPage;
