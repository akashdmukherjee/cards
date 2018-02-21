import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';

export const Entity = new Mongo.Collection('Entity'); // eslint-disable-line

Entity.schema = new SimpleSchema({
  name: { type: String },
  actionName: { type: String },
}, { check });

Entity.attachSchema(Entity.schema);
