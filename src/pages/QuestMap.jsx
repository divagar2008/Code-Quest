import React from 'react';
import { Lock, Unlock, CheckCircle } from 'lucide-react';
import { useGame } from '../context/GameContext';
import './QuestMap.css';

export const QuestMap = () => {
  const { unlockedNodes, level } = useGame();

  const nodes = [
    { id: 1, title: 'Syntax Basics', type: 'Python', status: 'completed' },
    { id: 2, title: 'Control Flow', type: 'Python', status: 'completed' },
    { id: 3, title: 'Functions', type: 'Python', status: 'unlocked' },
    { id: 4, title: 'Data Structures', type: 'Python', status: 'locked', reqKeys: 5 },
    { id: 5, title: 'Algorithms I', type: 'Logic', status: 'locked', reqKeys: 10 },
  ];

  return (
    <div className="map-page">
      <div className="map-header">
        <h1 className="gradient-text">Quest Map</h1>
        <p className="subtitle">Follow the path to master your skills.</p>
      </div>

      <div className="quest-path-container">
        {nodes.map((node, index) => (
          <div key={node.id} className={`node-wrapper ${node.status}`}>
            <div className={`node ${node.status === 'unlocked' ? 'pulse-node' : ''}`}>
              {node.status === 'completed' && <CheckCircle size={24} className="node-icon" />}
              {node.status === 'unlocked' && <Unlock size={24} className="node-icon" />}
              {node.status === 'locked' && <Lock size={24} className="node-icon" />}
            </div>
            
            <div className="node-info card">
              <span className={`node-type type-${node.type.toLowerCase()}`}>{node.type}</span>
              <h3 className="node-title">{node.title}</h3>
              {node.status === 'locked' && (
                <div className="node-req">
                  Requires {node.reqKeys} Keys 🔑
                </div>
              )}
            </div>

            {index < nodes.length - 1 && (
              <div className={`path-connector ${nodes[index + 1].status !== 'locked' ? 'active-path' : ''}`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
