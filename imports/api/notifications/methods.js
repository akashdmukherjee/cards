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
  'notifications.methods.add': (userId, action, message) => {
    check(userId, String);
    check(action, String);
    check(message, String);
    return Notifications.insert({ userId, action, message });
  },
  'notifications.methods.markAsRead': (notificationId) => {
    check(notificationId, String);
    return Notifications.update({ _id: notificationId }, { $set: { read: true } });
  },
});
