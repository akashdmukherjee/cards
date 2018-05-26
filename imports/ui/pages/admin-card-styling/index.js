import React from 'react';
import PropTypes from 'prop-types';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Switch from 'antd/lib/switch';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Alert from 'react-s-alert';
import Select, { Option } from 'antd/lib/select';

const FormItem = Form.Item;

class AdminCardStyling extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    entity: PropTypes.object.isRequired,
    requestEntityEditCard: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
  }
  static defaultProps = {
    isLoading: false,
  }
  state = {
    imageFileData: this.props.entity.websiteLogo || null,
  }
  getFileData = (fileData) => {
    this.setState({ imageFileData: fileData });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.requestEntityEditCard({
          websiteLogo: this.state.imageFileData,
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
      entity,
      isLoading,
    } = this.props;
    return (
      <Card title="Configuration">
        <Form onSubmit={this.handleSubmit} className="admin-layout-form">
          <div className="admin-layout-form-title">
            Card Styling
          </div>
          <FormItem label="Action name">
            {getFieldDecorator('cardActionName', {
              initialValue: entity.cardActionName,
            })(<Input prefix={<Icon type="like-o" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Action" />)}
          </FormItem>
          <FormItem label="Action icon">
            {getFieldDecorator('cardActionIcon', {
              initialValue: entity.cardActionIcon,
            })(
              <Select>
                <Option value="like-o"><Icon type="like-o" /> (like-o)</Option>
                <Option value="up-circle-o"><Icon type="up-circle-o" /> (up-circle-o)</Option>
                <Option value="heart-o"><Icon type="heart-o" /> (heart-o)</Option>
                <Option value="star-o"><Icon type="star-o" /> (star-o)</Option>
              </Select>,
            )}
          </FormItem>
          <Row className="text-center">
            <Col span={6}>
              <FormItem label="Action enabled?">
                {getFieldDecorator('cardActionEnabled', {
                  initialValue: entity.cardActionEnabled,
                })(<Switch defaultChecked={entity.cardActionEnabled} />)}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Header enabled?">
                {getFieldDecorator('cardHeaderEnabled', {
                  initialValue: entity.cardHeaderEnabled,
                })(<Switch defaultChecked={entity.cardHeaderEnabled} />)}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Tags enabled?">
                {getFieldDecorator('cardTagsEnabled', {
                  initialValue: entity.cardTagsEnabled,
                })(<Switch defaultChecked={entity.cardTagsEnabled} />)}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Text enabled?">
                {getFieldDecorator('cardTextEnabled', {
                  initialValue: entity.cardTextEnabled,
                })(<Switch defaultChecked={entity.cardTextEnabled} />)}
              </FormItem>
            </Col>
          </Row>
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

export default Form.create()(AdminCardStyling);
