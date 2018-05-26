import React from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';

const AddPostButton = ({ onClick }) => (
  <Button
    className="add-post-button"
    type="primary"
    shape="circle"
    icon="file-add"
    size="large"
    onClick={onClick}
  />
);

AddPostButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddPostButton;
