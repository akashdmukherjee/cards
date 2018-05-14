/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AdminCMSList from './admin-cms-list-container';
import AdminConfiguration from './admin-config-container';
import AdminCMSAddEdit from './admin-cms-add-edit-container';
import AdminProfileSettings from './admin-profile-settings-container';
import Spinner from '../components/spinner';
import NotFound from '../pages/not-found';

const AdminContainer = ({
  isLogging,
  user,
  match,
}) => {
  if (isLogging) return <Spinner />;
  if (!user._id) return <Redirect to="/" />;
  return (
    <Switch>
      <Redirect from={match.url} exact to={`${match.url}/profile/settings`} />
      <Redirect from={`${match.url}/configuration`} exact to={`${match.url}/configuration/website-styling`} />
      <Redirect from={`${match.url}/profile`} exact to={`${match.url}/profile/settings`} />
      <Route path={`${match.url}/profile/settings`} exact component={AdminProfileSettings} />
      <Route path={`${match.url}/cms`} exact component={AdminCMSList} />
      <Route path={`${match.url}/cms/add`} exact component={AdminCMSAddEdit} />
      <Route path={`${match.url}/cms/edit/:slug`} exact component={AdminCMSAddEdit} />
      {user.adminUser && <Route path={`${match.url}/configuration/:section`} exact component={AdminConfiguration} />}
      <Route component={NotFound} />
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
