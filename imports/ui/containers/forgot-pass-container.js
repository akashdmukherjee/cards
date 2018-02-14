import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { forgotPass } from '../../api/redux/actions';
import ForgotPass from '../pages/forgot-pass';
import Spinner from '../components/spinner';

const ForgotPassContainer = ({
  isLogging,
  user,
  forgotPass, // eslint-disable-line no-shadow
}) => {
  if (isLogging) return <Spinner />;
  if (user && user._id) return <Redirect to="/" />;
  return (
    <ForgotPass forgotPass={forgotPass} />
  );
};

ForgotPassContainer.propTypes = {
  isLogging: PropTypes.bool,
  user: PropTypes.object,
  forgotPass: PropTypes.func.isRequired,
};

ForgotPassContainer.defaultProps = {
  isLogging: false,
  user: {},
};

const mapStateToProps = state => ({
  isLogging: state.loginReducer.isLogging,
  user: state.loginReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  forgotPass,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassContainer);
