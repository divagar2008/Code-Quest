import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export const AdminLogin = () => {
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
      navigate('/admin');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card" style={{ borderColor: 'rgba(255,100,100,0.2)' }}>
        <div className="login-header">
          <ShieldAlert size={48} className="admin-icon" />
          <h2 style={{ color: 'var(--color-danger)' }}>Admin Access</h2>
          <p className="text-secondary">Authorized Personnel Only</p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-msg">{error}</div>}
          
          <div className="form-group">
            <label>Admin Email</label>
            <input 
              type="email" 
              className="form-input admin-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@codequest.com"
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Master Password</label>
            <input 
              type="password" 
              className="form-input admin-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="btn" 
            style={{ 
              marginTop: '1rem', 
              backgroundColor: 'var(--color-danger)', 
              color: 'white',
              border: 'none'
            }}
          >
            Authenticate
          </button>
        </form>

        <div className="alt-login-link">
          <Link to="/login" className="text-secondary">&larr; Back to Student Portal</Link>
        </div>
      </div>
    </div>
  );
};
