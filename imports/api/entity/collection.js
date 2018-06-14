import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';

export const Entity = new Mongo.Collection('Entity'); // eslint-disable-line

Entity.schema = new SimpleSchema({
  name: { type: String, optional: true },
  websiteThemeColor: { type: String, optional: true },
  websiteThemeColorEnabled: { type: Boolean, defaultValue: false, optional: true },
  websiteBackgroundColor: { type: String, optional: true },
  websiteBackgroundColorEnabled: { type: Boolean, defaultValue: false, optional: true },
  websiteNavBarBgColor: { type: String, optional: true },
  websiteNavBarBgColorEnabled: { type: Boolean, defaultValue: false, optional: true },
  websiteName: { type: String, optional: true },
  websiteNameEnabled: { type: Boolean, defaultValue: false, optional: true },
  websiteLogo: { type: Object, optional: true },
  'websiteLogo.version': { type: String },
  'websiteLogo.publicId': { type: String },
  'websiteLogo.format': { type: String },
  websiteLogoEnabled: { type: Boolean, defaultValue: false, optional: true },
  websiteFontFamily: { type: String, defaultValue: '\'Roboto\', sans-serif', optional: true },
  cardActionName: { type: String, optional: true, defaultValue: 'Like' },
  cardActionType: { type: String, optional: true, defaultValue: 'likes' },
  cardActionIcon: { type: String, optional: true, defaultValue: 'like-o' },
  cardActionEnabled: { type: Boolean, optional: true, defaultValue: true },
  cardHeaderEnabled: { type: Boolean, optional: true, defaultValue: true },
  cardTagsEnabled: { type: Boolean, optional: true, defaultValue: true },
  cardTextEnabled: { type: Boolean, optional: true, defaultValue: true },
  cardBorderColor: { type: String, optional: true, defaultValue: 'auto' },
  cardBorderShadow: { type: String, optional: true, defaultValue: 'auto' },
}, { check });

Entity.attachSchema(Entity.schema);
