import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Map, Trophy, User, Shield, Gamepad2, Code2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

export const Sidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/dashboard', label: 'Home', icon: <Home size={20} /> },
    { path: '/map', label: 'Quest Map', icon: <Map size={20} /> },
    { path: '/challenges', label: 'Daily Challenge', icon: <Code2 size={20} /> },
    { path: '/leaderboard', label: 'Leaderboard', icon: <Trophy size={20} /> },
    { path: '/profile', label: 'Profile', icon: <User size={20} /> },
  ];

  if (user?.role === 'Admin') {
    navItems.push({ path: '/admin', label: 'Admin', icon: <Shield size={20} /> });
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Gamepad2 className="brand-icon" size={28} />
        <span className="brand-text">Code Quest</span>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer" style={{ marginTop: 'auto', padding: '0 1rem 1rem 1rem' }}>
        <button 
          onClick={logout}
          className="nav-item" 
          style={{ width: '100%', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--color-danger)', display: 'flex', gap: '0.75rem', alignItems: 'center', background: 'transparent' }}
        >
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </span>
          <span className="nav-label" style={{ margin: 0 }}>Logout</span>
        </button>
      </div>
    </aside>
  );
};
