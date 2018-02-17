/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AdminPanel from '../pages/admin-panel';
import Spinner from '../components/spinner';

const RegisterContainer = ({
  isLogging,
  user,
}) => {
  if (isLogging) return <Spinner />;
  if (!user._id) return <Redirect to="/" />;
  return (
    <AdminPanel />
  );
};

RegisterContainer.propTypes = {
  isLogging: PropTypes.bool,
  user: PropTypes.object,
};

RegisterContainer.defaultProps = {
  isLogging: false,
  user: {},
};

const mapStateToProps = state => ({
  isLogging: state.loginReducer.isLogging,
  user: state.loginReducer.data,
});

export default connect(mapStateToProps)(RegisterContainer);
