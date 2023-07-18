const Todo = require('../schemas/models/Todo');
const createTodo = async (req, res) => {
    try {
        const todo = new Todo({
          ...req.body
        });
        const newTodo = await todo.save();
        res.status(201).json({ newTodo, status: 'success' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to create todo', message: error.message });
      }
    
};

module.exports = createTodo