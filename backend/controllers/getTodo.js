const Todo = require('../schemas/models/Todo');
const getTodo = async (req, res) => {
    try {
        const todoList = await Todo.find();
        res.status(200).json({ todoList, status: 'success' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos', message: error.message });
      }
};

module.exports = getTodo