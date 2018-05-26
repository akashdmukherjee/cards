import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Entity } from './collection';

Meteor.methods({
  'entity.methods.editCard': (
    cardActionName,
    cardActionIcon,
    cardActionEnabled,
    cardHeaderEnabled,
    cardTagsEnabled,
    cardTextEnabled,
    cardBorderColor,
    cardBorderShadow,
  ) => {
    check(cardActionName, Match.Maybe(String));
    check(cardActionIcon, Match.Maybe(String));
    check(cardActionEnabled, Match.Maybe(Boolean));
    check(cardHeaderEnabled, Match.Maybe(Boolean));
    check(cardTagsEnabled, Match.Maybe(Boolean));
    check(cardTextEnabled, Match.Maybe(Boolean));
    check(cardBorderColor, Match.Maybe(String));
    check(cardBorderShadow, Match.Maybe(String));
    if (Meteor.userId() && Meteor.user().adminUser) {
      const entity = Entity.findOne();
      const id = entity && entity._id;
      Entity.upsert(
        { _id: id },
        {
          $set: {
            cardActionName,
            cardActionIcon,
            cardActionEnabled,
            cardHeaderEnabled,
            cardTagsEnabled,
            cardTextEnabled,
            cardBorderColor,
            cardBorderShadow,
          },
        },
      );
    }
  },
  'entity.methods.editWebsite': (
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
    websiteFontFamily,
  ) => {
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
    check(websiteFontFamily, Match.Maybe(String));
    if (Meteor.userId() && Meteor.user().adminUser) {
      const entity = Entity.findOne();
      const id = entity && entity._id;
      Entity.upsert(
        { _id: id },
        {
          $set: {
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
            websiteFontFamily,
          },
        },
      );
    }
  },
  'entity.methods.get': () => Entity.findOne({}),
});
