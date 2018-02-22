/* eslint-disable no-shadow */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminCMSAdd from '../pages/admin-cms-add';
import { requestCMSAdd } from '../redux/cms/actions';

const AdminCMSAddContainer = ({ requestCMSAdd }) => (
  <AdminCMSAdd requestCMSAdd={requestCMSAdd} />
);

AdminCMSAddContainer.propTypes = {
  requestCMSAdd: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  requestCMSAdd,
}, dispatch);

export default connect(null, mapDispatchToProps)(AdminCMSAddContainer);
