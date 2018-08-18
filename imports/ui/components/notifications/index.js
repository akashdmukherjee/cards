import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import {
  requestNotificationsMarkAsRead,
  requestNotificationsRemove,
} from '../../redux/notifications/actions';

const Notifications = ({
  notifications,
  notificationsMarkAsRead,
  notificationsRemove,
}) => (
  <Menu>
    {notifications.map(n => (
      <Menu.Item key={n._id} className="notifications-item">
        <div>
          <Link to={`/post/${n.itemSlug}`} className="notifications-title">
            <span style={{ fontWeight: n.read ? 'normal' : 'bold' }}>{n.message}</span>
          </Link>
        </div>
        <Icon className="notifications-button" type="check" onClick={() => notificationsMarkAsRead(n._id)} />
        <Icon className="notifications-button" type="close" onClick={() => notificationsRemove(n._id)} />
      </Menu.Item>
    ))}
  </Menu>
);

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  notificationsMarkAsRead: PropTypes.func.isRequired,
  notificationsRemove: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  notifications: state.notificationsReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  notificationsMarkAsRead: requestNotificationsMarkAsRead,
  notificationsRemove: requestNotificationsRemove,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
