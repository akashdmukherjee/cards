import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

if (Meteor.settings && Meteor.settings.private) {
  if (Meteor.settings.private.facebook) {
    // Facebook config
    ServiceConfiguration.configurations.remove({
      service: 'facebook',
    });
    ServiceConfiguration.configurations.insert({
      service: 'facebook',
      appId: Meteor.settings.private.facebook.appId,
      secret: Meteor.settings.private.facebook.secret,
    });
  }

  if (Meteor.settings.private.google) {
    // Google config
    ServiceConfiguration.configurations.remove({
      service: 'google',
    });
    ServiceConfiguration.configurations.insert({
      service: 'google',
      clientId: Meteor.settings.private.google.clientId,
      secret: Meteor.settings.private.google.secret,
    });
  }
}
