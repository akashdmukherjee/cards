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
  requestLoginFacebook,
  requestLoginGoogle,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        handleLogin(values, (error) => {
          if (error) {
            Alert.error(error.message);
            history.push('/signup');
          } else { history.push('/admin'); }
        });
      }
    });
  };
  const handleLoginWithGoogle = () => {
    requestLoginGoogle((error) => {
      if (error) {
        Alert.error(error.message);
        history.push('/signup');
      } else { history.push('/'); }
    });
  };
  const handleLoginWithFacebook = () => {
    requestLoginFacebook((error) => {
      if (error) {
        Alert.error(error.message);
        history.push('/signup');
      } else { history.push('/'); }
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
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }],
              })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-mail" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
            </FormItem>
            <FormItem>
              <div>
                <div className="float-left">
                  <Link className="login-form-forgot" to="/signup">Sign Up</Link>
                </div>
                <div className="float-right">
                  <Link className="login-form-forgot" to="/forgot-password">Forgot password?</Link>
                </div>
              </div>
              <Button type="primary" htmlType="submit" className="accounts-form-button">
                Sign In
              </Button>
              <Button type="primary" htmlType="button" className="accounts-form-button google" onClick={handleLoginWithGoogle}>
                Start with Google
              </Button>
              <Button type="primary" htmlType="button" className="accounts-form-button facebook" onClick={handleLoginWithFacebook}>
                Start with Facebook
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
  requestLoginFacebook: PropTypes.func.isRequired,
  requestLoginGoogle: PropTypes.func.isRequired,
};

export default withRouter(Form.create()(SignIn));
