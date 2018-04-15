import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Alert from 'react-s-alert';
import Icon from 'antd/lib/icon';
import Upload from 'antd/lib/upload';
import imageUrlHelper from '../../utils/image-url-helper';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    Alert.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    Alert.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
};

class UploadImage extends React.Component {
  static propTypes = {
    getFileData: PropTypes.func.isRequired,
    initialImageData: PropTypes.object,
    imageTransform: PropTypes.string,
  }
  static defaultProps = {
    initialImageData: null,
    imageTransform: '',
  }
  state = {
    imageUrl: this.props.initialImageData ? imageUrlHelper(
      this.props.initialImageData.version,
      this.props.initialImageData.publicId,
      this.props.initialImageData.format,
      this.props.imageTransform,
    ) : '',
    loading: false,
  }
  handleCustomReq = (info) => {
    this.setState({ loading: true });
    getBase64(
      info.file,
      result => Meteor.call('cms.methods.fileUpload', {
        type: info.file.type,
        dataUrl: result,
      }, (err, res) => {
        if (!err && res) {
          this.props.getFileData({
            version: res.version,
            publicId: res.public_id,
            format: res.format,
          });
          this.setState({
            loading: false,
            imageUrl: imageUrlHelper(
              res.version,
              res.public_id,
              res.format,
              this.props.imageTransform,
            ),
          });
        } else {
          this.setState({ loading: false });
          Alert.error('Something went wrong: ', err && err.message ? err.message : '');
        }
      }),
    );
  }
  handleChange = () => {
    this.setState({ imageUrl: '' });
  }
  render() {
    const uploadButton = (
      <div className="image-upload-dropzone">
        <Icon className="image-upload-icon" type={this.state.loading ? 'loading' : 'plus'} />
        {!this.state.loading && <div className="image-upload-text">Upload</div>}
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload
        name="image"
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        customRequest={this.handleCustomReq}
        supportServerRender
        className="image-upload"
      >
        {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
      </Upload>
    );
  }
}

export default UploadImage;
