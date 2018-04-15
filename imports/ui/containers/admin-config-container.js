/* eslint-disable no-shadow */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminConfiguration from '../pages/admin-configuration';
import { requestEntityEdit, requestEntityGet } from '../redux/entity/actions';

class AdminConfigContainer extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    entity: PropTypes.object,
    requestEntityEdit: PropTypes.func.isRequired,
    requestEntityGet: PropTypes.func.isRequired,
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
      requestEntityEdit,
    } = this.props;
    if (isLoading) return null;
    return (
      <AdminConfiguration
        entity={entity}
        requestEntityEdit={requestEntityEdit}
        isLoading={isLoading}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.entityReducer.isLoading,
  entity: state.entityReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  requestEntityEdit,
  requestEntityGet,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdminConfigContainer);
