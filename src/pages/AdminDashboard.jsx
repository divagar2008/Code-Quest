import React, { useState, useEffect } from 'react';
import { Users, Code, Activity, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import './AdminDashboard.css';

export const AdminDashboard = () => {
  const { user, token } = useAuth();

  if (user?.role !== 'Admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchStudents = async () => {
      if (!token) return;
      try {
        const response = await fetch('http://localhost:5000/api/admin/students', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [token]);

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1 className="gradient-text">Admin Dashboard</h1>
        <p className="subtitle">Manage challenges, users, and platform analytics.</p>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card card">
          <Users className="stat-icon" size={24} />
          <div className="stat-info">
            <span className="stat-value">2,450</span>
            <span className="stat-label">Active Students</span>
          </div>
        </div>
        <div className="admin-stat-card card">
          <Code className="stat-icon" size={24} />
          <div className="stat-info">
            <span className="stat-value">124</span>
            <span className="stat-label">Total Challenges</span>
          </div>
        </div>
        <div className="admin-stat-card card">
          <Activity className="stat-icon" size={24} />
          <div className="stat-info">
            <span className="stat-value">89%</span>
            <span className="stat-label">Completion Rate</span>
          </div>
        </div>
      </div>

      <div className="admin-grid">
        <div className="card">
          <div className="card-header">
            <h2>Recent Submissions</h2>
            <button className="btn-secondary btn-sm">View All</button>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Challenge</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alex Coder</td>
                <td>Array Reversal</td>
                <td><span className="status-badge success">Passed</span></td>
              </tr>
              <tr>
                <td>Sarah Hacks</td>
                <td>React Hooks</td>
                <td><span className="status-badge success">Passed</span></td>
              </tr>
              <tr>
                <td>Byte Ninja</td>
                <td>Graph Traversal</td>
                <td><span className="status-badge fail">Failed</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Top Students</h2>
            <button className="btn-secondary btn-sm">Manage</button>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>XP</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, i) => (
                <tr key={i}>
                  <td>{student.name}</td>
                  <td className="xp-text">{student.xp}</td>
                  <td>{student._count?.submissions || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
