import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';

const LANGUAGES = [
  { id: 'cpp', label: 'C++', ext: 'cpp' },
  { id: 'java', label: 'Java', ext: 'java' },
  { id: 'python', label: 'Python', ext: 'py' },
  { id: 'javascript', label: 'JavaScript', ext: 'js' },
];

const DEFAULT_CODE = {
  cpp: `#include <iostream>
using namespace std;

int main() {
  cout << "Hello, World!" << endl;
  return 0;
}`,
  java: `import java.util.*;

public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`,
  python: `def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`,
  javascript: `function main() {
  console.log("Hello, World!");
}

main();`,
};

const TEMPLATES = {
  cpp: {
    'hello': `#include <iostream>
using namespace std;

int main() {
  cout << "Hello, World!" << endl;
  return 0;
}`,
    'fibonacci': `#include <iostream>
using namespace std;

int fib(int n) {
  if (n <= 1) return n;
  return fib(n-1) + fib(n-2);
}

int main() {
  int n = 10;
  cout << "fib(" << n << ") = " << fib(n) << endl;
  return 0;
}`,
    'bubble sort': `#include <iostream>
using namespace std;

int main() {
  int arr[] = {64, 34, 25, 12, 22, 11, 90};
  int n = sizeof(arr)/sizeof(arr[0]);
  for (int i = 0; i < n-1; i++)
    for (int j = 0; j < n-i-1; j++)
      if (arr[j] > arr[j+1]) swap(arr[j], arr[j+1]);
  cout << "Sorted: ";
  for (int x : arr) cout << x << " ";
  cout << endl;
  return 0;
}`,
    'linked list': `#include <iostream>
using namespace std;

struct Node {
  int data;
  Node* next;
  Node(int val) : data(val), next(nullptr) {}
};

int main() {
  Node* head = new Node(1);
  head->next = new Node(2);
  head->next->next = new Node(3);
  for (Node* p = head; p; p = p->next)
    cout << p->data << " -> ";
  cout << "null" << endl;
  return 0;
}`,
    'bst': `#include <iostream>
using namespace std;

struct TreeNode {
  int val;
  TreeNode *left, *right;
  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

TreeNode* insert(TreeNode* root, int val) {
  if (!root) return new TreeNode(val);
  if (val < root->val) root->left = insert(root->left, val);
  else root->right = insert(root->right, val);
  return root;
}

void inorder(TreeNode* root) {
  if (!root) return;
  inorder(root->left);
  cout << root->val << " ";
  inorder(root->right);
}

int main() {
  TreeNode* root = nullptr;
  for (int v : {5, 3, 7, 2, 4, 6, 8})
    root = insert(root, v);
  cout << "Inorder: ";
  inorder(root);
  cout << endl;
  return 0;
}`,
  },
};

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
);

export default function PlaygroundPage() {
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState(DEFAULT_CODE.cpp);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(null);

  const switchLanguage = (lang) => {
    setLanguage(lang);
    setCode(DEFAULT_CODE[lang]);
    setOutput('');
    setActiveTemplate(null);
  };

  const loadTemplate = (key) => {
    const tpl = TEMPLATES.cpp?.[key];
    if (tpl) {
      setCode(tpl);
      setActiveTemplate(key);
      setOutput('');
    }
  };

  const handleRun = async () => {
    setRunning(true);
    setOutput('');
    try {
      if (language === 'javascript') {
        const logs = [];
        const sandbox = { console: { log: (...a) => logs.push(a.map(String).join(' ')) } };
        try {
          const fn = new Function(...Object.keys(sandbox), code);
          fn(...Object.values(sandbox));
          setOutput(logs.join('\n') || '(no output)');
        } catch (e) {
          setOutput(`Error: ${e.message}`);
        }
      } else if (language === 'cpp') {
        const res = await fetch('/api/compile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, input: input || '' })
        });
        const data = await res.json();
        setOutput(data.success ? data.output : `Error: ${data.output}`);
      } else {
        setOutput('Compilation via Wandbox only supported for C++. Use local tools for ' + language + '.');
      }
    } catch (err) {
      setOutput(`Error: ${err.message}`);
    }
    setRunning(false);
  };

  return (
    <div style={{ padding: '20px 24px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px' }}>Playground</h1>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
          Write, compile, and run code in your browser
        </p>
      </div>

      <div style={{ display: 'flex', gap: 20, flexDirection: 'column' }}>
        {/* Templates (C++ only) */}
        {language === 'cpp' && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {Object.keys(TEMPLATES.cpp || {}).map(key => (
              <button key={key}
                className={`btn btn-sm ${activeTemplate === key ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => loadTemplate(key)}>{key}</button>
            ))}
          </div>
        )}

        {/* Language + Toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 8, flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {LANGUAGES.map(l => (
              <button key={l.id}
                onClick={() => switchLanguage(l.id)}
                style={{
                  padding: '6px 14px', borderRadius: 6, border: '1px solid var(--border)',
                  background: language === l.id ? '#1a73e8' : '#fff',
                  color: language === l.id ? '#fff' : 'var(--text-primary)',
                  fontSize: 13, fontWeight: 500, cursor: 'pointer',
                }}>{l.label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={() => setShowInput(!showInput)}
              className="btn btn-sm btn-ghost"
              style={showInput ? { background: '#e8f0fe', color: '#1a73e8' } : {}}>
              Input
            </button>
            <button
              onClick={handleRun}
              disabled={running}
              className="btn btn-sm btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <PlayIcon /> {running ? 'Running…' : 'Run'}
            </button>
          </div>
        </div>

        {/* Editor */}
        <div style={{
          border: '1px solid #d0d7de', borderRadius: 8, overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 16px',
            background: 'linear-gradient(135deg, #1a73e8, #1557b0)',
            borderBottom: '1px solid #124a9a',
          }}>
            <span style={{ fontSize: 12, color: '#fff', fontWeight: 600, letterSpacing: '0.3px' }}>
              solution.{LANGUAGES.find(l => l.id === language)?.ext || 'cpp'}
            </span>
          </div>
          <Editor
            height={440}
            language={language === 'cpp' ? 'cpp' : language === 'javascript' ? 'javascript' : language === 'python' ? 'python' : 'java'}
            theme="vs"
            value={code}
            onChange={val => setCode(val || '')}
            options={{
              fontSize: 14,
              fontFamily: "'Courier New', monospace",
              minimap: { enabled: false },
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              padding: { top: 12 },
              automaticLayout: true,
              autoClosingBrackets: 'always',
              autoClosingQuotes: 'always',
              tabSize: 4,
              renderWhitespace: 'selection',
              cursorBlinking: 'smooth',
            }}
          />
        </div>

        {/* Custom Input */}
        {showInput && (
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>
              Custom Input
            </label>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Enter input for stdin..."
              rows={3}
              style={{
                width: '100%', padding: '10px 12px', fontSize: 13, fontFamily: "'Courier New', monospace",
                border: '1px solid var(--border)', borderRadius: 6, resize: 'vertical',
                background: '#f8f9fa', color: 'var(--text-primary)',
              }}
            />
          </div>
        )}

        {/* Output */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Output</span>
            {output && (
              <button className="btn btn-xs btn-ghost" onClick={() => setOutput('')}
                style={{ fontSize: 11, color: 'var(--text-muted)' }}>Clear</button>
            )}
          </div>
          <pre style={{
            margin: 0, padding: '14px 16px', minHeight: 80, maxHeight: 300, overflow: 'auto',
            background: '#1e1e1e', color: '#d4d4d4', borderRadius: 8,
            fontSize: 13, fontFamily: "'Courier New', monospace", lineHeight: 1.5, whiteSpace: 'pre-wrap',
          }}>
            {output || (running ? 'Running...' : 'Click "Run" to see output')}
          </pre>
        </div>
      </div>

      <style>{`
        .btn { font-size: 13px; padding: 6px 14px; border-radius: 6px; border: 1px solid var(--border); cursor: pointer; background: #fff; font-weight: 500; }
        .btn-sm { font-size: 12px; padding: 4px 12px; }
        .btn-xs { font-size: 11px; padding: 2px 8px; }
        .btn-primary { background: #1a73e8; color: #fff; border-color: #1a73e8; }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn-ghost { background: transparent; border-color: var(--border); color: var(--text-primary); }
        .btn-ghost:hover { background: #f0f2f5; }
      `}</style>
    </div>
  );
}
