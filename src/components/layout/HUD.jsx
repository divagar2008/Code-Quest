import React from 'react';
import { Key, Star, Flame } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { useAuth } from '../../context/AuthContext';
import './HUD.css';

export const HUD = () => {
  const { xp, keys, streak, level } = useGame();
  const { user } = useAuth();

  return (
    <header className="hud-container">
      <div className="hud-stats">
        <div className="hud-stat-item keys" title="Keys">
          <Key className="stat-icon" size={20} />
          <span className="stat-value">{keys}</span>
        </div>
        <div className="hud-stat-item xp" title="XP">
          <Star className="stat-icon" size={20} />
          <span className="stat-value">{xp}</span>
        </div>
        <div className="hud-stat-item streak" title="Day Streak">
          <Flame className="stat-icon" size={20} />
          <span className="stat-value">{streak}</span>
        </div>
      </div>

      <div className="hud-user">
        <div className="user-level">
          <span className="level-badge">Lvl {level}</span>
        </div>
        <div className="user-avatar-container">
          <img src={user?.avatar} alt="Avatar" className="user-avatar" />
        </div>
      </div>
    </header>
  );
};
