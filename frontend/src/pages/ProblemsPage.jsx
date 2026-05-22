import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const difficulties = ['all', 'easy', 'medium', 'hard'];

export default function ProblemsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [problems, setProblems] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [difficulty, setDifficulty] = useState('all');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/patterns')
      .then(r => r.json())
      .then(data => setPatterns(data));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (difficulty !== 'all') params.set('difficulty', difficulty);
    if (category !== 'all') params.set('category', category);
    const qs = params.toString();
    fetch(`/api/problems${qs ? `?${qs}` : ''}`)
      .then(r => r.json())
      .then(data => { setProblems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [difficulty, category]);

  const handleCategory = (cat) => {
    setCategory(cat);
    if (cat !== 'all') setSearchParams({ category: cat });
    else setSearchParams({});
  };

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 className="section-title">DSA Problems</h1>
        <p className="section-subtitle">
          Browse by{' '}
          <Link to="/patterns" style={{ color: 'var(--accent)' }}>pattern</Link>
          {' '}or difficulty
        </p>
      </div>

      <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
        {difficulties.map(d => (
          <button key={d} className={`btn btn-sm ${difficulty === d ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setDifficulty(d)}>
            {d.charAt(0).toUpperCase() + d.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 4, marginBottom: 24, flexWrap: 'wrap' }}>
        <button className={`btn btn-sm ${category === 'all' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => handleCategory('all')}>All</button>
        {patterns.map(p => (
          <button key={p.id} className={`btn btn-sm ${category === p.id ? 'btn-primary' : 'btn-ghost'}`} onClick={() => handleCategory(p.id)}>
            {p.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton" style={{ height: 64, borderRadius: 'var(--radius)' }} />
          ))}
        </div>
      ) : problems.length === 0 ? (
        <div className="card" style={{ padding: 48, textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: 0 }}>No problems match this filter.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {problems.map((p) => (
            <Link key={p.id} to={`/problems/${p.id}`} style={{ textDecoration: 'none' }}>
              <div className="card card-hover" style={{
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                cursor: 'pointer'
              }}>
                <span className={`tag tag-${p.difficulty}`} style={{ minWidth: 48, justifyContent: 'center' }}>{p.difficulty}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</div>
                </div>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.category}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 14, fontFamily: 'var(--font-mono)' }}>-&gt;</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
