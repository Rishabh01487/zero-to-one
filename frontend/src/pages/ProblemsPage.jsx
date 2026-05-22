import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const difficulties = ['all', 'easy', 'medium', 'hard'];

export default function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [difficulty, setDifficulty] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = difficulty === 'all' ? '/api/problems' : `/api/problems?difficulty=${difficulty}`;
    fetch(url)
      .then(r => r.json())
      .then(data => { setProblems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [difficulty]);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>DSA Problems</h1>
      <p style={{ fontSize: 15, color: 'var(--text-secondary)', margin: '0 0 32px' }}>
        Practice with curated DSA problems — from beginner to advanced
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {difficulties.map(d => (
          <button
            key={d}
            className={`btn btn-sm ${difficulty === d ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setDifficulty(d)}
          >{d.charAt(0).toUpperCase() + d.slice(1)}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton" style={{ height: 80, borderRadius: 'var(--radius)' }} />
          ))}
        </div>
      ) : problems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏗️</div>
          <p>Loading problems... If this persists, seed the database.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {problems.map((p, i) => (
            <Link key={p.id} to={`/problems/${p.id}`} style={{ textDecoration: 'none' }}>
              <div className="card" style={{
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                cursor: 'pointer'
              }}>
                <span style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: p.difficulty === 'easy' ? 'rgba(16,185,129,0.12)' : p.difficulty === 'medium' ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16
                }}>
                  {p.difficulty === 'easy' ? '🟢' : p.difficulty === 'medium' ? '🟡' : '🔴'}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{p.category}</div>
                </div>
                <span className={`tag tag-${p.difficulty}`}>{p.difficulty}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
