/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AdminCMS from '../pages/admin-cms';
import AdminConfiguration from './admin-config-container';
import Spinner from '../components/spinner';

const AdminContainer = ({
  isLogging,
  user,
  match,
}) => {
  if (isLogging) return <Spinner />;
  if (!user._id) return <Redirect to="/" />;
  return (
    <Switch>
      <Redirect from={match.url} exact to={`${match.url}/cms`} />
      <Route path={`${match.url}/cms`} exact component={AdminCMS} />
      <Route path={`${match.url}/configuration`} exact component={AdminConfiguration} />
    </Switch>
  );
};

AdminContainer.propTypes = {
  isLogging: PropTypes.bool,
  user: PropTypes.object,
  match: PropTypes.object,
};

AdminContainer.defaultProps = {
  isLogging: false,
  user: {},
  match: {},
};

const mapStateToProps = state => ({
  isLogging: state.loginReducer.isLogging,
  user: state.loginReducer.data,
});

export default connect(mapStateToProps)(withRouter(AdminContainer));
