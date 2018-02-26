/* eslint-disable no-shadow */
import React from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminCMSAddEdit from '../pages/admin-cms-add-edit';
import { requestCMSAdd, requestCMSGet, requestCMSEdit } from '../redux/cms/actions';
import Spinner from '../components/spinner';

class AdminCMSAddEditContainer extends React.Component {
  static propTypes = {
    requestCMSAdd: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    page: PropTypes.object,
    isLoading: PropTypes.bool,
    requestCMSGet: PropTypes.func.isRequired,
  }
  static defaultProps = {
    page: {},
    isLoading: false,
  }
  componentDidMount() {
    if (this.isCmsEdit()) this.props.requestCMSGet(this.props.match.params.slug);
  }
  isCmsEdit = () => this.props.match.path.includes('/admin/cms/edit/')
  render() {
    const {
      requestCMSAdd,
      page,
      isLoading,
    } = this.props;
    if (this.isCmsEdit() && isLoading) return <Spinner />;
    return (
      <AdminCMSAddEdit
        requestCMSAdd={requestCMSAdd}
        requestCMSEdit={requestCMSEdit}
        page={page}
        slug={this.isCmsEdit() ? this.props.match.params.slug : ''}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.cmsReducer.isLoading,
  page: state.cmsReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  requestCMSAdd,
  requestCMSGet,
  requestCMSEdit,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminCMSAddEditContainer));
