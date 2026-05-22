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
      .then(data => {
        setLesson(data);
        setLoading(false);
      })
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
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 40 }}>
        <div className="skeleton" style={{ height: 40, width: '60%', marginBottom: 24 }} />
        <div className="skeleton" style={{ height: 400 }} />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 40, textAlign: 'center' }}>
        <h2>Lesson not found</h2>
        <Link to="/lessons" className="btn btn-primary">Back to Lessons</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px' }}>
      <Link to="/lessons" style={{
        color: 'var(--text-muted)',
        textDecoration: 'none',
        fontSize: 13,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        marginBottom: 24
      }}>← Back to Lessons</Link>

      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>{lesson.title}</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span className={`tag ${lesson.category === 'basics' ? 'tag-beginner' : lesson.category === 'advanced' ? 'tag-advanced' : 'tag-intermediate'}`}>
            {lesson.category.replace('-', ' ')}
          </span>
        </div>
      </div>

      <div className="card" style={{
        padding: 32,
        lineHeight: 1.8,
        fontSize: 15
      }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            code({ node, inline, className, children, ...props }) {
              if (!inline) {
                return (
                  <div className="code-block" style={{ position: 'relative' }}>
                    <button
                      onClick={() => navigator.clipboard.writeText(String(children))}
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-secondary)',
                        padding: '4px 10px',
                        borderRadius: 4,
                        fontSize: 11,
                        cursor: 'pointer'
                      }}
                    >Copy</button>
                    <code className={className} {...props}>{children}</code>
                  </div>
                );
              }
              return <code style={{ background: 'var(--bg-tertiary)', padding: '2px 6px', borderRadius: 4, fontSize: 13 }} {...props}>{children}</code>;
            },
            h2({ children }) {
              return <h2 style={{ fontSize: 22, fontWeight: 700, margin: '32px 0 12px', borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>{children}</h2>;
            },
            h3({ children }) {
              return <h3 style={{ fontSize: 18, fontWeight: 600, margin: '24px 0 8px' }}>{children}</h3>;
            },
            p({ children }) {
              return <p style={{ margin: '12px 0', color: 'var(--text-secondary)' }}>{children}</p>;
            },
            ul({ children }) {
              return <ul style={{ margin: '8px 0', paddingLeft: 24, color: 'var(--text-secondary)' }}>{children}</ul>;
            },
            li({ children }) {
              return <li style={{ margin: '6px 0' }}>{children}</li>;
            },
            blockquote({ children }) {
              return <blockquote style={{ borderLeft: '3px solid var(--primary)', padding: '12px 20px', margin: '16px 0', background: 'rgba(124,58,237,0.06)', borderRadius: '0 var(--radius) var(--radius) 0' }}>{children}</blockquote>;
            }
          }}
        >{lesson.content}</ReactMarkdown>
      </div>

      {lesson.code_example && (
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Try It Yourself</h3>
            <button className="btn btn-sm btn-secondary" onClick={() => setShowEditor(!showEditor)}>
              {showEditor ? 'Close Editor' : 'Open Editor'}
            </button>
          </div>
          {showEditor && <Editor initialCode={lesson.code_example} />}
        </div>
      )}

      <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {completed ? (
            <span style={{ color: 'var(--success)', fontWeight: 600, fontSize: 14 }}>✓ Completed</span>
          ) : (
            <button className="btn btn-success" onClick={handleComplete}>
              Mark as Complete
            </button>
          )}
        </div>
        {username && (
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Learning as <strong style={{ color: 'var(--text-secondary)' }}>{username}</strong>
          </span>
        )}
      </div>
    </div>
  );
}
