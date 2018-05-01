/* eslint-disable no-shadow */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import AdminWebsiteStyling from '../pages/admin-website-styling';
import AdminCardStyling from '../pages/admin-card-styling';
import AdminPostPageStyling from '../pages/admin-post-page-styling';
import {
  requestEntityEditWebsite,
  requestEntityEditCard,
  requestEntityGet,
} from '../redux/entity/actions';

class AdminConfigContainer extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    entity: PropTypes.object,
    requestEntityEditWebsite: PropTypes.func.isRequired,
    requestEntityEditCard: PropTypes.func.isRequired,
    requestEntityGet: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  }
  static defaultProps = {
    isLoading: false,
    entity: {},
  }
  componentDidMount() {
    this.props.requestEntityGet();
  }
  render() {
    const {
      isLoading,
      entity,
      requestEntityEditWebsite,
      requestEntityEditCard,
      match,
    } = this.props;
    if (isLoading) return null;
    const props = {
      entity,
      requestEntityEditWebsite,
      requestEntityEditCard,
      isLoading,
    };
    if (match.params.section === 'website-styling') {
      return <AdminWebsiteStyling requestEntityEditWebsite={requestEntityEditWebsite} {...props} />;
    }
    if (match.params.section === 'card-styling') {
      return <AdminCardStyling requestEntityEditCard={requestEntityEditCard} {...props} />;
    }
    if (match.params.section === 'post-page-styling') {
      return <AdminPostPageStyling {...props} />;
    }
    return <Redirect to="/configuration" />;
  }
}

const mapStateToProps = state => ({
  isLoading: state.entityReducer.isLoading,
  entity: state.entityReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  requestEntityEditWebsite,
  requestEntityEditCard,
  requestEntityGet,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminConfigContainer));
