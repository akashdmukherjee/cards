import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Entity } from './collection';

Meteor.methods({
  'entity.methods.edit': (
    name,
    actionName,
    websiteThemeColor,
    websiteThemeColorEnabled,
    websiteBackgroundColor,
    websiteBackgroundColorEnabled,
    websiteNavBarBgColor,
    websiteNavBarBgColorEnabled,
    websiteName,
    websiteNameEnabled,
    websiteLogo,
    websiteLogoEnabled,
  ) => {
    check(name, String);
    check(actionName, String);
    check(websiteThemeColor, Match.Maybe(String));
    check(websiteThemeColorEnabled, Match.Maybe(Boolean));
    check(websiteBackgroundColor, Match.Maybe(String));
    check(websiteNavBarBgColor, Match.Maybe(String));
    check(websiteBackgroundColorEnabled, Match.Maybe(Boolean));
    check(websiteNavBarBgColorEnabled, Match.Maybe(Boolean));
    check(websiteName, Match.Maybe(String));
    check(websiteNameEnabled, Match.Maybe(Boolean));
    check(websiteLogo, Match.Maybe(Object));
    check(websiteLogoEnabled, Match.Maybe(Boolean));
    if (Meteor.userId()) {
      Entity.remove({});
      Entity.insert({
        name,
        actionName,
        websiteThemeColor,
        websiteThemeColorEnabled,
        websiteBackgroundColor,
        websiteNavBarBgColor,
        websiteBackgroundColorEnabled,
        websiteNavBarBgColorEnabled,
        websiteName,
        websiteNameEnabled,
        websiteLogo,
        websiteLogoEnabled,
      });
    }
  },
  'entity.methods.get': () => Entity.findOne({}),
});
