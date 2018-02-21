/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  requestLogin,
  requestLoginGoogle,
  requestLoginFacebook,
} from '../../ui/redux/auth/actions';
import SignIn from '../pages/signin';
import Spinner from '../components/spinner';

const LoginContainer = ({
  isLogging,
  user,
  requestLogin,
  requestLoginGoogle,
  requestLoginFacebook,
}) => {
  if (isLogging) return <Spinner />;
  if (user && user._id) return <Redirect to="/" />;
  return (
    <SignIn
      handleLogin={requestLogin}
      requestLoginGoogle={requestLoginGoogle}
      requestLoginFacebook={requestLoginFacebook}
    />
  );
};

LoginContainer.propTypes = {
  isLogging: PropTypes.bool,
  user: PropTypes.object,
  requestLogin: PropTypes.func.isRequired,
  requestLoginFacebook: PropTypes.func.isRequired,
  requestLoginGoogle: PropTypes.func.isRequired,
};

LoginContainer.defaultProps = {
  isLogging: false,
  user: {},
};

const mapStateToProps = state => ({
  isLogging: state.loginReducer.isLogging,
  user: state.loginReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  requestLogin,
  requestLoginGoogle,
  requestLoginFacebook,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
