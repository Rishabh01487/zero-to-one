import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BADGES = [
  { min: 0, title: 'कोडयात्री (Koda-Yātrī)', en: 'Code Traveler' },
  { min: 20, title: 'कोडशिष्य (Koda-Śiṣya)', en: 'Code Disciple' },
  { min: 40, title: 'तर्कशिष्य (Tarka-Śiṣya)', en: 'Logic Disciple' },
  { min: 60, title: 'गणनवीर (Gaṇanavīra)', en: 'Calculation Warrior' },
  { min: 80, title: 'अल्गोरिद्माचार्य (Algorithm-Āchārya)', en: 'Algorithm Master' },
  { min: 100, title: 'महाकोडऋषि (Mahā-Koda-Ṛṣi)', en: 'Great Code Sage' },
];

function getBadge(solved) {
  let badge = BADGES[0];
  for (const b of BADGES) {
    if (solved >= b.min) badge = b;
  }
  return badge;
}

export default function ProfilePage({ username }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) { setLoading(false); return; }
    fetch(`/api/progress/${username}`)
      .then(r => r.json())
      .then(async (progress) => {
        const s = await fetch(`/api/progress/${username}/stats`).then(r => r.json());
        setStats({ ...s, progress });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  if (!username) {
    return (
      <div className="container" style={{ paddingTop: 60, textAlign: 'center' }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Profile</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '8px 0 24px' }}>Enter your name on the home page to start tracking.</p>
        <Link to="/" className="btn btn-primary">Go to Home</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: 40 }}>
        <div className="skeleton" style={{ height: 36, width: '30%', marginBottom: 24 }} />
        <div className="skeleton" style={{ height: 200, marginBottom: 16 }} />
        <div className="skeleton" style={{ height: 200 }} />
      </div>
    );
  }

  const solved = stats?.completedProblems || 0;
  const attempted = stats?.attemptedProblems || 0;
  const submissions = stats?.totalSubmissions || 0;
  const byDiff = stats?.byDifficulty || {};
  const badge = getBadge(solved);
  const totalProblems = stats?.totalProblems || 1;
  const pct = Math.round((solved / totalProblems) * 100);

  const dotRows = [
    { label: 'Easy', count: byDiff.easy || 0, color: '#5cb85c' },
    { label: 'Medium', count: byDiff.medium || 0, color: '#f0ad4e' },
    { label: 'Hard', count: byDiff.hard || 0, color: '#d9534f' },
  ];

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 60 }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a73e8, #1557b0)',
        borderRadius: 12, padding: '28px 32px', marginBottom: 24,
        color: '#fff'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px' }}>{username}</h1>
            <p style={{ fontSize: 13, opacity: 0.8, margin: 0 }}>zero-to-one · DSA Practitioner</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{solved}</div>
            <div style={{ fontSize: 11, opacity: 0.7 }}>Problems Solved</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {/* Stats cards */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>SUBMISSIONS</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#1a73e8' }}>{submissions}</div>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>ATTEMPTED</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#1a73e8' }}>{attempted}</div>
        </div>
      </div>

      {/* Badge */}
      <div className="card" style={{ padding: 20, marginBottom: 24, textAlign: 'center' }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'linear-gradient(135deg, #1a73e8, #4285f4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 10px', fontSize: 28
        }}>
          🏆
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#1a73e8' }}>{badge.title}</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{badge.en} · {solved} problems solved</div>
      </div>

      {/* Dotted Skill Graph */}
      <div className="card" style={{ padding: 20, marginBottom: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Skills</div>
        {dotRows.map(row => {
          const totalDots = 20;
          const filledDots = Math.min(totalDots, Math.round((row.count / Math.max(1, Math.max(byDiff.easy || 0, byDiff.medium || 0, byDiff.hard || 0))) * totalDots));
          return (
            <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ width: 60, fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>{row.label}</span>
              <div style={{ flex: 1, display: 'flex', gap: 4 }}>
                {[...Array(totalDots)].map((_, i) => (
                  <div key={i} style={{
                    width: 12, height: 12, borderRadius: '50%',
                    background: i < filledDots ? '#1a73e8' : 'var(--bg-tertiary)',
                    transition: 'background 0.3s ease'
                  }} />
                ))}
              </div>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', width: 30, textAlign: 'right' }}>{row.count}</span>
            </div>
          );
        })}
      </div>

      {/* Problems list */}
      <div className="card" style={{ padding: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Recently Attempted</div>
        {stats?.progress?.filter(p => p.item_type === 'problem').length === 0 ? (
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>No problems attempted yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {stats?.progress?.filter(p => p.item_type === 'problem').slice(-10).reverse().map(p => (
              <Link key={p.item_id} to={`/problems/${p.item_id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '6px 10px', borderRadius: 'var(--radius)',
                  cursor: 'pointer', transition: 'var(--transition)'
                }} className="card-hover">
                  <span style={{
                    width: 20, height: 20, borderRadius: 4,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10,
                    background: p.completed ? '#1a73e8' : 'var(--bg-tertiary)',
                    color: p.completed ? '#fff' : 'var(--text-muted)',
                    fontWeight: 600
                  }}>{p.completed ? '✓' : ''}</span>
                  <span style={{ flex: 1, fontSize: 13 }}>{p.item_id}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{p.submissions || 0} subs</span>
                </div>
              </Link>
            ))}
          </div>
        )}
        <Link to="/problems" className="btn btn-ghost btn-sm" style={{ marginTop: 12 }}>
          View all problems
        </Link>
      </div>
    </div>
  );
}