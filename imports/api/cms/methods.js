import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import shortid from 'shortid';
import slugify from 'slugify';
import { CMS } from './collection';
import { Notifications } from '../notifications/collection';
import cloudinary from '../../startup/server/cloudinary-config';

// TODO: escape all special chars if not admin

Meteor.methods({
  'cms.methods.get': (slug) => {
    check(slug, String);
    return CMS.findOne({ slug });
  },
  'cms.methods.getList': (landingPage) => {
    check(landingPage, Match.Maybe(Boolean));
    const userId = Meteor.userId();
    const meteorUser = userId && Meteor.user();
    if (landingPage || meteorUser.adminUser) {
      const list = CMS.find({}).fetch().reverse();
      const listWithUserData = list.map((l) => {
        const userData = Meteor.call('user.methods.getPublicUserData', l.authorId);
        return {
          ...l,
          authorFirstName: userData.firstName,
          authorLastName: userData.lastName,
          authorAvatar: userData.avatar,
        };
      });
      return listWithUserData;
    }
    return CMS.find({ authorId: userId }).fetch().reverse();
  },
  'cms.methods.add': (
    image,
    title,
    description,
    header,
    contents,
    footer,
    tags,
    video,
    type,
    defaultPostView,
    authorId,
  ) => {
    check(image, Match.Maybe(Object));
    check(title, String);
    check(description, String);
    check(contents, String);
    check(header, Match.Maybe(String));
    check(footer, Match.Maybe(String));
    check(tags, Match.Maybe(Array));
    check(video, Match.Maybe(String));
    check(type, String);
    check(defaultPostView, Match.Maybe(Boolean));
    check(authorId, String);
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
        video,
        type,
        defaultPostView,
        authorId,
      });
    }
  },
  'cms.methods.edit': (
    slug,
    image,
    title,
    description,
    header,
    contents,
    footer,
    tags,
    video,
    type,
    defaultPostView,
  ) => {
    check(image, Match.Maybe(Object));
    check(title, String);
    check(description, String);
    check(contents, String);
    check(slug, String);
    check(header, Match.Maybe(String));
    check(footer, Match.Maybe(String));
    check(tags, Match.Maybe(Array));
    check(video, Match.Maybe(String));
    check(type, String);
    check(defaultPostView, Match.Maybe(Boolean));
    const userId = Meteor.userId();
    const currentItem = CMS.findOne({ slug });
    if ((userId && userId === currentItem.authorId) || Meteor.user().adminUser) {
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
            video,
            type,
            defaultPostView,
          },
        },
      );
    } else throw new Meteor.Error('You are not allowed to do that!');
  },
  'cms.methods.delete': (id) => {
    check(id, String);
    const userId = Meteor.userId();
    const currentItem = CMS.findOne(id);
    if ((userId && userId === currentItem.authorId) || Meteor.user().adminUser) {
      CMS.remove(id);
    } else throw new Meteor.Error('You are not allowed to do that!');
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
  'cms.methods.getRatings': (type, postId) => {
    check(type, String);
    check(postId, String);
    const post = CMS.findOne({ _id: postId });
    if (post && type === 'ratings') {
      return post.ratings;
    }
    if (post && type === 'likes') {
      return post.likes;
    }
    return null;
  },
  'cms.methods.updateRatings': (type, postId, value) => {
    check(type, String);
    check(postId, String);
    check(value, Number);
    const user = Meteor.user();
    const post = CMS.findOne({ _id: postId });
    let val;
    if (post && type === 'likes' && user.likes && user.likes[postId] !== undefined) {
      val = post.likes - user.likes[postId];
    } else if (post && type === 'likes') {
      val = post.likes + value;
    }
    if (post && type === 'ratings' && user.ratings && user.ratings[postId]) {
      const count = (post.ratings && post.ratings.count) || 0;
      const votes = (post.ratings && post.ratings.votes) || 0;
      val = {
        count: ((count - (user.ratings[postId] || 0)) + value),
        votes: (votes === 0 ? votes + 1 : votes),
      };
    } else if (post && type === 'ratings') {
      const count = (post.ratings && post.ratings.count) || 0;
      const votes = (post.ratings && post.ratings.votes) || 0;
      val = { count: (count + value), votes: (votes + 1) };
    }
    if (user && user._id && post && post._id) {
      CMS.update(
        { _id: postId },
        {
          $set: {
            [type]: val,
          },
        },
      );
      Notifications.insert({
        userId: post.authorId,
        action: type,
        itemSlug: post.slug,
        message: type === 'like'
          ? `User ${user.firstName || ''} ${user.lastName || ''} liked your post!`
          : `User ${user.firstName || ''} ${user.lastName || ''} rated your post!`,
      });
    }
  },
});
