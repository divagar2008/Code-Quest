import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Code2, Medal } from 'lucide-react';
import { useGame } from '../context/GameContext';
import './Dashboard.css';

export const Dashboard = () => {
  const { xp, level, badges } = useGame();

  const todayChallenge = {
    day: 'Wednesday',
    type: 'Coding Problem',
    difficulty: 'Medium',
    reward: 150,
    title: 'Array Reversal Algorithm',
  };

  return (
    <div className="dashboard-page">
      <h1 className="gradient-text">Welcome back, Quester!</h1>
      <p className="subtitle">You're making great progress. Ready for today's challenge?</p>

      <div className="dashboard-grid">
        <section className="main-challenge-card card">
          <div className="card-header">
            <h2>Today's Quest</h2>
            <span className="difficulty-badge">{todayChallenge.difficulty}</span>
          </div>
          
          <div className="challenge-details">
            <div className="challenge-type">
              <Code2 className="accent-icon" />
              <span>{todayChallenge.type}</span>
            </div>
            <h3 className="challenge-title">{todayChallenge.title}</h3>
            <div className="challenge-reward">
              <Medal className="reward-icon" size={16} />
              <span>+{todayChallenge.reward} XP / 1 Key</span>
            </div>
          </div>

          <Link to="/challenges" className="btn-primary start-quest-btn">
            <Play size={18} /> Start Quest
          </Link>
        </section>

        <section className="progress-card card">
          <h2>Level {level} Progress</h2>
          <div className="xp-bar-container">
            <div className="xp-bar-fill" style={{ width: `${(xp % 500) / 500 * 100}%` }}></div>
          </div>
          <p className="xp-text">{xp % 500} / 500 XP to next level</p>
          
          <h3 className="recent-badges-title">Recent Badges</h3>
          <div className="badges-row">
            {badges.slice(0, 3).map((badge, idx) => (
              <div key={idx} className="badge-item" title={badge}>
                <Medal size={24} className="badge-icon" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
