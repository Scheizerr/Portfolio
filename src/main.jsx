import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';

console.log('ReactDOM object:', ReactDOM);
console.log('createRoot method:', ReactDOM.createRoot);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);