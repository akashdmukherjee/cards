import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';

Meteor.methods({
  emailVerification(userId) {
    check(userId, String);
    this.unblock();
    Accounts.sendVerificationEmail(userId);
  },
});
