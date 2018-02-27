import { Meteor } from 'meteor/meteor';

export const RECEIVE_TAGS_GET = 'RECEIVE_TAGS_GET';

export function receiveTagsGet(data) {
  return {
    type: RECEIVE_TAGS_GET,
    data,
  };
}

export function requestTagsGet(cb) {
  return (dispatch) => {
    dispatch(receiveTagsGet({ isLoading: true, error: null, data: [] }));
    Meteor.call(
      'tags.methods.get',
      (error, result) => {
        if (!error) {
          if (cb && typeof cb === 'function') cb();
          return dispatch(receiveTagsGet({ isLoading: false, data: result }));
        }
        if (cb && typeof cb === 'function') cb(error);
        return error;
      },
    );
  };
}

export function requestTagsAdd(tags, cb) {
  return () => {
    Meteor.call(
      'tags.methods.add',
      tags,
      (error) => {
        if (!error) {
          if (cb && typeof cb === 'function') cb();
        }
        if (cb && typeof cb === 'function') cb(error);
        return error;
      },
    );
  };
}
