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
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 60, textAlign: 'center' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 12px' }}>Progress Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
          Enter your name on the home page to start tracking your progress.
        </p>
        <Link to="/" className="btn btn-primary">Go to Home</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: 40 }}>
        <div className="skeleton" style={{ height: 40, width: '40%', marginBottom: 24 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 100 }} />)}
        </div>
        <div className="skeleton" style={{ height: 300 }} />
      </div>
    );
  }

  const totalLessons = stats?.totalLessons || 0;
  const totalProblems = stats?.totalProblems || 0;
  const completedLessons = stats?.completedLessons || 0;
  const completedProblems = stats?.completedProblems || 0;
  const lessonProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const problemProgress = totalProblems > 0 ? Math.round((completedProblems / totalProblems) * 100) : 0;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 24px' }}>
        Welcome back, <span className="gradient-text">{username}</span>
      </h1>

      {/* STATS CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
        marginBottom: 32
      }}>
        <div className="card" style={{ textAlign: 'center', padding: 24 }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--primary-light)' }}>{completedLessons}</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Lessons Completed</div>
          <div style={{ marginTop: 12 }}>
            <div style={{
              height: 6,
              background: 'var(--bg-tertiary)',
              borderRadius: 3,
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${lessonProgress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--primary), var(--accent))',
                borderRadius: 3,
                transition: 'width 1s ease'
              }} />
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{lessonProgress}% complete</div>
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: 24 }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--accent)' }}>{completedProblems}</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Problems Solved</div>
          <div style={{ marginTop: 12 }}>
            <div style={{
              height: 6,
              background: 'var(--bg-tertiary)',
              borderRadius: 3,
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${problemProgress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--accent), var(--success))',
                borderRadius: 3,
                transition: 'width 1s ease'
              }} />
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{problemProgress}% complete</div>
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: 24 }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--success)' }}>{completedLessons + completedProblems}</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Total Items Done</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 8 }}>
            of {totalLessons + totalProblems} total
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: 24 }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--warning)' }}>
            {totalLessons + totalProblems - completedLessons - completedProblems}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Remaining</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 8 }}>
            Keep going! You're making progress
          </div>
        </div>
      </div>

      {/* RECENT LESSONS */}
      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>Curriculum Overview</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {lessons.slice(0, 20).map((lesson, i) => {
            const done = progress.some(p => p.item_id === lesson.id && p.completed);
            return (
              <Link key={lesson.id} to={`/lessons/${lesson.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '8px 12px',
                  borderRadius: 'var(--radius)',
                  transition: 'var(--transition)',
                  cursor: 'pointer'
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    background: done ? 'rgba(16,185,129,0.15)' : 'var(--bg-tertiary)',
                    color: done ? 'var(--success)' : 'var(--text-muted)'
                  }}>
                    {done ? '✓' : i + 1}
                  </span>
                  <span style={{
                    flex: 1,
                    fontSize: 13,
                    color: done ? 'var(--text-muted)' : 'var(--text-primary)',
                    textDecoration: done ? 'line-through' : 'none'
                  }}>
                    {lesson.title}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{lesson.category}</span>
                </div>
              </Link>
            );
          })}
        </div>
        <Link to="/lessons" className="btn btn-sm btn-secondary" style={{ marginTop: 16 }}>
          View All Lessons →
        </Link>
      </div>
    </div>
  );
}
