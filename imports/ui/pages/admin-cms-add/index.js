import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Alert from 'react-s-alert';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input, { TextArea } from 'antd/lib/input';
import Button from 'antd/lib/button';

const FormItem = Form.Item;

const AdminCMSAdd = ({
  form: { getFieldDecorator, validateFields },
  requestCMSAdd,
  isLoading,
  history,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        requestCMSAdd(values, (error) => {
          if (error) {
            Alert.error(error.message);
          } else { history.push('/admin/cms'); }
        });
      }
    });
  };
  return (
    <Card title="CMS Add New Item">
      <Form onSubmit={handleSubmit} className="admin-layout-form">
        <div className="admin-layout-form-title">
          Item contents
        </div>
        <FormItem>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input the title!' }],
          })(<Input prefix={<Icon type="appstore-o" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Title" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Please input short description!' }],
          })(<TextArea autosize={{ minRows: 6, maxRows: 10 }} placeholder="Description" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('header', {})(<TextArea autosize={{ minRows: 6, maxRows: 10 }} placeholder="Header" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('contents', {
            rules: [{ required: true, message: 'Please input page contents!' }],
          })(<TextArea autosize={{ minRows: 6, maxRows: 10 }} placeholder="Contents" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('footer', {})(<TextArea autosize={{ minRows: 6, maxRows: 10 }} placeholder="Footer" />)}
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

AdminCMSAdd.propTypes = {
  form: PropTypes.object.isRequired,
  requestCMSAdd: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  history: PropTypes.object.isRequired,
};

AdminCMSAdd.defaultProps = {
  isLoading: false,
};

export default Form.create()(withRouter(AdminCMSAdd));
