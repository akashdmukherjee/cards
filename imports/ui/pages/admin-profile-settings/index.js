import React from 'react';
import PropTypes from 'prop-types';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import { TextArea } from 'antd/lib/input';
import Alert from 'react-s-alert';

const FormItem = Form.Item;

class AdminProfileSettings extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    updateProfileSettings: PropTypes.func.isRequired,
  }
  state = {}
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.updateProfileSettings({
          userId: this.props.user._id,
          ...values,
        }, (error) => {
          if (error) {
            Alert.error(error.message);
          } else {
            Alert.success('Successfully saved!');
          }
        });
      }
    });
  }
  render() {
    const {
      form: { getFieldDecorator },
      user,
      isLoading,
    } = this.props;
    return (
      <Card title="Profile Settings">
        <Form onSubmit={this.handleSubmit} className="admin-layout-form">
          <div className="admin-layout-form-title">
            User Profile Settings
          </div>
          <FormItem label="User Bio">
            {getFieldDecorator('bio', {
              initialValue: user.bio,
            })(<TextArea autosize={{ minRows: 6, maxRows: 10 }} placeholder="Bio" />)}
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

export default Form.create()(AdminProfileSettings);
