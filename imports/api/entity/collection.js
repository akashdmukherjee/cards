import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';

export const Entity = new Mongo.Collection('Entity'); // eslint-disable-line

Entity.schema = new SimpleSchema({
  name: { type: String },
  actionName: { type: String },
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
}, { check });

Entity.attachSchema(Entity.schema);
