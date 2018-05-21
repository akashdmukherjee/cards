/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AdminProfileSettings from '../pages/admin-profile-settings';
import { updateProfileSettings } from '../redux/auth/actions';

const AdminProfileSettingsContainer = ({ user, isLogging, updateProfileSettings }) => (
  <AdminProfileSettings
    updateProfileSettings={updateProfileSettings}
    user={user}
    isLoading={isLogging}
  />
);

AdminProfileSettingsContainer.propTypes = {
  user: PropTypes.object.isRequired,
  isLogging: PropTypes.bool.isRequired,
  updateProfileSettings: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLogging: state.loginReducer.isLogging,
  user: state.loginReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateProfileSettings,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdminProfileSettingsContainer);
