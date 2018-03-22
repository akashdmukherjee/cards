import React from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import Card from 'antd/lib/card';
import List from 'antd/lib/list';
import Tag, { CheckableTag } from 'antd/lib/tag';
import Icon from 'antd/lib/icon';
import MetaTags from '../../components/meta-tags';
import imageUrlHelper from '../../utils/image-url-helper';
import isCommonArrElem from '../../utils/is-common-arr-elem';
import metaData from './meta.json';

class Home extends React.Component {
  static propTypes = {
    cmsList: PropTypes.array.isRequired,
    tagsList: PropTypes.array.isRequired,
  };
  state = {
    checkedTags: [],
    homeItemsList: this.props.cmsList || [],
  }
  initialState = this.props.cmsList
  handleSort = () => {
    this.setState(prevState => ({
      homeItemsList: prevState.homeItemsList.reverse(),
    }));
  }
  handleCardClick = (slug) => {
    if (window) {
      window.location = `/page/${slug}`;
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
        homeItemsList: newCheckedTags.length ? currentState
          .filter(item => isCommonArrElem(item.tags, newCheckedTags)) : currentState,
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
  render() {
    return (
      <div className="home-page">
        <MetaTags meta={metaData} />
        <div className="container">
          <button onClick={this.handleSort}>Sort</button>
          {this.props.tagsList && this.props.tagsList.map(tag => (
            <CheckableTag
              key={tag._id}
              onChange={() => this.handleTagSearch(tag.name)}
              checked={this.state.checkedTags.slice().includes(tag.name)}
            >
              {tag.name}
            </CheckableTag>
          ))}
          <input ref={(input) => { this.searchInput = input; }} type="text" placeholder="Search..." onChange={this.handleSearch} />
          <FlipMove maintainContainerHeight easing="ease-out">
            {this.state.homeItemsList.map(item => (
              <List.Item key={item.slug} className="home-page-item">
                <Card
                  hoverable
                  onClick={() => this.handleCardClick(item.slug)}
                  bodyStyle={{ padding: 0, position: 'relative' }}
                >
                  <div className={`home-item-name-icon ${item.image ? 'absolute' : ''}`}>
                    <div className="home-page-item-name">Name</div>
                    <div className="home-page-item-icon"><Icon type="picture" /></div>
                  </div>
                  {item.image && (
                    <div className="home-page-item-image-container">
                      <img
                        src={imageUrlHelper(
                          item.image.version,
                          item.image.publicId,
                          item.image.format,
                          'w_400,c_limit',
                        )}
                        alt={item.title}
                      />
                    </div>
                  )}
                  <div className="home-page-item-content">
                    <div className="home-page-item-title">{item.title}</div>
                    <div className="home-page-item-description">{item.description}</div>
                    <div>{item.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</div>
                  </div>
                </Card>
              </List.Item>
            ))}
          </FlipMove>
        </div>
      </div>
    );
  }
}

export default Home;
