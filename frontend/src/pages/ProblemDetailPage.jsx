import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Editor from '../components/Editor';
import ProblemDiagram from '../components/ProblemDiagram';

export default function ProblemDetailPage({ username }) {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [pattern, setPattern] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testResults, setTestResults] = useState(null);
  const [code, setCode] = useState('');
  const [running, setRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    fetch(`/api/problems/${id}`)
      .then(r => r.json())
      .then(data => {
        setProblem(data);
        setCode(data.leetcode_template || data.solution_template);
        setLoading(false);
        if (data.category) {
          fetch(`/api/patterns/${data.category}`)
            .then(r => r.json())
            .then(p => {
              setPattern(p);
              setRelated(p.problems.filter(pr => pr.id !== data.id).slice(0, 5));
            })
            .catch(() => {});
        }
      })
      .catch(() => setLoading(false));
    if (username) {
      fetch(`/api/progress/${username}`)
        .then(r => r.json())
        .then(progress => {
          const record = progress.find(p => p.item_id === id);
          if (record && record.completed) setSolved(true);
        })
        .catch(() => {});
    }
  }, [id, username]);

  const runTests = async () => {
    if (!problem) return;
    setRunning(true);
    setTestResults(null);
    const results = [];
    for (const test of problem.test_cases) {
      try {
        const res = await fetch('/api/compile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, input: test.input || '' })
        });
        const data = await res.json();
        const passed = data.success && data.output.trim() === test.expected.trim();
        results.push({ input: test.input, expected: test.expected, actual: data.output.trim(), passed });
      } catch {
        results.push({ input: test.input, expected: test.expected, actual: 'Error', passed: false });
      }
    }
    setTestResults(results);
    if (username) {
      fetch(`/api/progress/${username}/${problem.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      }).catch(() => {});
    }
    setRunning(false);
  };

  const markComplete = () => {
    if (username) {
      setSolved(true);
      fetch(`/api/progress/${username}/${problem.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemType: 'problem', code })
      }).catch(() => setSolved(false));
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: 40 }}>
        <div className="skeleton" style={{ height: 36, width: '50%', marginBottom: 20 }} />
        <div className="skeleton" style={{ height: 300, marginBottom: 16 }} />
        <div className="skeleton" style={{ height: 400 }} />
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="container" style={{ paddingTop: 60, textAlign: 'center' }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Problem not found</h2>
        <Link to="/problems" className="btn btn-primary" style={{ marginTop: 16 }}>Back to Problems</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px 24px', maxWidth: 1400, margin: '0 auto' }}>
      <Link to="/problems" style={{
        color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13,
        display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16
      }}><span style={{ fontFamily: 'var(--font-mono)' }}>&lt;-</span> Back to Problems</Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>{problem.title}</h1>
              <span className={`tag tag-${problem.difficulty}`}>{problem.difficulty}</span>
              <Link to={`/problems?category=${problem.category}`} style={{
                fontSize: 11, color: 'var(--accent)', textDecoration: 'none',
                background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: 4
              }}>{problem.category}</Link>
              {problem.sheet && <span style={{ fontSize: 10, color: '#48dbfb', border: '1px solid rgba(72,219,251,0.3)', borderRadius: 4, padding: '1px 6px' }}>{problem.sheet}</span>}
            </div>
          </div>

          <div className="card" style={{ padding: 24, marginBottom: 16, fontSize: 14, lineHeight: 1.7 }}>
            <ReactMarkdown
              components={{
                p: ({ children }) => <p style={{ margin: '8px 0', color: 'var(--text-secondary)' }}>{children}</p>,
                code: ({ children }) => <code style={{ background: 'var(--bg-tertiary)', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>{children}</code>,
                pre: ({ children }) => <div className="code-block" style={{ fontSize: 12, padding: 12, margin: '8px 0' }}>{children}</div>,
              }}
            >{problem.description}</ReactMarkdown>

            {problem.constraints && (
              <>
                <div style={{ fontSize: 13, fontWeight: 600, margin: '16px 0 6px' }}>Constraints</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, fontFamily: 'var(--font-mono)', margin: 0, background: 'var(--bg-secondary)', padding: '8px 12px', borderRadius: 'var(--radius)' }}>{problem.constraints}</p>
              </>
            )}

            <div style={{ fontSize: 13, fontWeight: 600, margin: '16px 0 8px' }}>Examples</div>
            {Array.isArray(problem.examples) && problem.examples.map((ex, i) => (
              <div key={i} style={{
                background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', padding: 14,
                marginBottom: 10, fontSize: 13, fontFamily: 'var(--font-mono)'
              }}>
                <div style={{ color: 'var(--text-muted)' }}>Input: <span style={{ color: 'var(--text-secondary)' }}>{ex.input}</span></div>
                <div style={{ color: 'var(--text-muted)' }}>Output: <span style={{ color: '#7bed9f' }}>{ex.output}</span></div>
                {ex.explanation && <div style={{ marginTop: 4, color: 'var(--text-muted)', fontSize: 12 }}>{ex.explanation}</div>}
              </div>
            ))}
          </div>

          {pattern && (
            <div className="card" style={{ padding: 20, marginBottom: 16, borderLeft: '3px solid var(--accent)' }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--accent)' }}>Pattern: {pattern.name}</div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 10px 0' }}>{pattern.description}</p>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>When to use: {pattern.when_to_use}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                {pattern.techniques.map(t => (
                  <span key={t} style={{
                    fontSize: 10, padding: '2px 8px', borderRadius: 10,
                    background: 'var(--bg-secondary)', color: 'var(--text-muted)'
                  }}>{t}</span>
                ))}
              </div>
              <Link to={`/problems?category=${pattern.id}`} style={{ fontSize: 12, color: 'var(--accent)', textDecoration: 'none' }}>
                View all {pattern.problemCount} {pattern.name} problems -&gt;
              </Link>
            </div>
          )}

          {problem.approach && (
            <div className="card" style={{ padding: 20, marginBottom: 16, borderLeft: '3px solid #48dbfb' }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#48dbfb' }}>Approach</div>
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p style={{ margin: '8px 0', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>{children}</p>,
                  code: ({ children }) => <code style={{ background: 'var(--bg-tertiary)', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>{children}</code>,
                  pre: ({ children }) => <div className="code-block" style={{ fontSize: 12, padding: 12, margin: '8px 0', lineHeight: 1.6 }}>{children}</div>,
                }}
              >{problem.approach}</ReactMarkdown>
              <ProblemDiagram definition={problem.mermaid} />
              {problem.complexity && (
                <div style={{ marginTop: 10, display: 'flex', gap: 16 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Time: <span style={{ color: '#7bed9f', fontFamily: 'var(--font-mono)' }}>{problem.complexity.time || problem.complexity}</span></div>
                  {problem.complexity.space && <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Space: <span style={{ color: '#feca57', fontFamily: 'var(--font-mono)' }}>{problem.complexity.space}</span></div>}
                </div>
              )}
            </div>
          )}

          {related.length > 0 && (
            <div className="card" style={{ padding: 20, marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: 'var(--text-primary)' }}>Related {pattern?.name} Problems</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {related.map(r => (
                  <Link key={r.id} to={`/problems/${r.id}`} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 12px', borderRadius: 'var(--radius)',
                    textDecoration: 'none', background: 'var(--bg-secondary)',
                    fontSize: 12, color: 'var(--text-secondary)'
                  }}>
                    <span className={`tag tag-${r.difficulty}`} style={{ fontSize: 9, padding: '1px 6px', minWidth: 36, textAlign: 'center' }}>{r.difficulty}</span>
                    {r.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {testResults && (
            <div className="card" style={{ padding: 20, marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Test Results</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {testResults.map((r, i) => (
                  <div key={i} style={{
                    padding: '10px 14px', borderRadius: 'var(--radius)',
                    background: r.passed ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)',
                    border: `1px solid ${r.passed ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
                    fontSize: 12
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                      <strong style={{ color: r.passed ? '#7bed9f' : '#ff6b6b' }}>Test {i + 1}: {r.passed ? 'Passed' : 'Failed'}</strong>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>Expected: <code style={{ background: 'var(--bg-tertiary)', padding: '1px 4px', borderRadius: 3 }}>{r.expected}</code></div>
                    {!r.passed && <div style={{ color: '#ff6b6b' }}>Got: <code style={{ background: 'var(--bg-tertiary)', padding: '1px 4px', borderRadius: 3 }}>{r.actual}</code></div>}
                  </div>
                ))}
                <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: '#feca57' }}>
                  {testResults.filter(r => r.passed).length}/{testResults.length} passed
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <Editor initialCode={code} onCodeChange={setCode} height={380} />
          <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={runTests} disabled={running} style={{ borderRadius: 6 }}>
              {running ? 'running...' : 'run tests'}
            </button>
            <button className="btn btn-ghost" onClick={() => setShowSolution(!showSolution)} style={{ borderRadius: 6 }}>
              {showSolution ? 'hide solution' : 'view solution'}
            </button>
            {username && (
              <button className={solved ? 'btn btn-primary' : 'btn btn-ghost'} onClick={markComplete} disabled={solved} style={{ borderRadius: 6 }}>
                {solved ? '✓ solved' : 'mark solved'}
              </button>
            )}
          </div>
          {showSolution && problem.solution_code && (
            <div className="card" style={{ marginTop: 14, padding: 16, borderLeft: '3px solid #7bed9f' }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, color: '#7bed9f' }}>Solution</div>
              <pre style={{ margin: 0, fontSize: 12, fontFamily: 'var(--font-mono)', lineHeight: 1.6, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{problem.solution_code}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
