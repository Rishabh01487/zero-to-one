import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

const DEFAULT_CODE = `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`;

export default function CodeEditor({ initialCode, readOnly, onCodeChange, height }) {
  const [code, setCode] = useState(initialCode || DEFAULT_CODE);
  const [output, setOutput] = useState('');
  const [execTime, setExecTime] = useState('');
  const [running, setRunning] = useState(false);
  const [input, setInput] = useState('4\n2 7 11 15\n9');
  const [showInput, setShowInput] = useState(true);
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
      border: '1px solid #d0d7de',
      borderRadius: 8,
      overflow: 'hidden',
      background: '#fff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 16px',
        background: 'linear-gradient(135deg, #1a73e8, #1557b0)',
        borderBottom: '1px solid #124a9a'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#fff', fontWeight: 600, letterSpacing: '0.3px' }}>solution.cpp</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setShowInput(!showInput)}
            style={{
              padding: '6px 14px',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 5,
              background: showInput ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
              color: '#fff',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              transition: '0.2s'
            }}
            onMouseOver={e => e.target.style.background = 'rgba(255,255,255,0.2)'}
            onMouseOut={e => e.target.style.background = showInput ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)'}
          >Input</button>
          <button
            onClick={handleRun}
            disabled={running}
            style={{
              padding: '6px 18px',
              border: 'none',
              borderRadius: 5,
              background: running ? '#93b8f0' : '#fff',
              color: running ? '#fff' : '#1a73e8',
              fontSize: 12,
              fontWeight: 600,
              cursor: running ? 'not-allowed' : 'pointer',
              transition: '0.2s'
            }}
          >
            {running ? 'Running...' : 'Run'}
          </button>
        </div>
      </div>

      <Editor
        height={height || 400}
        language="cpp"
        theme="vs"
        value={code}
        onChange={val => {
          setCode(val || '');
          if (onCodeChange) onCodeChange(val || '');
        }}
        options={{
          fontSize: 14,
          fontFamily: "'Courier New', monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineNumbers: 'off',
          readOnly: readOnly || false,
          renderLineHighlight: 'none',
          cursorBlinking: 'solid',
          smoothScrolling: false,
          padding: { top: 12 },
          automaticLayout: true,
          autoClosingBrackets: 'always',
          autoClosingQuotes: 'always',
          autoClosingDelete: 'auto',
          autoClosingOvertype: 'auto',
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          overviewRulerBorder: false,
          scrollbar: { vertical: 'hidden', horizontal: 'auto' },
          occurrencesHighlight: 'off',
          selectionHighlight: false,
          renderWhitespace: 'none',
        }}
      />

      {showInput && (
        <div style={{ padding: '12px 16px', borderTop: '1px solid #e8ecf0', background: '#f8f9fa' }}>
          <div style={{ fontSize: 12, color: '#1a73e8', marginBottom: 6, fontWeight: 600 }}>Custom Input:</div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={2}
            style={{
              width: '100%',
              fontFamily: "'Courier New', monospace",
              fontSize: 13,
              color: '#333',
              background: '#fff',
              border: '1px solid #d0d7de',
              borderRadius: 5,
              padding: '8px 10px',
              resize: 'vertical',
              outline: 'none'
            }}
            placeholder="e.g. 4 (size) then 2 7 11 15 (nums) then 9 (target)"
          />
        </div>
      )}

      {(output || error || execTime) && (
        <div style={{
          borderTop: '1px solid #e8ecf0',
          padding: '16px',
          background: '#f8f9fa'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#1a73e8' }}>
              {error ? 'Errors' : 'Output'}
            </span>
            {execTime && <span style={{ fontSize: 11, color: '#6b7280' }}>{execTime}</span>}
          </div>
          <pre style={{
            margin: 0,
            fontFamily: "'Courier New', monospace",
            fontSize: 13,
            color: error ? '#d32f2f' : '#1f2937',
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
