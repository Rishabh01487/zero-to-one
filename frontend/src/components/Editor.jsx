import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

const DEFAULT_CODE = `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`;

export default function CodeEditor({ initialCode, readOnly, onCodeChange, height }) {
  const [code, setCode] = useState(initialCode || DEFAULT_CODE);

  useEffect(() => {
    if (initialCode) setCode(initialCode);
  }, [initialCode]);

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
    </div>
  );
}
