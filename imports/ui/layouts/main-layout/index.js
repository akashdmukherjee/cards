import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { element, oneOfType, arrayOf, object } from 'prop-types';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import AddPostButton from '../../components/add-post-button';

const MainLayout = ({ children, user, history }) => (
  <Fragment>
    {children}
    <Alert position="top-right" stack effect="slide" />
    {user && Object.keys(user).length
      ? <AddPostButton onClick={() => history.push('/admin/cms/add')} />
      : null}
  </Fragment>
);

MainLayout.propTypes = {
  children: oneOfType([arrayOf(element), object]).isRequired,
  user: object,
  history: object.isRequired,
};

MainLayout.defaultProps = {
  user: {},
};

const mapStateToProps = state => ({
  user: state.loginReducer.data,
});

export default connect(mapStateToProps)(withRouter(MainLayout));
