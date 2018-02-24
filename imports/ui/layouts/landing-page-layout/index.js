/* eslint-disable no-shadow */
import React from 'react';
import { element, oneOfType, arrayOf, object, func, bool } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestLogout } from '../../../ui/redux/auth/actions';
import LandingPageHeader from '../../components/landing-page-header';

const LandingPageLayout = ({
  children,
  isLogging,
  user,
  requestLogout,
}) => (
  <div>
    <LandingPageHeader isLogging={isLogging} user={user} requestLogout={requestLogout} />
    {children}
  </div>
);

LandingPageLayout.propTypes = {
  children: oneOfType([arrayOf(element), object]).isRequired,
  user: object,
  requestLogout: func.isRequired,
  isLogging: bool,
};

LandingPageLayout.defaultProps = {
  isLogging: false,
  user: {},
};

const mapStateToProps = state => ({
  isLogging: state.loginReducer.isLogging,
  user: state.loginReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  requestLogout,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageLayout);
