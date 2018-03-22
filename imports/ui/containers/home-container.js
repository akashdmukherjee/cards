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

class HomeContainer extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    isLoadingTags: PropTypes.bool,
    cmsList: PropTypes.array,
    requestCMSListGet: PropTypes.func.isRequired,
    requestTagsGet: PropTypes.func.isRequired,
    tagsList: PropTypes.array,
  }
  static defaultProps = {
    isLoading: false,
    isLoadingTags: false,
    cmsList: [],
    tagsList: [],
  }
  componentDidMount() {
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
    } = this.props;
    if (isLoading || isLoadingTags) return <Spinner />;
    return (
      <Home cmsList={cmsList} tagsList={tagsList} />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.cmsListReducer.isLoading,
  cmsList: state.cmsListReducer.data,
  isLoadingTags: state.tagsReducer.isLoading,
  tagsList: state.tagsReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  requestCMSListGet,
  requestTagsGet,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
