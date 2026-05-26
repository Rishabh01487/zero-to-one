import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

const DEFAULT_CODE = `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;

        for (int i = 0; i < nums.size(); i++) {
            int need = target - nums[i];

            if (mp.find(need) != mp.end()) {
                return {mp[need], i};
            }

            mp[nums[i]] = i;
        }

        return {};
    }
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
      background: '#fff'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        background: '#f5f5f5',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#999', fontWeight: 600 }}>solution.cpp</span>
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
        <div style={{ padding: '12px 16px', borderTop: '1px solid #e0e0e0', background: '#fafafa' }}>
          <div style={{ fontSize: 12, color: '#666', marginBottom: 6, fontWeight: 600 }}>Standard Input:</div>
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
              border: '1px solid #ddd',
              borderRadius: 4,
              padding: '8px',
              resize: 'vertical',
              outline: 'none'
            }}
            placeholder="Enter input for your program..."
          />
        </div>
      )}

      {(output || error || execTime) && (
        <div style={{
          borderTop: '1px solid #e0e0e0',
          padding: '16px',
          background: '#fafafa'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#666' }}>
              {error ? 'Errors' : 'Output'}
            </span>
            {execTime && <span style={{ fontSize: 11, color: '#999' }}>{execTime}</span>}
          </div>
          <pre style={{
            margin: 0,
            fontFamily: "'Courier New', monospace",
            fontSize: 13,
            color: error ? '#d32f2f' : '#333',
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
