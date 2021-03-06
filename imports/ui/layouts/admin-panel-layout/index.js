import React from 'react';
import { connect } from 'react-redux';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import { element, oneOfType, arrayOf, object, bool } from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import Spinner from '../../components/spinner';

const { Header, Sider, Content } = Layout;

// Mappings for React Router and Ant Menu.Item
const menuKeysRedirects = {
  1: '/',
  2: '/admin/profile/settings',
  3: '/admin/cms',
  4: '/admin/configuration/website-styling',
  5: '/admin/configuration/card-styling',
  6: '/admin/configuration/post-page-styling',
};

class AdminPanelLayout extends React.Component {
  static propTypes = {
    history: object.isRequired,
    location: object.isRequired,
    children: oneOfType([arrayOf(element), object]).isRequired,
    isLogging: bool,
    user: object,
  }
  static defaultProps = {
    isLogging: false,
    user: {},
  }
  state = {
    collapsed: false,
  }
  getSelectedMenuItem = () => {
    const menuValues = Object.keys(menuKeysRedirects).map(key => menuKeysRedirects[key]);
    const keyNumberAsString = (menuValues.indexOf(this.props.location.pathname) + 1).toString();
    if (keyNumberAsString === '0') return ['2'];
    return [keyNumberAsString];
  }
  toggle = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed,
    }));
  }
  menuOnClick = (obj) => {
    this.props.history.push(menuKeysRedirects[obj.key]);
  }
  render() {
    const { isLogging, user } = this.props;
    if (isLogging) return <Spinner />;
    if (!user._id) return <Redirect to="/signin" />;
    return (
      <Layout className="admin-panel-layout">
        <Sider className="admin-panel-layout-sider" trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={this.getSelectedMenuItem()} onClick={this.menuOnClick}>
            <Menu.Item key="1">
              <Icon type="home" />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="user" />
              <span>Profile settings</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="code-o" />
              <span>CMS</span>
            </Menu.Item>
            {user.adminUser && (
              <Menu.Item key="4">
                <Icon type="laptop" />
                <span>Website Styling</span>
              </Menu.Item>
            )}
            {user.adminUser && (
              <Menu.Item key="5">
                <Icon type="idcard" />
                <span>Card Styling</span>
              </Menu.Item>
            )}
            {user.adminUser && (
              <Menu.Item key="6" disabled>
                <Icon type="form" />
                <span>Post Page Styling</span>
              </Menu.Item>
            )}
          </Menu>
        </Sider>
        <Layout>
          <Header className="admin-panel-layout-header">
            <Icon
              className="admin-panel-layout-trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content className="admin-panel-layout-content">
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  isLogging: state.loginReducer.isLogging,
  user: state.loginReducer.data,
});

export default connect(mapStateToProps)(withRouter(AdminPanelLayout));
