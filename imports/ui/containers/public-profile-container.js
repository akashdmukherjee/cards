/* eslint-disable no-shadow */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import PublicProfile from '../pages/public-profile';
import Spinner from '../components/spinner';
import { requestEntityGet } from '../redux/entity/actions';
import { requestLogout } from '../redux/auth/actions';

class PublicProfileContainer extends React.Component {
  static propTypes = {
    requestEntityGet: PropTypes.func.isRequired,
    isEntityLoading: PropTypes.bool,
    entity: PropTypes.object,
    requestLogout: PropTypes.func.isRequired,
    isLogging: PropTypes.bool,
    user: PropTypes.object,
  }
  static defaultProps = {
    isEntityLoading: false,
    isLogging: false,
    entity: {},
    user: {},
  }
  componentDidMount() {
    this.props.requestEntityGet();
  }
  render() {
    const {
      isEntityLoading,
      entity,
      requestLogout,
      isLogging,
      user,
    } = this.props;
    if (isLogging || isEntityLoading) return <Spinner />;
    if (!user._id) return <Redirect to="/" />;
    return (
      <PublicProfile
        entity={entity}
        requestLogout={requestLogout}
        isLogging={isLogging}
        user={user}
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
});

const mapDispatchToProps = dispatch => bindActionCreators({
  requestEntityGet,
  requestLogout,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PublicProfileContainer);
