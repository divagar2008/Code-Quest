import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { QuestMap } from './pages/QuestMap';
import { ChallengeScreen } from './pages/ChallengeScreen';
import { Leaderboard } from './pages/Leaderboard';
import { Profile } from './pages/Profile';
import { Landing } from './pages/Landing';
import { AdminDashboard } from './pages/AdminDashboard';
import { StudentLogin } from './pages/StudentLogin';
import { AdminLogin } from './pages/AdminLogin';
import { AuthProvider } from './context/AuthContext';
import { GameProvider } from './context/GameContext';

function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<StudentLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/map" element={<QuestMap />} />
              <Route path="/challenges" element={<ChallengeScreen />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;
