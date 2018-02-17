/* eslint-disable no-shadow */
import React from 'react';
import { element, oneOfType, arrayOf, object, func, bool } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';
import { requestLogout } from '../../../api/redux/actions';
import Header from '../../components/header';

const MainLayout = ({
  children,
  isLogging,
  user,
  requestLogout,
}) => (
  <div>
    <Header isLogging={isLogging} user={user} requestLogout={requestLogout} />
    {children}
    <Alert position="top-right" stack effect="slide" />
  </div>
);

MainLayout.propTypes = {
  children: oneOfType([arrayOf(element), object]).isRequired,
  user: object.isRequired,
  requestLogout: func.isRequired,
  isLogging: bool.isRequired,
};

const mapStateToProps = state => ({
  isLogging: state.loginReducer.isLogging,
  user: state.loginReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  requestLogout,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
