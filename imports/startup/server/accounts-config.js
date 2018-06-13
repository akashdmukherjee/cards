/* eslint-disable no-param-reassign */
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Accounts } from 'meteor/accounts-base';
import cloudinary from './cloudinary-config';

// TODO email templates config:
// https://docs.meteor.com/api/passwords.html#Accounts-emailTemplates
Accounts.emailTemplates.resetPassword.text = (user, url) => (
  `
    Hello,
    To reset your password, simply click the link below:
    ${Meteor.absoluteUrl(url.split('#/')[1])}
  `
);

// Get the avatar from sociall service and save it as other images
const avatarUpload = (token, email) => {
  const imageData = HTTP.get(`https://graph.facebook.com/v3.0/me?access_token=${token}&fields=picture.type(large)&format=json&method=get`);
  cloudinary.uploader.upload(
    imageData.data.picture.data.url,
    Meteor.bindEnvironment((result) => {
      const image = {
        publicId: result.public_id,
        version: result.version,
        format: result.format,
      };
      Meteor.call('user.methods.addAvatar', image, email);
    }));
};

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
    avatarUpload(user.services.facebook.accessToken, user.services.facebook.email);
    return user;
  }
  return user;
});

const userExists = Accounts.findUserByEmail(adminSettings.email);
if (!userExists) {
  Accounts.createUser(adminSettings);
}
