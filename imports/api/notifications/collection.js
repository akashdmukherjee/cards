import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';

export const Notifications = new Mongo.Collection('Notifications'); // eslint-disable-line

Notifications.schema = new SimpleSchema({
  userId: { type: String },
  action: { type: String },
  message: { type: String },
  itemSlug: { type: String },
  read: { type: Boolean, defaultValue: false },
}, { check });

Notifications.attachSchema(Notifications.schema);
