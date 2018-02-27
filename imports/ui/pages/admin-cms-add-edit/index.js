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
import Button from 'antd/lib/button';

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

const AdminCMSAddEdit = ({
  form: { getFieldDecorator, validateFields },
  requestCMSAdd,
  requestCMSEdit,
  isLoading,
  history,
  page,
  slug,
  requestTagsAdd,
  tags,
}) => {
  const errorCallback = (error) => {
    if (error) {
      Alert.error(error.message);
    } else { history.push('/admin/cms'); }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      const onlyUniq = (value, index, self) => self.indexOf(value) === index;
      const dbTagsNames = tags.map(tag => tag.name);
      const allTags = dbTagsNames.concat(values.tags);
      const allUniqTags = allTags.filter(onlyUniq);
      const alllNewTags = allUniqTags.filter(tag => dbTagsNames.indexOf(tag) === -1);
      if (!err) {
        requestTagsAdd(alllNewTags);
        if (slug) {
          const extendedValues = { slug, ...values };
          requestCMSEdit(extendedValues, errorCallback);
        } else {
          requestCMSAdd(values, errorCallback);
        }
      }
      return null;
    });
  };
  const tagsOptions = () => tags.map(tag => (
    <Option key={tag.name}>{tag.name}</Option>
  ));
  return (
    <Card title="CMS Add New Item">
      <Form onSubmit={handleSubmit} className="admin-layout-form">
        <div className="admin-layout-form-title">
          Item contents
        </div>
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
          })(<Select mode="tags" placeholder="Tags">{tagsOptions()}</Select>)}
        </FormItem>
        <FormItem className="admin-layout-form-actions">
          <Button loading={isLoading} type="primary" htmlType="submit" className="admin-layout-form-button">
            Save
          </Button>
        </FormItem>
      </Form>
    </Card>
  );
};

AdminCMSAddEdit.propTypes = {
  form: PropTypes.object.isRequired,
  requestCMSAdd: PropTypes.func.isRequired,
  requestCMSEdit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  history: PropTypes.object.isRequired,
  page: PropTypes.object,
  slug: PropTypes.string,
  requestTagsAdd: PropTypes.func.isRequired,
  tags: PropTypes.array,
};

AdminCMSAddEdit.defaultProps = {
  isLoading: false,
  page: {},
  tags: [],
  slug: '',
};

export default Form.create()(withRouter(AdminCMSAddEdit));
