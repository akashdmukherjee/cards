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

export function requestEntityGet() {
  return (dispatch) => {
    dispatch(receiveEntityGet({ isLoading: true, error: null, data: {} }));
    Meteor.call(
      'entity.methods.get',
      (err, res) => {
        if (!err) {
          return dispatch(receiveEntityGet({ isLoading: false, data: res }));
        }
        return dispatch(receiveEntityGet({ isLoading: false, error: err, data: {} }));
      },
    );
  };
}

export function requestEntityEdit(values) {
  return (dispatch) => {
    dispatch(receiveEntityEdit({ isLoading: true, error: null, data: {} }));
    Meteor.call(
      'entity.methods.edit',
      values.name,
      values.actionName,
      (err) => {
        if (!err) {
          return dispatch(requestEntityGet());
        }
        return dispatch(receiveEntityEdit({ isLoading: false, error: err, data: {} }));
      },
    );
  };
}
