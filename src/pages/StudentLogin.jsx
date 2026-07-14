import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <Gamepad2 size={48} className="login-icon" />
          <h2>Student Portal</h2>
          <p className="text-secondary">Enter the Code Quest</p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-msg">{error}</div>}
          
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              className="form-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@codequest.com"
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="form-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Start Journey
          </button>
        </form>

        <div className="alt-login-link">
          <Link to="/admin/login" className="text-accent">Admin Access &rarr;</Link>
        </div>
      </div>
    </div>
  );
};
