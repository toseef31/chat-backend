const express = require('express');
const { getAllConversations, createConversation, getConversationById, softDeleteConversation, updateConversation } = require('../controllers/conversationsController');
const { validate } = require('../requests/validate');
const { createConversationRules } = require('../requests/conversations');

const conversationRouter = express.Router();

conversationRouter.get('/', getAllConversations);
conversationRouter.post(
  '/create', 
  createConversationRules(),
  validate, 
  createConversation);
conversationRouter.get('/:id', getConversationById);
conversationRouter.delete('/:id', softDeleteConversation);
conversationRouter.patch('/:id', updateConversation);

module.exports = conversationRouter;
