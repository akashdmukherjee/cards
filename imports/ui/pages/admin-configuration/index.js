import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

const FormItem = Form.Item;

const AdminConfiguration = ({ form: { getFieldDecorator, validateFields } }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err) => { // values
      if (!err) {
        // console.log('values: ', values);
        // handleChangeConfiguration(values, (error) => {
        //   if (error) {
        //     Alert.error(error.message);
        //   } else {
        //     Alert.success('Saved!');
        //   }
        // });
      } else {
        Alert.error(err);
      }
    });
  };
  return (
    <Card title="Configuration">
      <Form onSubmit={handleSubmit} className="admin-layout-form">
        <div className="admin-layout-form-title">
          Entity Settings
        </div>
        <FormItem>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input the name for entity!' }],
          })(<Input prefix={<Icon type="appstore-o" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Name" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('action', {
            rules: [{ required: true, message: 'Please input the name for action!' }],
          })(<Input prefix={<Icon type="like-o" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Action" />)}
        </FormItem>
        <FormItem className="admin-layout-form-actions">
          <Button type="primary" htmlType="submit" className="admin-layout-form-button">
            Save
          </Button>
        </FormItem>
      </Form>
    </Card>
  );
};

AdminConfiguration.propTypes = {
  form: PropTypes.object.isRequired,
};

export default Form.create()(AdminConfiguration);
