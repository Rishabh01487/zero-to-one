import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const categoryColors = {
  'basics': '#06B6D4',
  'control-flow': '#7C3AED',
  'functions': '#10B981',
  'arrays': '#F59E0B',
  'pointers': '#EF4444',
  'oop': '#EC4899',
  'stl': '#8B5CF6',
  'sorting': '#14B8A6',
  'linked-list': '#F97316',
  'trees': '#22C55E',
  'dp': '#A855F7',
  'advanced': '#E11D48'
};

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

  const categories = [...new Set(lessons.map(l => l.category))];
  const filtered = filter === 'all' ? lessons : lessons.filter(l => l.category === filter);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>Curriculum</h1>
      <p style={{ fontSize: 15, color: 'var(--text-secondary)', margin: '0 0 32px' }}>
        56 lessons organized from fundamentals to advanced DSA
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
        <button
          className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setFilter('all')}
        >All</button>
        {categories.map(cat => (
          <button
            key={cat}
            className={`btn ${filter === cat ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setFilter(cat)}
          >{cat.replace('-', ' ')}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton" style={{ height: 72, borderRadius: 'var(--radius)' }} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map((lesson, idx) => (
            <Link key={lesson.id} to={`/lessons/${lesson.id}`} style={{ textDecoration: 'none' }}>
              <div className="card" style={{
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                cursor: 'pointer',
                borderLeft: `3px solid ${categoryColors[lesson.category] || 'var(--border)'}`
              }}>
                <span style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'var(--text-secondary)'
                }}>{idx + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{lesson.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                    {lesson.category.replace('-', ' ')}
                  </div>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: 18 }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
