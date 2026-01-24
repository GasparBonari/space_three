import './InfoPanel.css';

const statsLookup = {
  Mercury: { distance: '0.39 AU', mass: '0.055 M⊕', radius: '2,440 km', gravity: '3.7 m/s²', period: '88 d' },
  Venus: { distance: '0.72 AU', mass: '0.815 M⊕', radius: '6,052 km', gravity: '8.87 m/s²', period: '225 d' },
  Earth: { distance: '1.00 AU', mass: '1 M⊕', radius: '6,371 km', gravity: '9.81 m/s²', period: '365 d' },
  Mars: { distance: '1.52 AU', mass: '0.107 M⊕', radius: '3,389 km', gravity: '3.71 m/s²', period: '687 d' },
  Jupiter: { distance: '5.20 AU', mass: '317.8 M⊕', radius: '69,911 km', gravity: '24.79 m/s²', period: '4,333 d' },
  Saturn: { distance: '9.58 AU', mass: '95.16 M⊕', radius: '58,232 km', gravity: '10.44 m/s²', period: '10,759 d' },
  Uranus: { distance: '19.2 AU', mass: '14.54 M⊕', radius: '25,362 km', gravity: '8.69 m/s²', period: '30,687 d' },
  Neptune: { distance: '30.1 AU', mass: '17.15 M⊕', radius: '24,622 km', gravity: '11.15 m/s²', period: '60,190 d' },
};

export default function InfoPanel({ planet, onClose }) {
  if (!planet) return null;

  const stats = statsLookup[planet.name] || {};
  const wikiUrl = `https://en.wikipedia.org/wiki/${planet.name}`;

  return (
    <div className="info-panel">
      <div className="info-panel__inner">
        <button className="info-panel__close" onClick={onClose} aria-label="Close">✕</button>

        <div className="info-panel__header">
          <div className="info-panel__badge" />
          <div>
            <h2 className="info-panel__title">{planet.name}</h2>
            <p className="info-panel__subtitle">Interactive planetary HUD</p>
          </div>
        </div>

        <div className="info-panel__grid">
          <div className="card">
            <div className="card__label">Distance</div>
            <div className="card__value">{stats.distance || '—'}</div>
          </div>

          <div className="card">
            <div className="card__label">Mass</div>
            <div className="card__value">{stats.mass || '—'}</div>
          </div>

          <div className="card">
            <div className="card__label">Radius</div>
            <div className="card__value">{stats.radius || '—'}</div>
          </div>

          <div className="card">
            <div className="card__label">Gravity</div>
            <div className="card__value">{stats.gravity || '—'}</div>
          </div>

          <div className="card">
            <div className="card__label">Orbital Period</div>
            <div className="card__value">{stats.period || '—'}</div>
          </div>

          <div className="card">
            <div className="card__label">Orbit Radius</div>
            <div className="card__value">{planet.radius} units</div>
          </div>
        </div>

        <div className="info-panel__actions">
          <a className="btn btn--primary" href={wikiUrl} target="_blank" rel="noreferrer">Open Wiki</a>
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
