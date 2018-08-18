import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Notifications } from './collection';

// TODO: escape all special chars if not admin

Meteor.methods({
  'notifications.methods.get': () => {
    const userId = Meteor.userId();
    if (userId) {
      return Notifications.find({ userId }).fetch();
    }
    return null;
  },
  'notifications.methods.add': (userId, action, message, itemId) => {
    check(userId, String);
    check(action, String);
    check(message, String);
    check(itemId, String);
    return Notifications.insert({
      userId,
      action,
      message,
      itemId,
    });
  },
  'notifications.methods.markAsRead': (notificationId) => {
    check(notificationId, String);
    const userId = Meteor.userId();
    if (userId) {
      Notifications.update({ _id: notificationId }, { $set: { read: true } });
      return Notifications.find({ userId }).fetch();
    }
    return null;
  },
  'notifications.methods.remove': (notificationId) => {
    check(notificationId, String);
    Notifications.remove({ _id: notificationId });
    const userId = Meteor.userId();
    return Notifications.find({ userId }).fetch();
  },
});
