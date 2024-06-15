// src/TodoList.js

import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ tasks, removeTask, toggleTaskCompletion, editTask }) => {
  return (
    <div className="todo-list">
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          removeTask={removeTask}
          toggleTaskCompletion={toggleTaskCompletion}
          editTask={editTask} 
        />
      ))}
    </div>
  );
};

export default TodoList;
