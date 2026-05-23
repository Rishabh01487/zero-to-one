import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const container = { paddingTop: 40, paddingBottom: 60 };
const card = {
  background: 'var(--bg-secondary)', border: '1px solid var(--border)',
  borderRadius: 'var(--radius)', padding: 20, marginBottom: 16,
};
const heading = { fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 };
const label = { fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--text-muted)', marginBottom: 4 };
const body = { fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0, whiteSpace: 'pre-wrap' };

function Section({ title, label: lbl, children }) {
  return (
    <div style={card}>
      {lbl && <p style={label}>{lbl}</p>}
      {title && <h3 style={heading}>{title}</h3>}
      {typeof children === 'string' ? <p style={body}>{children}</p> : children}
    </div>
  );
}

function StepList({ steps }) {
  const items = steps.split(/\d+\.\s*/).filter(Boolean);
  return (
    <ol style={{ margin: 0, paddingLeft: 20, fontSize: 12, color: 'var(--text-secondary)', lineHeight: 2 }}>
      {items.map((s, i) => <li key={i}>{s}</li>)}
    </ol>
  );
}

function ProblemLink({ platform, name, id }) {
  const urls = {
    LeetCode: `https://leetcode.com/problems/${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}/`,
    Codeforces: id ? `https://codeforces.com/problemset/problem/${id}` : '#',
    CodeChef: id ? `https://www.codechef.com/problems/${id}` : '#',
    HackerRank: `https://www.hackerrank.com/challenges/${name.toLowerCase().replace(/\s+/g, '-')}/problem`,
  };
  const url = urls[platform] || '#';
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      style={{ color: 'var(--accent)', textDecoration: 'none', marginRight: 4 }}>
      {name}
    </a>
  );
}

export default function PatternDetailPage() {
  const { id } = useParams();
  const [pattern, setPattern] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/patterns/${id}`)
      .then(r => r.json())
      .then(d => { setPattern(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={container}>
        <div className="skeleton" style={{ height: 36, width: 300, marginBottom: 12 }} />
        <div className="skeleton" style={{ height: 180, width: '100%', marginBottom: 16 }} />
        <div className="skeleton" style={{ height: 120, width: '100%', marginBottom: 16 }} />
      </div>
    );
  }

  if (!pattern) {
    return (
      <div className="container" style={container}>
        <div className="card" style={{ padding: 48, textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Pattern not found.</p>
          <Link to="/patterns" style={{ color: 'var(--accent)', fontSize: 13 }}>Back to patterns</Link>
        </div>
      </div>
    );
  }

  const rec = pattern.recognition || {};
  const isTechnique = pattern.type === 'technique';

  return (
    <div className="container" style={container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <span style={{ fontSize: 28 }}>{pattern.icon}</span>
        <div>
          <h1 className="section-title" style={{ margin: 0 }}>{pattern.name}</h1>
          <p style={{ margin: '4px 0 0', fontSize: 11, color: 'var(--text-muted)' }}>
            {isTechnique ? `Technique · Parent: ${pattern.parent}` : 'Category'} · {pattern.difficulty}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        <Link to={isTechnique ? `/problems?technique=${pattern.id}` : `/problems?category=${pattern.id}`}
          className="btn btn-primary" style={{ fontSize: 12 }}>
          Browse {pattern.problemCount} Problems →
        </Link>
        <Link to="/patterns" className="btn btn-ghost" style={{ fontSize: 12 }}>
          ← All Patterns
        </Link>
      </div>

      <Section title="📖 What is this pattern?" label="DESCRIPTION">
        {pattern.description}
      </Section>

      <Section title="🎯 When to use" label="WHEN TO USE">
        {pattern.when_to_use}
      </Section>

      {rec.signals && (
        <Section title="⚡ How to recognize" label="RECOGNITION GUIDE">
          <p style={{ ...body, marginBottom: 12 }}>{rec.signals}</p>
          {rec.keywords && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {rec.keywords.split(',').map(k => (
                <span key={k} style={{
                  fontSize: 10, padding: '2px 8px', borderRadius: 10,
                  background: 'var(--accent-bg, #1a3a5c)', color: 'var(--accent, #5dade2)',
                }}>{k.trim().replace(/^'|'$/g, '')}</span>
              ))}
            </div>
          )}
        </Section>
      )}

      {rec.decision_flow && (
        <Section title="🧠 Decision flow" label="HOW TO CHOOSE">
          <StepList steps={rec.decision_flow} />
        </Section>
      )}

      {rec.example_problems && (
        <Section title="📚 Example problems" label="PLATFORM EXAMPLES">
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {rec.example_problems.split(/\n/).filter(Boolean).map((line, i) => {
              const [platform, ...rest] = line.split(':');
              if (rest.length > 0) {
                return (
                  <div key={i} style={{ marginBottom: 8 }}>
                    <strong style={{ color: 'var(--text-primary)' }}>{platform}:</strong>{' '}
                    {rest.join(':').split(',').map((prob, j) => (
                      <span key={j}>
                        {j > 0 && <span style={{ color: 'var(--text-muted)' }}> · </span>}
                        <span style={{ color: 'var(--accent)' }}>{prob.trim()}</span>
                      </span>
                    ))}
                  </div>
                );
              }
              return <p key={i} style={{ margin: 0 }}>{line}</p>;
            })}
          </div>
        </Section>
      )}

      {rec.beginner_mistakes && (
        <Section title="⚠️ Common beginner mistakes" label="WATCH OUT">
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 12, color: 'var(--text-secondary)', lineHeight: 2 }}>
            {rec.beginner_mistakes.split(/\. /).filter(Boolean).map((m, i) => (
              <li key={i}>{m}{m.endsWith('.') ? '' : '.'}</li>
            ))}
          </ul>
        </Section>
      )}

      {rec.alternative_patterns && (
        <Section title="🔗 Related patterns to consider" label="ALTERNATIVES">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {rec.alternative_patterns.split(',').map(a => {
              const [name, desc] = a.split('(');
              return (
                <span key={a} style={{
                  fontSize: 10, padding: '2px 10px', borderRadius: 10,
                  background: 'var(--bg-primary)', color: 'var(--text-muted)',
                  border: '1px solid var(--border)',
                }} title={desc ? desc.replace(')', '') : ''}>{name.trim()}</span>
              );
            })}
          </div>
        </Section>
      )}

      {pattern.techniques && pattern.techniques.length > 0 && (
        <Section title="🔧 Techniques covered" label="SUB-PATTERNS">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {pattern.techniques.map(t => (
              <span key={t} style={{
                fontSize: 10, padding: '2px 8px', borderRadius: 10,
                background: 'var(--bg-primary)', color: 'var(--text-muted)',
              }}>{t}</span>
            ))}
          </div>
        </Section>
      )}

      {pattern.problems && pattern.problems.length > 0 && (
        <Section title="📋 Problems in this pattern" label="PROBLEM LIST">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {pattern.problems.slice(0, 20).map(p => (
              <Link key={p.id} to={`/problems/${p.id}`}
                style={{ textDecoration: 'none', fontSize: 12, color: 'var(--text-secondary)', padding: '6px 0' }}>
                <span className={`tag tag-${p.difficulty}`} style={{ marginRight: 8 }}>{p.difficulty}</span>
                {p.title}
              </Link>
            ))}
            {pattern.problems.length > 20 && (
              <Link to={`/problems?category=${pattern.id}`} style={{ fontSize: 12, color: 'var(--accent)', marginTop: 8 }}>
                View all {pattern.problemCount} problems →
              </Link>
            )}
          </div>
        </Section>
      )}
    </div>
  );
}
