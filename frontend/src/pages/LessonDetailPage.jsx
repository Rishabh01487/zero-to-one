import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import Editor from '../components/Editor';

export default function LessonDetailPage({ username }) {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetch(`/api/lessons/${id}`)
      .then(r => r.json())
      .then(data => { setLesson(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleComplete = () => {
    if (username) {
      fetch(`/api/progress/${username}/${lesson.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemType: 'lesson' })
      }).catch(() => {});
    }
    setCompleted(true);
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: 40 }}>
        <div className="skeleton" style={{ height: 36, width: '50%', marginBottom: 20 }} />
        <div className="skeleton" style={{ height: 400 }} />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="container" style={{ paddingTop: 60, textAlign: 'center' }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Lesson not found</h2>
        <Link to="/lessons" className="btn btn-primary" style={{ marginTop: 16 }}>Back to Lessons</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 60 }}>
      <Link to="/lessons" style={{
        color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13,
        display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24
      }}><span style={{ fontFamily: 'var(--font-mono)' }}>&lt;-</span> Back to Lessons</Link>

      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.5px' }}>{lesson.title}</h1>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'capitalize' }}>{lesson.category.replace('-', ' ')}</span>
      </div>

      <div className="card" style={{ padding: 32, fontSize: 15, lineHeight: 1.8 }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            code({ node, inline, className, children, ...props }) {
              if (!inline) {
                return (
                  <div className="code-block" style={{ position: 'relative', margin: '16px 0' }}>
                    <button
                      onClick={() => navigator.clipboard.writeText(String(children))}
                      style={{
                        position: 'absolute', top: 8, right: 8,
                        background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                        color: 'var(--text-secondary)', padding: '3px 8px',
                        borderRadius: 4, fontSize: 11, cursor: 'pointer'
                      }}
                    >copy</button>
                    <code className={className} {...props}>{children}</code>
                  </div>
                );
              }
              return <code style={{ background: 'var(--bg-tertiary)', padding: '2px 6px', borderRadius: 4, fontSize: 13 }} {...props}>{children}</code>;
            },
            h2({ children }) {
              return <h2 style={{ fontSize: 20, fontWeight: 600, margin: '36px 0 12px' }}>{children}</h2>;
            },
            h3({ children }) {
              return <h3 style={{ fontSize: 17, fontWeight: 600, margin: '24px 0 8px' }}>{children}</h3>;
            },
            p({ children }) {
              return <p style={{ margin: '12px 0', color: 'var(--text-secondary)' }}>{children}</p>;
            },
            ul({ children }) {
              return <ul style={{ margin: '8px 0', paddingLeft: 24, color: 'var(--text-secondary)' }}>{children}</ul>;
            },
            li({ children }) {
              return <li style={{ margin: '4px 0' }}>{children}</li>;
            },
            blockquote({ children }) {
              return <blockquote style={{
                borderLeft: '2px solid var(--text-muted)',
                padding: '12px 20px', margin: '16px 0',
                background: 'var(--bg-secondary)',
                borderRadius: '0 var(--radius) var(--radius) 0'
              }}>{children}</blockquote>;
            },
            strong({ children }) {
              return <strong style={{ color: 'var(--text-primary)' }}>{children}</strong>;
            }
          }}
        >{lesson.content}</ReactMarkdown>
      </div>

      {lesson.code_example && (
        <div style={{ marginTop: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Try It Yourself</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => setShowEditor(!showEditor)}>
              {showEditor ? 'Close' : 'Open Editor'}
            </button>
          </div>
          {showEditor && <Editor initialCode={lesson.code_example} />}
        </div>
      )}

      <div style={{ marginTop: 32, display: 'flex', gap: 12, alignItems: 'center' }}>
        {completed ? (
          <span style={{ color: 'var(--success)', fontWeight: 500, fontSize: 13 }}>Completed</span>
        ) : (
          <button className="btn btn-success" onClick={handleComplete}>Mark Complete</button>
        )}
        {username && (
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{username}</span>
        )}
      </div>
    </div>
  );
}
