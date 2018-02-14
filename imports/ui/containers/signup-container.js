/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import SignUp from '../pages/signup';
import {
  registerUser,
  registerUserGoogle,
  registerUserFacebook,
} from '../../api/redux/actions';
import Spinner from '../components/spinner';

const RegisterContainer = ({
  isLogging,
  user,
  registerUser,
  registerUserGoogle,
  registerUserFacebook,
}) => {
  if (isLogging) return <Spinner />;
  if (user && user._id) return <Redirect to="/" />;
  return (
    <SignUp
      registerUser={registerUser}
      registerUserGoogle={registerUserGoogle}
      registerUserFacebook={registerUserFacebook}
    />
  );
};

RegisterContainer.propTypes = {
  isLogging: PropTypes.bool,
  user: PropTypes.object,
  registerUser: PropTypes.func.isRequired,
  registerUserGoogle: PropTypes.func.isRequired,
  registerUserFacebook: PropTypes.func.isRequired,
};

RegisterContainer.defaultProps = {
  isLogging: false,
  user: {},
};

const mapStateToProps = state => ({
  isLogging: state.loginReducer.isLogging,
  user: state.loginReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  registerUser,
  registerUserGoogle,
  registerUserFacebook,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
