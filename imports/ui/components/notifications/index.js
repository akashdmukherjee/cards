import React from 'react';
import PropTypes from 'prop-types';
import Menu from 'antd/lib/menu';

const Notifications = ({ notifications }) => (
  <Menu>
    {notifications.map(n => <Menu.Item key={n._id}>{n.message}</Menu.Item>)}
  </Menu>
);

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
};

export default Notifications;
