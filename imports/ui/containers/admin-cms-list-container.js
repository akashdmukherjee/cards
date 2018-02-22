/* eslint-disable no-shadow */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminCMSList from '../pages/admin-cms-list';
import Spinner from '../components/spinner';
import { requestCMSListGet, requestCMSDelete } from '../redux/cms/actions';

class AdminCMSListContainer extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    cmsList: PropTypes.array,
    requestCMSListGet: PropTypes.func.isRequired,
    requestCMSDelete: PropTypes.func.isRequired,
  }
  static defaultProps = {
    isLoading: false,
    cmsList: [],
  }
  componentDidMount() {
    this.props.requestCMSListGet();
  }
  render() {
    const {
      isLoading,
      cmsList,
      requestCMSDelete,
    } = this.props;
    if (isLoading) return <Spinner />;
    return (
      <AdminCMSList cmsList={cmsList} requestCMSDelete={requestCMSDelete} />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.cmsListReducer.isLoading,
  cmsList: state.cmsListReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  requestCMSListGet,
  requestCMSDelete,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdminCMSListContainer);
