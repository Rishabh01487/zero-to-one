import React from 'react';
import { useNavigate } from 'react-router-dom';

const features = [
  { title: 'Structured curriculum', desc: '60+ lessons from zero to DSA master, each concept explained from first principles.' },
  { title: 'Live code editor', desc: 'Write, compile, and run C++ in your browser. No setup needed.' },
  { title: 'Code visualizer', desc: 'Step through your code line by line. Watch variables change in real time.' },
  { title: 'DSA problem bank', desc: 'Pattern-based problems from Striver and Love Babbar sheets, fully solved and explained.' },
  { title: 'Progress tracking', desc: 'Your learning journey tracked across lessons, problems, and concepts.' },
  { title: 'Production-ready examples', desc: 'Learn how real C++ is written, not just textbook snippets.' },
];

const topics = [
  { name: 'Basics', lessons: 6, desc: 'Syntax, variables, I/O, operators' },
  { name: 'Control Flow', lessons: 4, desc: 'Conditionals, loops, error handling' },
  { name: 'Functions', lessons: 5, desc: 'Overloading, recursion, lambdas' },
  { name: 'Arrays & Strings', lessons: 5, desc: 'STL array, vector, algorithms' },
  { name: 'Pointers & Memory', lessons: 4, desc: 'Dynamic allocation, smart pointers' },
  { name: 'OOP', lessons: 6, desc: 'Classes, inheritance, polymorphism' },
  { name: 'STL', lessons: 6, desc: 'Containers, iterators, algorithms' },
  { name: 'Sorting', lessons: 5, desc: 'Merge, quick, heap, radix sort' },
  { name: 'Linked Lists', lessons: 4, desc: 'Singly, doubly, circular, algorithms' },
  { name: 'Trees', lessons: 5, desc: 'BST, AVL, heaps, traversals' },
  { name: 'DP', lessons: 6, desc: 'Memoization, tabulation, classic problems' },
  { name: 'Advanced', lessons: 6, desc: 'Graphs, hashing, bit manipulation' },
];

export default function HomePage({ username, setUsername }) {
  const navigate = useNavigate();
  const [nameInput, setNameInput] = React.useState('');
  const [patterns, setPatterns] = React.useState([]);
  const [stats, setStats] = React.useState({ lessons: 56, patterns: 0, problems: 0 });

  React.useEffect(() => {
    fetch('/api/patterns')
      .then(r => r.json())
      .then(data => {
        setPatterns(data);
        setStats(s => ({ ...s, patterns: data.length, problems: data.reduce((a, p) => a + p.problemCount, 0) }));
      })
      .catch(() => {});
  }, []);

  const handleStart = () => {
    if (nameInput.trim()) {
      setUsername(nameInput.trim());
      localStorage.setItem('zto_username', nameInput.trim());
      fetch('/api/progress/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: nameInput.trim() })
      }).catch(() => {});
      navigate('/lessons');
    }
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <nav style={{
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        borderBottom: '1px solid var(--border)',
        maxWidth: 1120,
        margin: '0 auto'
      }}>
        <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.3px' }}>
          zero<span style={{ color: 'var(--text-muted)' }}>to</span>one
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          {username ? (
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{username}</span>
          ) : (
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>guest</span>
          )}
        </div>
      </nav>

      <section style={{
        padding: '100px 24px 60px',
        maxWidth: 800,
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 56,
          fontWeight: 700,
          margin: '0 0 16px',
          letterSpacing: '-1.5px',
          lineHeight: 1.1
        }}>
          from <span style={{ color: 'var(--text-muted)' }}>zero</span> to{' '}
          <span style={{ color: 'var(--text-primary)' }}>one</span>
        </h1>
        <p style={{
          fontSize: 16,
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          maxWidth: 520,
          margin: '0 auto 40px'
        }}>
          Master C++ and DSA from absolute scratch. Learn by writing real code, 
          tracing every step, and solving curated problems.
        </p>

        {!username ? (
          <div style={{
            display: 'flex',
            gap: 8,
            justifyContent: 'center',
            maxWidth: 400,
            margin: '0 auto'
          }}>
            <input
              type="text"
              placeholder="Your name to get started..."
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleStart()}
              style={{ flex: 1, padding: '10px 14px', fontSize: 14 }}
            />
            <button className="btn btn-primary" onClick={handleStart} style={{ padding: '10px 20px' }}>
              Start →
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/lessons')}>
              Continue learning →
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => navigate('/playground')}>
              Playground
            </button>
          </div>
        )}

        <div style={{
          display: 'flex',
          gap: 40,
          justifyContent: 'center',
          marginTop: 48,
          paddingTop: 32,
          borderTop: '1px solid var(--border)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 600, color: 'var(--text-primary)' }}>{stats.lessons}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Lessons</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 600, color: 'var(--text-primary)' }}>{stats.patterns}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Patterns</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 600, color: 'var(--text-primary)' }}>{stats.problems}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Problems</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 600, color: 'var(--text-primary)' }}>0</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Prerequisites</div>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 24px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 24px' }}>Everything you need</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 12,
          }}>
            {features.map(f => (
              <div key={f.title} className="card" style={{ padding: 20 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 6px' }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 24px', borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 4px' }}>{stats.patterns} DSA Patterns</h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: '0 0 24px' }}>
            {stats.problems} problems organized by algorithmic pattern
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 10
          }}>
            {patterns.slice(0, 8).map(p => (
              <div key={p.id} className="card card-hover" style={{ padding: 16, cursor: 'pointer' }} onClick={() => navigate(`/problems?category=${p.id}`)}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4, lineHeight: 1.5 }}>{p.description}</div>
                <div style={{ fontSize: 11, color: 'var(--accent)' }}>{p.problemCount} problems</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <button className="btn btn-ghost" onClick={() => navigate('/patterns')} style={{ fontSize: 13 }}>
              View all {stats.patterns} patterns →
            </button>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 24px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 4px' }}>12 modules, {stats.lessons} lessons</h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: '0 0 24px' }}>
            From your first C++ program to advanced DSA
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 10
          }}>
            {topics.map(t => (
              <div key={t.name} className="card" style={{ padding: '14px 16px' }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.desc}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>{t.lessons} lessons</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 8px' }}>
          Ready to start?
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: '0 0 24px' }}>
          No prior experience needed.
        </p>
        {!username ? (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', maxWidth: 360, margin: '0 auto' }}>
            <input
              type="text"
              placeholder="Your name..."
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleStart()}
              style={{ flex: 1, padding: '10px 14px', fontSize: 14 }}
            />
            <button className="btn btn-primary btn-lg" onClick={handleStart}>
              Start →
            </button>
          </div>
        ) : (
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/lessons')}>
            Continue learning →
          </button>
        )}
      </section>

      <footer style={{
        padding: '24px',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
        fontSize: 12,
        color: 'var(--text-muted)'
      }}>
        zero to one — C++ & DSA
      </footer>
    </div>
  );
}
