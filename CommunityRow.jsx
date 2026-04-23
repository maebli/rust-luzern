// CommunityRow.jsx
const CommunityRow = () => {
  const isMobile = useIsMobile();
  const links = [
    { icon: 'matrix', label: 'Matrix', href: 'https://matrix.to/#/#rust-luzern:matrix.org' },
    { icon: 'meetup', label: 'Meetup', href: 'https://www.meetup.com/rust-luzern/' },
    { icon: 'github', label: 'GitHub', href: 'https://github.com/maebli/rust-luzern' },
    { icon: 'heart', label: 'Open Collective', href: 'https://opencollective.com/rustluzern' },
  ];
  return (
    <section style={{ padding: '32px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'center' : 'center', gap: isMobile ? 16 : 24, flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'space-between' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>
          Join the community
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
          {links.map(l => <CommunityLink key={l.label} {...l} />)}
        </div>
      </div>
    </section>
  );
};

const CommunityLink = ({ icon, label, href }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '8px 14px',
        border: `1px solid ${hover ? 'var(--rust-400)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-pill)',
        color: hover ? 'var(--rust-400)' : 'var(--fg)',
        textDecoration: 'none',
        fontSize: 13,
        fontWeight: 500,
        transition: 'all 140ms var(--ease-out)',
        background: hover ? 'var(--accent-soft)' : 'transparent',
      }}
    >
      <Icon name={icon} size={14} /> {label}
    </a>
  );
};

window.CommunityRow = CommunityRow;
