import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Gamepad2, ArrowRight } from 'lucide-react';
import './Landing.css';

export const Landing = () => {
  const navigate = useNavigate();

  const handleStartQuest = () => {
    navigate('/login');
  };

  return (
    <div className="landing-page">
      <div className="landing-nav">
        <div className="landing-brand">
          <Gamepad2 className="brand-icon" size={32} />
          <span className="brand-text">Code Quest</span>
        </div>
        <button className="btn-secondary" onClick={handleStartQuest}>Log In</button>
      </div>

      <div className="hero-section">
        <h1 className="hero-title">Level Up Your <span className="gradient-text">Coding Skills</span></h1>
        <p className="hero-subtitle">
          Turn your daily coding practice into an epic adventure. Complete challenges, earn XP, unlock levels, and climb the leaderboard!
        </p>
        <Link to="/login" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
          Enter the Quest
        </Link>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon xp-icon">⭐</div>
          <h3>Earn XP & Level Up</h3>
          <p>Complete daily challenges from syntax quizzes to boss battles and watch your rank grow.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon key-icon">🔑</div>
          <h3>Unlock New Worlds</h3>
          <p>Gather keys by solving problems to unlock advanced topics on the Quest Map.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon streak-icon">🔥</div>
          <h3>Maintain Your Streak</h3>
          <p>Build the habit. Code every day to keep your streak alive and earn exclusive badges.</p>
        </div>
      </div>
    </div>
  );
};
