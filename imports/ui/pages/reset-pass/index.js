/* eslint-disable max-len, no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { withRouter } from 'react-router-dom';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

const FormItem = Form.Item;

const ResetPass = ({
  form: { getFieldDecorator, validateFields },
  resetPass,
  match,
  history,
}) => {
  const handleResetPass = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        resetPass(match.params.token, values.password, (error) => {
          if (error) {
            Alert.error(error.message);
          } else {
            Alert.success('Password was changed!');
            history.push('/');
          }
        });
      }
    });
  };
  return (
    <div className="reset-pass-form">
      <div className="landing-subpage-lead small" />
      <div className="landing-subpage-content small">
        <div className="container">
          <Form onSubmit={handleResetPass} className="account-form reset-pass-form">
            <div className="account-form-title">
              Reset Password
            </div>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="New Password" />)}
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

ResetPass.propTypes = {
  form: PropTypes.object.isRequired,
  resetPass: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(Form.create()(ResetPass));
