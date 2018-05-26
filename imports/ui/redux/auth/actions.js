import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const RECEIVE_LOGOUT = 'RECEIVE_LOGOUT';

export function receiveLogin(data) {
  return {
    type: RECEIVE_LOGIN,
    data,
  };
}

export function requestLogin(values, cb) {
  return dispatch => Meteor.loginWithPassword(values.username, values.password, (error) => {
    if (!error) {
      if (cb && typeof cb === 'function') cb();
      return dispatch(receiveLogin({ isLogging: false, data: Meteor.user() }));
    }
    if (cb && typeof cb === 'function') cb(error);
    return dispatch(receiveLogin({ isLogging: false, data: {} }));
  });
}

export function requestLoginGoogle(cb) {
  return dispatch => Meteor.loginWithGoogle({
    requestPermissions: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  }, (error) => {
    if (!error) {
      if (cb && typeof cb === 'function') cb();
      return dispatch(receiveLogin({ isLogging: false, data: Meteor.user() }));
    }
    if (cb && typeof cb === 'function') cb(error);
    return dispatch(receiveLogin({ isLogging: false, data: {} }));
  });
}

export function requestLoginFacebook(cb) {
  return dispatch => Meteor.loginWithFacebook({
    requestPermissions: ['public_profile, email'],
  }, (error) => {
    if (!error) {
      if (cb && typeof cb === 'function') cb();
      return dispatch(receiveLogin({ isLogging: false, data: Meteor.user() }));
    }
    if (cb && typeof cb === 'function') cb(error);
    return dispatch(receiveLogin({ isLogging: false, data: {} }));
  });
}

export function receiveLogout() {
  return {
    type: RECEIVE_LOGOUT,
  };
}

export function requestLogout() {
  return dispatch => Meteor.logout(() => dispatch(receiveLogout()));
}

export function registerUser(values, cb) {
  return dispatch => Meteor.call('createNewUser', values.username, values.email, values.password, () => {
    Meteor.loginWithPassword(values.email, values.password, (error) => {
      if (!error) {
        if (cb && typeof cb === 'function') cb();
      }
      if (cb && typeof cb === 'function') cb(error);
      return dispatch(receiveLogin({ isLogging: false, data: {} }));
    });
  });
}

export function registerUserGoogle(cb) {
  return dispatch => Meteor.loginWithGoogle({
    requestPermissions: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  }, (error) => {
    if (!error) {
      if (cb && typeof cb === 'function') cb();
    }
    if (cb && typeof cb === 'function') cb(error);
    return dispatch(receiveLogin({ isLogging: false, data: {} }));
  });
}

export function registerUserFacebook(cb) {
  return dispatch => Meteor.loginWithFacebook({
    requestPermissions: ['public_profile, email'],
  }, (error) => {
    if (!error) {
      if (cb && typeof cb === 'function') cb();
    }
    if (cb && typeof cb === 'function') cb(error);
    return dispatch(receiveLogin({ isLogging: false, data: {} }));
  });
}

export function forgotPass(values, cb) {
  return () => Accounts.forgotPassword({ email: values.email }, (error) => {
    if (!error) {
      if (cb && typeof cb === 'function') cb();
    }
  });
}

export function resetPass(token, password, cb) {
  return () => Accounts.resetPassword(token, password, (error) => {
    if (!error) {
      if (cb && typeof cb === 'function') cb();
    } else {
      cb(error);
    }
  });
}

export function updateProfileSettings(values, cb) {
  return dispatch => Meteor.call(
    'user.methods.updateProfileSettings',
    values.userId,
    values.bio,
    values.avatar,
    (error) => {
      if (!error) {
        if (cb && typeof cb === 'function') cb();
        return dispatch(receiveLogin({ isLogging: false, data: Meteor.user() }));
      }
      if (cb && typeof cb === 'function') cb(error);
      return null;
    });
}
