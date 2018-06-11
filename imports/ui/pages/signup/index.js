/* eslint-disable max-len, no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Alert from 'react-s-alert';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

const FormItem = Form.Item;

const SignUp = ({
  form: { getFieldDecorator, validateFields },
  registerUser,
  registerUserGoogle,
  registerUserFacebook,
  history,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        registerUser(values, (error) => {
          if (error) {
            Alert.error(error.message);
            history.push('/signup');
          } else { history.push('/'); }
        });
      }
    });
  };
  const handleRegisterWithGoogle = () => {
    registerUserGoogle((error) => {
      if (error) {
        Alert.error(error.message);
        history.push('/signup');
      } else { history.push('/'); }
    });
  };
  const handleRegisterWithFacebook = () => {
    registerUserFacebook((error) => {
      if (error) {
        Alert.error(error.message);
        history.push('/signup');
      } else { history.push('/'); }
    });
  };
  return (
    <div className="offer">
      <div className="landing-subpage-lead small" />
      <div className="landing-subpage-content small">
        <div className="container">
          <Form onSubmit={handleSubmit} className="registrer-form account-form">
            <div className="account-form-title">
              Sign Up
            </div>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'The input is not valid E-mail!' }],
              })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
            </FormItem>
            <FormItem>
              <div>
                <div className="float-right">
                  <Link className="login-form-forgot" to="/signin">Sign In</Link>
                </div>
              </div>
              <Button type="primary" htmlType="submit" className="accounts-form-button">
                Sign Up
              </Button>
              <Button type="primary" htmlType="button" className="accounts-form-button google" onClick={handleRegisterWithGoogle}>
                Start with Google
              </Button>
              <Button type="primary" htmlType="button" className="accounts-form-button facebook" onClick={handleRegisterWithFacebook}>
                Start with Facebook
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  form: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  registerUserGoogle: PropTypes.func.isRequired,
  registerUserFacebook: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(Form.create()(SignUp));
