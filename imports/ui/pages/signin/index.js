/* eslint-disable max-len, no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Alert from 'react-s-alert';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

const FormItem = Form.Item;

const SignIn = ({
  form: { getFieldDecorator, validateFields },
  handleLogin,
  history,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        handleLogin(values, (error) => {
          if (error) {
            Alert.error(error.message);
          } else { history.push('/admin'); }
        });
      }
    });
  };
  return (
    <div className="sign-in">
      <div className="landing-subpage-lead small" />
      <div className="landing-subpage-content small">
        <div className="container">
          <Form onSubmit={handleSubmit} className="login-form account-form">
            <div className="account-form-title">
              Sign In
            </div>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
            </FormItem>
            <FormItem>
              <div>
                <div className="float-right">
                  <Link className="login-form-forgot" to="/forgot-password">Forgot password?</Link>
                </div>
              </div>
              <Button type="primary" htmlType="submit" className="accounts-form-button">
                Sign In
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  );
};

SignIn.propTypes = {
  form: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(Form.create()(SignIn));
