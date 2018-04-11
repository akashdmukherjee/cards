import React from 'react';
import { string, object, array } from 'prop-types';
import { Link } from 'react-router-dom';
import imageUrlHelper from '../../utils/image-url-helper';
import Video from '../../components/video';

const DefaultPostLayout = ({
  contents,
  description,
  title,
  type,
  image,
  video,
  tags,
}) => (
  <div className="default-post-layout">
    <div className="default-post-layout-header">
      <div className="default-post-header-nav">
        <div className="container">
          <Link to="/">Home</Link>
        </div>
      </div>
      <div className="container default-post-header-container">
        <h1 className="default-post-primary-header">{title}</h1>
        <h2 className="default-post-description">{description}</h2>
        {tags.length ? (
          <div className="default-post-tags">
            {tags.map(tag => (
              <span className="default-post-tag" key={tag}>{tag}</span>
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

DefaultPostLayout.propTypes = {
  contents: string.isRequired,
  title: string.isRequired,
  description: string.isRequired,
  type: string.isRequired,
  image: object,
  video: string,
  tags: array,
};

DefaultPostLayout.defaultProps = {
  image: {},
  video: '',
  tags: [],
};

export default DefaultPostLayout;
