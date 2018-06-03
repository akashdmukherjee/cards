/* eslint-disable no-shadow */
import React from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminCMSAddEdit from '../pages/admin-cms-add-edit';
import { requestCMSAdd, requestCMSGet, requestCMSEdit } from '../redux/cms/actions';
import { requestTagsAdd, requestTagsGet } from '../redux/tags/actions';
import Spinner from '../components/spinner';

class AdminCMSAddEditContainer extends React.Component {
  static propTypes = {
    requestCMSAdd: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    page: PropTypes.object,
    isLoading: PropTypes.bool,
    isTagsLoading: PropTypes.bool,
    requestCMSGet: PropTypes.func.isRequired,
    tags: PropTypes.array,
    user: PropTypes.object,
    requestTagsAdd: PropTypes.func.isRequired,
    requestTagsGet: PropTypes.func.isRequired,
    inModal: PropTypes.bool,
    closeModal: PropTypes.func,
  }
  static defaultProps = {
    page: {},
    tags: [],
    user: {},
    isLoading: false,
    isTagsLoading: false,
    inModal: false,
    closeModal: () => {},
  }
  componentDidMount() {
    this.props.requestTagsGet();
    if (this.isCmsEdit()) this.props.requestCMSGet(this.props.match.params.slug);
  }
  isCmsEdit = () => this.props.match.path.includes('/admin/cms/edit/')
  render() {
    const {
      requestCMSAdd,
      page,
      tags,
      requestTagsAdd,
      isLoading,
      isTagsLoading,
      user,
      inModal,
    } = this.props;
    if ((this.isCmsEdit() && isLoading) || isTagsLoading) return <Spinner />;
    return (
      <AdminCMSAddEdit
        requestCMSAdd={requestCMSAdd}
        requestCMSEdit={requestCMSEdit}
        page={page}
        slug={this.isCmsEdit() ? this.props.match.params.slug : ''}
        tags={tags}
        user={user}
        requestTagsAdd={requestTagsAdd}
        inModal={inModal}
        closeModal={this.props.closeModal}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.cmsReducer.isLoading,
  isTagsLoading: state.tagsReducer.isLoading,
  page: state.cmsReducer.data,
  tags: state.tagsReducer.data,
  user: state.loginReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  requestCMSAdd,
  requestCMSGet,
  requestCMSEdit,
  requestTagsAdd,
  requestTagsGet,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminCMSAddEditContainer));
