// src/components/TodoItem.js

import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ task, removeTask, toggleTaskCompletion, editTask }) => {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEdit = () => {
    editTask(task.id, editedText);
    setEditing(false);
  };

  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
      {!editing ? (
        <span onClick={() => toggleTaskCompletion(task.id)}>{task.text}</span>
      ) : (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      )}
      <div>
        {!editing ? (
          <button onClick={() => setEditing(true)}>Edit</button>
        ) : (
          <button onClick={handleEdit}>Save</button>
        )}
        <button onClick={() => removeTask(task.id)}>Remove</button>
      </div>
    </div>
  );
};

export default TodoItem;
