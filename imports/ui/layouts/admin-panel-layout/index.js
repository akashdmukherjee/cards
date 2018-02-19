import React from 'react';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import { element, oneOfType, arrayOf, object } from 'prop-types';
import { withRouter } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

// Mappings for React Router and Ant Menu.Item
const menuKeysRedirects = {
  1: '/',
  2: '/admin/cms',
  3: '/admin/configuration',
};

class AdminPanelLayout extends React.Component {
  static propTypes = {
    history: object.isRequired,
    location: object.isRequired,
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
    return (
      <Layout className="admin-panel-layout">
        <Sider className="admin-panel-layout-sider" trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={this.getSelectedMenuItem()} onClick={this.menuOnClick}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>CMS</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="video-camera" />
              <span>Config</span>
            </Menu.Item>
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

AdminPanelLayout.propTypes = {
  children: oneOfType([arrayOf(element), object]).isRequired,
};

export default withRouter(AdminPanelLayout);
