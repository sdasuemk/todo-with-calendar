const Todo = require('../schemas/models/Todo');
const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        const deletedTodo = await Todo.findByIdAndDelete(todoId);
    
        if (!deletedTodo) {
          return res.status(404).json({ error: 'Todo not found' });
        }
    
        res.status(204).json(deletedTodo);
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo', message: error.message });
      }
};

module.exports = deleteTodo