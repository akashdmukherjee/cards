import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import shortid from 'shortid';
import slugify from 'slugify';
import { CMS } from './collection';

Meteor.methods({
  'cms.methods.get': (slug) => {
    check(slug, String);
    return CMS.findOne({ slug });
  },
  'cms.methods.getList': () => CMS.find({}).fetch().reverse(),
  'cms.methods.add': (title, description, header, contents, footer) => {
    check(title, String);
    check(description, String);
    check(contents, String);
    check(header, Match.Maybe(String));
    check(footer, Match.Maybe(String));
    if (Meteor.userId()) {
      const slug = `${slugify(title, { remove: /[$*_+~.()'"!\-:@]/g, lower: true })}-${shortid()}`;
      CMS.insert({
        title,
        slug,
        description,
        header,
        contents,
        footer,
      });
    }
  },
  'cms.methods.edit': (slug, title, description, header, contents, footer) => {
    check(title, String);
    check(description, String);
    check(contents, String);
    check(slug, String);
    check(header, Match.Maybe(String));
    check(footer, Match.Maybe(String));
    if (Meteor.userId()) {
      CMS.update(
        { slug },
        {
          $set: {
            title,
            description,
            header,
            contents,
            footer,
          },
        },
      );
    }
  },
  'cms.methods.delete': (id) => {
    check(id, String);
    if (Meteor.userId()) {
      CMS.remove(id);
    }
  },
});
