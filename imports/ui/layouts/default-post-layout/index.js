/* eslint-disable no-shadow */
import React from 'react';
import { string, object, array, func, bool } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import imageUrlHelper from '../../utils/image-url-helper';
import Video from '../../components/video';
import { requestEntityGet } from '../../../ui/redux/entity/actions';
import { requestLogout } from '../../../ui/redux/auth/actions';
import LandingPageHeader from '../../components/landing-page-header';
import { defaultThemeColor } from '../../settings';

const StyledHeaderTitle = styled.h1`
  &::after {
    background-color: ${({ entity }) => entity.websiteThemeColor || defaultThemeColor};
  }
`;

class DefaultPostLayout extends React.Component {
  static propTypes = {
    contents: string.isRequired,
    title: string.isRequired,
    description: string.isRequired,
    type: string.isRequired,
    image: object,
    video: string,
    tags: array,
    user: object,
    requestLogout: func.isRequired,
    isLogging: bool,
    isEntityLoading: bool,
    entity: object,
    requestEntityGet: func.isRequired,
  }
  static defaultProps = {
    image: {},
    video: '',
    tags: [],
    isLogging: false,
    isEntityLoading: false,
    user: {},
    entity: {},
  }
  componentDidMount() {
    this.props.requestEntityGet();
  }
  render() {
    const {
      contents,
      description,
      title,
      type,
      image,
      video,
      tags,
      isLogging,
      user,
      isEntityLoading,
      entity,
      requestLogout,
    } = this.props;
    return (
      <div className="default-post-layout">
        <LandingPageHeader
          isLogging={isLogging}
          user={user}
          requestLogout={requestLogout}
          isEntityLoading={isEntityLoading}
          entity={entity}
          className="default-post-header-menu"
        />
        <div className="default-post-layout-header">
          <div className="container default-post-header-container">
            <StyledHeaderTitle entity={entity} className="default-post-primary-header">
              {title}
            </StyledHeaderTitle>
            <h2 className="default-post-description">{description}</h2>
            {tags.length ? (
              <div className="default-post-tags">
                {tags.map(tag => (
                  <span
                    className="default-post-tag"
                    style={{ backgroundColor: entity.websiteThemeColor || defaultThemeColor }}
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="container">
          <div className="default-post-contents">
            {type === 'image' || type === 'video' ? (
              <div className="default-post-media-container">
                {type === 'image' ? <img
                  src={imageUrlHelper(
                    image.version,
                    image.publicId,
                    image.format,
                    'c_fill',
                  )}
                  alt={title}
                /> : null}
                {type === 'video' ? <Video videoUrl={video} readOnly noMargin /> : null}
              </div>
            ) : null}
            <div>
              {contents}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogging: state.loginReducer.isLogging,
  user: state.loginReducer.data,
  isEntityLoading: state.entityReducer.isLogging,
  entity: state.entityReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  requestLogout,
  requestEntityGet,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPostLayout);
