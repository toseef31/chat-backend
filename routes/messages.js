const express = require('express');
const { createMessage, getMessagesByConversationId, updateMessage, softDeleteMessage } = require('../controllers/messageController');
const { validate } = require('../requests/validate');
const { createMessageRules } = require('../requests/messages');

const messageRouter = express.Router();

messageRouter.get('/:id', getMessagesByConversationId);
messageRouter.post(
  '/create', 
  createMessage);
messageRouter.delete('/:id', softDeleteMessage);
messageRouter.patch('/:id', updateMessage);

module.exports = messageRouter;
