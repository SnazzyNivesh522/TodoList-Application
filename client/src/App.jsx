import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import Todo from './components/Todo';
import "./App.css";

function App() {
  // Check if user is authenticated
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Routes>
      
      <Route path="/" element={isAuthenticated ? <Todo /> : <Navigate to="/login" />} />
      
      
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />

      {/* Catch-all route for any undefined paths (404 handling) */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
    </Routes>
  );
}

export default App;
