import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouting from './AppRouting';
import './styles/main.css';
import './styles/main-md.css';
import './styles/main-sm.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouting />
  </React.StrictMode>,
);
