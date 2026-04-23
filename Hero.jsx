// Hero.jsx — mascot + headline + description + CTA
const Hero = ({ onHost, isMobile }) => (
  <section style={{
    position: 'relative',
    padding: isMobile ? '32px 0 24px' : '64px 0 48px',
    textAlign: 'center',
    overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(circle at 50% 35%, rgba(255,140,0,0.18) 0%, transparent 55%)',
      pointerEvents: 'none',
    }} />
    <div style={{ position: 'relative', maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: isMobile ? 20 : 32 }}>
        <img
          src="assets/rust-luzern-logo.png"
          alt="Rust Luzern — crab + Wasserturm"
          style={{ width: isMobile ? 'min(180px, 48vw)' : 260, height: 'auto', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,.5))' }}
        />
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--rust-400)', marginBottom: 20 }}>
        rust-luzern.ch · since 2025
      </div>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 'clamp(36px, 8vw, 84px)',
        lineHeight: 1,
        letterSpacing: '-0.03em',
        margin: '0 0 16px',
        color: 'var(--fg)',
      }}>
        Rust Talks <span style={{ fontStyle: 'italic', color: 'var(--rust-400)' }}>Luzern</span>
      </h1>
      <p style={{
        fontSize: isMobile ? 15 : 18, lineHeight: 1.55, color: 'var(--ink-700)',
        maxWidth: 560, margin: '0 auto 28px',
      }}>
        A community for Rust developers in and around Luzern. Systems programming,
        embedded, web — whatever you're shipping in Rust, come talk shop.
        All skill levels welcome.
      </p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button variant="primary" size={isMobile ? 'md' : 'lg'} href="https://www.meetup.com/rust-luzern/" icon="calendar">
          RSVP on Meetup
        </Button>
        <Button variant="secondary" size={isMobile ? 'md' : 'lg'} onClick={onHost}>
          Request to host
        </Button>
      </div>
    </div>
  </section>
);
window.Hero = Hero;
