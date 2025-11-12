import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  const handleLogin = async (formData) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      // Handle successful login (e.g., store token, redirect)
      return data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route 
              path="/login" 
              element={<LoginForm onSubmit={handleLogin} />} 
            />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;






