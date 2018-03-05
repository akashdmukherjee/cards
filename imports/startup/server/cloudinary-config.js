import { Meteor } from 'meteor/meteor';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: Meteor.settings.cloudinary.cloudName,
  api_key: Meteor.settings.cloudinary.apiKey,
  api_secret: Meteor.settings.cloudinary.apiSecret,
});

export default cloudinary;
