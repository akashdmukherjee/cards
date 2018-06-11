import { Meteor } from 'meteor/meteor';

export const RECEIVE_PUBLIC_USER_DATA = 'RECEIVE_PUBLIC_USER_DATA';
export const REQUEST_PUBLIC_USER_DATA = 'REQUEST_PUBLIC_USER_DATA';

export function receivePublicUserData(data) {
  return {
    type: RECEIVE_PUBLIC_USER_DATA,
    data,
  };
}

export function requestPublicUserData(userId, cb) {
  return (dispatch) => {
    dispatch(receivePublicUserData({ isLoading: true, data: {} }));
    Meteor.call(
      'user.methods.getPublicUserData',
      userId,
      (error, result) => {
        if (result) {
          if (cb && typeof cb === 'function') cb();
          return dispatch(receivePublicUserData({ isLoading: false, data: result }));
        }
        if (cb && typeof cb === 'function') cb(error);
        return null;
      },
    );
  };
}
