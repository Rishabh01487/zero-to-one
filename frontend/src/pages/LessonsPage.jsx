import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  'all', 'basics', 'control-flow', 'functions', 'arrays',
  'pointers', 'oop', 'stl', 'sorting', 'linked-list', 'trees', 'dp', 'advanced'
];

export default function LessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/lessons')
      .then(r => r.json())
      .then(data => { setLessons(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? lessons : lessons.filter(l => l.category === filter);

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 className="section-title">Curriculum</h1>
        <p className="section-subtitle">56 lessons from fundamentals to advanced DSA</p>
      </div>

      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 28 }}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`btn btn-sm ${filter === cat ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setFilter(cat)}
          >{cat === 'all' ? 'All' : cat.replace('-', ' ')}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="skeleton" style={{ height: 64, borderRadius: 'var(--radius)' }} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {filtered.map((lesson, idx) => (
            <Link key={lesson.id} to={`/lessons/${lesson.id}`} style={{ textDecoration: 'none' }}>
              <div className="card card-hover" style={{
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                cursor: 'pointer'
              }}>
                <span style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: 'var(--bg-tertiary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)'
                }}>{idx + 1}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lesson.title}</div>
                </div>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'capitalize' }}>{lesson.category.replace('-', ' ')}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 14, fontFamily: 'var(--font-mono)' }}>-&gt;</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
