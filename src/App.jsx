import React, { useState, useEffect } from 'react';
import "../src/App.css"

const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.length >= 6) {
      setTodos([...todos, { text: input, id: Date.now() }]);
      setInput('');
    } else {
      alert('Kamida 6 ta belgidan iborat bo`lishi majburiy!');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearTodos = () => {
    setTodos([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Qo`shish</button>
      </div>
      <button className="clear-button" onClick={clearTodos}>Clear All</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <span className="delete" onClick={() => deleteTodo(todo.id)}>delete</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
