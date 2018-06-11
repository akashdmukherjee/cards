/* eslint-disable no-shadow */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import PublicProfile from '../pages/public-profile';
import { requestEntityGet } from '../redux/entity/actions';
import { requestLogout } from '../redux/auth/actions';
import { requestPublicUserData } from '../redux/users/actions';
import Spinner from '../components/spinner';

class PublicProfileContainer extends React.Component {
  static propTypes = {
    requestEntityGet: PropTypes.func.isRequired,
    requestPublicUserData: PropTypes.func.isRequired,
    isEntityLoading: PropTypes.bool,
    entity: PropTypes.object,
    requestLogout: PropTypes.func.isRequired,
    isLogging: PropTypes.bool,
    isLoading: PropTypes.bool,
    user: PropTypes.object,
    userPublicProfile: PropTypes.object,
    match: PropTypes.object.isRequired,
  }
  static defaultProps = {
    isEntityLoading: false,
    isLogging: false,
    isLoading: false,
    entity: {},
    user: {},
    userPublicProfile: {},
  }
  componentDidMount() {
    this.props.requestEntityGet();
    const { userId } = this.props.match.params;
    if (userId) {
      this.props.requestPublicUserData(userId);
    }
  }
  render() {
    const {
      isEntityLoading,
      entity,
      requestLogout,
      isLogging,
      isLoading,
      user,
      match,
      userPublicProfile,
    } = this.props;
    if (isLoading || isLogging) return <Spinner />;
    return (
      <PublicProfile
        entity={entity}
        requestLogout={requestLogout}
        isLogging={isLogging}
        user={match.params.userId ? userPublicProfile : user}
        isEntityLoading={isEntityLoading}
      />
    );
  }
}

const mapStateToProps = state => ({
  entity: state.entityReducer.data,
  isEntityLoading: state.entityReducer.isLoading,
  isLogging: state.loginReducer.isLogging,
  user: state.loginReducer.data,
  userPublicProfile: state.userPublicProfileReducer.data,
  isLoading: state.userPublicProfileReducer.isLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  requestEntityGet,
  requestLogout,
  requestPublicUserData,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(PublicProfileContainer),
);
