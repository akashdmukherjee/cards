import React from 'react';
import PropTypes from 'prop-types';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Alert from 'react-s-alert';
import Select, { Option } from 'antd/lib/select';
import UploadImage from '../../components/upload-image';

const FormItem = Form.Item;

class AdminWebsiteStyling extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    entity: PropTypes.object.isRequired,
    requestEntityEditWebsite: PropTypes.func.isRequired,
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
        this.props.requestEntityEditWebsite({
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
            Website Styling
          </div>
          <FormItem label="Website name">
            {getFieldDecorator('websiteName', {
              initialValue: entity.websiteName,
            })(<Input prefix={<Icon type="appstore-o" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Website name" />)}
          </FormItem>
          <FormItem label="Website theme color">
            {getFieldDecorator('websiteThemeColor', {
              initialValue: entity.websiteThemeColor,
            })(<Input prefix={<Icon type="appstore-o" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="#ffffff" />)}
          </FormItem>
          <FormItem label="Website background color">
            {getFieldDecorator('websiteBackgroundColor', {
              initialValue: entity.websiteBackgroundColor,
            })(<Input prefix={<Icon type="appstore-o" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="#ffffff" />)}
          </FormItem>
          <FormItem label="Website navigation bar background color">
            {getFieldDecorator('websiteNavBarBgColor', {
              initialValue: entity.websiteNavBarBgColor,
            })(<Input prefix={<Icon type="appstore-o" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="#ffffff" />)}
          </FormItem>
          <FormItem label="Website font family">
            {getFieldDecorator('websiteFontFamily', {
              initialValue: entity.websiteFontFamily,
            })(
              <Select>
                <Option value="'Roboto', sans-serif">Roboto</Option>
                <Option value="'Open Sans', sans-serif">Open Sans</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem label="Website logo (click and choose or drop an image)">
            <UploadImage
              initialImageData={entity.websiteLogo}
              getFileData={this.getFileData}
              imageTransform="w_200,c_limit"
            />
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

export default Form.create()(AdminWebsiteStyling);
