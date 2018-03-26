import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';

export const CMS = new Mongo.Collection('CMS'); // eslint-disable-line

CMS.schema = new SimpleSchema({
  date: { type: Date, defaultValue: new Date() },
  header: { type: String, optional: true },
  title: { type: String },
  slug: { type: String },
  description: { type: String },
  image: { type: Object, optional: true },
  'image.version': { type: String },
  'image.publicId': { type: String },
  'image.format': { type: String },
  video: { type: String, optional: true },
  contents: { type: String },
  footer: { type: String, optional: true },
  tags: { type: Array, optional: true },
  'tags.$': { type: String },
  type: { type: String },
}, { check });

CMS.attachSchema(CMS.schema);
