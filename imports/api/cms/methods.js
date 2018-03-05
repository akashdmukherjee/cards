import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import shortid from 'shortid';
import slugify from 'slugify';
import { CMS } from './collection';
import cloudinary from '../../startup/server/cloudinary-config';

Meteor.methods({
  'cms.methods.get': (slug) => {
    check(slug, String);
    return CMS.findOne({ slug });
  },
  'cms.methods.getList': () => CMS.find({}).fetch().reverse(),
  'cms.methods.add': (image, title, description, header, contents, footer, tags) => {
    check(image, Match.Maybe(Object));
    check(title, String);
    check(description, String);
    check(contents, String);
    check(header, Match.Maybe(String));
    check(footer, Match.Maybe(String));
    check(tags, Match.Maybe(Array));
    if (Meteor.userId()) {
      const slug = `${slugify(title, { remove: /[$*_+~.()'"!\-:@]/g, lower: true })}-${shortid()}`;
      CMS.insert({
        image,
        title,
        slug,
        description,
        header,
        contents,
        footer,
        tags,
      });
    }
  },
  'cms.methods.edit': (slug, image, title, description, header, contents, footer, tags) => {
    check(image, Match.Maybe(Object));
    check(title, String);
    check(description, String);
    check(contents, String);
    check(slug, String);
    check(header, Match.Maybe(String));
    check(footer, Match.Maybe(String));
    check(tags, Match.Maybe(Array));
    if (Meteor.userId()) {
      CMS.update(
        { slug },
        {
          $set: {
            image,
            title,
            description,
            header,
            contents,
            footer,
            tags,
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
  'cms.methods.fileUpload': (payload) => {
    check(payload, Object);
    if (Meteor.userId()) {
      const { dataUrl, type } = payload;
      if (type === 'image/jpg' || type === 'image/jpeg' || type === 'image/png') {
        return cloudinary.uploader.upload(dataUrl, result => ({
          publicId: result.public_id,
          version: result.version,
          format: result.format,
        }));
      }
      return Meteor.Error('Wrong image format (.png and .jpg allowed)!');
    }
    return null;
  },
});
