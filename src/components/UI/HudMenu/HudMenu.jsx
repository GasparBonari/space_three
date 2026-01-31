import PlanetBadge from '../PlanetBadge/PlanetBadge';
import './HudMenu.css';

export default function HudMenu({
  open,
  onToggleOpen,
  showControls,
  onToggleControls,
  showMiniMap,
  onToggleMiniMap,
  onBadgeClick,
}) {
  return (
    <div className="hud-menu">
      <button className="hud-menu__toggle" type="button" onClick={onToggleOpen}>
        <span className="hud-menu__glow" aria-hidden="true" />
        <span className="hud-menu__label">HUD</span>
        <span className="hud-menu__status">{open ? 'Active' : 'Menu'}</span>
      </button>

      {open && (
        <div className="hud-menu__panel">
          <div className="hud-menu__title">HUD Layers</div>
          <button className="hud-menu__badge" type="button" onClick={onBadgeClick}>
            <span className="hud-menu__badge-icon">
              <PlanetBadge radius={35} interactive={false} />
            </span>
            <span className="hud-menu__badge-text">
              <span className="hud-menu__badge-label">Intro Panel</span>
              <span className="hud-menu__badge-subtitle">Open briefing</span>
            </span>
          </button>
          <label className="hud-menu__item">
            <input type="checkbox" checked={showControls} onChange={onToggleControls} />
            <span>Orbital Controls</span>
          </label>
          <label className="hud-menu__item">
            <input type="checkbox" checked={showMiniMap} onChange={onToggleMiniMap} />
            <span>Camera Map</span>
          </label>
        </div>
      )}
    </div>
  );
}
