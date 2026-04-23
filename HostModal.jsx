// HostModal.jsx — simplified host-request modal
const HostModal = ({ open, onClose }) => {
  const [sent, setSent] = React.useState(false);
  React.useEffect(() => { if (!open) setTimeout(() => setSent(false), 400); }, [open]);
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(10,9,8,0.8)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'rl-fade 240ms var(--ease-out)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--rust-400)',
          borderRadius: 'var(--radius-md)',
          padding: '32px 36px',
          width: 'min(480px, 90vw)',
          position: 'relative',
          boxShadow: 'var(--shadow-glow)',
        }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: 'var(--fg-muted)', cursor: 'pointer', padding: 4 }}
        >
          <Icon name="close" size={18} />
        </button>

        {!sent ? (
          <>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--rust-400)', marginBottom: 12 }}>
              Host a meetup
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, lineHeight: 1.1, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
              Want to host us?
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-700)', margin: '0 0 20px' }}>
              We're always looking for companies in the Luzern area who'd like to host
              an evening of Rust talks. Drinks, pizza, two talks, ~40 developers.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input placeholder="Your name" style={inputStyle} />
              <input placeholder="Email" type="email" style={inputStyle} />
              <textarea placeholder="Tell us about your space" rows={3} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'var(--font-sans)' }} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                <Button variant="primary" onClick={() => setSent(true)} iconRight="arrow">Send request</Button>
              </div>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🦀</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, margin: '0 0 8px', letterSpacing: '-0.02em' }}>Danke!</h2>
            <p style={{ fontSize: 14, color: 'var(--ink-700)', margin: 0 }}>We'll be in touch within a few days.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const inputStyle = {
  background: 'var(--ink-0)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-md)',
  padding: '10px 14px',
  fontSize: 14,
  color: 'var(--fg)',
  fontFamily: 'var(--font-sans)',
  outline: 'none',
};

window.HostModal = HostModal;
