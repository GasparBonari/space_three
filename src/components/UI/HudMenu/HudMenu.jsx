import './HudMenu.css';

export default function HudMenu({
  open,
  onToggleOpen,
  showControls,
  onToggleControls,
  showMiniMap,
  onToggleMiniMap,
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
