// EventCard.jsx — editorial event card

const pad = n => String(n).padStart(2, '0');
const fmtICS = d => `${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

function downloadICS({ edition, year, title, startISO, endISO, location, description }) {
  const esc = s => String(s || '').replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  const ics = [
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Rust Luzern//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${year}-rust-luzern-${edition}@rust-luzern.ch`,
    `DTSTAMP:${fmtICS(new Date())}`,
    `DTSTART:${fmtICS(new Date(startISO))}`,
    `DTEND:${fmtICS(new Date(endISO))}`,
    `SUMMARY:${esc(title)}`,
    `LOCATION:${esc(location)}`,
    `DESCRIPTION:${esc(description || '')}`,
    'URL:https://rust-luzern.ch','STATUS:CONFIRMED',
    'BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:Reminder for Rust Luzern Meetup','TRIGGER:-PT24H','END:VALARM',
    'END:VEVENT','END:VCALENDAR',''
  ].join('\r\n');
  const blob = new Blob([ics], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `rust-luzern-${year}-${edition}.ics`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const mapsUrl = q => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const EventCard = ({ edition, year, title, date, time, location, host, hostUrl, talks, status = 'past', description, startISO, endISO, program, rsvpUrl }) => {
  const isUpcoming = status === 'upcoming';
  const [hover, setHover] = React.useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--surface)',
        border: `1px solid ${isUpcoming ? 'var(--rust-400)' : (hover ? 'var(--border-strong)' : 'var(--border)')}`,
        borderRadius: 'var(--radius-md)',
        padding: '28px 32px',
        transition: 'border-color 140ms var(--ease-out)',
        boxShadow: isUpcoming ? 'var(--shadow-glow)' : 'none',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '92px 1fr auto', gap: 28, alignItems: 'start' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 72, lineHeight: 0.85, color: 'var(--rust-400)', letterSpacing: '-0.04em' }}>#{edition}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, color: 'var(--fg-muted)', letterSpacing: '.14em', marginTop: 8 }}>{year}</div>
        </div>

        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 22, lineHeight: 1.25, margin: '0 0 10px', color: 'var(--fg)', letterSpacing: '-0.01em' }}>{title}</h3>
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', color: 'var(--fg-muted)', fontSize: 13, fontFamily: 'var(--font-mono)', marginBottom: 14 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="calendar" size={14} style={{ color: 'var(--rust-400)' }} /> {date} · {time}
            </span>
            <a href={mapsUrl(location)} target="_blank" rel="noopener noreferrer"
               style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--fg-muted)', textDecoration: 'none', borderBottom: '1px solid transparent', transition: 'border-color 140ms' }}
               onMouseEnter={e => e.currentTarget.style.borderBottomColor = 'var(--rust-400)'}
               onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'transparent'}>
              <Icon name="pin" size={14} style={{ color: 'var(--rust-400)' }} /> {location}
            </a>
          </div>
          {description && <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-700)', margin: '0 0 14px' }}>{description}</p>}

          {talks && talks.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {talks.map((t, i) => (
                <li key={i} style={{ fontSize: 14, color: 'var(--ink-700)', display: 'flex', gap: 10, lineHeight: 1.5 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--rust-400)', flexShrink: 0 }}>→</span>
                  <span>
                    {t.speakerUrl
                      ? <a href={t.speakerUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--fg)', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid var(--rust-400)' }}>{t.speaker}</a>
                      : <strong style={{ color: 'var(--fg)', fontWeight: 600 }}>{t.speaker}</strong>}
                    {' '}{t.title}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {program && program.length > 0 && (
            <div style={{ margin: '0 0 14px', padding: '12px 14px', background: 'var(--ink-0)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--rust-400)', marginBottom: 8 }}>Program</div>
              <div style={{ display: 'grid', gridTemplateColumns: '84px 1fr', gap: '4px 14px', fontSize: 13, fontFamily: 'var(--font-mono)' }}>
                {program.map((p, i) => (
                  <React.Fragment key={i}>
                    <span style={{ color: 'var(--rust-400)' }}>{p.time}</span>
                    <span style={{ color: 'var(--ink-700)' }}>{p.label}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 12, color: 'var(--fg-subtle)', fontFamily: 'var(--font-mono)', marginRight: 'auto' }}>
              Hosted by{' '}
              {hostUrl
                ? <a href={hostUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--rust-400)', textDecoration: 'none', borderBottom: '1px solid transparent' }} onMouseEnter={e => e.currentTarget.style.borderBottomColor = 'var(--rust-400)'} onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'transparent'}>{host}</a>
                : <span style={{ color: 'var(--rust-400)' }}>{host}</span>}
            </div>
            {isUpcoming && rsvpUrl && (
              <a href={rsvpUrl} target="_blank" rel="noopener noreferrer"
                 style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--rust-400)', color: 'var(--ink-0)', borderRadius: 'var(--radius-pill)', padding: '6px 14px', fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 140ms' }}
                 onMouseEnter={e => e.currentTarget.style.background = 'var(--rust-500)'}
                 onMouseLeave={e => e.currentTarget.style.background = 'var(--rust-400)'}>
                RSVP on Meetup
              </a>
            )}
            {startISO && endISO && (
              <button
                onClick={() => downloadICS({ edition, year, title, startISO, endISO, location, description })}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', border: '1px solid var(--border)', borderRadius: 'var(--radius-pill)', padding: '4px 11px', color: 'var(--fg-muted)', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', transition: 'all 140ms var(--ease-out)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--rust-400)'; e.currentTarget.style.color = 'var(--rust-400)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--fg-muted)'; }}
              >
                <Icon name="calendar" size={12} /> Add to calendar
              </button>
            )}
          </div>
        </div>

        <Chip variant={isUpcoming ? 'live' : 'past'} live={isUpcoming}>
          {isUpcoming ? 'Upcoming' : 'Past'}
        </Chip>
      </div>
    </article>
  );
};
window.EventCard = EventCard;
