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
const adminSettings = Meteor.settings.adminUser;

Accounts.onCreateUser((options, user) => {
  if (options.email === adminSettings.email
    && options.firstName === adminSettings.firstName
    && options.lastName === adminSettings.lastName) {
    user.adminUser = true;
  }
  if (user.services.google) {
    user.firstName = user.services.google.given_name;
    user.lastName = user.services.google.family_name;
    user.emails = [];
    user.emails.push({
      address: user.services.google.email,
      verified: true,
    });
    return user;
  }
  if (user.services.facebook) {
    user.firstName = user.services.facebook.first_name;
    user.lastName = user.services.facebook.last_name;
    user.emails = [];
    user.emails.push({
      address: user.services.facebook.email,
      verified: true,
    });
    return user;
  }
  return user;
});

const userExists = Accounts.findUserByEmail(adminSettings.email);
if (!userExists) {
  Accounts.createUser(adminSettings);
}
