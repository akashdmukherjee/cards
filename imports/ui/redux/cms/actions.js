import { Meteor } from 'meteor/meteor';

export const RECEIVE_CMS_LIST_GET = 'RECEIVE_CMS_LIST_GET';
export const RECEIVE_CMS_GET = 'RECEIVE_CMS_GET';

export function receiveCMSGet(data) {
  return {
    type: RECEIVE_CMS_GET,
    data,
  };
}

export function receiveCMSListGet(data) {
  return {
    type: RECEIVE_CMS_LIST_GET,
    data,
  };
}

export function requestCMSGet(slug, cb) {
  return (dispatch) => {
    dispatch(receiveCMSGet({ isLoading: true, error: null, data: {} }));
    Meteor.call(
      'cms.methods.get',
      slug,
      (error, result) => {
        if (!error) {
          if (cb && typeof cb === 'function') cb();
          return dispatch(receiveCMSGet({ isLoading: false, data: result }));
        }
        if (cb && typeof cb === 'function') cb(error);
        return error;
      },
    );
  };
}

export function requestCMSListGet(landingPage = false, cb) {
  return (dispatch) => {
    dispatch(receiveCMSListGet({ isLoading: true, error: null, data: [] }));
    Meteor.call(
      'cms.methods.getList',
      landingPage,
      (error, result) => {
        if (!error) {
          if (cb && typeof cb === 'function') cb();
          return dispatch(receiveCMSListGet({ isLoading: false, data: result }));
        }
        if (cb && typeof cb === 'function') cb(error);
        return error;
      },
    );
  };
}

export function requestCMSAdd(values, cb) {
  return () => {
    Meteor.call(
      'cms.methods.add',
      values.image,
      values.title,
      values.description,
      values.header,
      values.contents,
      values.footer,
      values.tags,
      values.video,
      values.type,
      values.defaultPostView,
      values.authorId,
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

export function requestCMSEdit(values, cb) {
  Meteor.call(
    'cms.methods.edit',
    values.slug,
    values.image,
    values.title,
    values.description,
    values.header,
    values.contents,
    values.footer,
    values.tags,
    values.video,
    values.type,
    values.defaultPostView,
    (error) => {
      if (!error) {
        if (cb && typeof cb === 'function') cb();
      }
      if (cb && typeof cb === 'function') cb(error);
      return error;
    },
  );
}

export function requestCMSDelete(id, cb) {
  return (dispatch) => {
    Meteor.call(
      'cms.methods.delete',
      id,
      (error) => {
        if (!error) {
          dispatch(requestCMSListGet());
          if (cb && typeof cb === 'function') cb();
        }
        if (cb && typeof cb === 'function') cb(error);
        return error;
      },
    );
  };
}

export function requestRatings(type, postId, cb) {
  return () => {
    Meteor.call(
      'cms.methods.getRatings',
      type,
      postId,
      (error, result) => {
        if (!error) {
          if (cb && typeof cb === 'function') cb(result);
        }
        if (cb && typeof cb === 'function') cb(error);
        return error;
      },
    );
  };
}
