import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Entity } from './collection';

Meteor.methods({
  'entity.methods.edit': (name, actionName) => {
    check(name, String);
    check(actionName, String);
    if (Meteor.userId()) {
      Entity.remove({});
      Entity.insert({ name, actionName });
    }
  },
  'entity.methods.get': () => {
    if (Meteor.userId()) { return Entity.findOne({}); }
    return null;
  },
});
