import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function DashboardPage({ username }) {
  const [stats, setStats] = useState(null);
  const [progress, setProgress] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) { setLoading(false); return; }
    Promise.all([
      fetch('/api/lessons').then(r => r.json()),
      fetch(`/api/progress/${username}`).then(r => r.json()),
      fetch(`/api/progress/${username}/stats`).then(r => r.json())
    ])
      .then(([lessonsData, progressData, statsData]) => {
        setLessons(lessonsData);
        setProgress(progressData);
        setStats(statsData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  if (!username) {
    return (
      <div className="container" style={{ paddingTop: 60, textAlign: 'center' }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 8px' }}>Progress Dashboard</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 24px' }}>
          Enter your name on the home page to start tracking.
        </p>
        <Link to="/" className="btn btn-primary">Go to Home</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: 40 }}>
        <div className="skeleton" style={{ height: 36, width: '30%', marginBottom: 24 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 28 }}>
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 90 }} />)}
        </div>
        <div className="skeleton" style={{ height: 300 }} />
      </div>
    );
  }

  const totalLessons = stats?.totalLessons || 0;
  const totalProblems = stats?.totalProblems || 0;
  const completedLessons = stats?.completedLessons || 0;
  const completedProblems = stats?.completedProblems || 0;
  const lessonPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const problemPct = totalProblems > 0 ? Math.round((completedProblems / totalProblems) * 100) : 0;

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 60 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 24px' }}>
        {username}
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 10,
        marginBottom: 32
      }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{completedLessons}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>lessons done</div>
          <div style={{ marginTop: 10, height: 4, background: 'var(--bg-tertiary)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ width: `${lessonPct}%`, height: '100%', background: 'var(--text-primary)', borderRadius: 2, transition: 'width 0.6s ease' }} />
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 3 }}>{lessonPct}%</div>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{completedProblems}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>problems solved</div>
          <div style={{ marginTop: 10, height: 4, background: 'var(--bg-tertiary)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ width: `${problemPct}%`, height: '100%', background: 'var(--text-primary)', borderRadius: 2, transition: 'width 0.6s ease' }} />
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 3 }}>{problemPct}%</div>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{completedLessons + completedProblems}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>total done</div>
          <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 6 }}>of {totalLessons + totalProblems} total</div>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
            {totalLessons + totalProblems - completedLessons - completedProblems}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>remaining</div>
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Lessons</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {lessons.slice(0, 20).map((lesson) => {
            const done = progress.some(p => p.item_id === lesson.id && p.completed);
            return (
              <Link key={lesson.id} to={`/lessons/${lesson.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '6px 10px', borderRadius: 'var(--radius)',
                  cursor: 'pointer', transition: 'var(--transition)'
                }}
                  className="card-hover"
                >
                  <span style={{
                    width: 20, height: 20, borderRadius: 4,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10,
                    background: done ? 'var(--success)' : 'var(--bg-tertiary)',
                    color: done ? 'var(--bg-primary)' : 'var(--text-muted)',
                    fontWeight: 600
                  }}>{done ? '✓' : ''}</span>
                  <span style={{
                    flex: 1, fontSize: 13,
                    color: done ? 'var(--text-muted)' : 'var(--text-primary)',
                  }}>{lesson.title}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{lesson.category}</span>
                </div>
              </Link>
            );
          })}
        </div>
        <Link to="/lessons" className="btn btn-ghost btn-sm" style={{ marginTop: 12 }}>
          View all lessons
        </Link>
      </div>
    </div>
  );
}
