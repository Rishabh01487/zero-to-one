import React from 'react';
import { useNavigate } from 'react-router-dom';

const features = [
  { icon: '📘', title: 'Structured Curriculum', desc: 'From zero to DSA master — 60+ lessons covering every C++ concept with deep explanations.' },
  { icon: '💻', title: 'Live Code Editor', desc: 'Write, compile, and run C++ code directly in your browser with the Monaco editor.' },
  { icon: '🎯', title: 'Code Visualizer', desc: 'Watch your code execute step-by-step with live variable tracking and memory visualization.' },
  { icon: '⚡', title: '200+ DSA Problems', desc: 'Practice with curated problems from Easy to Hard with instant feedback and test cases.' },
  { icon: '📊', title: 'Progress Tracking', desc: 'Track your learning journey with detailed progress metrics and achievements.' },
  { icon: '🧠', title: 'Concept Deep-Dives', desc: 'Every topic explained with real analogies, visual diagrams, and production-ready examples.' },
];

const topics = [
  { name: 'Variables & Data Types', lessons: 4, color: '#06B6D4' },
  { name: 'Control Flow', lessons: 3, color: '#7C3AED' },
  { name: 'Functions & Recursion', lessons: 5, color: '#10B981' },
  { name: 'Arrays & Strings', lessons: 5, color: '#F59E0B' },
  { name: 'Pointers & Memory', lessons: 4, color: '#EF4444' },
  { name: 'OOP Concepts', lessons: 5, color: '#EC4899' },
  { name: 'STL Containers', lessons: 4, color: '#8B5CF6' },
  { name: 'Sorting & Searching', lessons: 4, color: '#14B8A6' },
  { name: 'Linked Lists', lessons: 4, color: '#F97316' },
  { name: 'Trees & Graphs', lessons: 6, color: '#22C55E' },
  { name: 'Dynamic Programming', lessons: 6, color: '#A855F7' },
  { name: 'Advanced DSA', lessons: 6, color: '#E11D48' },
];

const stats = [
  { value: '60+', label: 'Lessons' },
  { value: '200+', label: 'Problems' },
  { value: '1000+', label: 'Code Examples' },
  { value: 'Zero', label: 'Prerequisites' },
];

export default function HomePage({ username, setUsername }) {
  const navigate = useNavigate();
  const [nameInput, setNameInput] = React.useState('');

  const handleStart = () => {
    if (nameInput.trim()) {
      setUsername(nameInput.trim());
      localStorage.setItem('zto_username', nameInput.trim());
      fetch('http://localhost:3001/api/progress/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: nameInput.trim() })
      }).catch(() => {});
      navigate('/lessons');
    }
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 0%, #1a1a3e 0%, #0f0f1a 50%)'
      }}>
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '60%',
          height: '80%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '50%',
          height: '70%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          maxWidth: 800,
          textAlign: 'center',
          animation: 'slideUp 0.8s ease forwards'
        }}>
          <div style={{
            padding: '8px 20px',
            borderRadius: 100,
            background: 'rgba(124,58,237,0.12)',
            border: '1px solid rgba(124,58,237,0.2)',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--primary-light)',
            letterSpacing: 1
          }}>
            🚀 The Complete C++ & DSA Learning Platform
          </div>

          <h1 style={{
            fontSize: 64,
            fontWeight: 900,
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: -2
          }}>
            From{' '}
            <span className="gradient-text">Zero</span>
            {' '}to{' '}
            <span className="gradient-text">One</span>
          </h1>

          <p style={{
            fontSize: 20,
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: 600,
            margin: 0
          }}>
            Master C++ programming and Data Structures & Algorithms from absolute scratch.
            Learn by writing real code, not just watching videos.
          </p>

          {!username ? (
            <div style={{
              display: 'flex',
              gap: 12,
              marginTop: 16,
              width: '100%',
              maxWidth: 480
            }}>
              <input
                type="text"
                placeholder="Enter your name to start learning..."
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleStart()}
                style={{ flex: 1, padding: '14px 20px', fontSize: 15 }}
              />
              <button className="btn btn-primary btn-lg" onClick={handleStart}>
                Start Learning →
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/lessons')}>
                Continue Learning →
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => navigate('/playground')}>
                Open Playground
              </button>
            </div>
          )}

          <div style={{
            display: 'flex',
            gap: 40,
            marginTop: 32,
            paddingTop: 32,
            borderTop: '1px solid var(--border)'
          }}>
            {stats.map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)' }}>{s.value}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <h2 className="section-title" style={{ textAlign: 'center' }}>Everything You Need</h2>
        <p className="section-subtitle" style={{ textAlign: 'center' }}>
          A complete platform designed to take you from complete beginner to DSA problem solver
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 20,
          marginTop: 40
        }}>
          {features.map(f => (
            <div key={f.title} className="card" style={{ padding: 28 }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CURRICULUM OVERVIEW */}
      <section style={{
        padding: '80px 24px',
        background: 'var(--bg-secondary)'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Complete Curriculum</h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>
            56 lessons across 12 modules — from your first "Hello World" to advanced DSA
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
            marginTop: 40
          }}>
            {topics.map(t => (
              <div key={t.name} className="card" style={{
                padding: 20,
                borderLeft: `3px solid ${t.color}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</span>
                <span style={{
                  fontSize: 11,
                  color: 'var(--text-muted)',
                  background: 'var(--bg-tertiary)',
                  padding: '3px 10px',
                  borderRadius: 12
                }}>{t.lessons} lessons</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '80px 24px',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.06) 0%, transparent 70%)'
      }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 12px' }}>
          Ready to Go from <span className="gradient-text">Zero to One</span>?
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto 32px' }}>
          No prior experience needed. Just bring your curiosity and willingness to learn.
        </p>
        {!username ? (
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <input
              type="text"
              placeholder="Enter your name..."
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleStart()}
              style={{ padding: '14px 20px', fontSize: 15, width: 280 }}
            />
            <button className="btn btn-primary btn-lg" onClick={handleStart}>
              Start Free →
            </button>
          </div>
        ) : (
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/lessons')}>
            Continue Learning →
          </button>
        )}
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: '32px 24px',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
        fontSize: 13,
        color: 'var(--text-muted)'
      }}>
        Built with ❤️ for every aspiring programmer. Zero to One — Master C++ & DSA.
      </footer>
    </div>
  );
}
