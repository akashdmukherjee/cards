import { Meteor } from 'meteor/meteor';

export const RECEIVE_NOTIFICATIONS_GET = 'RECEIVE_NOTIFICATIONS_GET';

export function receiveNotificationsyGet(data) {
  return {
    type: RECEIVE_NOTIFICATIONS_GET,
    data,
  };
}

export function requestNotificationsGet(cb) {
  return (dispatch) => {
    dispatch(receiveNotificationsyGet({ isLoading: true, data: [] }));
    Meteor.call(
      'notifications.methods.get',
      (err, res) => {
        if (!err) {
          if (cb && typeof cb === 'function') cb();
          return dispatch(receiveNotificationsyGet({ isLoading: false, data: res }));
        }
        if (cb && typeof cb === 'function') cb(err);
        return dispatch(receiveNotificationsyGet({ isLoading: false, data: [] }));
      },
    );
  };
}
