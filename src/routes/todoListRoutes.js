const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoListController');

router.get('/', todoController.getAllTodos);
router.post('/', todoController.addTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);



module.exports = router;