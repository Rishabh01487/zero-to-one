import React, { useState, useRef, useCallback } from 'react';

const DEFAULT_CODE = `#include <iostream>
using namespace std;

int main() {
  int x = 5;
  int y = 10;
  int sum = x + y;
  cout << "Sum: " << sum << endl;
  return 0;
}`;

const EXAMPLE_CODES = [
  { label: 'Variables', code: `#include <iostream>
using namespace std;

int main() {
  int a = 10;
  int b = 20;
  int temp = a;
  a = b;
  b = temp;
  cout << "a = " << a << ", b = " << b << endl;
  return 0;
}` },
  { label: 'Loop', code: `#include <iostream>
using namespace std;

int main() {
  int sum = 0;
  for (int i = 1; i <= 5; i++) {
    sum = sum + i;
    cout << "i=" << i << " sum=" << sum << endl;
  }
  return 0;
}` },
  { label: 'Fibonacci', code: `#include <iostream>
using namespace std;

int fib(int n) {
  if (n <= 1) return n;
  return fib(n-1) + fib(n-2);
}

int main() {
  int n = 5;
  int result = fib(n);
  cout << "fib(" << n << ") = " << result << endl;
  return 0;
}` },
  { label: 'Array', code: `#include <iostream>
using namespace std;

int main() {
  int arr[] = {7, 2, 9, 1, 5};
  int n = 5;
  for (int i = 0; i < n-1; i++) {
    for (int j = 0; j < n-i-1; j++) {
      if (arr[j] > arr[j+1]) {
        int t = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = t;
      }
    }
  }
  for (int i = 0; i < n; i++)
    cout << arr[i] << " ";
  cout << endl;
  return 0;
}` }
];

export default function VisualizerPage() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [variables, setVariables] = useState({});
  const [lineMap, setLineMap] = useState([]);
  const [currentLine, setCurrentLine] = useState(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState('');
  const [playback, setPlayback] = useState(false);
  const timerRef = useRef(null);

  const visualize = async () => {
    setRunning(true);
    setError('');
    setCurrentStep(0);
    setVariables({});
    setCurrentLine(null);
    if (timerRef.current) clearInterval(timerRef.current);
    setPlayback(false);

    try {
      const res = await fetch('/api/visualize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setRunning(false);
        return;
      }

      setSteps(data.steps || []);
      setLineMap(data.lineMap || []);
      setRunning(false);
    } catch (err) {
      setError('Failed to connect to server');
      setRunning(false);
    }
  };

  const stepForward = useCallback(() => {
    if (currentStep >= steps.length) {
      setPlayback(false);
      return;
    }

    const step = steps[currentStep];
    if (step.type === 'var') {
      setVariables(prev => ({ ...prev, [step.varName]: step.varValue }));
    } else if (step.type === 'line') {
      setCurrentLine(step.lineNumber);
    }

    setCurrentStep(prev => prev + 1);
  }, [currentStep, steps]);

  const stepBackward = useCallback(() => {
    if (currentStep <= 0) return;
    setPlayback(false);
    if (timerRef.current) clearInterval(timerRef.current);

    setCurrentStep(prev => prev - 1);
    setVariables({});
    setCurrentLine(null);

    for (let i = 0; i < currentStep - 1; i++) {
      const s = steps[i];
      if (s.type === 'var') {
        setVariables(prev => ({ ...prev, [s.varName]: s.varValue }));
      } else if (s.type === 'line') {
        setCurrentLine(s.lineNumber);
      }
    }
  }, [currentStep, steps]);

  const togglePlayback = () => {
    if (playback) {
      setPlayback(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      if (currentStep >= steps.length) {
        setCurrentStep(0);
        setVariables({});
        setCurrentLine(null);
      }
      setPlayback(true);
      timerRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length) {
            clearInterval(timerRef.current);
            setPlayback(false);
            return prev;
          }
          return prev + 1;
        });
      }, 800);
    }
  };

  React.useEffect(() => {
    if (playback && currentStep < steps.length) {
      const step = steps[currentStep - 1];
      if (step?.type === 'var') {
        setVariables(prev => ({ ...prev, [step.varName]: step.varValue }));
      } else if (step?.type === 'line') {
        setCurrentLine(step.lineNumber);
      }
    }
  }, [currentStep, playback]);

  React.useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const codeLines = code.split('\n');
  const hasVars = Object.keys(variables).length > 0;

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 4px' }}>Code Visualizer</h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: '0 0 16px' }}>
          Watch your C++ code execute step-by-step with live variable tracking
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {EXAMPLE_CODES.map(ex => (
            <button
              key={ex.label}
              className="btn btn-sm btn-secondary"
              onClick={() => { setCode(ex.code); setSteps([]); setVariables({}); setCurrentLine(null); setCurrentStep(0); setError(''); }}
            >{ex.label}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* LEFT: Code with highlighting */}
        <div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{
              padding: '10px 16px',
              background: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--border)',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>Source Code</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                {steps.length > 0 ? `Step ${currentStep}/${steps.length}` : ''}
              </span>
            </div>
            <div style={{ padding: 0 }}>
              {codeLines.map((line, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    lineHeight: '28px',
                    background: currentLine === i + 1 ? 'rgba(124,58,237,0.2)' : 'transparent',
                    borderLeft: currentLine === i + 1 ? '3px solid var(--primary)' : '3px solid transparent',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span style={{
                    width: 40,
                    textAlign: 'right',
                    paddingRight: 12,
                    color: 'var(--text-muted)',
                    userSelect: 'none',
                    fontSize: 11
                  }}>{i + 1}</span>
                  <span style={{ color: 'var(--text-primary)', whiteSpace: 'pre', flex: 1 }}>{line}</span>
                </div>
              ))}
            </div>
          </div>

          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            style={{
              width: '100%',
              height: 200,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              marginTop: 12,
              resize: 'vertical',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              padding: 12,
              borderRadius: 'var(--radius)',
              tabSize: 2
            }}
          />

          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button className="btn btn-primary" onClick={visualize} disabled={running}>
              {running ? '⏳ Processing...' : '▶ Visualize'}
            </button>
            <button className="btn btn-sm btn-secondary" onClick={stepBackward} disabled={currentStep <= 0}>
              ◀ Step Back
            </button>
            <button className="btn btn-sm btn-secondary" onClick={stepForward} disabled={currentStep >= steps.length}>
              Step Forward ▶
            </button>
            <button
              className={`btn btn-sm ${playback ? 'btn-danger' : 'btn-success'}`}
              onClick={togglePlayback}
              disabled={steps.length === 0}
            >
              {playback ? '⏹ Stop' : '▶ Auto Play'}
            </button>
          </div>
        </div>

        {/* RIGHT: Variables + Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ flex: 1 }}>
            <div style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: 16,
              textTransform: 'uppercase',
              letterSpacing: 0.5
            }}>
              Variable State
            </div>
            {!hasVars ? (
              <div style={{
                textAlign: 'center',
                padding: 40,
                color: 'var(--text-muted)',
                fontSize: 13
              }}>
                {steps.length === 0
                  ? 'Click "Visualize" to start tracing variable changes'
                  : 'No variables detected in current scope'}
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {Object.entries(variables).map(([name, value]) => (
                  <div
                    key={name}
                    style={{
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius)',
                      padding: '12px 16px',
                      minWidth: 120,
                      animation: 'fadeIn 0.3s ease'
                    }}
                  >
                    <div style={{
                      fontSize: 11,
                      color: 'var(--primary-light)',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      marginBottom: 4
                    }}>
                      {name}
                    </div>
                    <div style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card">
            <div style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: 12,
              textTransform: 'uppercase',
              letterSpacing: 0.5
            }}>
              Execution Log
            </div>
            <div style={{
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius)',
              padding: 12,
              maxHeight: 200,
              overflow: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              lineHeight: 1.6
            }}>
              {steps.length === 0 ? (
                <span style={{ color: 'var(--text-muted)' }}>Waiting for execution...</span>
              ) : (
                steps.slice(0, Math.max(currentStep, 0)).map((step, i) => (
                  <div key={i} style={{
                    color: step.type === 'line' ? 'var(--accent)' : step.type === 'var' ? 'var(--success)' : 'var(--text-primary)',
                    padding: '1px 0'
                  }}>
                    {step.type === 'line' ? `📍 Line ${step.lineNumber}` : ''}
                    {step.type === 'var' ? `📦 ${step.varName} = ${step.varValue}` : ''}
                  </div>
                ))
              )}
            </div>
          </div>

          {error && (
            <div className="card" style={{ borderColor: 'rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.06)' }}>
              <pre style={{ margin: 0, fontSize: 12, color: 'var(--danger)', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)' }}>{error}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
