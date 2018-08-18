import React from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';

const AddPostButton = ({ onClick, shape }) => (
  <Button
    className="add-post-button"
    type="primary"
    shape={shape}
    icon="plus"
    size="large"
    onClick={onClick}
  />
);

AddPostButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  shape: PropTypes.string,
};

AddPostButton.defaultProps = {
  shape: 'circle',
};

export default AddPostButton;
