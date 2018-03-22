import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Tags } from './collection';

Meteor.methods({
  'tags.methods.add': (tags) => {
    check(tags, Array);
    const tagExists = Tags.findOne({ name: { $in: tags } });
    if (Meteor.userId() && !(tagExists && Object.keys(tagExists).length)) {
      tags.forEach(tag => Tags.insert({ name: tag }));
    }
  },
  'tags.methods.get': () => Tags.find().fetch(),
});
