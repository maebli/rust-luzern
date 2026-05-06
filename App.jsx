// App.jsx — root composition
const DEFAULT_PROGRAM = [
  { time: '18:30', label: 'Doors open' },
  { time: '19:00', label: 'Start of talks' },
  { time: 'Afterward', label: 'Drinks, snacks & socializing' },
  { time: '22:00', label: 'End of event' },
];
const MEETUP = 'https://www.meetup.com/rust-luzern/events/';

const App = () => {
  const [hostOpen, setHostOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const upcoming = null;

  const past = [
    {
      edition: 4, year: 2026,
      title: '2026 Rust Talks Luzern #4: Examples from the field @ Toradex',
      date: 'May 5, 2026', time: '18:30–20:30 CEST',
      startISO: '2026-05-05T16:30:00Z', endISO: '2026-05-05T18:30:00Z',
      location: 'HSLU T&A, Technikumsstrasse 21, Horw (Raum C209)',
      host: 'Toradex', hostUrl: 'https://www.toradex.com/',
      status: 'past',
      program: DEFAULT_PROGRAM,
      talks: [
        { speaker: 'Markus Ineichen', speakerUrl: 'https://github.com/mineichen', title: '— Pilatus: a modular, extensible application framework' },
        { speaker: 'Leonardo Held', title: '— Understanding the Borrow Checker' },
      ],
    },
    {
      edition: 3, year: 2025,
      title: 'Industrial Robotics & Kubernetes',
      date: 'Nov 20, 2025', time: '18:30–22:00 CET',
      startISO: '2025-11-20T17:30:00Z', endISO: '2025-11-20T21:00:00Z',
      location: 'Noser Engineering AG, D4 Pk. 4, 6039 Root',
      host: 'Noser Engineering AG', hostUrl: 'https://www.noser.com/',
      status: 'past',
      program: DEFAULT_PROGRAM,
      talks: [
        { speaker: 'Audrius Meskauskas', speakerUrl: 'https://github.com/bourumir-wyngs/rs-opw-kinematics', title: '— rs-opw-kinematics: inverse/forward kinematics for six-axis robots' },
        { speaker: 'Yannik Dällenbach', speakerUrl: 'https://github.com/ioboi', title: '— kube-rs: your Rust superpower for Kubernetes' },
      ],
    },
    {
      edition: 2, year: 2025,
      title: 'Rust for Embedded at bbv',
      date: 'Sep 30, 2025', time: '19:00–22:00 CEST',
      startISO: '2025-09-30T17:00:00Z', endISO: '2025-09-30T20:00:00Z',
      location: 'bbv Software Services AG, Blumenrain 10, 6002 Luzern',
      host: 'bbv Software Services AG', hostUrl: 'https://www.bbv.ch/',
      status: 'past',
      program: [
        { time: '18:30', label: 'Doors open' },
        { time: '19:00', label: 'Start of talks' },
        { time: 'Afterward', label: 'Drinks, snacks & socializing' },
        { time: 'Open end', label: 'End of event' },
      ],
      talks: [
        { speaker: 'Remo Senekowitsch', speakerUrl: 'https://www.zhaw.ch/en/about-us/person/senk', title: '— Porting from C to Rust for Rust for Linux' },
        { speaker: 'Nicola Papale', speakerUrl: 'https://nicopap.ch/', title: '— Iterators in embedded development' },
        { speaker: 'Michael Kefeder', speakerUrl: 'https://michael.kefeder.at/', title: '— Low-power BLE firmware for nRF52 in Rust' },
      ],
    },
    {
      edition: 1, year: 2025,
      title: 'Making Games with Godot + Rust',
      date: 'May 7, 2025', time: '19:00 CEST',
      startISO: '2025-05-07T17:00:00Z', endISO: '2025-05-07T20:00:00Z',
      location: 'Gemeinschaftsraum Teiggi, Kriens',
      host: 'gwf.ch (sponsor)', hostUrl: 'https://gwf.ch',
      status: 'past',
      program: [
        { time: '18:30', label: 'Doors open' },
        { time: '19:00', label: 'Start of the talk' },
        { time: 'Afterward', label: 'Drinks, snacks & socializing' },
        { time: 'Open end', label: 'End of event' },
      ],
      talks: [
        { speaker: 'Jan Haller', speakerUrl: 'https://github.com/Bromeon', title: '— Rust & gamedev: Godot GDExtension team, author of godot-rust' },
      ],
    },
  ];

  return (
    <>
      <Hero onHost={() => setHostOpen(true)} isMobile={isMobile} />
      {upcoming && (
        <section style={{ maxWidth: 960, margin: '0 auto', padding: '24px 24px 48px' }}>
          <SectionHead eyebrow="Next up" title="Upcoming meetup" isMobile={isMobile} />
          <EventCard {...upcoming} isMobile={isMobile} />
        </section>
      )}
      <CommunityRow />
      <section style={{ maxWidth: 960, margin: '0 auto', padding: isMobile ? '40px 16px' : '64px 24px' }}>
        <SectionHead eyebrow="Archive" title="Past talks" isMobile={isMobile} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {past.map(e => <EventCard key={e.edition} {...e} isMobile={isMobile} />)}
        </div>
      </section>
      <Footer />
      <HostModal open={hostOpen} onClose={() => setHostOpen(false)} />
    </>
  );
};

const SectionHead = ({ eyebrow, title, isMobile }) => (
  <header style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'baseline', gap: isMobile ? 6 : 20, marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--rust-400)' }}>{eyebrow}</span>
    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.02em', margin: 0, color: 'var(--fg)' }}>{title}</h2>
  </header>
);

const Footer = () => (
  <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 24px', textAlign: 'center' }}>
    <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--fg-subtle)' }}>rust-luzern.ch</div>
      <div style={{ fontSize: 13, color: 'var(--fg-muted)' }}>
        Organized by <a href="https://maebli.github.io/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--rust-400)', textDecoration: 'none', borderBottom: '1px solid transparent' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--rust-400)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>Michael Aebli</a>  ·  All skill levels welcome
      </div>
    </div>
  </footer>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
