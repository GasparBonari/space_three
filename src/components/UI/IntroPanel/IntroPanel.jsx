import { useEffect, useMemo, useState } from 'react';
import { useProgress } from '@react-three/drei';
import PlanetBadge from '../PlanetBadge/PlanetBadge';
import './IntroPanel.css';

export default function IntroPanel({ onClose }) {
  const { active, progress, item, loaded, total } = useProgress();
  const [ready, setReady] = useState(false);

  const percent = useMemo(() => {
    if (!total) return 0;
    return Math.min(100, Math.round(progress));
  }, [progress, total]);

  const currentItem = useMemo(() => {
    if (!item) return 'Initializing';
    const parts = item.split('/');
    return parts[parts.length - 1] || item;
  }, [item]);

  useEffect(() => {
    if (!ready && total > 0 && percent >= 100 && !active) {
      setReady(true);
    }
  }, [active, percent, ready, total]);

  return (
    <div className="intro-panel">
      <div className="intro-panel__inner">
        <div className="intro-panel__header">
          <div className="intro-panel__badge" aria-hidden="true">
            <PlanetBadge radius={35} interactive={false} />
          </div>
          <div>
            <div className="intro-panel__eyebrow">Stellar Interface</div>
            <h1 className="intro-panel__title">Orbital Command Center</h1>
            <p className="intro-panel__subtitle">Synchronizing planetary assets and navigation layers.</p>
          </div>
        </div>

        <div className="intro-panel__progress">
          <div className="intro-panel__bar" style={{ width: `${percent}%` }} />
        </div>
        <div className="intro-panel__meta">
          <span>{total ? `${loaded} / ${total} assets` : 'Scanning assets'}</span>
          <span>{total ? `${percent}%` : '0%'}</span>
        </div>

        <div className="intro-panel__status">
          <span className={`intro-panel__pulse ${ready ? 'is-ready' : ''}`} />
          <span>{ready ? 'All systems online' : `Loading ${currentItem}`}</span>
        </div>

        <div className="intro-panel__grid">
          <div className="intro-panel__card">
            <div className="intro-panel__label">Controls</div>
            <div className="intro-panel__value">Scroll to switch planets. Use the control panel for time and camera.</div>
          </div>
          <div className="intro-panel__card">
            <div className="intro-panel__label">Navigation</div>
            <div className="intro-panel__value">HUD reveals stats and orbit details.</div>
          </div>
          <div className="intro-panel__card">
            <div className="intro-panel__label">Status</div>
            <div className="intro-panel__value">{ready ? 'Ready for launch' : 'Calibrating starfield'}</div>
          </div>
          <div className="intro-panel__card">
            <div className="intro-panel__label">Tip</div>
            <div className="intro-panel__value">Toggle labels or wireframe to inspect the system.</div>
          </div>
        </div>

        <div className="intro-panel__actions">
          <button
            className="intro-panel__button intro-panel__button--primary"
            type="button"
            onClick={onClose}
            disabled={!ready}
          >
            {ready ? 'Enter Orbits' : 'Preparing Systems'}
          </button>
          <button
            className="intro-panel__button"
            type="button"
            onClick={onClose}
            disabled={!ready}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
