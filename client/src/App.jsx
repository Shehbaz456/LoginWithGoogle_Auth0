import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './Components/Home.jsx';
import Headers from './Components/Headers.jsx';
import Login from './Components/Login.jsx';
import Dashboard from './Components/Dashboard.jsx';
import Error from './Components/Error.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check user authentication status
  const checkAuth = async () => {
    try {
      const response = await axios.get('http://localhost:8000/login/success', { withCredentials: true });
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
