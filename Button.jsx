// Button.jsx
const Button = ({ variant = 'primary', size = 'md', children, onClick, href, icon, iconRight }) => {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    borderRadius: 'var(--radius-pill)',
    cursor: 'pointer',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    transition: 'all 140ms var(--ease-out)',
    textDecoration: 'none',
    border: '1px solid transparent',
    whiteSpace: 'nowrap',
  };
  const sizes = {
    sm: { fontSize: 11, padding: '6px 14px' },
    md: { fontSize: 13, padding: '11px 22px' },
    lg: { fontSize: 14, padding: '14px 28px' },
  };
  const variants = {
    primary: { background: 'var(--rust-400)', color: 'var(--ink-0)' },
    secondary: { background: 'transparent', color: 'var(--rust-400)', borderColor: 'var(--rust-400)' },
    ghost: { background: 'transparent', color: 'var(--fg)', textTransform: 'none', letterSpacing: 0, padding: sizes[size].padding.replace(/(\d+)(px)$/, '$1$2').replace(/\d+px /, '8px '), borderRadius: 'var(--radius-md)' },
  };
  const [hover, setHover] = React.useState(false);
  const hoverStyle = {
    primary: { background: 'var(--rust-500)' },
    secondary: { background: 'var(--accent-soft)' },
    ghost: { color: 'var(--rust-400)' },
  }[variant];

  const style = { ...base, ...sizes[size], ...variants[variant], ...(hover ? hoverStyle : {}) };
  const Cmp = href ? 'a' : 'button';
  return (
    <Cmp
      href={href}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={style}
    >
      {icon && <Icon name={icon} size={14} />}
      {children}
      {iconRight && <Icon name={iconRight} size={14} />}
    </Cmp>
  );
};
window.Button = Button;
