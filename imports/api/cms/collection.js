import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';

export const CMS = new Mongo.Collection('CMS'); // eslint-disable-line

CMS.schema = new SimpleSchema({
  header: { type: String, optional: true },
  title: { type: String },
  // image: { type: String },
  contents: { type: String },
  footer: { type: String, optional: true },
}, { check });

CMS.attachSchema(CMS.schema);
