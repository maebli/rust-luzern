// Chip.jsx
const Chip = ({ variant = 'default', live, children }) => {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    fontWeight: 500,
    padding: '4px 10px',
    borderRadius: 'var(--radius-pill)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    border: '1px solid var(--border)',
    color: 'var(--fg-muted)',
    whiteSpace: 'nowrap',
  };
  const variants = {
    default: {},
    live: { color: 'var(--rust-400)', borderColor: 'var(--rust-400)', background: 'var(--accent-soft)' },
    past: { color: 'var(--fg-subtle)' },
    solid: { background: 'var(--rust-400)', color: 'var(--ink-0)', borderColor: 'var(--rust-400)' },
  };
  return (
    <span style={{ ...base, ...variants[variant] }}>
      {live && <span style={{ width: 6, height: 6, background: 'var(--rust-400)', borderRadius: '50%', animation: 'rl-pulse 1.4s infinite' }} />}
      {children}
    </span>
  );
};
window.Chip = Chip;
