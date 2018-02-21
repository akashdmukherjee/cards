import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { resetPass } from '../../ui/redux/auth/actions';
import ResetPass from '../pages/reset-pass';
import Spinner from '../components/spinner';

const ResetPassContainer = ({
  isLogging,
  user,
  resetPass, // eslint-disable-line no-shadow
}) => {
  if (isLogging) return <Spinner />;
  if (user && user._id) return <Redirect to="/" />;
  return (
    <ResetPass resetPass={resetPass} />
  );
};

ResetPassContainer.propTypes = {
  isLogging: PropTypes.bool,
  user: PropTypes.object,
  resetPass: PropTypes.func.isRequired,
};

ResetPassContainer.defaultProps = {
  isLogging: false,
  user: {},
};

const mapStateToProps = state => ({
  isLogging: state.loginReducer.isLogging,
  user: state.loginReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  resetPass,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassContainer);
