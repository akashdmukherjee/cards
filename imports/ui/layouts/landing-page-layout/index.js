/* eslint-disable no-shadow */
import React from 'react';
import { element, oneOfType, arrayOf, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'antd/lib/modal';
import Alert from 'react-s-alert';
import { requestEntityGet } from '../../../ui/redux/entity/actions';
import { requestCMSListGet } from '../../../ui/redux/cms/actions';
import { requestTagsGet } from '../../../ui/redux/tags/actions';
import { defaultBackgroundColor } from '../../settings';
import AddPostButton from '../../components/add-post-button';
import AdminCMSAddEditContainer from '../../containers/admin-cms-add-edit-container';

class LandingPageLayout extends React.Component {
  static propTypes = {
    children: oneOfType([arrayOf(element), object]).isRequired,
    entity: object,
    requestEntityGet: func.isRequired,
    user: object,
    requestCMSListGet: func,
    requestTagsGet: func,
  }
  static defaultProps = {
    entity: {},
    user: {},
    requestCMSListGet: () => {},
    requestTagsGet: () => {},
  }
  state = {
    addPostFormVisible: false,
  }
  componentDidMount() {
    this.props.requestEntityGet();
  }
  onSubmitPost = () => {
    this.closePostForm();
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
  openPostForm = () => {
    this.setState({
      addPostFormVisible: true,
    });
  }
  closePostForm = () => {
    this.setState({
      addPostFormVisible: false,
    });
  }
  renderPostForm = () => {
    const { user } = this.props;
    if (user && Object.keys(user).length) {
      return (
        <React.Fragment>
          <AddPostButton onClick={this.openPostForm} />
          <Modal
            visible={this.state.addPostFormVisible}
            footer={null}
            closable={false}
            width="700px"
          >
            <AdminCMSAddEditContainer inModal closeModal={this.onSubmitPost} />
          </Modal>
        </React.Fragment>
      );
    }
    return null;
  }
  render() {
    const {
      children,
      entity,
    } = this.props;
    return (
      <div
        className="landing-page-layout"
        style={{ backgroundColor: entity.websiteBackgroundColor || defaultBackgroundColor }}
      >
        {children}
        {this.renderPostForm()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entity: state.entityReducer.data,
  user: state.loginReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  requestEntityGet,
  requestCMSListGet,
  requestTagsGet,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageLayout);
