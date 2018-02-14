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

Accounts.onCreateUser((options, user) => {
  if (user.services.google) {
    user.username = user.services.google.email;
    user.emails = [];
    user.emails.push({
      address: user.services.google.email,
      verified: true,
    });
    return user;
  }

  if (user.services.facebook) {
    user.username = user.services.facebook.email;
    user.emails = [];
    user.emails.push({
      address: user.services.facebook.email,
      verified: true,
    });
    return user;
  }

  return user;
});
