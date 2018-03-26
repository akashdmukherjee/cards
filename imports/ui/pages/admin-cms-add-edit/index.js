import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Alert from 'react-s-alert';
import CodeMirror from 'react-codemirror';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input, { TextArea } from 'antd/lib/input';
import Select, { Option } from 'antd/lib/select';
import { Button as RadioButton, Group as RadioGroup } from 'antd/lib/radio';
import Button from 'antd/lib/button';
import UploadImage from '../../components/upload-image';
import Video from '../../components/video';

if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  import('codemirror/mode/htmlmixed/htmlmixed');
  import('codemirror/addon/display/placeholder');
}

const FormItem = Form.Item;

const codeMirrorOptions = {
  lineNumbers: true,
  styleActiveLine: true,
  matchBrackets: true,
  indentUnit: 2,
  tabMode: 'spaces',
  mode: 'htmlmixed',
};

class AdminCMSAddEdit extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    requestCMSAdd: PropTypes.func.isRequired,
    requestCMSEdit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    history: PropTypes.object.isRequired,
    page: PropTypes.object,
    slug: PropTypes.string,
    requestTagsAdd: PropTypes.func.isRequired,
    tags: PropTypes.array,
  }
  static defaultProps = {
    isLoading: false,
    page: {},
    tags: [],
    slug: '',
  }
  state = {
    imageFileData: this.props.page.image || null,
    videoUrl: this.props.page.video || null,
    postType: this.props.page.type || 'text',
  }
  getFileData = (fileData) => {
    this.setState({ imageFileData: fileData });
  }
  getVideoUrl = (videoUrl) => {
    this.setState({ videoUrl });
  }
  errorCallback = (error) => {
    if (error) {
      Alert.error(error.message);
    } else { this.props.history.push('/admin/cms'); }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const onlyUniq = (value, index, self) => self.indexOf(value) === index;
      const dbTagsNames = this.props.tags.map(tag => tag.name);
      const allTags = dbTagsNames.concat(values.tags);
      const allUniqTags = allTags.filter(onlyUniq);
      const alllNewTags = allUniqTags.filter(tag => dbTagsNames.indexOf(tag) === -1);
      if (!err) {
        this.props.requestTagsAdd(alllNewTags);
        if (this.props.slug) {
          const { slug } = this.props;
          const extendedValues = { slug, ...values };
          this.props.requestCMSEdit(
            { image: this.state.imageFileData, video: this.state.videoUrl, ...extendedValues },
            this.errorCallback,
          );
        } else {
          this.props.requestCMSAdd(
            { image: this.state.imageFileData, video: this.state.videoUrl, ...values },
            this.errorCallback,
          );
        }
      }
      return null;
    });
  }
  tagsOptions = () => this.props.tags.map(tag => (
    <Option key={tag.name}>{tag.name}</Option>
  ))
  handlePostTypeChange = (e) => {
    this.setState({
      postType: e.target.value,
    });
  }
  render() {
    const {
      form: { getFieldDecorator },
      isLoading,
      page,
      slug,
    } = this.props;
    return (
      <Card title="CMS Add New Item">
        <Form onSubmit={this.handleSubmit} className="admin-layout-form">
          <div className="admin-layout-form-title">
            Item contents
          </div>
          <FormItem label="Post type">
            {getFieldDecorator('type', {
              ...(slug ? { initialValue: page.type } : { initialValue: 'text' }),
            })(
              <RadioGroup onChange={this.handlePostTypeChange}>
                <RadioButton value="text">Text</RadioButton>
                <RadioButton value="image">Image</RadioButton>
                <RadioButton value="video">Video</RadioButton>
              </RadioGroup>,
            )}
          </FormItem>
          {this.state.postType === 'image' ? (
            <FormItem label="Image (click and choose or drop an image)">
              <UploadImage
                initialImageData={slug ? page.image : null}
                getFileData={this.getFileData}
                imageTransform="w_700,c_limit"
              />
            </FormItem>
          ) : null}
          {this.state.postType === 'video' ? (
            <FormItem label="Video">
              <Video videoUrl={this.state.videoUrl} getVideoUrl={this.getVideoUrl} />
            </FormItem>
          ) : null}
          <FormItem label="Title">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input the title!' }],
              ...(slug ? { initialValue: page.title } : {}),
            })(<Input prefix={<Icon type="appstore-o" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Title" />)}
          </FormItem>
          <FormItem label="Short description">
            {getFieldDecorator('description', {
              rules: [{ required: true, message: 'Please input short description!' }],
              ...(slug ? { initialValue: page.description } : {}),
            })(<TextArea autosize={{ minRows: 6, maxRows: 10 }} placeholder="Description" />)}
          </FormItem>
          <FormItem label="Code to be placed in the <head /> tag (usually styles).">
            {getFieldDecorator('header', {
              ...(slug ? { initialValue: page.header } : {}),
            })(<CodeMirror options={{ placeholder: '<style>...</style>', ...codeMirrorOptions }} />)}
          </FormItem>
          <FormItem label="Code to be placed in the <body /> tag">
            {getFieldDecorator('contents', {
              rules: [{ required: true, message: 'Please input page contents!' }],
              ...(slug ? { initialValue: page.contents } : {}),
            })(<CodeMirror options={{ placeholder: '<div>...</div>', ...codeMirrorOptions }} />)}
          </FormItem>
          <FormItem label="Code to be placed at the end of the <body /> tag (usually scripts).">
            {getFieldDecorator('footer', {
              ...(slug ? { initialValue: page.footer } : {}),
            })(<CodeMirror options={{ placeholder: '<script>...</script>', ...codeMirrorOptions }} />)}
          </FormItem>
          <FormItem label="Tags">
            {getFieldDecorator('tags', {
              ...(slug ? { initialValue: page.tags } : {}),
            })(<Select mode="tags" placeholder="Tags">{this.tagsOptions()}</Select>)}
          </FormItem>
          <FormItem className="admin-layout-form-actions">
            <Button loading={isLoading} type="primary" htmlType="submit" className="admin-layout-form-button">
              Save
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(withRouter(AdminCMSAddEdit));
