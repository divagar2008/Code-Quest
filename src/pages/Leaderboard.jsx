import React, { useState } from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import './Leaderboard.css';

export const Leaderboard = () => {
  const [filter, setFilter] = useState('global');

  const leaderboardData = [
    { rank: 1, name: 'Alex Coder', xp: 1250, streak: 5, change: 'up', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
    { rank: 2, name: 'Sarah Hacks', xp: 1100, streak: 12, change: 'same', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    { rank: 3, name: 'Byte Ninja', xp: 950, streak: 3, change: 'down', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ninja' },
    { rank: 4, name: 'Code Master', xp: 820, streak: 7, change: 'up', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Master' },
    { rank: 5, name: 'Data Wizard', xp: 700, streak: 2, change: 'up', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wizard' },
  ];

  return (
    <div className="leaderboard-page">
      <div className="header-section">
        <h1 className="gradient-text">Leaderboard</h1>
        
        <div className="filter-tabs">
          <button 
            className={`filter-btn ${filter === 'global' ? 'active' : ''}`}
            onClick={() => setFilter('global')}
          >
            Global
          </button>
          <button 
            className={`filter-btn ${filter === 'friends' ? 'active' : ''}`}
            onClick={() => setFilter('friends')}
          >
            Friends
          </button>
        </div>
      </div>

      <div className="podium-section">
        <div className="podium-place second">
          <img src={leaderboardData[1].avatar} alt="" className="podium-avatar" />
          <div className="podium-bar">2nd</div>
          <span className="podium-name">{leaderboardData[1].name}</span>
        </div>
        <div className="podium-place first">
          <Trophy className="first-icon" size={32} />
          <img src={leaderboardData[0].avatar} alt="" className="podium-avatar" />
          <div className="podium-bar">1st</div>
          <span className="podium-name">{leaderboardData[0].name}</span>
        </div>
        <div className="podium-place third">
          <img src={leaderboardData[2].avatar} alt="" className="podium-avatar" />
          <div className="podium-bar">3rd</div>
          <span className="podium-name">{leaderboardData[2].name}</span>
        </div>
      </div>

      <div className="leaderboard-table-container card">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>XP</th>
              <th>Streak</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((player) => (
              <tr key={player.rank} className={player.rank === 1 ? 'highlight-row' : ''}>
                <td className="rank-cell">#{player.rank}</td>
                <td className="player-cell">
                  <img src={player.avatar} alt="avatar" className="row-avatar" />
                  <span>{player.name}</span>
                </td>
                <td className="xp-cell">{player.xp}</td>
                <td className="streak-cell">🔥 {player.streak}</td>
                <td className="trend-cell">
                  {player.change === 'up' && <TrendingUp className="trend-up" size={18} />}
                  {player.change === 'down' && <TrendingDown className="trend-down" size={18} />}
                  {player.change === 'same' && <Minus className="trend-same" size={18} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
