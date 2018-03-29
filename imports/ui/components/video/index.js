import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import Input from 'antd/lib/input';

const Video = ({
  getVideoUrl,
  videoUrl,
  readOnly,
  noMargin,
}) => (
  <div>
    {!readOnly ? <Input
      type="text"
      placeholder="Video URL"
      onChange={e => getVideoUrl(e.currentTarget.value)}
      value={videoUrl}
    /> : null}
    <div className={`video-player-wrapper ${readOnly ? 'read-only' : ''} ${noMargin ? 'no-margin' : ''}`}>
      <ReactPlayer
        className="video-player"
        width="100%"
        height="100%"
        url={videoUrl}
      />
    </div>
  </div>
);

Video.propTypes = {
  videoUrl: PropTypes.string,
  getVideoUrl: PropTypes.func,
  readOnly: PropTypes.bool,
  noMargin: PropTypes.bool,
};

Video.defaultProps = {
  videoUrl: '',
  getVideoUrl: () => {},
  readOnly: false,
  noMargin: false,
};

export default Video;
