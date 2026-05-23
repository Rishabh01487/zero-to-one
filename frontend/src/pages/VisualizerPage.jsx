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
  { label: 'bubble sort', code: `#include <iostream>\nusing namespace std;\nint main() {\n  int arr[] = {7, 2, 9, 1, 5};\n  int n = 5;\n  for (int i = 0; i < n-1; i++) {\n    for (int j = 0; j < n-i-1; j++) {\n      if (arr[j] > arr[j+1]) {\n        int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;\n      }\n    }\n  }\n  for (int i = 0; i < n; i++) cout << arr[i] << " ";\n  cout << endl; return 0;\n}` },
  { label: 'reverse', code: `#include <iostream>\nusing namespace std;\nint main() {\n  int arr[] = {10, 20, 30, 40, 50};\n  int n = 5, i = 0, j = n-1;\n  while (i < j) {\n    int t = arr[i]; arr[i] = arr[j]; arr[j] = t;\n    i++; j--;\n  }\n  for (int i = 0; i < n; i++) cout << arr[i] << " ";\n  cout << endl; return 0;\n}` },
  { label: 'max element', code: `#include <iostream>\nusing namespace std;\nint main() {\n  int arr[] = {3, 7, 1, 9, 4};\n  int n = 5, mx = arr[0];\n  for (int i = 1; i < n; i++) if (arr[i] > mx) mx = arr[i];\n  cout << "max = " << mx << endl; return 0;\n}` },
  { label: 'loop', code: `#include <iostream>\nusing namespace std;\nint main() {\n  int sum = 0;\n  for (int i = 1; i <= 5; i++) { sum = sum + i; }\n  cout << sum << endl; return 0;\n}` },
  { label: 'selection sort', code: `#include <iostream>\nusing namespace std;\nint main() {\n  int arr[] = {5, 3, 8, 6, 2};\n  int n = 5;\n  for (int i = 0; i < n-1; i++) {\n    int minIdx = i;\n    for (int j = i+1; j < n; j++) if (arr[j] < arr[minIdx]) minIdx = j;\n    int t = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = t;\n  }\n  for (int i = 0; i < n; i++) cout << arr[i] << " ";\n  cout << endl; return 0;\n}` },
];

function getStepExplanation(step, idx, steps) {
  if (step.type === 'var') {
    if (step.varName === 't' || step.varName === 'temp') return `📦 temp store → ${step.varValue}`;
    if (step.varName === 'mx' || step.varName === 'max') return `🏆 max updated to ${step.varValue}`;
    if (step.varName === 'minIdx') return `🎯 minIdx → ${step.varValue}`;
    if (step.varName === 'i' && step.varValue === '0') return `🔁 loop start: i = 0`;
    if (step.varName === 'j' && step.varValue === '0') return `🔁 inner loop start: j = 0`;
    if (step.varName === 'sum') return `➕ sum = ${step.varValue}`;
    return `◇ ${step.varName} = ${step.varValue}`;
  }
  if (step.type === 'line') {
    const prev = steps.slice(0, idx).filter(s => s.type === 'line').pop();
    if (!prev) return `▶ starting line ${step.lineNumber}`;
    if (step.lineNumber > prev.lineNumber) return `↓ line ${step.lineNumber}`;
    if (step.lineNumber < prev.lineNumber) return `↑ line ${step.lineNumber}`;
    return `● line ${step.lineNumber}`;
  }
  if (step.type === 'step') return `⚡ ${step.value}`;
  return '';
}

function buildArrState(variables) {
  const arrMap = {};
  for (const [key, value] of Object.entries(variables)) {
    const m = key.match(/^(\w+)\[(\d+)\]$/);
    if (m) {
      const name = m[1];
      const idx = parseInt(m[2]);
      if (!arrMap[name]) arrMap[name] = {};
      arrMap[name][idx] = isNaN(Number(value)) ? value : Number(value);
    }
  }
  const result = {};
  for (const [name, elements] of Object.entries(arrMap)) {
    const maxIdx = Math.max(...Object.keys(elements).map(Number), 0);
    const arr = [];
    for (let i = 0; i <= maxIdx; i++) {
      arr.push(elements[i] !== undefined ? elements[i] : null);
    }
    if (arr.some(v => v !== null)) result[name] = arr;
  }
  return result;
}

function ArrBoxView({ name, data, prevData, changedIndices }) {
  const maxVal = Math.max(...data.filter(v => v !== null), 1);
  return (
    <div style={{ marginBottom: 12, animation: 'fadeIn 0.3s ease' }}>
      <div style={{ fontSize: 10, color: '#48dbfb', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>{name}[]</div>
      <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', padding: '4px 0', minHeight: 120 }}>
        {data.map((val, i) => {
          if (val === null) return null;
          const isChanged = changedIndices && changedIndices.includes(i);
          const prevVal = prevData && prevData[i] !== undefined ? prevData[i] : val;
          const didChange = prevVal !== val;
          const barH = Math.max((val / maxVal) * 80, 8);
          const colorIdx = i % BAR_COLORS.length;
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 28 }}>
              <div style={{
                width: '100%', height: barH, borderRadius: '3px 3px 0 0',
                background: isChanged ? 'linear-gradient(180deg, #feca57, #ff9ff3)' : `linear-gradient(180deg, ${BAR_COLORS[colorIdx]}, ${BAR_COLORS[colorIdx]}aa)`,
                boxShadow: isChanged ? '0 0 12px rgba(254,202,87,0.6)' : 'none',
                transition: 'height 0.4s ease, background 0.3s ease',
                minHeight: 8, position: 'relative',
              }}>
                {isChanged && <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', fontSize: 8, color: '#feca57', fontWeight: 700 }}>▲</div>}
              </div>
              <span style={{
                fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: didChange ? 700 : 400, marginTop: 2,
                color: isChanged ? '#feca57' : didChange ? '#7bed9f' : 'var(--text-muted)',
                transition: 'color 0.3s ease, transform 0.3s ease',
                transform: didChange ? 'scale(1.15)' : 'scale(1)',
              }}>{val}</span>
              <span style={{ fontSize: 7, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{i}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StView({ name, data, prevData }) {
  const items = data || [];
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 10, color: '#ff9ff3', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>{name} (stack)</div>
      <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', gap: 2, border: '1px solid rgba(255,159,243,0.3)', borderRadius: 6, padding: 8, minHeight: 40, background: 'rgba(255,159,243,0.05)' }}>
        {items.length === 0 && <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>empty</span>}
        {items.map((val, i) => {
          const prev = prevData && prevData[i];
          const changed = prev !== undefined && String(prev) !== String(val);
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 6, width: '100%',
              padding: '4px 10px', borderRadius: 4,
              background: changed ? 'rgba(255,159,243,0.15)' : 'rgba(255,159,243,0.05)',
              border: '1px solid rgba(255,159,243,0.2)',
              transition: 'all 0.3s ease',
            }}>
              <span style={{ fontSize: 8, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', width: 20 }}>{i}</span>
              <span style={{ fontSize: 13, fontWeight: changed ? 700 : 400, fontFamily: 'var(--font-mono)', color: changed ? '#ff9ff3' : 'var(--text-primary)' }}>{val}</span>
              {i === items.length - 1 && <span style={{ fontSize: 8, color: '#ff9ff3', marginLeft: 'auto' }}>← top</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QView({ name, data, prevData }) {
  const items = data || [];
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 10, color: '#7bed9f', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>{name} (queue)</div>
      <div style={{ display: 'flex', gap: 3, alignItems: 'center', border: '1px solid rgba(123,237,159,0.3)', borderRadius: 6, padding: 8, minHeight: 36, background: 'rgba(123,237,159,0.05)', overflowX: 'auto' }}>
        {items.length === 0 && <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>empty</span>}
        {items.map((val, i) => {
          const prev = prevData && prevData[i];
          const changed = prev !== undefined && String(prev) !== String(val);
          return (
            <div key={i} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '4px 8px', borderRadius: 4, minWidth: 32,
              background: changed ? 'rgba(123,237,159,0.15)' : 'rgba(123,237,159,0.05)',
              border: '1px solid rgba(123,237,159,0.2)',
              transition: 'all 0.3s ease',
            }}>
              <span style={{ fontSize: 12, fontWeight: changed ? 700 : 400, fontFamily: 'var(--font-mono)', color: changed ? '#7bed9f' : 'var(--text-primary)' }}>{val}</span>
              <span style={{ fontSize: 7, color: 'var(--text-muted)' }}>{i === 0 ? 'front' : i === items.length - 1 ? 'rear' : ''}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LinkedListView({ headVar, previousVars }) {
  if (!headVar) return <div style={{ fontSize: 12, color: 'var(--text-muted)', padding: 16 }}>no linked list data</div>;
  const nodes = String(headVar).split(/->|,|\s+/).filter(s => s && s !== 'null' && s !== 'nullptr' && s !== 'NULL');
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap', padding: '16px 0', justifyContent: 'center' }}>
      {nodes.map((val, i) => (
        <React.Fragment key={i}>
          <div style={{
            border: `2px solid ${BAR_COLORS[i % BAR_COLORS.length]}`,
            borderRadius: 8, padding: '8px 14px',
            background: `${BAR_COLORS[i % BAR_COLORS.length]}22`,
            textAlign: 'center', minWidth: 44, position: 'relative',
            boxShadow: `0 2px 8px ${BAR_COLORS[i % BAR_COLORS.length]}44`,
            animation: 'fadeIn 0.3s ease',
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
  const nums = String(rootVar).match(/-?\d+/g);
  if (!nums || nums.length === 0) return <div style={{ fontSize: 12, color: 'var(--text-muted)', padding: 16 }}>no tree data</div>;
  const levels = [];
  let idx = 0, count = 1;
  while (idx < nums.length) { levels.push(nums.slice(idx, idx + count)); idx += count; count *= 2; }
  return (
    <div style={{ padding: '16px 0', overflowX: 'auto' }}>
      {levels.map((level, li) => (
        <div key={li} style={{
          display: 'flex', justifyContent: 'center', gap: Math.max(20, 60 - li * 10),
          marginBottom: li < levels.length-1 ? 16 : 0, position: 'relative'
        }}>
          {level.map((val, vi) => (
            <div key={vi} style={{
              border: `2px solid ${COLORS[(li + vi) % COLORS.length]}`,
              borderRadius: '50%', width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `${COLORS[(li + vi) % COLORS.length]}22`,
              fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 700,
              color: COLORS[(li + vi) % COLORS.length],
              boxShadow: `0 2px 8px ${COLORS[(li + vi) % COLORS.length]}44`,
              animation: 'fadeIn 0.3s ease',
            }}>{val}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

function isSt(name) { return name === 'st' || name === 'stack' || name.startsWith('st_'); }
function isQ(name) { return name === 'q' || name === 'queue' || name.startsWith('q_'); }
function isLL(name) { return name === 'head' || name.startsWith('list'); }
function isTree(name) { return name === 'root' || name.startsWith('tree'); }

function DataView({ variables, prevVariables }) {
  const arrState = buildArrState(variables);
  const prevArrState = prevVariables ? buildArrState(prevVariables) : {};
  const changedIndices = {};
  for (const [name, arr] of Object.entries(arrState)) {
    const prev = prevArrState[name] || [];
    changedIndices[name] = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== prev[i]) changedIndices[name].push(i);
    }
  }

  const stVars = {}, qVars = {}, llVars = {}, treeVars = {}, arrNames = [];
  for (const [name, value] of Object.entries(variables)) {
    if (name.includes('[')) continue;
    const s = String(value);
    const parts = s.split(',').map(v => v.trim()).filter(v => !isNaN(v));
    if (isSt(name) && parts.length > 0) stVars[name] = parts;
    else if (isQ(name) && parts.length > 0) qVars[name] = parts;
    else if (isLL(name)) llVars[name] = value;
    else if (isTree(name)) treeVars[name] = value;
  }

  const hasArr = Object.keys(arrState).length > 0;
  const hasSt = Object.keys(stVars).length > 0;
  const hasQ = Object.keys(qVars).length > 0;
  const hasLL = Object.keys(llVars).length > 0;
  const hasTree = Object.keys(treeVars).length > 0;
  const hasAny = hasArr || hasSt || hasQ || hasLL || hasTree;

  return (
    <div>
      {Object.entries(arrState).map(([name, data]) => (
        <ArrBoxView key={name} name={name} data={data} prevData={prevArrState[name]} changedIndices={changedIndices[name]} />
      ))}
      {Object.entries(stVars).map(([name, data]) => {
        const prev = prevVariables ? String(prevVariables[name] || '').split(',').map(v => v.trim()).filter(v => !isNaN(v)) : [];
        return <StView key={name} name={name} data={data} prevData={prev} />;
      })}
      {Object.entries(qVars).map(([name, data]) => {
        const prev = prevVariables ? String(prevVariables[name] || '').split(',').map(v => v.trim()).filter(v => !isNaN(v)) : [];
        return <QView key={name} name={name} data={data} prevData={prev} />;
      })}
      {Object.entries(llVars).map(([name, value]) => <LinkedListView key={name} headVar={value} previousVars={prevVariables} />)}
      {Object.entries(treeVars).map(([name, value]) => <TreeView key={name} rootVar={value} />)}
      {!hasAny && (
        <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', padding: 20 }}>
          {Object.keys(variables).length > 0 ? 'select a code example and click visualize' : 'run the visualizer to see data structures'}
        </div>
      )}
    </div>
  );
}

function VarCard({ name, value, prevValue, color }) {
  const changed = prevValue !== undefined && String(prevValue) !== String(value);
  return (
    <div style={{
      background: `${color}15`, border: `1px solid ${color}44`,
      borderRadius: 8, padding: '8px 14px', minWidth: 80,
      boxShadow: changed ? `0 0 16px ${color}66` : `0 2px 8px ${color}22`,
      transition: 'box-shadow 0.3s ease, transform 0.2s ease',
      transform: changed ? 'scale(1.05)' : 'scale(1)',
    }}>
      <div style={{ fontSize: 9, color, textTransform: 'uppercase', fontWeight: 600, letterSpacing: 0.5 }}>{name}</div>
      <div style={{
        fontSize: 22, fontWeight: 700, color: changed ? '#fff' : 'var(--text-primary)',
        fontFamily: 'var(--font-mono)', marginTop: 2,
        transition: 'color 0.3s ease, transform 0.2s ease',
        transform: changed ? 'scale(1.1)' : 'scale(1)',
      }}>{value}</div>
      {changed && <div style={{ fontSize: 9, color: '#feca57', marginTop: 2 }}>▲ changed</div>}
    </div>
  );
}

export default function VisualizerPage() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [variables, setVariables] = useState({});
  const [prevVariables, setPrevVariables] = useState({});
  const [currentLine, setCurrentLine] = useState(null);
  const [prevLine, setPrevLine] = useState(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState('');
  const [playback, setPlayback] = useState(false);
  const [speed, setSpeed] = useState(600);
  const [changedVars, setChangedVars] = useState(new Set());
  const timerRef = useRef(null);
  const codeRef = useRef(null);

  useEffect(() => { return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  useEffect(() => {
    if (codeRef.current && currentLine) {
      const el = codeRef.current.querySelector(`[data-line="${currentLine}"]`);
      if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [currentLine]);

  const visualize = async () => {
    setRunning(true); setError('');
    setCurrentStep(0); setVariables({}); setPrevVariables({});
    setCurrentLine(null); setPrevLine(null); setChangedVars(new Set());
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
    setPrevVariables({});
    setPrevLine(null);
    setVariables({}); setCurrentLine(null); setChangedVars(new Set());
    for (let i = 0; i < targetStep && i < steps.length; i++) {
      const s = steps[i];
      if (s.type === 'var') {
        setVariables(prev => ({ ...prev, [s.varName]: s.varValue }));
      } else if (s.type === 'line') {
        setCurrentLine(s.lineNumber);
      }
    }
  }, [steps]);

  const stepForward = useCallback(() => {
    if (currentStep >= steps.length) { setPlayback(false); return; }
    const step = steps[currentStep];
    setPrevVariables({ ...variables });
    setChangedVars(new Set());
    if (step.type === 'var') {
      setVariables(prev => ({ ...prev, [step.varName]: step.varValue }));
      setChangedVars(new Set([step.varName]));
      setTimeout(() => setChangedVars(new Set()), 400);
    } else if (step.type === 'line') {
      setPrevLine(currentLine);
      setCurrentLine(step.lineNumber);
    }
    setCurrentStep(prev => prev + 1);
  }, [currentStep, steps, variables, currentLine]);

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
      if (currentStep >= steps.length) { setCurrentStep(0); setVariables({}); setCurrentLine(null); setPrevVariables({}); setPrevLine(null); }
      setPlayback(true);
      timerRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length) { clearInterval(timerRef.current); setPlayback(false); return prev; }
          return prev + 1;
        });
      }, speed);
    }
  };

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      if (playback) {
        timerRef.current = setInterval(() => {
          setCurrentStep(prev => {
            if (prev >= steps.length) { clearInterval(timerRef.current); setPlayback(false); return prev; }
            return prev + 1;
          });
        }, speed);
      }
    }
  }, [speed, playback, steps.length]);

  useEffect(() => {
    if (playback && currentStep > 0 && currentStep <= steps.length) {
      const step = steps[currentStep - 1];
      setPrevVariables(vars => ({ ...vars }));
      setChangedVars(new Set());
      if (step?.type === 'var') {
        setVariables(prev => ({ ...prev, [step.varName]: step.varValue }));
        setChangedVars(new Set([step.varName]));
        setTimeout(() => setChangedVars(new Set()), 300);
      } else if (step?.type === 'line') {
        setPrevLine(currentLine);
        setCurrentLine(step.lineNumber);
      }
    }
  }, [currentStep, playback, steps]);

  const jumpToStart = () => {
    setPlayback(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentStep(0); setVariables({}); setCurrentLine(null);
    setPrevVariables({}); setPrevLine(null); setChangedVars(new Set());
  };

  const jumpToEnd = () => {
    setPlayback(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentStep(steps.length);
    applyStepsUpTo(steps.length);
  };

  const codeLines = code.split('\n');
  const hasSteps = steps.length > 0;
  const currentStepObj = currentStep > 0 && currentStep <= steps.length ? steps[currentStep - 1] : null;
  const currentExplanation = currentStepObj ? getStepExplanation(currentStepObj, currentStep - 1, steps) : '';
  const recentLogs = steps.slice(0, Math.max(currentStep, 0));
  const scalarVars = Object.entries(variables)
    .filter(([k]) => !k.includes('['))
    .filter(([k]) => k !== 't' && k !== 'temp');
  const tempVar = variables.t || variables.temp;
  const progress = hasSteps ? Math.round((currentStep / steps.length) * 100) : 0;

  return (
    <div style={{ padding: '20px 24px', maxWidth: 1400, margin: '0 auto' }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 8px rgba(72,219,251,0.3); }
          50% { box-shadow: 0 0 20px rgba(72,219,251,0.6); }
        }
        .highlight-line {
          animation: glowPulse 1.5s ease-in-out infinite;
        }
        .bar-transition {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px', background: 'linear-gradient(135deg, #48dbfb, #ff9ff3, #feca57)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Code Visualizer</h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>animated step-by-step execution with live data structure views</p>
        </div>
        {hasSteps && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 160, height: 4, background: 'var(--bg-tertiary)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #48dbfb, #ff9ff3)', borderRadius: 2, transition: 'width 0.4s ease' }} />
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', minWidth: 90, textAlign: 'right' }}>{currentStep} / {steps.length}</span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
        {EXAMPLES.map(ex => (
          <button key={ex.label} className="btn btn-ghost btn-xs"
            style={{ border: '1px solid var(--border)', borderRadius: 6, fontSize: 11 }}
            onClick={() => { setCode(ex.code); setSteps([]); setVariables({}); setCurrentLine(null); setCurrentStep(0); setError(''); setPrevVariables({}); setPrevLine(null); }}
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
            <div ref={codeRef} style={{ overflow: 'auto', maxHeight: 500, background: '#0d1117' }}>
              {codeLines.map((line, i) => (
                <div key={i} data-line={i + 1} style={{
                  display: 'flex', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: '26px',
                  background: currentLine === i + 1 ? 'rgba(72,219,251,0.12)' : 'transparent',
                  borderLeft: currentLine === i + 1 ? '3px solid #48dbfb' : '3px solid transparent',
                  transition: 'all 0.25s ease',
                  animation: currentLine === i + 1 ? 'glowPulse 2s ease-in-out infinite' : 'none',
                }}>
                  <span style={{ width: 36, textAlign: 'right', paddingRight: 10, color: currentLine === i + 1 ? '#48dbfb' : 'var(--text-muted)', userSelect: 'none', fontSize: 10 }}>{i + 1}</span>
                  <span style={{
                    color: currentLine === i + 1 ? '#fff' : 'var(--text-primary)',
                    whiteSpace: 'pre', flex: 1,
                    fontWeight: currentLine === i + 1 ? 600 : 400,
                  }}>{line}</span>
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

          <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={visualize} disabled={running}
              style={{
                padding: '7px 18px', border: 'none', borderRadius: 6, cursor: 'pointer',
                background: 'linear-gradient(135deg, #48dbfb, #0abde3)', color: '#000',
                fontWeight: 600, fontSize: 12, fontFamily: 'var(--font-sans)',
                opacity: running ? 0.5 : 1
              }}>
              {running ? 'processing...' : '▶ visualize'}
            </button>
            <button onClick={jumpToStart} disabled={currentStep <= 0} className="btn btn-ghost btn-sm" style={{ fontFamily: 'var(--font-mono)', borderRadius: 6, fontSize: 11 }}>⏮</button>
            <button onClick={stepBackward} disabled={currentStep <= 0} className="btn btn-ghost btn-sm" style={{ fontFamily: 'var(--font-mono)', borderRadius: 6 }}>◀ back</button>
            <button onClick={stepForward} disabled={currentStep >= steps.length} className="btn btn-ghost btn-sm" style={{ fontFamily: 'var(--font-mono)', borderRadius: 6 }}>forward ▶</button>
            <button onClick={jumpToEnd} disabled={currentStep >= steps.length} className="btn btn-ghost btn-sm" style={{ fontFamily: 'var(--font-mono)', borderRadius: 6, fontSize: 11 }}>⏭</button>
            <button onClick={togglePlayback} disabled={!hasSteps}
              style={{
                padding: '5px 14px', border: 'none', borderRadius: 6, cursor: 'pointer',
                background: playback ? '#ff4757' : 'linear-gradient(135deg, #7bed9f, #2ed573)',
                color: '#000', fontWeight: 600, fontSize: 12
              }}>
              {playback ? '■ stop' : '▶ auto'}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 8 }}>
              <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>🐢</span>
              <input type="range" min="100" max="2000" value={2100 - speed}
                onChange={e => setSpeed(2100 - Number(e.target.value))}
                style={{ width: 60, cursor: 'pointer' }}
              />
              <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>🐇</span>
            </div>
          </div>

          {error && (
            <div style={{ marginTop: 10, padding: 10, background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.3)', borderRadius: 'var(--radius)' }}>
              <pre style={{ margin: 0, fontSize: 11, color: '#ff6b6b', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)' }}>{error}</pre>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="card" style={{ padding: 16, background: 'linear-gradient(180deg, #0d1117, var(--bg-card))', minHeight: 200 }}>
            <div style={{ fontSize: 10, color: '#48dbfb', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>◈ data structure view</div>
            <DataView variables={variables} prevVariables={prevVariables} />
          </div>

          <div className="card" style={{ padding: 14, background: 'linear-gradient(180deg, #0d1117, var(--bg-card))' }}>
            <div style={{ fontSize: 10, color: '#ff9ff3', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>◈ variables</div>
            {tempVar !== undefined && (
              <div style={{
                marginBottom: 8, padding: '6px 12px',
                background: 'rgba(254,202,87,0.1)', border: '1px solid rgba(254,202,87,0.3)',
                borderRadius: 6, display: 'flex', alignItems: 'center', gap: 8,
                animation: 'fadeIn 0.3s ease'
              }}>
                <span style={{ fontSize: 11, color: '#feca57', fontWeight: 600 }}>📦 temp</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>{tempVar}</span>
              </div>
            )}
            {scalarVars.length === 0 ? (
              <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', padding: 12 }}>
                {hasSteps ? 'press forward to track variables' : 'click visualize to start'}
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {scalarVars.map(([name, value], idx) => {
                  const prevVal = prevVariables[name];
                  return (
                    <VarCard key={name} name={name} value={value} prevValue={prevVal} color={COLORS[idx % COLORS.length]} />
                  );
                })}
              </div>
            )}
          </div>

          <div className="card" style={{ padding: 14, background: 'linear-gradient(180deg, #0d1117, var(--bg-card))' }}>
            <div style={{ fontSize: 10, color: '#feca57', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>◈ execution log</div>
            <div style={{ background: '#00000044', borderRadius: 'var(--radius)', padding: 10, maxHeight: 130, overflow: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.7 }}>
              {recentLogs.length === 0 ? (
                <span style={{ color: 'var(--text-muted)' }}>awaiting execution...</span>
              ) : (
                recentLogs.map((step, i) => (
                  <div key={i} style={{
                    color: step.type === 'line' ? '#48dbfb' : '#7bed9f',
                    padding: '1px 0',
                    animation: i === recentLogs.length - 1 ? 'fadeIn 0.2s ease' : 'none',
                    opacity: i >= currentStep - 30 ? 1 : 0.4,
                    fontSize: i === recentLogs.length - 1 ? 12 : 11,
                  }}>
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
              animation: 'fadeIn 0.2s ease',
            }}>
              <span style={{ fontSize: 12, color: '#48dbfb' }}>{currentExplanation}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
