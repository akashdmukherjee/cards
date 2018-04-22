/* eslint-disable no-shadow */
import React from 'react';
import { element, oneOfType, arrayOf, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestEntityGet } from '../../../ui/redux/entity/actions';
import { defaultBackgroundColor } from '../../settings';

class LandingPageLayout extends React.Component {
  static propTypes = {
    children: oneOfType([arrayOf(element), object]).isRequired,
    entity: object,
    requestEntityGet: func.isRequired,
  };
  static defaultProps = {
    entity: {},
  };
  componentDidMount() {
    this.props.requestEntityGet();
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entity: state.entityReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  requestEntityGet,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageLayout);
