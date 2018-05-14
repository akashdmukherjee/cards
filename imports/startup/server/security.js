import { Meteor } from 'meteor/meteor';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { Entity } from '../../api/entity/collection';
import { CMS } from '../../api/cms/collection';
import { Tags } from '../../api/tags/collection';

// Deny client side ingerention
// We deny all because sChat uses only Methods calls
// read more about it here: http://guide.meteor.com/security.html#allow-deny

Meteor.users.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Entity.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

CMS.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Tags.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

// We limit DDP calls here
// http://docs.meteor.com/#/full/ddpratelimiter

// TODO: all Method names
const METHODS_NAMES = [
  'emailVerification',
];

// Only allow 5 list operations per connection per 2 seconds
DDPRateLimiter.addRule({
  name(name) {
    return METHODS_NAMES.indexOf(name) !== -1;
  },
  // Rate limit per connection ID
  connectionId() {
    return true;
  },
}, 5, 2000);
