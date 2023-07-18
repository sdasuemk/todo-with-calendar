const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    start: {
        type: String,
    },
    end: {
        type: String,
    }
})

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;