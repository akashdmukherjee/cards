import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { CMS } from './collection';

Meteor.methods({
  'cms.methods.getList': () => {
    if (Meteor.userId()) { return CMS.find().fetch(); }
    return null;
  },
  'cms.methods.add': (title, header, contents, footer) => {
    check(title, String);
    check(header, String);
    check(contents, String);
    check(footer, String);
    if (Meteor.userId()) {
      CMS.insert({
        title,
        header,
        contents,
        footer,
      });
    }
  },
  'cms.methods.delete': (id) => {
    check(id, String);
    if (Meteor.userId()) {
      CMS.remove(id);
    }
  },
});
