import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const CommonPage = ({ page }) => (
  <Fragment>
    <Helmet>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
    </Helmet>
    <span dangerouslySetInnerHTML={{ __html: page.header }} />
    <span dangerouslySetInnerHTML={{ __html: page.contents }} />
    <span dangerouslySetInnerHTML={{ __html: page.footer }} />
  </Fragment>
);

CommonPage.propTypes = {
  page: PropTypes.object.isRequired,
};

export default CommonPage;
