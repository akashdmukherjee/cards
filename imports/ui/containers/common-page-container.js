/* eslint-disable no-shadow */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import CommonPage from '../pages/common-page';
import Spinner from '../components/spinner';
import { requestCMSGet } from '../redux/cms/actions';

class CommonPageContainer extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    page: PropTypes.object,
    match: PropTypes.object,
    requestCMSGet: PropTypes.func.isRequired,
  }
  static defaultProps = {
    isLoading: false,
    page: {},
    match: {},
  }
  componentDidMount() {
    this.props.requestCMSGet(this.props.match.params.slug);
  }
  render() {
    const { isLoading, page } = this.props;
    if (isLoading) return <Spinner />;
    return (
      <CommonPage page={page} />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.cmsReducer.isLoading,
  page: state.cmsReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  requestCMSGet,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommonPageContainer));
