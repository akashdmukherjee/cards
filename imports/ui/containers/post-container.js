/* eslint-disable no-shadow */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostView from '../pages/post-view';
import Spinner from '../components/spinner';
import { requestCMSGet } from '../redux/cms/actions';

class PostContainer extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    post: PropTypes.object,
    match: PropTypes.object,
    requestCMSGet: PropTypes.func.isRequired,
  }
  static defaultProps = {
    isLoading: false,
    post: {},
    match: {},
  }
  componentDidMount() {
    this.props.requestCMSGet(this.props.match.params.slug);
  }
  render() {
    const { isLoading, post } = this.props;
    if (isLoading) return <Spinner />;
    return (
      <PostView post={post} />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.cmsReducer.isLoading,
  post: state.cmsReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  requestCMSGet,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostContainer));
