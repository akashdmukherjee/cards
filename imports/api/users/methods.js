import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check, Match } from 'meteor/check';

const validateUsername = (username) => {
  const min = 3;
  const max = 12;
  if (username && username.length >= min && username.length <= max) {
    return true;
  }
  return false;
};
const validatePassword = (password) => { // eslint-disable-line
  // const r = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  // if (password && r.test(password)) {
  //   return true;
  // }
  // return false;
  return true; // just for now
};
const validateEmail = (email) => {
  const r = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  if (r.test(email)) {
    return true;
  }
  return false;
};

Meteor.methods({
  createNewUser(username, email, password) {
    check(username, String);
    check(email, String);
    check(password, String);
    let userQuery;
    if (username === 'nousername' && validateEmail(email) && validatePassword(password)) {
      userQuery = {
        email,
        password,
      };
    }
    if (validateUsername(username) && validateEmail(email) && validatePassword(password)) {
      userQuery = {
        username,
        email,
        password,
      };
    }
    if (userQuery) {
      return Accounts.createUser(userQuery);
    }
    return null;
  },
  emailVerification(userId) {
    check(userId, String);
    this.unblock();
    Accounts.sendVerificationEmail(userId);
  },
  'user.methods.updateProfileSettings': (userId, bio) => {
    check(userId, String);
    check(bio, Match.Maybe(String));
    if (userId === Meteor.userId()) {
      Meteor.users.update({ _id: userId }, { $set: { bio } });
    }
    return null;
  },
});

// Publish additional field for admin user
// TODO: make sure what fields are public and accessible for everyone
Meteor.publish(null, () => {
  const userId = Meteor.userId();
  const meteorUser = userId && Meteor.user();
  let additionalFields = {
    bio: 1,
  };
  if (userId && meteorUser && meteorUser.adminUser) {
    additionalFields = { ...additionalFields, adminUser: 1 };
  }
  return Meteor.users.find({}, { fields: additionalFields });
});
