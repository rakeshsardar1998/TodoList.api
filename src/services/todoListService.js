// services/todoService.js
const models = require('../models');

const todoService = {
    getAllTodos: async () => {
        try {
            const todos = await models.Todo.findAll({
                order: [['createdAt', 'DESC']]
            });
            return todos;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    addTodo: async (todoData) => {
        try {
            const todo = await models.Todo.create(todoData);
            return todo;
        } catch (error) {
            throw new Error('Failed to add todo');
        }
    },
    updateTodo: async (id, todoData) => {
        try {
            const [rowsAffected, updatedTodos] = await models.Todo.update(todoData, {
                where: { id }
            });
            if (rowsAffected > 0) {
                return 'Todo updated successfully';
            } else {
                return 'No todos found matching the condition';
            }
        } catch (error) {
            throw new Error('Failed to update todo');
        }
    },
    deleteTodo: async (id) => {
        try {
            const rowsAffected = await models.Todo.destroy({
                where: { id }
            });
            if (rowsAffected > 0) {
                return 'Todo deleted successfully';
            } else {
                return 'No todos found matching the condition';
            }
        } catch (error) {
            throw new Error('Failed to delete todo');
        }
    }
};

module.exports = todoService;
