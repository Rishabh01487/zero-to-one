import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PatternsPage() {
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/patterns')
      .then(r => r.json())
      .then(data => { setPatterns(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = patterns.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  const total = patterns.reduce((s, p) => s + p.problemCount, 0);

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: 40, paddingBottom: 60 }}>
        <div className="skeleton" style={{ height: 40, width: 300, marginBottom: 12, borderRadius: 'var(--radius)' }} />
        <div className="skeleton" style={{ height: 20, width: 200, marginBottom: 32, borderRadius: 'var(--radius)' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton" style={{ height: 180, borderRadius: 'var(--radius)' }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 className="section-title">DSA Patterns</h1>
        <p className="section-subtitle">
          {total} problems across {patterns.length} algorithmic patterns —{' '}
          <Link to="/problems" style={{ color: 'var(--accent)' }}>browse all problems</Link>
        </p>
      </div>

      <input
        className="card"
        type="text"
        placeholder="Search patterns..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          border: '1px solid var(--border)',
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          fontSize: 13,
          outline: 'none',
          boxSizing: 'border-box',
          marginBottom: 24
        }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
        {filtered.map(p => (
          <Link key={p.id} to={`/patterns/${p.id}`} style={{ textDecoration: 'none' }}>
            <div className="card card-hover" style={{ padding: 20, cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</div>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 12px 0', flex: 1 }}>{p.description}</p>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>
                Use when: {p.when_to_use}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
                {p.techniques.slice(0, 4).map(t => (
                  <span key={t} style={{
                    fontSize: 10, padding: '2px 8px', borderRadius: 10,
                    background: 'var(--bg-secondary)', color: 'var(--text-muted)'
                  }}>{t}</span>
                ))}
                {p.techniques.length > 4 && (
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 10, color: 'var(--text-muted)' }}>+{p.techniques.length - 4}</span>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 10, borderTop: '1px solid var(--border)' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>{p.problemCount} problems</span>
                <span style={{ display: 'flex', gap: 6 }}>
                  {p.difficultyBreakdown?.easy > 0 && <span style={{ fontSize: 10, color: '#7bed9f' }}>{p.difficultyBreakdown.easy}E</span>}
                  {p.difficultyBreakdown?.medium > 0 && <span style={{ fontSize: 10, color: '#feca57' }}>{p.difficultyBreakdown.medium}M</span>}
                  {p.difficultyBreakdown?.hard > 0 && <span style={{ fontSize: 10, color: '#ff6b6b' }}>{p.difficultyBreakdown.hard}H</span>}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card" style={{ padding: 48, textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: 0 }}>No patterns match "{search}"</p>
        </div>
      )}
    </div>
  );
}
