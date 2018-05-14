import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

const authServices = Meteor.settings && Meteor.settings.authServices;

if (authServices) {
  if (authServices.facebook) {
    ServiceConfiguration.configurations.remove({
      service: 'facebook',
    });
    ServiceConfiguration.configurations.insert({
      service: 'facebook',
      appId: authServices.facebook.appId,
      secret: authServices.facebook.secret,
    });
  }
  if (authServices.google) {
    ServiceConfiguration.configurations.remove({
      service: 'google',
    });
    ServiceConfiguration.configurations.insert({
      service: 'google',
      clientId: authServices.google.clientId,
      secret: authServices.google.secret,
    });
  }
}
