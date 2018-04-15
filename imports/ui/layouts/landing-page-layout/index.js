/* eslint-disable no-shadow */
import React from 'react';
import { element, oneOfType, arrayOf, object, func, bool } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestLogout } from '../../../ui/redux/auth/actions';
import LandingPageHeader from '../../components/landing-page-header';
import { requestEntityGet } from '../../../ui/redux/entity/actions';

class LandingPageLayout extends React.Component {
  static propTypes = {
    children: oneOfType([arrayOf(element), object]).isRequired,
    user: object,
    requestLogout: func.isRequired,
    isLogging: bool,
    isEntityLoading: bool,
    entity: object,
    requestEntityGet: func.isRequired,
  };
  static defaultProps = {
    isLogging: false,
    isEntityLoading: false,
    user: {},
    entity: {},
  };
  componentDidMount() {
    this.props.requestEntityGet();
  }
  render() {
    const {
      children,
      isLogging,
      user,
      requestLogout,
      entity,
      isEntityLoading,
    } = this.props;
    return (
      <div
        className="landing-page-layout"
        style={{ backgroundColor: entity.websiteColor || '#f5f5f5' }}
      >
        <LandingPageHeader
          isLogging={isLogging}
          user={user}
          requestLogout={requestLogout}
          isEntityLoading={isEntityLoading}
          entity={entity}
        />
        {children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogging: state.loginReducer.isLogging,
  user: state.loginReducer.data,
  isEntityLoading: state.entityReducer.isLogging,
  entity: state.entityReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  requestLogout,
  requestEntityGet,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageLayout);
