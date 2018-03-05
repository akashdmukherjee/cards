import { Meteor } from 'meteor/meteor';

const { cloudinaryHost } = Meteor.settings.public;

export default (version, publicId, format, transformations) => {
  if (transformations) {
    return `${cloudinaryHost}/image/upload/${transformations}/v${version}/${publicId}.${format}`;
  }
  return `${cloudinaryHost}/image/upload/v${version}/${publicId}.${format}`;
};
