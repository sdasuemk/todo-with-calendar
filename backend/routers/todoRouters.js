const express = require('express');
const todoRouter = express.Router();
const createTodo = require('../controllers/createTodo');
const getTodo = require('../controllers/getTodo');
const updateTodo = require('../controllers/updateTodo');
const deleteTodo = require('../controllers/deleteTodo');

todoRouter.post('/create-todo',createTodo);
todoRouter.get('/listed-todo',getTodo);
todoRouter.put('/complete-todo/:id',updateTodo);
todoRouter.delete('/delete-todo/:id',deleteTodo);

module.exports = todoRouter;