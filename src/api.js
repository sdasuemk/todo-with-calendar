import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

export const createTodo = (data) => {
    return api.post('/todo/create-todo', data);
  };

export const getTodos = () => {
    return api.get('/todo/listed-todo');
  };

export const completeTodo = (id, data) => {
    return api.put(`/todo/complete-todo/${id}`, data);
  };

  export const deleteTodo = (id) => {
    return api.delete(`/todo/delete-todo/${id}`);
  };