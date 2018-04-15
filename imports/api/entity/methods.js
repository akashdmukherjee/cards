import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Entity } from './collection';

Meteor.methods({
  'entity.methods.edit': (
    name,
    actionName,
    websiteColor,
    websiteColorEnabled,
    websiteName,
    websiteNameEnabled,
    websiteLogo,
    websiteLogoEnabled,
  ) => {
    check(name, String);
    check(actionName, String);
    check(websiteColor, Match.Maybe(String));
    check(websiteColorEnabled, Match.Maybe(Boolean));
    check(websiteName, Match.Maybe(String));
    check(websiteNameEnabled, Match.Maybe(Boolean));
    check(websiteLogo, Match.Maybe(Object));
    check(websiteLogoEnabled, Match.Maybe(Boolean));
    if (Meteor.userId()) {
      Entity.remove({});
      Entity.insert({
        name,
        actionName,
        websiteColor,
        websiteColorEnabled,
        websiteName,
        websiteNameEnabled,
        websiteLogo,
        websiteLogoEnabled,
      });
    }
  },
  'entity.methods.get': () => Entity.findOne({}),
});
