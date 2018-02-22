import { Meteor } from 'meteor/meteor';

export const RECEIVE_CMS_LIST_GET = 'RECEIVE_CMS_LIST_GET';
export const RECEIVE_CMS_ADD = 'RECEIVE_CMS_ADD';

export function receiveCMSListGet(data) {
  return {
    type: RECEIVE_CMS_LIST_GET,
    data,
  };
}

export function requestCMSListGet() {
  return (dispatch) => {
    dispatch(receiveCMSListGet({ isLoading: true, error: null, data: [] }));
    Meteor.call(
      'cms.methods.getList',
      (err, res) => {
        if (!err) {
          return dispatch(receiveCMSListGet({ isLoading: false, data: res }));
        }
        return dispatch(receiveCMSListGet({ isLoading: false, error: err, data: [] }));
      },
    );
  };
}

export function requestCMSAdd(values) {
  return () => {
    Meteor.call(
      'cms.methods.add',
      values.title,
      values.header,
      values.contents,
      values.footer,
    );
  };
}

export function requestCMSDelete(id) {
  return (dispatch) => {
    Meteor.call(
      'cms.methods.delete',
      id,
      () => dispatch(requestCMSListGet()),
    );
  };
}
