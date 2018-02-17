/* eslint-disable no-param-reassign */
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

// TODO email templates config:
// https://docs.meteor.com/api/passwords.html#Accounts-emailTemplates
Accounts.emailTemplates.resetPassword.text = (user, url) => (
  `
    Hello,
    To reset your password, simply click the link below:
    ${Meteor.absoluteUrl(url.split('#/')[1])}
  `
);

// Create admin account
const admin = Meteor.settings.private.adminUser;
const userExists = Accounts.findUserByEmail(admin.email);
if (!userExists) {
  Accounts.createUser(admin);
}

// For now we don't need to create other accounts than admin
Accounts.config({ forbidClientAccountCreation: true });

