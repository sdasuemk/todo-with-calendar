const Todo = require('../schemas/models/Todo');
const updateTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, req.body, {
          new: true,
        });
    
        if (!updatedTodo) {
          return res.status(404).json({ error: 'Todo not found' });
        }
    
        res.status(200).json({ updatedTodo, status: 'success' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to update todo', message: error.message });
      } 
};

module.exports = updateTodo