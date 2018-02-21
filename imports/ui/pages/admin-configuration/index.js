import React from 'react';
import PropTypes from 'prop-types';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

const FormItem = Form.Item;

const AdminConfiguration = ({
  form: { getFieldDecorator, validateFields },
  entity,
  requestEntityEdit,
  isLoading,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        requestEntityEdit(values);
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
            initialValue: entity.name,
          })(<Input prefix={<Icon type="appstore-o" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Name" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('actionName', {
            rules: [{ required: true, message: 'Please input the name for action!' }],
            initialValue: entity.actionName,
          })(<Input prefix={<Icon type="like-o" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Action" />)}
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

AdminConfiguration.propTypes = {
  form: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
  requestEntityEdit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

AdminConfiguration.defaultProps = {
  isLoading: false,
};

export default Form.create()(AdminConfiguration);
