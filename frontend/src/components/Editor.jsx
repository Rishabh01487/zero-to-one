import React, { useState, useRef, useEffect } from 'react';
import Editor, { loader } from '@monaco-editor/react';

const DEFAULT_CODE = `class Solution {
public:
    // Implement your solution here
    
};`;

export default function CodeEditor({ initialCode, readOnly, onCodeChange, height }) {
  const [code, setCode] = useState(initialCode || DEFAULT_CODE);
  const [output, setOutput] = useState('');
  const [execTime, setExecTime] = useState('');
  const [running, setRunning] = useState(false);
  const [input, setInput] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialCode) setCode(initialCode);
  }, [initialCode]);

  const handleRun = async () => {
    setRunning(true);
    setOutput('');
    setError('');
    setExecTime('');

    try {
      const res = await fetch('/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, input })
      });
      const data = await res.json();
      if (data.success) {
        setOutput(data.output);
        setExecTime(data.executionTime);
      } else {
        setError(data.output);
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
    setRunning(false);
  };

  return (
    <div style={{
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      background: 'var(--bg-card)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#EF4444' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#F59E0B' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#10B981' }} />
          <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 8 }}>main.cpp</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => setShowInput(!showInput)}
          >Input</button>
          <button
            className="btn btn-sm btn-primary"
            onClick={handleRun}
            disabled={running}
            style={{ opacity: running ? 0.6 : 1 }}
          >
            {running ? 'Running...' : 'Run'}
          </button>
        </div>
      </div>

      <Editor
        height={height || 400}
        language="cpp"
        theme="vs-dark"
        value={code}
        onChange={val => {
          setCode(val || '');
          if (onCodeChange) onCodeChange(val || '');
        }}
        options={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineNumbers: 'on',
          readOnly: readOnly || false,
          renderLineHighlight: 'all',
          cursorBlinking: 'smooth',
          smoothScrolling: true,
          padding: { top: 12 },
          automaticLayout: true,
        }}
      />

      {showInput && (
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Standard Input:</div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={2}
            style={{ width: '100%', fontFamily: 'var(--font-mono)', fontSize: 13, resize: 'vertical' }}
            placeholder="Enter input for your program..."
          />
        </div>
      )}

      {(output || error || execTime) && (
        <div style={{
          borderTop: '1px solid var(--border)',
          padding: '16px',
          background: 'var(--bg-secondary)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
              {error ? 'Errors' : 'Output'}
            </span>
            {execTime && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{execTime}</span>}
          </div>
          <pre style={{
            margin: 0,
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            color: error ? 'var(--danger)' : 'var(--text-primary)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            maxHeight: 300,
            overflow: 'auto',
            lineHeight: 1.5
          }}>{error || output}</pre>
        </div>
      )}
    </div>
  );
}
