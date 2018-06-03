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
import Switch from 'antd/lib/switch';
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
    user: PropTypes.object,
    inModal: PropTypes.bool,
    closeModal: PropTypes.func,
  }
  static defaultProps = {
    isLoading: false,
    page: {},
    tags: [],
    slug: '',
    user: {},
    inModal: false,
    closeModal: () => {},
  }
  state = {
    imageFileData: this.props.page.image || null,
    videoUrl: this.props.page.video || null,
    postType: this.props.page.type || 'text',
    defaultPostView: this.props.page.defaultPostView || true,
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
    } else if (!this.props.inModal) {
      this.props.history.push('/admin/cms');
    } else {
      this.props.closeModal();
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const {
        user,
        tags,
        requestTagsAdd,
        requestCMSEdit,
        requestCMSAdd,
        slug,
      } = this.props;
      const onlyUniq = (value, index, self) => self.indexOf(value) === index;
      const dbTagsNames = tags.map(tag => tag.name);
      const allTags = dbTagsNames.concat(values.tags);
      const allUniqTags = allTags.filter(onlyUniq);
      const alllNewTags = allUniqTags.filter(tag => dbTagsNames.indexOf(tag) === -1);
      if (!err) {
        requestTagsAdd(alllNewTags);
        if (slug) {
          const extendedValues = { slug, ...values };
          requestCMSEdit(
            {
              ...(!user.adminUser ? { defaultPostView: true } : {}),
              image: this.state.imageFileData,
              video: this.state.videoUrl,
              ...extendedValues,
            },
            this.errorCallback,
          );
        } else {
          requestCMSAdd(
            {
              ...(!user.adminUser ? { defaultPostView: true } : {}),
              authorId: user._id,
              image: this.state.imageFileData,
              video: this.state.videoUrl,
              ...values,
            },
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
  handleSwitchDefaultView = (value) => {
    this.setState({ defaultPostView: value });
  }
  render() {
    const {
      form: { getFieldDecorator },
      isLoading,
      page,
      slug,
      user,
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
          {user.adminUser && (
            <FormItem label="Default post view?">
              {getFieldDecorator('defaultPostView', {
                ...(slug ? { initialValue: page.defaultPostView } : { initialValue: false }),
              })(
                <Switch
                  defaultChecked={slug ? page.defaultPostView : false}
                  onChange={this.handleSwitchDefaultView}
                />,
              )}
            </FormItem>
          )}
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
          {!this.state.defaultPostView ? (
            <FormItem label="Code to be placed in the <head /> tag (usually styles).">
              {getFieldDecorator('header', {
                ...(slug ? { initialValue: page.header } : {}),
              })(<CodeMirror options={{ placeholder: '<style>...</style>', ...codeMirrorOptions }} />)}
            </FormItem>) : null}
          {!this.state.defaultPostView ? (
            <FormItem label="Code to be placed in the <body /> tag">
              {getFieldDecorator('contents', {
                rules: [{ required: true, message: 'Please input page contents!' }],
                ...(slug ? { initialValue: page.contents } : {}),
              })(<CodeMirror options={{ placeholder: '<div>...</div>', ...codeMirrorOptions }} />)}
            </FormItem>) : (
            <FormItem label="Contents">
              {getFieldDecorator('contents', {
                rules: [{ required: true, message: 'Please input page contents!' }],
                ...(slug ? { initialValue: page.contents } : {}),
              })(<TextArea autosize={{ minRows: 12 }} placeholder="Contents" />)}
            </FormItem>
          )}
          {!this.state.defaultPostView ? (
            <FormItem label="Code to be placed at the end of the <body /> tag (usually scripts).">
              {getFieldDecorator('footer', {
                ...(slug ? { initialValue: page.footer } : {}),
              })(<CodeMirror options={{ placeholder: '<script>...</script>', ...codeMirrorOptions }} />)}
            </FormItem>) : null}
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
