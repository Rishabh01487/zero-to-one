import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#1a1a2e',
    primaryTextColor: '#e0e0e0',
    primaryBorderColor: '#48dbfb',
    lineColor: '#48dbfb',
    secondaryColor: '#16213e',
    tertiaryColor: '#0d1117',
    fontSize: '14px',
    fontFamily: 'system-ui, sans-serif',
  },
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'basis',
    padding: 16,
  },
  sequence: {
    showSequenceNumbers: true,
  },
});

export default function ProblemDiagram({ definition }) {
  const containerRef = useRef(null);
  const renderId = useRef(0);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!definition || !containerRef.current) return;
    renderId.current += 1;
    const id = `mermaid-${renderId.current}`;
    setError(null);

    mermaid.render(id, definition).then(({ svg }) => {
      if (containerRef.current) {
        containerRef.current.innerHTML = svg;
      }
    }).catch((err) => {
      setError(err.message || 'Unknown error');
    });
  }, [definition]);

  if (!definition) return null;

  return (
    <div className="card" style={{ padding: 20, marginBottom: 16, borderLeft: '3px solid #feca57', overflow: 'hidden' }}>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: '#feca57' }}>Diagram</div>
      {error && <div style={{ color: '#ff6b6b', fontSize: 12, padding: 8 }}>Diagram error: {error}</div>}
      <div ref={containerRef} style={{ overflowX: 'auto', textAlign: 'center' }} />
    </div>
  );
}
