import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LessonsPage from './pages/LessonsPage';
import LessonDetailPage from './pages/LessonDetailPage';
import PlaygroundPage from './pages/PlaygroundPage';
import ProblemsPage from './pages/ProblemsPage';
import ProblemDetailPage from './pages/ProblemDetailPage';
import PatternsPage from './pages/PatternsPage';
import PatternDetailPage from './pages/PatternDetailPage';
import VisualizerPage from './pages/VisualizerPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';

function WakeUpOverlay({ onReady }) {
  const [dots, setDots] = useState('');
  useEffect(() => {
    let cancelled = false;
    const tryPing = () => {
      fetch('/api/patterns')
        .then(r => { if (r.ok && !cancelled) onReady(); })
        .catch(() => { if (!cancelled) setTimeout(tryPing, 3000); });
    };
    tryPing();
    const t = setInterval(() => setDots(d => d.length >= 6 ? '' : d + '.'), 500);
    return () => { cancelled = true; clearInterval(t); };
  }, [onReady]);
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', gap: 16
    }}>
      <div style={{ width: 36, height: 36, border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>Warming up server{dots}</p>
    </div>
  );
}

function AppContent() {
  const [username, setUsername] = useState(localStorage.getItem('zto_username') || '');
  const [backendReady, setBackendReady] = useState(false);
  const [pinged, setPinged] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (pinged) return;
    setPinged(true);
    fetch('/api/patterns', { signal: AbortSignal.timeout(8000) })
      .then(r => { if (r.ok) setBackendReady(true); })
      .catch(() => setTimeout(() => setBackendReady(true), 1000));
  }, [pinged]);

  if (!backendReady) return <WakeUpOverlay onReady={() => setBackendReady(true)} />;

  return (
    <div style={{ minHeight: '100vh' }}>
      {!isHome && <Navbar username={username} onLogout={() => { setUsername(''); localStorage.removeItem('zto_username'); }} />}
      <Routes>
        <Route path="/" element={<HomePage username={username} setUsername={setUsername} />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/lessons/:id" element={<LessonDetailPage username={username} />} />
        <Route path="/playground" element={<PlaygroundPage />} />
        <Route path="/patterns" element={<PatternsPage />} />
        <Route path="/patterns/:id" element={<PatternDetailPage />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/problems/:id" element={<ProblemDetailPage username={username} />} />
        <Route path="/visualizer" element={<VisualizerPage />} />
        <Route path="/dashboard" element={<DashboardPage username={username} />} />
        <Route path="/profile" element={<ProfilePage username={username} />} />
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
