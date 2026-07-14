import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Check, AlertCircle } from 'lucide-react';
import { useGame } from '../context/GameContext';
import './ChallengeScreen.css';

export const ChallengeScreen = () => {
  const { submitChallenge } = useGame();
  const [code, setCode] = useState('def reverse_array(arr):\n    # Write your code here\n    pass');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('idle'); // idle, running, success, fail

  const handleRun = () => {
    setStatus('running');
    setOutput('Running test cases...');
    
    // Simulate code execution
    setTimeout(() => {
      if (code.includes('return') && code.includes('[::-1]')) {
        setStatus('success');
        setOutput('All test cases passed! \n[1, 2, 3] -> [3, 2, 1]\n[4, 5] -> [5, 4]');
      } else {
        setStatus('fail');
        setOutput('Test Case 1 Failed: Expected [3, 2, 1], got None');
      }
    }, 1500);
  };

  const handleSubmit = async () => {
    if (status === 'success') {
      // Hardcode challenge ID or fetch it dynamically
      const result = await submitChallenge('mock-challenge-id', true, 100);
      if (result.success) {
        alert(`Quest Complete! +${result.reward || 150} XP`);
      } else {
        alert('Quest Complete! (Mock fallback)');
      }
    } else {
      alert('You must pass all test cases first!');
    }
  };

  return (
    <div className="challenge-page">
      <div className="problem-panel">
        <div className="problem-header">
          <span className="difficulty-badge medium">Medium</span>
          <h2>Array Reversal Algorithm</h2>
        </div>
        
        <div className="problem-content">
          <p>Write a function <code>reverse_array(arr)</code> that takes a list of integers and returns a new list with the elements in reverse order.</p>
          
          <h3>Example 1:</h3>
          <pre><code>Input: arr = [1, 2, 3, 4]
Output: [4, 3, 2, 1]</code></pre>

          <h3>Constraints:</h3>
          <ul>
            <li><code>1 &lt;= arr.length &lt;= 10^5</code></li>
            <li>Do not use the built-in reverse method directly if you can avoid it!</li>
          </ul>
        </div>
      </div>

      <div className="editor-panel">
        <div className="editor-header">
          <span className="file-name">solution.py</span>
          <div className="editor-actions">
            <button className="btn-secondary btn-sm" onClick={handleRun}>
              <Play size={14} /> Run Code
            </button>
            <button className="btn-primary btn-sm" onClick={handleSubmit}>
              <Check size={14} /> Submit
            </button>
          </div>
        </div>
        
        <div className="editor-container">
          <Editor
            height="100%"
            defaultLanguage="python"
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val)}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: 'Fira Code',
              lineHeight: 24,
              padding: { top: 16 }
            }}
          />
        </div>

        <div className="console-panel">
          <div className="console-header">
            <span>Console Output</span>
            {status === 'success' && <span className="status-text success">Passed</span>}
            {status === 'fail' && <span className="status-text fail">Failed</span>}
          </div>
          <div className={`console-output ${status}`}>
            {output || 'Ready to run...'}
          </div>
        </div>
      </div>
    </div>
  );
};
