import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';

export const Tags = new Mongo.Collection('Tags'); // eslint-disable-line

Tags.schema = new SimpleSchema({
  name: { type: String },
}, { check });

Tags.attachSchema(Tags.schema);
