// controllers/todoController.js
const todoService = require('../services/todoListService');

const todoController = {
    getAllTodos: async (req, res) => {
        try {
            const todos = await todoService.getAllTodos();
            return res.status(200).json({ status: 200, data: todos });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    addTodo: async (req, res) => {
        const { task,  } = req.body;
        if (!task) {
            return res.status(400).json({ status: 400, error: 'task is required' });
        }
        try {
            const todo = await todoService.addTodo({ task,  });
            return res.status(200).json({ status: 200, data: todo });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    updateTodo: async (req, res) => {
        const { task, isCompleted } = req.body;
        try {
            const data = await todoService.updateTodo(req.params.id, { task, isCompleted });
            return res.status(200).json({ status: 200, data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    deleteTodo: async (req, res) => {
        try {
            const data = await todoService.deleteTodo(req.params.id);
            return res.status(200).json({ status: 200, data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    }
};

module.exports = todoController;
