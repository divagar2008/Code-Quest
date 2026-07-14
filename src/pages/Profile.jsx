import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import { Settings, LogOut, Medal, Target, Zap } from 'lucide-react';
import './Profile.css';

export const Profile = () => {
  const { user, logout } = useAuth();
  const { xp, level, streak, badges } = useGame();

  // Heatmap mock data
  const generateHeatmap = () => {
    return Array.from({ length: 35 }).map((_, i) => ({
      date: `Day ${i+1}`,
      completed: Math.random() > 0.3
    }));
  };
  const heatmap = generateHeatmap();

  return (
    <div className="profile-page">
      <div className="profile-header card">
        <div className="profile-info-main">
          <img src={user?.avatar} alt="Profile" className="profile-avatar-large" />
          <div className="profile-details">
            <h1>{user?.name}</h1>
            <span className="profile-role">{user?.role}</span>
          </div>
        </div>
        <div className="profile-actions">
          <button className="btn-secondary btn-icon" title="Settings"><Settings size={20} /></button>
          <button className="btn-secondary btn-icon" title="Log Out" onClick={logout}><LogOut size={20} /></button>
        </div>
      </div>

      <div className="profile-stats-grid">
        <div className="stat-card card">
          <div className="stat-icon-wrapper xp"><Zap size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Total XP</span>
            <span className="stat-value">{xp}</span>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon-wrapper level"><Target size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Current Level</span>
            <span className="stat-value">{level}</span>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon-wrapper streak"><Medal size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Badges Earned</span>
            <span className="stat-value">{badges.length}</span>
          </div>
        </div>
      </div>

      <div className="content-grid">
        <div className="streak-section card">
          <h2>Activity Streak</h2>
          <div className="streak-header-info">
            <span className="current-streak">🔥 {streak} Days</span>
            <span className="longest-streak">Longest: 14 Days</span>
          </div>
          <div className="heatmap-grid">
            {heatmap.map((day, i) => (
              <div 
                key={i} 
                className={`heatmap-cell ${day.completed ? 'active' : ''}`}
                title={day.date}
              ></div>
            ))}
          </div>
        </div>

        <div className="badges-section card">
          <h2>Badge Showcase</h2>
          <div className="badges-grid-large">
            {badges.map((badge, i) => (
              <div key={i} className="badge-item-large">
                <Medal size={32} className="badge-icon-large" />
                <span className="badge-name">{badge}</span>
              </div>
            ))}
            {/* Locked badges placeholder */}
            <div className="badge-item-large locked">
              <Medal size={32} />
              <span className="badge-name">Boss Slayer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
