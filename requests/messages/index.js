const { body } = require("express-validator");
const Models = require("../../models");

const createMessageRules = () => {
  return [
    body("conversation_id")
      .notEmpty()
      .withMessage("Please send conversation detail")
      .isInt()
      .withMessage("Conversation ID must be an integer"),
    body("content")
      .notEmpty()
      .withMessage("Please enter message or file")
      .isString()
      .withMessage("Content field must be a string"),
    body("type")
      .notEmpty()
      .withMessage("Please send valid message type")
      .isIn(['text', 'audio', 'video', 'image', 'file'])
      .withMessage('Invalid message type'),
  ];
};
const ResetPasswordRules = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Please enter email address")
      .exists()
      .trim()
      .toLowerCase()
      .isString()
      .withMessage("Please enter valid email address")
      .custom((val) => {
        return Models.User.findOne({ email: val }).then((resp) => {
          if (!resp)
            return Promise.reject("Account with this email does not exist");
        });
      }),

    body("password")
      .notEmpty()
      .withMessage("Please enter new password")
      .exists()
      .trim()
      .toLowerCase()
      .isString()
      .withMessage("Please enter valid new password"),
  ];
};

module.exports = {
  createMessageRules,
  ResetPasswordRules,
};
