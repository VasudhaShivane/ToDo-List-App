// src/App.js

import React from 'react';
import TodoApp from './TodoApp';
import './App.css';

function App() {
  // Example: Enable localStorage integration
  const enableLocalStorage = true;

  return (
    <div className="App">
      <TodoApp enableLocalStorage={enableLocalStorage} />
    </div>
  );
}

export default App;
