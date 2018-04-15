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
  }
  static defaultProps = {
    isLoading: false,
    isLoadingTags: false,
    isEntityLoading: false,
    cmsList: [],
    tagsList: [],
    entity: {},
  }
  componentDidMount() {
    this.props.requestEntityGet();
    this.props.requestCMSListGet((error) => {
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
    } = this.props;
    if (isLoading || isLoadingTags || isEntityLoading) return <Spinner />;
    return (
      <Home
        cmsList={cmsList}
        tagsList={tagsList}
        entity={entity}
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
});

const mapDispatchToProps = dispatch => bindActionCreators({
  requestCMSListGet,
  requestTagsGet,
  requestEntityGet,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
