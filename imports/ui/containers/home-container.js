/* eslint-disable no-shadow */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import Home from '../pages/home';
import Spinner from '../components/spinner';
import { requestCMSListGet } from '../redux/cms/actions';

class HomeContainer extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    cmsList: PropTypes.array,
    requestCMSListGet: PropTypes.func.isRequired,
  }
  static defaultProps = {
    isLoading: false,
    cmsList: [],
  }
  componentDidMount() {
    this.props.requestCMSListGet((error) => {
      if (error) {
        Alert.error(error.message);
      }
    });
  }
  render() {
    const {
      isLoading,
      cmsList,
    } = this.props;
    if (isLoading) return <Spinner />;
    return (
      <Home cmsList={cmsList} loading={isLoading} />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.cmsListReducer.isLoading,
  cmsList: state.cmsListReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  requestCMSListGet,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
