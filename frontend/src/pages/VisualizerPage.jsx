import React, { useState, useRef, useCallback, useEffect } from 'react';

const COLORS = ['#ff6b6b','#feca57','#48dbfb','#ff9ff3','#54a0ff','#5f27cd','#01a3a4','#f368e0','#ff6348','#7bed9f','#70a1ff','#ffa502'];
const BAR_COLORS = ['#ff4757','#ff6348','#ff7f50','#ffa502','#eccc68','#7bed9f','#2ed573','#1e90ff','#3742fa','#a29bfe','#fd79a8','#e84393'];

const DEFAULT_CODE = `#include <iostream>
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
}`;

const EXAMPLES = [
  { label: 'bubble sort', code: `#include <iostream>
using namespace std;
int main() {
  int arr[] = {7, 2, 9, 1, 5};
  int n = 5;
  for (int i = 0; i < n-1; i++) {
    for (int j = 0; j < n-i-1; j++) {
      if (arr[j] > arr[j+1]) {
        int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;
      }
    }
  }
  for (int i = 0; i < n; i++) cout << arr[i] << " ";
  cout << endl; return 0;
}` },
  { label: 'reverse', code: `#include <iostream>
using namespace std;
int main() {
  int arr[] = {10, 20, 30, 40, 50};
  int n = 5, i = 0, j = n-1;
  while (i < j) {
    int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    i++; j--;
  }
  for (int i = 0; i < n; i++) cout << arr[i] << " ";
  cout << endl; return 0;
}` },
  { label: 'max element', code: `#include <iostream>
using namespace std;
int main() {
  int arr[] = {3, 7, 1, 9, 4};
  int n = 5, mx = arr[0];
  for (int i = 1; i < n; i++) if (arr[i] > mx) mx = arr[i];
  cout << "max = " << mx << endl; return 0;
}` },
  { label: 'loop', code: `#include <iostream>
using namespace std;
int main() {
  int sum = 0;
  for (int i = 1; i <= 5; i++) { sum = sum + i; cout << "i=" << i << " sum=" << sum << endl; }
  return 0;
}` },
  { label: 'selection sort', code: `#include <iostream>
using namespace std;
int main() {
  int arr[] = {5, 3, 8, 6, 2};
  int n = 5;
  for (int i = 0; i < n-1; i++) {
    int minIdx = i;
    for (int j = i+1; j < n; j++) if (arr[j] < arr[minIdx]) minIdx = j;
    int t = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = t;
  }
  for (int i = 0; i < n; i++) cout << arr[i] << " ";
  cout << endl; return 0;
}` },
];

function getStepExplanation(step, idx, steps) {
  if (step.type === 'var') {
    if (step.varName === 't' || step.varName === 'temp') return `temp store ${step.varValue}`;
    if (step.varName === 'mx' || step.varName === 'max') return `max updated to ${step.varValue}`;
    return `${step.varName} = ${step.varValue}`;
  }
  if (step.type === 'line') {
    const prev = steps.slice(0, idx).filter(s => s.type === 'line').pop();
    return prev ? `advancing to line ${step.lineNumber}` : `starting at line ${step.lineNumber}`;
  }
  return '';
}

function tryParseArray(str) {
  const nums = str.match(/\d+/g);
  if (nums && nums.length > 1) return nums.map(Number);
  return null;
}

function detectArrayVars(variables) {
  const result = {};
  for (const [name, value] of Object.entries(variables)) {
    const parsed = tryParseArray(String(value));
    if (parsed && parsed.length > 1) result[name] = parsed;
  }
  return result;
}

function BarChart({ data, highlightIndices, prevData }) {
  const maxVal = Math.max(...data, 1);
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 180, padding: '12px 0' }}>
        {data.map((val, i) => {
          const pct = (val / maxVal) * 100;
          const isHighlight = highlightIndices !== undefined && (
            i === highlightIndices || (Array.isArray(highlightIndices) && highlightIndices.includes(i))
          );
          const colorIdx = i % BAR_COLORS.length;
          const barColor = isHighlight ? '#ffffff' : BAR_COLORS[colorIdx];
          const glow = isHighlight ? '0 0 12px rgba(255,255,255,0.6)' : 'none';
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, transition: 'all 0.25s ease' }}>
              <div style={{
                width: '70%', maxWidth: 36,
                height: `${Math.max(pct, 5)}%`,
                background: barColor,
                borderRadius: '4px 4px 2px 2px',
                boxShadow: glow,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                minHeight: 4,
                position: 'relative',
                opacity: isHighlight ? 1 : 0.85,
              }}>
                {isHighlight && <div style={{position:'absolute',top:-20,left:'50%',transform:'translateX(-50%)',fontSize:9,color:'#fff',whiteSpace:'nowrap',fontWeight:600}}>⚡</div>}
              </div>
              <span style={{ fontSize: 10, color: isHighlight ? '#fff' : 'var(--text-muted)', marginTop: 4, fontFamily: 'var(--font-mono)', fontWeight: isHighlight ? 700 : 400 }}>{val}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LinkedListView({ headVar }) {
  if (!headVar) return <div style={{ fontSize: 12, color: 'var(--text-muted)', padding: 16 }}>no linked list data</div>;
  const nodes = String(headVar).split(/->|,|\s+/).filter(s => s && s !== 'null' && s !== 'nullptr' && s !== 'NULL');
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap', padding: '16px 0', justifyContent: 'center' }}>
      {nodes.map((val, i) => (
        <React.Fragment key={i}>
          <div style={{
            border: `2px solid ${BAR_COLORS[i % BAR_COLORS.length]}`,
            borderRadius: 8,
            padding: '8px 14px',
            background: `${BAR_COLORS[i % BAR_COLORS.length]}22`,
            textAlign: 'center',
            minWidth: 44,
            position: 'relative',
            boxShadow: `0 2px 8px ${BAR_COLORS[i % BAR_COLORS.length]}44`
          }}>
            <div style={{ fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-mono)', color: BAR_COLORS[i % BAR_COLORS.length] }}>{val}</div>
            <div style={{ fontSize: 8, color: 'var(--text-muted)', marginTop: 2, fontFamily: 'var(--font-mono)' }}>0x{i}..</div>
          </div>
          {i < nodes.length - 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 2px' }}>
              <span style={{ color: BAR_COLORS[i % BAR_COLORS.length], fontSize: 20, fontWeight: 300 }}>→</span>
              <span style={{ fontSize: 7, color: 'var(--text-muted)', marginTop: -4 }}>next</span>
            </div>
          )}
        </React.Fragment>
      ))}
      <div style={{
        border: '2px dashed var(--text-muted)', borderRadius: 6, padding: '6px 10px',
        marginLeft: 4, fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)'
      }}>null</div>
    </div>
  );
}

function TreeView({ rootVar }) {
  const nums = String(rootVar).match(/\d+/g);
  if (!nums || nums.length === 0) return <div style={{ fontSize: 12, color: 'var(--text-muted)', padding: 16 }}>no tree data</div>;
  const levels = [];
  let idx = 0, count = 1;
  while (idx < nums.length) { levels.push(nums.slice(idx, idx + count)); idx += count; count *= 2; }
  return (
    <div style={{ padding: '16px 0', overflowX: 'auto' }}>
      {levels.map((level, li) => (
        <div key={li} style={{ display: 'flex', justifyContent: 'center', gap: Math.max(20, 50 - li * 8), marginBottom: li < levels.length-1 ? 12 : 0, position: 'relative' }}>
          {li > 0 && level.map((_, vi) => {
            const parentIdx = Math.floor(vi / 2);
            const parentLevel = levels[li-1];
            if (!parentLevel || !parentLevel[parentIdx]) return null;
            return (
              <div key={vi} style={{ position: 'absolute', top: -16, left: `${(vi + 0.5) * (100/level.length)}%`, fontSize: 8, color: 'var(--text-muted)' }}>╱╲</div>
            );
          })}
          {level.map((val, vi) => (
            <div key={vi} style={{
              border: `2px solid ${COLORS[(li + vi) % COLORS.length]}`,
              borderRadius: '50%',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `${COLORS[(li + vi) % COLORS.length]}22`,
              fontSize: 13,
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              color: COLORS[(li + vi) % COLORS.length],
              boxShadow: `0 2px 8px ${COLORS[(li + vi) % COLORS.length]}44`,
              transition: 'all 0.3s ease'
            }}>{val}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

function DetectedVisualization({ variables, lineNumber }) {
  const arrVars = detectArrayVars(variables);
  const hasLinkedList = Object.keys(variables).some(k => k === 'head' || k.startsWith('list'));
  const hasTree = Object.keys(variables).some(k => k === 'root' || k.startsWith('tree'));

  return (
    <div>
      {Object.entries(arrVars).map(([name, data]) => (
        <div key={name}>
          <div style={{ fontSize: 11, color: '#48dbfb', fontWeight: 600, marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {name}[]
          </div>
          <BarChart data={data} highlightIndices={lineNumber} />
        </div>
      ))}
      {hasLinkedList && <LinkedListView headVar={variables.head} />}
      {hasTree && <TreeView rootVar={variables.root} />}
      {Object.keys(arrVars).length === 0 && !hasLinkedList && !hasTree && (
        <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', padding: 20 }}>
          {Object.keys(variables).length > 0 ? 'array or data structure data will visualize here' : 'run the visualizer to see data structures in action'}
        </div>
      )}
    </div>
  );
}

export default function VisualizerPage() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [variables, setVariables] = useState({});
  const [currentLine, setCurrentLine] = useState(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState('');
  const [playback, setPlayback] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => { return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  const visualize = async () => {
    setRunning(true); setError(''); setCurrentStep(0); setVariables({}); setCurrentLine(null);
    if (timerRef.current) clearInterval(timerRef.current);
    setPlayback(false);
    try {
      const res = await fetch('/api/visualize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      const data = await res.json();
      if (data.error) { setError(data.error); setRunning(false); return; }
      setSteps(data.steps || []);
      setRunning(false);
    } catch { setError('connection failed'); setRunning(false); }
  };

  const applyStepsUpTo = useCallback((targetStep) => {
    setVariables({}); setCurrentLine(null);
    for (let i = 0; i < targetStep && i < steps.length; i++) {
      const s = steps[i];
      if (s.type === 'var') setVariables(prev => ({ ...prev, [s.varName]: s.varValue }));
      else if (s.type === 'line') setCurrentLine(s.lineNumber);
    }
  }, [steps]);

  const stepForward = useCallback(() => {
    if (currentStep >= steps.length) { setPlayback(false); return; }
    const step = steps[currentStep];
    if (step.type === 'var') setVariables(prev => ({ ...prev, [step.varName]: step.varValue }));
    else if (step.type === 'line') setCurrentLine(step.lineNumber);
    setCurrentStep(prev => prev + 1);
  }, [currentStep, steps]);

  const stepBackward = useCallback(() => {
    if (currentStep <= 0) return;
    setPlayback(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentStep(prev => prev - 1);
    applyStepsUpTo(currentStep - 1);
  }, [currentStep, steps, applyStepsUpTo]);

  const togglePlayback = () => {
    if (playback) {
      setPlayback(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      if (currentStep >= steps.length) { setCurrentStep(0); setVariables({}); setCurrentLine(null); }
      setPlayback(true);
      timerRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length) { clearInterval(timerRef.current); setPlayback(false); return prev; }
          return prev + 1;
        });
      }, 600);
    }
  };

  useEffect(() => {
    if (playback && currentStep > 0 && currentStep <= steps.length) {
      const step = steps[currentStep - 1];
      if (step?.type === 'var') setVariables(prev => ({ ...prev, [step.varName]: step.varValue }));
      else if (step?.type === 'line') setCurrentLine(step.lineNumber);
    }
  }, [currentStep, playback, steps]);

  const codeLines = code.split('\n');
  const hasSteps = steps.length > 0;
  const currentStepObj = currentStep > 0 && currentStep <= steps.length ? steps[currentStep - 1] : null;
  const currentExplanation = currentStepObj ? getStepExplanation(currentStepObj, currentStep - 1, steps) : '';
  const recentLogs = steps.slice(0, Math.max(currentStep, 0));
  const scalarVars = Object.entries(variables).filter(([k]) => !detectArrayVars({[k]: variables[k]})?.[k]?.length > 1);
  const progress = hasSteps ? Math.round((currentStep / steps.length) * 100) : 0;

  return (
    <div style={{ padding: '20px 24px', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px', background: 'linear-gradient(135deg, #48dbfb, #ff9ff3, #feca57)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Code Visualizer</h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>step through execution with live graphical data structure views</p>
        </div>
        {hasSteps && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 120, height: 4, background: 'var(--bg-tertiary)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #48dbfb, #ff9ff3)', borderRadius: 2, transition: 'width 0.3s ease' }} />
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', minWidth: 80, textAlign: 'right' }}>{currentStep} / {steps.length}</span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
        {EXAMPLES.map(ex => (
          <button key={ex.label} className="btn btn-ghost btn-xs"
            style={{ border: '1px solid var(--border)', borderRadius: 6, fontSize: 11 }}
            onClick={() => { setCode(ex.code); setSteps([]); setVariables({}); setCurrentLine(null); setCurrentStep(0); setError(''); }}
          >{ex.label}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '8px 14px', background: 'linear-gradient(135deg, #1a1a2e, #16213e)', borderBottom: '1px solid rgba(72,219,251,0.2)', fontSize: 11, color: '#48dbfb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600 }}>◉ source.cpp</span>
              {hasSteps && <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{currentStep}/{steps.length}</span>}
            </div>
            <div style={{ overflow: 'auto', maxHeight: 500, background: '#0d1117' }}>
              {codeLines.map((line, i) => (
                <div key={i} style={{
                  display: 'flex', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: '26px',
                  background: currentLine === i + 1 ? 'rgba(72,219,251,0.12)' : 'transparent',
                  borderLeft: currentLine === i + 1 ? '3px solid #48dbfb' : '3px solid transparent',
                  transition: 'all 0.2s ease'
                }}>
                  <span style={{ width: 36, textAlign: 'right', paddingRight: 10, color: currentLine === i + 1 ? '#48dbfb' : 'var(--text-muted)', userSelect: 'none', fontSize: 10 }}>{i + 1}</span>
                  <span style={{ color: currentLine === i + 1 ? '#fff' : 'var(--text-primary)', whiteSpace: 'pre', flex: 1 }}>{line}</span>
                </div>
              ))}
            </div>
          </div>

          <textarea value={code} onChange={e => setCode(e.target.value)}
            style={{
              width: '100%', height: 70, fontFamily: 'var(--font-mono)', fontSize: 11, marginTop: 10, resize: 'vertical',
              background: '#0d1117', border: '1px solid rgba(72,219,251,0.2)', borderRadius: 'var(--radius)',
              color: 'var(--text-primary)', padding: 8, tabSize: 2
            }}
          />

          <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
            <button onClick={visualize} disabled={running}
              style={{
                padding: '7px 18px', border: 'none', borderRadius: 6, cursor: 'pointer',
                background: 'linear-gradient(135deg, #48dbfb, #0abde3)', color: '#000',
                fontWeight: 600, fontSize: 12, fontFamily: 'var(--font-sans)',
                opacity: running ? 0.5 : 1
              }}>
              {running ? 'processing...' : '▶ visualize'}
            </button>
            <button onClick={stepBackward} disabled={currentStep <= 0} className="btn btn-ghost btn-sm" style={{ fontFamily: 'var(--font-mono)', borderRadius: 6 }}>{'<-'} back</button>
            <button onClick={stepForward} disabled={currentStep >= steps.length} className="btn btn-ghost btn-sm" style={{ fontFamily: 'var(--font-mono)', borderRadius: 6 }}>forward {'->'}</button>
            <button onClick={togglePlayback} disabled={!hasSteps}
              style={{
                padding: '5px 14px', border: 'none', borderRadius: 6, cursor: 'pointer',
                background: playback ? '#ff4757' : 'linear-gradient(135deg, #7bed9f, #2ed573)',
                color: '#000', fontWeight: 600, fontSize: 12
              }}>
              {playback ? '■ stop' : '▶ auto'}
            </button>
          </div>

          {error && (
            <div style={{ marginTop: 10, padding: 10, background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.3)', borderRadius: 'var(--radius)' }}>
              <pre style={{ margin: 0, fontSize: 11, color: '#ff6b6b', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)' }}>{error}</pre>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="card" style={{ padding: 16, background: 'linear-gradient(180deg, #0d1117, var(--bg-card))', minHeight: 180 }}>
            <div style={{ fontSize: 10, color: '#48dbfb', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>◈ data structure view</div>
            <DetectedVisualization variables={variables} lineNumber={currentLine} />
          </div>

          <div className="card" style={{ padding: 14, background: 'linear-gradient(180deg, #0d1117, var(--bg-card))' }}>
            <div style={{ fontSize: 10, color: '#ff9ff3', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>◈ variables</div>
            {scalarVars.length === 0 ? (
              <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', padding: 12 }}>
                {hasSteps ? 'press forward to track variables' : 'click visualize to start'}
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {scalarVars.map(([name, value], idx) => (
                  <div key={name} style={{
                    background: `${COLORS[idx % COLORS.length]}15`,
                    border: `1px solid ${COLORS[idx % COLORS.length]}44`,
                    borderRadius: 8, padding: '8px 14px', minWidth: 80,
                    boxShadow: `0 2px 8px ${COLORS[idx % COLORS.length]}22`,
                  }}>
                    <div style={{ fontSize: 9, color: COLORS[idx % COLORS.length], textTransform: 'uppercase', fontWeight: 600, letterSpacing: 0.5 }}>{name}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)', marginTop: 2 }}>{value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card" style={{ padding: 14, background: 'linear-gradient(180deg, #0d1117, var(--bg-card))' }}>
            <div style={{ fontSize: 10, color: '#feca57', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>◈ execution log</div>
            <div style={{ background: '#00000044', borderRadius: 'var(--radius)', padding: 10, maxHeight: 120, overflow: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.6 }}>
              {recentLogs.length === 0 ? (
                <span style={{ color: 'var(--text-muted)' }}>awaiting execution...</span>
              ) : (
                recentLogs.map((step, i) => (
                  <div key={i} style={{ color: step.type === 'line' ? '#48dbfb' : '#7bed9f', padding: '1px 0' }}>
                    {step.type === 'line' ? `📍 L${step.lineNumber}` : `◆ ${step.varName} = ${step.varValue}`}
                  </div>
                ))
              )}
            </div>
          </div>

          {currentExplanation && (
            <div style={{
              padding: '10px 14px',
              background: 'linear-gradient(135deg, rgba(72,219,251,0.1), rgba(255,159,243,0.1))',
              border: '1px solid rgba(72,219,251,0.2)',
              borderRadius: 'var(--radius)',
            }}>
              <span style={{ fontSize: 12, color: '#48dbfb' }}>💡 {currentExplanation}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
