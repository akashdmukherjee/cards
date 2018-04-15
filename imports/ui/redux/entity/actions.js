import { Meteor } from 'meteor/meteor';

export const RECEIVE_ENTITY_EDIT = 'RECEIVE_ENTITY_EDIT';
export const RECEIVE_ENTITY_GET = 'RECEIVE_ENTITY_GET';

export function receiveEntityEdit(data) {
  return {
    type: RECEIVE_ENTITY_EDIT,
    data,
  };
}

export function receiveEntityGet(data) {
  return {
    type: RECEIVE_ENTITY_GET,
    data,
  };
}

export function requestEntityGet(cb) {
  return (dispatch) => {
    dispatch(receiveEntityGet({ isLoading: true, data: {} }));
    Meteor.call(
      'entity.methods.get',
      (err, res) => {
        if (!err) {
          if (cb && typeof cb === 'function') cb();
          return dispatch(receiveEntityGet({ isLoading: false, data: res }));
        }
        if (cb && typeof cb === 'function') cb(err);
        return dispatch(receiveEntityGet({ isLoading: false, data: {} }));
      },
    );
  };
}

export function requestEntityEdit(values, cb) {
  return (dispatch) => {
    dispatch(receiveEntityEdit({ isLoading: true, data: {} }));
    Meteor.call(
      'entity.methods.edit',
      values.name,
      values.actionName,
      values.websiteColor,
      values.websiteColorEnabled,
      values.websiteName,
      values.websiteNameEnabled,
      values.websiteLogo,
      values.websiteLogoEnabled,
      (err) => {
        if (!err) {
          if (cb && typeof cb === 'function') cb();
          return dispatch(requestEntityGet());
        }
        if (cb && typeof cb === 'function') cb(err);
        return dispatch(receiveEntityEdit({ isLoading: false, data: {} }));
      },
    );
  };
}
