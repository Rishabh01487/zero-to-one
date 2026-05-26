import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/lessons', label: 'Lessons' },
  { path: '/patterns', label: 'Patterns' },
  { path: '/playground', label: 'Playground' },
  { path: '/visualizer', label: 'Visualizer' },
  { path: '/problems', label: 'Problems' },
  { path: '/dashboard', label: 'Progress' },
];

const externalLinks = [
  { href: 'https://mockmate-mu-one.vercel.app', label: 'Mock Interview', icon: '🎤' },
];

export default function Navbar({ username, onLogout }) {
  const location = useLocation();

  return (
    <nav style={{
      height: 'var(--nav-height)',
      background: 'var(--bg-primary)',
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
          fontSize: 15,
          fontWeight: 600,
          textDecoration: 'none',
          color: 'var(--text-primary)',
          letterSpacing: '-0.3px'
        }}>
          zero<span style={{ color: 'var(--text-muted)' }}>to</span>one
        </Link>
        <div style={{ display: 'flex', gap: 2 }}>
          {navItems.map(item => (
            <Link key={item.path} to={item.path} style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius)',
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 450,
              color: location.pathname.startsWith(item.path) ? 'var(--text-primary)' : 'var(--text-muted)',
              background: location.pathname.startsWith(item.path) ? 'var(--bg-tertiary)' : 'transparent',
              transition: 'var(--transition)'
            }}>
              {item.label}
            </Link>
          ))}
          <span style={{ width: 1, height: 20, background: 'var(--border)', margin: '4px 8px' }} />
          {externalLinks.map(link => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius)',
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 450,
              color: 'var(--text-muted)',
              transition: 'var(--transition)'
            }}>
              {link.icon} {link.label}
            </a>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {username ? (
          <>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{username}</span>
            <button onClick={onLogout} className="btn btn-ghost btn-sm" style={{ color: 'var(--text-muted)' }}>Sign out</button>
          </>
        ) : (
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>guest</span>
        )}
      </div>
    </nav>
  );
}
