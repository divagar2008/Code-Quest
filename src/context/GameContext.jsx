import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const { user, token } = useAuth();
  
  const [xp, setXp] = useState(0);
  const [keys, setKeys] = useState(0);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState([]);
  const [unlockedNodes, setUnlockedNodes] = useState([1, 2, 3]); // Mock map progression

  // Sync state when user updates
  useEffect(() => {
    if (user) {
      setXp(user.xp || 0);
      setKeys(user.keys || 0);
      setStreak(user.streak || 0);
      setLevel(Math.floor((user.xp || 0) / 500) + 1);
      setBadges(user.badges || []);
    }
  }, [user]);

  // Mock unlock logic for frontend map
  const unlockNode = (nodeId, cost) => {
    if (keys >= cost && !unlockedNodes.includes(nodeId)) {
      setKeys(prev => prev - cost);
      setUnlockedNodes(prev => [...prev, nodeId]);
      return true;
    }
    return false;
  };

  const submitChallenge = async (challengeId, passed, score) => {
    if (!token) {
      // Mock fallback
      if (passed) {
        setXp(prev => prev + 150);
        setKeys(prev => prev + 1);
      }
      return { success: passed };
    }

    try {
      const response = await fetch('http://localhost:5000/api/challenges/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ challengeId, passed, score })
      });
      const data = await response.json();
      
      if (data.success) {
        setXp(data.newXp);
        setKeys(data.keys);
        setLevel(Math.floor(data.newXp / 500) + 1);
      }
      return data;
    } catch (err) {
      console.error(err);
      return { success: false, error: err.message };
    }
  };

  return (
    <GameContext.Provider value={{ xp, keys, streak, level, badges, unlockedNodes, submitChallenge, unlockNode }}>
      {children}
    </GameContext.Provider>
  );
};
