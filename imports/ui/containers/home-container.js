/* eslint-disable no-shadow */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import Home from '../pages/home';
import Spinner from '../components/spinner';
import { requestCMSListGet } from '../redux/cms/actions';
import { requestTagsGet } from '../redux/tags/actions';
import { requestEntityGet } from '../redux/entity/actions';
import { requestLogout } from '../redux/auth/actions';
import { updateRatings } from '../redux/users/actions';

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
    isLogging: PropTypes.bool,
    user: PropTypes.object,
  }
  static defaultProps = {
    isLoading: false,
    isLoadingTags: false,
    isEntityLoading: false,
    isLogging: false,
    cmsList: [],
    tagsList: [],
    entity: {},
    user: {},
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
    } = this.props;
    if (isLoading || isLoadingTags || isEntityLoading) return <Spinner />;
    return (
      <Home
        cmsList={cmsList}
        tagsList={tagsList}
        entity={entity}
        requestLogout={requestLogout}
        isLogging={isLogging}
        user={user}
        updateRatings={updateRatings}
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
});

const mapDispatchToProps = dispatch => bindActionCreators({
  requestCMSListGet,
  requestTagsGet,
  requestEntityGet,
  requestLogout,
  updateRatings,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
