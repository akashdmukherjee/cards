import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import DefaultPostLayout from '../../layouts/default-post-layout';

const PostView = ({ post }) => (
  <Fragment>
    <Helmet>
      <title>{post.title}</title>
      <meta name="description" content={post.description} />
    </Helmet>
    {!post.defaultPostView ? (
      <Fragment>
        <span dangerouslySetInnerHTML={{ __html: post.header }} />
        <span dangerouslySetInnerHTML={{ __html: post.contents }} />
        <span dangerouslySetInnerHTML={{ __html: post.footer }} />
      </Fragment>
    ) : (
      <DefaultPostLayout {...post} />
    )}
  </Fragment>
);

PostView.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostView;
