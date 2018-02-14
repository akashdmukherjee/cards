/* eslint-disable max-len, no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

const FormItem = Form.Item;

const ForgotPass = ({ form, form: { getFieldDecorator, validateFields }, forgotPass }) => {
  const handleForgotPass = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        forgotPass(values, Alert.success('Check out your e-mail!'));
        form.resetFields();
      }
    });
  };
  return (
    <div className="forgot-pass-form">
      <div className="landing-subpage-lead small" />
      <div className="landing-subpage-content small">
        <div className="container">
          <Form onSubmit={handleForgotPass} className="account-form forgot-pass-form">
            <div className="account-form-title">
              Forgot Password
            </div>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'The input is not valid E-mail!' }],
              })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />)}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="accounts-form-button">
                Send
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  );
};

ForgotPass.propTypes = {
  form: PropTypes.object.isRequired,
  forgotPass: PropTypes.func.isRequired,
};

export default Form.create()(ForgotPass);
