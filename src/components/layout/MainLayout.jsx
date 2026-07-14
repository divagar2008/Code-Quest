import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { HUD } from './HUD';
import { useAuth } from '../../context/AuthContext';
import './MainLayout.css';
import './admin-theme.css';

export const MainLayout = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';

  return (
    <div className={`app-container ${isAdmin ? 'admin-theme' : ''}`}>
      <Sidebar />
      <div className="main-content">
        <HUD />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
