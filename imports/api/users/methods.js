import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check, Match } from 'meteor/check';

const validatePassword = (password) => { // eslint-disable-line
  // TODO:
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
  createNewUser(email, password) {
    check(email, String);
    check(password, String);
    if (validateEmail(email) && validatePassword(password)) {
      return Accounts.createUser({
        email,
        password,
      });
    }
    return null;
  },
  emailVerification(userId) {
    check(userId, String);
    this.unblock();
    Accounts.sendVerificationEmail(userId);
  },
  'user.methods.updateProfileSettings': (userId, bio, avatar, firstName, lastName) => {
    check(userId, String);
    check(bio, Match.Maybe(String));
    check(avatar, Match.Maybe(Object));
    check(firstName, Match.Maybe(String));
    check(lastName, Match.Maybe(String));
    if (userId === Meteor.userId()) {
      Meteor.users.update(
        { _id: userId },
        {
          $set: {
            bio,
            avatar,
            firstName,
            lastName,
          },
        },
      );
    }
    return null;
  },
  'user.methods.getPublicUserData': (userId) => {
    check(userId, String);
    return Meteor.users.findOne(
      { _id: userId },
      {
        fields: {
          firstName: 1,
          lastName: 1,
          avatar: 1,
          bio: 1,
        },
      },
    );
  },
  'user.methods.addAvatar': (avatar, email) => {
    check(avatar, Object);
    check(email, String);
    const user = Accounts.findUserByEmail(email);
    if (user) {
      Meteor.users.update(
        { _id: user._id },
        {
          $set: {
            avatar,
          },
        },
      );
    }
  },
  'user.methods.updateRatings': (type, postId, value) => {
    check(type, String);
    check(postId, String);
    check(value, Number);
    const userId = Meteor.userId();
    const obj = {};
    obj[postId] = value;
    if (userId) {
      Meteor.users.update(
        { _id: userId },
        {
          $set: {
            [type]: obj,
          },
        },
      );
    }
  },
});

// Publish additional field for admin user
// TODO: make sure what fields are public and accessible for everyone
Meteor.publish(null, () => {
  const userId = Meteor.userId();
  const meteorUser = userId && Meteor.user();
  let additionalFields = {
    firstName: 1,
    lastName: 1,
    bio: 1,
    avatar: 1,
    likes: 1,
    ratings: 1,
  };
  if (userId && meteorUser && meteorUser.adminUser) {
    additionalFields = { ...additionalFields, adminUser: 1 };
  }
  return Meteor.users.find({}, { fields: additionalFields });
});
