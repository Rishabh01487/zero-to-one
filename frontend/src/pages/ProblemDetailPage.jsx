import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Editor from '../components/Editor';

export default function ProblemDetailPage({ username }) {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [output, setOutput] = useState('');
  const [testResults, setTestResults] = useState(null);
  const [code, setCode] = useState('');
  const [running, setRunning] = useState(false);

  useEffect(() => {
    fetch(`/api/problems/${id}`)
      .then(r => r.json())
      .then(data => {
        setProblem(data);
        setCode(data.solution_template);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

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
    setRunning(false);
  };

  const markComplete = () => {
    if (username) {
      fetch(`/api/progress/${username}/${problem.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemType: 'problem', code })
      }).catch(() => {});
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 40 }}>
        <div className="skeleton" style={{ height: 40, width: '60%', marginBottom: 24 }} />
        <div className="skeleton" style={{ height: 200, marginBottom: 24 }} />
        <div className="skeleton" style={{ height: 400 }} />
      </div>
    );
  }

  if (!problem) {
    return (
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 40, textAlign: 'center' }}>
        <h2>Problem not found</h2>
        <Link to="/problems" className="btn btn-primary">Back to Problems</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px' }}>
      <Link to="/problems" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13, marginBottom: 16, display: 'inline-block' }}>
        ← Back to Problems
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* LEFT - Problem Description */}
        <div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{problem.title}</h1>
              <span className={`tag tag-${problem.difficulty}`}>{problem.difficulty}</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', background: 'var(--bg-tertiary)', padding: '4px 10px', borderRadius: 12 }}>{problem.category}</span>
            </div>
          </div>

          <div className="card" style={{ padding: 24, marginBottom: 20, lineHeight: 1.7, fontSize: 14 }}>
            <ReactMarkdown
              components={{
                p: ({ children }) => <p style={{ margin: '10px 0', color: 'var(--text-secondary)' }}>{children}</p>,
                code: ({ children }) => <code style={{ background: 'var(--bg-tertiary)', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>{children}</code>,
                pre: ({ children }) => <div className="code-block" style={{ fontSize: 13, padding: 12, margin: '12px 0' }}>{children}</div>,
              }}
            >{problem.description}</ReactMarkdown>

            {problem.constraints && (
              <>
                <h4 style={{ margin: '20px 0 8px', fontSize: 15, fontWeight: 600 }}>Constraints</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{problem.constraints}</p>
              </>
            )}

            <h4 style={{ margin: '20px 0 8px', fontSize: 15, fontWeight: 600 }}>Examples</h4>
            {Array.isArray(problem.examples) && problem.examples.map((ex, i) => (
              <div key={i} style={{
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius)',
                padding: 16,
                marginBottom: 12,
                fontSize: 13
              }}>
                <div><strong>Input:</strong> <span style={{ color: 'var(--text-secondary)' }}>{ex.input}</span></div>
                <div><strong>Output:</strong> <span style={{ color: 'var(--success)' }}>{ex.output}</span></div>
                {ex.explanation && <div style={{ marginTop: 4, color: 'var(--text-muted)' }}><strong>Explanation:</strong> {ex.explanation}</div>}
              </div>
            ))}
          </div>

          {testResults && (
            <div className="card" style={{ padding: 20 }}>
              <h4 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 600 }}>Test Results</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {testResults.map((r, i) => (
                  <div key={i} style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius)',
                    background: r.passed ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
                    border: `1px solid ${r.passed ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
                    fontSize: 13
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <strong>Test {i + 1}: {r.passed ? '✅ Passed' : '❌ Failed'}</strong>
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 12 }}>
                      Input: <code style={{ background: 'var(--bg-tertiary)', padding: '1px 4px', borderRadius: 3 }}>{r.input || '(none)'}</code>
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 12 }}>
                      Expected: <code style={{ background: 'var(--bg-tertiary)', padding: '1px 4px', borderRadius: 3 }}>{r.expected}</code>
                    </div>
                    {!r.passed && (
                      <div style={{ color: 'var(--danger)', fontSize: 12 }}>
                        Got: <code style={{ background: 'var(--bg-tertiary)', padding: '1px 4px', borderRadius: 3 }}>{r.actual}</code>
                      </div>
                    )}
                  </div>
                ))}
                <div style={{ marginTop: 8, fontSize: 14, fontWeight: 600 }}>
                  {testResults.filter(r => r.passed).length}/{testResults.length} tests passed
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT - Code Editor */}
        <div>
          <Editor
            initialCode={code}
            onCodeChange={setCode}
            height={400}
          />
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button className="btn btn-primary" onClick={runTests} disabled={running}>
              {running ? '⏳ Running...' : '▶ Run Tests'}
            </button>
            {username && (
              <button className="btn btn-success" onClick={markComplete}>
                ✓ Mark Solved
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
