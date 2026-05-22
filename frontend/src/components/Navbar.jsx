import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/lessons', label: 'Lessons' },
  { path: '/playground', label: 'Playground' },
  { path: '/visualizer', label: 'Visualizer' },
  { path: '/problems', label: 'Problems' },
  { path: '/dashboard', label: 'Progress' },
];

export default function Navbar({ username, onLogout }) {
  const location = useLocation();

  return (
    <nav style={{
      height: 'var(--nav-height)',
      background: 'rgba(15,15,26,0.9)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <Link to="/" style={{
          fontSize: 20,
          fontWeight: 800,
          textDecoration: 'none',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <span style={{
            width: 32,
            height: 32,
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 800,
            color: 'white'
          }}>Z</span>
          Zero to One
        </Link>
        <div style={{ display: 'flex', gap: 4 }}>
          {navItems.map(item => (
            <Link key={item.path} to={item.path} style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius)',
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 500,
              color: location.pathname.startsWith(item.path) ? 'var(--text-primary)' : 'var(--text-muted)',
              background: location.pathname.startsWith(item.path) ? 'var(--bg-tertiary)' : 'transparent',
              transition: 'var(--transition)'
            }}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {username ? (
          <>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white' }}>
                {username[0].toUpperCase()}
              </span>
              {username}
            </span>
            <button onClick={onLogout} className="btn btn-secondary btn-sm">Sign Out</button>
          </>
        ) : (
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Guest</span>
        )}
      </div>
    </nav>
  );
}
