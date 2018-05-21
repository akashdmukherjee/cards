import { Meteor } from 'meteor/meteor';
import { Entity } from '../../api/entity/collection';

Meteor.startup(() => {
  const entitySetup = Entity.findOne();
  if (!entitySetup) {
    Entity.insert({ name: 'Entity', websiteName: 'Cards' });
  }
});
