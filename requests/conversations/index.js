const { body } = require('express-validator');
const Models = require('../../models');

const createConversationRules = () => {
  return [
    body('participants')
      .isArray({ min: 1 })
      .withMessage('Participants must be an array with at least one participant'),
    body('participants.*.user_id')
      .isInt()
      .withMessage('Participant user_id must be an integer'),
    body('is_group')
      .notEmpty()
      .withMessage('Please send conversation type')
      .isBoolean()
      .withMessage('Conversation type must be a boolean (true for group, false for single)'),
  ];
};

const RegistrationRules = () => {
  return [
    body('first_name')
      .notEmpty()
      .withMessage('Please enter first name')
      .exists()
      .trim()
      .toLowerCase()
      .isString()
      .withMessage('Please enter valid first name'),

    body('last_name')
      .notEmpty()
      .withMessage('Please enter last name')
      .exists()
      .trim()
      .toLowerCase()
      .isString()
      .withMessage('Please enter valid last name'),

    body('email')
      .notEmpty()
      .withMessage('Please enter email address')
      .exists()
      .trim()
      .toLowerCase()
      .isString()
      .withMessage('Please enter valid email address')
      .custom((val) => {
        return Models.Admin.findOne({ email: val }).then((resp) => {
          if (resp) return Promise.reject('Account already exist with this email, kindly try another email');
        });
      }),

    body('password')
      .notEmpty()
      .withMessage('Please enter password')
      .exists()
      .trim()
      .toLowerCase()
      .isString()
      .withMessage('Please enter valid password'),

    body('phone_number')
      .notEmpty()
      .withMessage('Please enter phone number')
      .exists()
      .trim()
      .toLowerCase()
      .isString()
      .withMessage('Please enter valid phone number'),
  ];
};
module.exports = {
  createConversationRules,
  RegistrationRules,
};
