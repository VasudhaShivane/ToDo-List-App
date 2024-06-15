// src/TodoForm.js

import React, { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ addTask, taskInput, setTaskInput }) => {
  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskInput.trim() !== '') {
      addTask(taskInput);
      setTaskInput('');
    } else {
      alert('Task text cannot be empty!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Enter task..."
        value={taskInput}
        onChange={handleInputChange}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TodoForm;
