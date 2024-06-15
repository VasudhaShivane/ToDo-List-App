// src/TodoApp.js

import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import './TodoApp.css';

const TodoApp = ({ enableLocalStorage }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [taskInput, setTaskInput] = useState('');
  const [sortBy, setSortBy] = useState(null); // State to track sorting option

  // Load tasks from localStorage on component mount
  useEffect(() => {
    if (enableLocalStorage) {
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      setTasks(savedTasks);
    }
  }, [enableLocalStorage]);

  // Save tasks to localStorage whenever tasks state changes
  const saveTasksToLocalStorage = () => {
    if (enableLocalStorage) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      alert('Tasks saved to localStorage!');
    }
  };

  // Adding task function with input validation
  const addTask = (taskText) => {
    if (taskText.trim() !== '') {
      const newTask = { id: Date.now(), text: taskText.trim(), completed: false };
      setTasks([...tasks, newTask]);
      setTaskInput(''); // Clear input field after adding task
    } else {
      alert('Task text cannot be empty!');
    }
  };

  // Removing task function
  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Toggling task completion
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Editing task function
  const editTask = (id, newText) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const handleSort = (option) => {
    let sortedTasks = [...tasks];
    switch (option) {
      case 'textAsc':
        sortedTasks.sort((a, b) => a.text.localeCompare(b.text));
        break;
      case 'textDesc':
        sortedTasks.sort((a, b) => b.text.localeCompare(a.text));
        break;
      default:
        break;
    }
    setSortBy(option);
    setTasks(sortedTasks);
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'Completed':
        return tasks.filter(task => task.completed);
      case 'Incomplete':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  };

  const sortedTasks = sortBy ? tasks : getFilteredTasks();

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <div className="todo-form-container">
        <TodoForm 
          addTask={addTask} 
          taskInput={taskInput} 
          setTaskInput={setTaskInput} 
        />
      </div>
      <div className="filter-buttons">
        <button onClick={() => setFilter('All')} className={filter === 'All' ? 'active' : ''}>All</button>
        <button onClick={() => setFilter('Completed')} className={filter === 'Completed' ? 'active' : ''}>Completed</button>
        <button onClick={() => setFilter('Incomplete')} className={filter === 'Incomplete' ? 'active' : ''}>Incomplete</button>
      </div>
      <div className="sort-options">
        <select value={sortBy} onChange={(e) => handleSort(e.target.value)}>
          <option value="">sort...</option>
          <option value="textAsc"> A-Z</option>
          <option value="textDesc">Z-A</option>
        </select>
      </div>
      <div className="todo-list-container">
        <TodoList 
          tasks={sortedTasks} 
          removeTask={removeTask} 
          toggleTaskCompletion={toggleTaskCompletion} 
          editTask={editTask}
        />
      </div>
      <div className="save-button">
        <button onClick={saveTasksToLocalStorage}>Save to Local Storage</button>
      </div>
    </div>
  );
};

export default TodoApp;
