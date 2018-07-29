/* eslint-disable no-shadow */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import Home from '../pages/home';
import Spinner from '../components/spinner';
import { requestCMSListGet, requestRatings } from '../redux/cms/actions';
import { requestTagsGet } from '../redux/tags/actions';
import { requestEntityGet } from '../redux/entity/actions';
import { requestLogout } from '../redux/auth/actions';
import { updateRatings, updateFavourites } from '../redux/users/actions';
import { requestNotificationsGet } from '../redux/notifications/actions';

class HomeContainer extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    isLoadingTags: PropTypes.bool,
    cmsList: PropTypes.array,
    requestCMSListGet: PropTypes.func.isRequired,
    requestTagsGet: PropTypes.func.isRequired,
    tagsList: PropTypes.array,
    requestEntityGet: PropTypes.func.isRequired,
    isEntityLoading: PropTypes.bool,
    entity: PropTypes.object,
    requestLogout: PropTypes.func.isRequired,
    updateRatings: PropTypes.func.isRequired,
    requestRatings: PropTypes.func.isRequired,
    isLogging: PropTypes.bool,
    user: PropTypes.object,
    updateFavourites: PropTypes.func.isRequired,
    notifications: PropTypes.array,
    requestNotificationsGet: PropTypes.func,
    isNotificationLoading: PropTypes.bool,
  }
  static defaultProps = {
    isLoading: false,
    isLoadingTags: false,
    isEntityLoading: false,
    isNotificationLoading: false,
    isLogging: false,
    cmsList: [],
    tagsList: [],
    entity: {},
    user: {},
    notifications: [],
    requestNotificationsGet: () => {},
  }
  componentDidMount() {
    this.props.requestEntityGet();
    this.props.requestCMSListGet(true, (error) => {
      if (error) {
        Alert.error(error.message);
      }
    });
    this.props.requestTagsGet((error) => {
      if (error) {
        Alert.error(error.message);
      }
    });
    this.props.requestNotificationsGet();
  }
  render() {
    const {
      isLoading,
      cmsList,
      tagsList,
      isLoadingTags,
      isEntityLoading,
      entity,
      requestLogout,
      isLogging,
      user,
      updateRatings,
      requestRatings,
      updateFavourites,
      notifications,
      isNotificationLoading,
    } = this.props;
    if (isLoading || isLoadingTags || isEntityLoading || isNotificationLoading) return <Spinner />;
    return (
      <Home
        cmsList={cmsList}
        tagsList={tagsList}
        entity={entity}
        requestLogout={requestLogout}
        isLogging={isLogging}
        user={user}
        updateRatings={updateRatings}
        requestRatings={requestRatings}
        updateFavourites={updateFavourites}
        notifications={notifications}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.cmsListReducer.isLoading,
  cmsList: state.cmsListReducer.data,
  isLoadingTags: state.tagsReducer.isLoading,
  tagsList: state.tagsReducer.data,
  entity: state.entityReducer.data,
  isEntityLoading: state.entityReducer.isLoading,
  isLogging: state.loginReducer.isLogging,
  user: state.loginReducer.data,
  notifications: state.notificationsReducer.data,
  isNotificationsLoading: state.notificationsReducer.isLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  requestCMSListGet,
  requestTagsGet,
  requestEntityGet,
  requestLogout,
  updateRatings,
  requestRatings,
  updateFavourites,
  requestNotificationsGet,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
