import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import FlipMove from 'react-flip-move';
import Card from 'antd/lib/card';
import List from 'antd/lib/list';
import { CheckableTag } from 'antd/lib/tag';
import Icon from 'antd/lib/icon';
import Rate from 'antd/lib/rate';
import styled from 'styled-components';
import MetaTags from '../../components/meta-tags';
import Video from '../../components/video';
import LandingPageHeader from '../../components/landing-page-header';
import imageUrlHelper from '../../utils/image-url-helper';
import isCommonArrElem from '../../utils/is-common-arr-elem';
import includesWholeArray from '../../utils/includes-whole-array';
import { defaultThemeColor, defaultFontFamily } from '../../settings';
import metaData from './meta.json';

const StyledHomePageTags = styled.div`
  & .ant-tag {
    font-family: ${({ entity }) => entity.websiteFontFamily || defaultFontFamily};
  }
  & .ant-tag-checkable-checked {
    background-color: ${({ entity }) => entity.websiteThemeColor || defaultThemeColor};
  }
`;

const StyledItemDescription = styled.div`
  font-family: ${({ entity }) => entity.websiteFontFamily || defaultFontFamily};
`;

class Home extends React.Component {
  static propTypes = {
    cmsList: PropTypes.array.isRequired,
    tagsList: PropTypes.array.isRequired,
    entity: PropTypes.object.isRequired,
    isLogging: PropTypes.bool,
    user: PropTypes.object,
    requestLogout: PropTypes.func.isRequired,
    isEntityLoading: PropTypes.bool,
    history: PropTypes.object.isRequired,
    updateRatings: PropTypes.func.isRequired,
  }
  static defaultProps = {
    isEntityLoading: false,
    isLogging: false,
    user: {},
  }
  state = {
    checkedTags: [],
    homeItemsList: this.props.cmsList || [],
  }
  initialState = this.props.cmsList
  handleCardClick = (slug) => {
    if (window) {
      window.location = `/post/${slug}`;
    }
  }
  handleTagSearch = (tagName) => {
    const searchVal = this.searchInput.value;
    const currentState = searchVal
      ? this.initialState
        .filter(item => (
          (item.title.toLowerCase().includes(searchVal)
          || item.description.toLowerCase().includes(searchVal))))
      : this.initialState;
    this.setState((prevState) => {
      const newCheckedTags = prevState.checkedTags.slice();
      if (this.state.checkedTags.includes(tagName)) {
        newCheckedTags.splice(newCheckedTags.indexOf(tagName), 1);
      } else {
        newCheckedTags.push(tagName);
      }
      return {
        checkedTags: newCheckedTags,
        homeItemsList: newCheckedTags.length
          ? currentState.filter(item => includesWholeArray(item.tags, newCheckedTags))
          : currentState,
      };
    });
  }
  handleSearch = (e) => {
    const val = e.currentTarget.value;
    const checkedTagsState = this.state.checkedTags.slice();
    const currentState = checkedTagsState.length ? this.initialState
      .filter(item => isCommonArrElem(item.tags, checkedTagsState)) : this.initialState;
    this.setState(() => {
      let newState;
      if (checkedTagsState.length) {
        newState = {
          homeItemsList: val
            ? currentState
              .filter(item => (
                (item.title.toLowerCase().includes(val)
                || item.description.toLowerCase().includes(val)) &&
                isCommonArrElem(item.tags, checkedTagsState)))
            : currentState,
        };
      } else {
        newState = {
          homeItemsList: val
            ? currentState
              .filter(item => (
                (item.title.toLowerCase().includes(val)
                || item.description.toLowerCase().includes(val))))
            : currentState,
        };
      }
      return newState;
    });
  }
  goToUserProfile = (userId, e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.history.push(`/profile/${userId}`);
  }
  handleStopPropagation = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }
  renderRatingSystem = (entity, post) => {
    if (entity.cardActionType === 'likes') {
      return (
        <div className="home-page-item-like">
          <Icon type={entity.cardActionIcon} />
          <span>{entity.cardActionName}</span>
        </div>
      );
    }
    if (entity.cardActionType === 'ratings') {
      const starsCount = (post.ratings && post.ratings.count) || 0;
      const starsVotes = (post.ratings && post.ratings.votes) || 0;
      const startsValue = starsVotes !== 0 ? (starsCount / starsVotes) : starsCount;
      return (
        <div className="home-page-item-like" onClick={e => this.handleStopPropagation(e)}>
          <Rate
            value={startsValue}
            onChange={value => this.props.updateRatings('ratings', post._id, value)}
            character={<Icon type={entity.cardActionIcon} />}
          />
          <span>{entity.cardActionName}</span>
        </div>
      );
    }
    return null;
  }
  render() {
    const {
      entity,
      tagsList,
      isLogging,
      user,
      requestLogout,
      isEntityLoading,
    } = this.props;
    return (
      <Fragment>
        <LandingPageHeader
          isLogging={isLogging}
          user={user}
          requestLogout={requestLogout}
          isEntityLoading={isEntityLoading}
          entity={entity}
          searchComponent={
            <input ref={(input) => { this.searchInput = input; }} type="text" placeholder="Search..." onChange={this.handleSearch} className="home-page-search" />
          }
        />
        <div className="home-page">
          <MetaTags meta={metaData} />
          <div className="container">
            <div className="home-page-filters-wrapper">
              <StyledHomePageTags entity={entity} className="home-page-tags">
                {tagsList && tagsList.map(tag => (
                  <CheckableTag
                    key={tag._id}
                    onChange={() => this.handleTagSearch(tag.name)}
                    checked={this.state.checkedTags.slice().includes(tag.name)}
                  >
                    {tag.name}
                  </CheckableTag>
                ))}
              </StyledHomePageTags>
            </div>
            <FlipMove maintainContainerHeight easing="ease-out">
              {this.state.homeItemsList.map(item => (
                <List.Item key={item.slug} className="home-page-item" onClick={() => this.handleCardClick(item.slug)}>
                  <Card
                    hoverable
                    bodyStyle={{ padding: 0, position: 'relative' }}
                  >
                    {(item.image || item.video) && (
                      <div className="home-page-item-image-container">
                        {item.type === 'image' ? <img
                          src={imageUrlHelper(
                            item.image.version,
                            item.image.publicId,
                            item.image.format,
                            'w_400,c_limit',
                          )}
                          alt={item.title}
                        /> : null}
                        {item.type === 'video' ? <Video videoUrl={item.video} readOnly noMargin /> : null}
                      </div>
                    )}
                    <div className="home-page-item-content">
                      {entity.cardTagsEnabled && item.tags && item.tags.length && (
                        <div
                          className="home-page-item-tags"
                          style={{ color: entity.websiteThemeColor || defaultThemeColor }}
                        >
                          {item.tags.map(tag => (
                            <span className="home-page-item-tag" key={tag}>{tag}</span>
                          ))}
                        </div>
                      )}
                      {entity.cardHeaderEnabled && (
                        <div
                          onClick={() => this.handleCardClick(item.slug)}
                          className="home-page-item-title"
                        >
                          {item.title}
                        </div>
                      )}
                      {entity.cardTextEnabled && (
                        <StyledItemDescription entity={entity} className="home-page-item-description">
                          {item.description}
                        </StyledItemDescription>
                      )}
                      <div className="clearfix">
                        <div className="home-page-item-author" onClick={e => this.goToUserProfile(item.authorId, e)}>
                          {item.authorAvatar && <img
                            src={imageUrlHelper(
                              item.authorAvatar.version,
                              item.authorAvatar.publicId,
                              item.authorAvatar.format,
                              'w_35,h_35,g_face,c_thumb,r_max',
                            )}
                            alt="user avatar"
                          />}
                          <span>{item.authorFirstName} {item.authorLastName}</span>
                        </div>
                        {entity.cardActionEnabled && this.renderRatingSystem(entity, item)}
                      </div>
                    </div>
                  </Card>
                </List.Item>
              ))}
            </FlipMove>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Home);
