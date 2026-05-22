import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LessonsPage from './pages/LessonsPage';
import LessonDetailPage from './pages/LessonDetailPage';
import PlaygroundPage from './pages/PlaygroundPage';
import ProblemsPage from './pages/ProblemsPage';
import ProblemDetailPage from './pages/ProblemDetailPage';
import PatternsPage from './pages/PatternsPage';
import VisualizerPage from './pages/VisualizerPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';

function AppContent() {
  const [username, setUsername] = useState(localStorage.getItem('zto_username') || '');
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {!isHome && <Navbar username={username} onLogout={() => { setUsername(''); localStorage.removeItem('zto_username'); }} />}
      <Routes>
        <Route path="/" element={<HomePage username={username} setUsername={setUsername} />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/lessons/:id" element={<LessonDetailPage username={username} />} />
        <Route path="/playground" element={<PlaygroundPage />} />
        <Route path="/patterns" element={<PatternsPage />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/problems/:id" element={<ProblemDetailPage username={username} />} />
        <Route path="/visualizer" element={<VisualizerPage />} />
        <Route path="/dashboard" element={<DashboardPage username={username} />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
