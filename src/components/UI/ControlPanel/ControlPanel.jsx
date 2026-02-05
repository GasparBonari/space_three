import './ControlPanel.css';

const cameraPresets = [
  { id: 'follow', label: 'Follow' },
  { id: 'overview', label: 'Overview' },
  { id: 'top', label: 'Top' },
  { id: 'side', label: 'Side' },
];

export default function ControlPanel({
  timeScale,
  isPaused,
  onTogglePause,
  onTimeScaleChange,
  cameraPreset,
  onCameraPresetChange,
  cameraDistance,
  onCameraDistanceChange,
  showWireframe,
  onToggleWireframe,
  showLabels,
  onToggleLabels,
}) {
  return (
    <div className="control-panel">
      <div className="control-panel__inner">
        <div className="control-panel__header">
          <div>
            <div className="control-panel__eyebrow">Navigation</div>
            <div className="control-panel__title">Orbital Controls</div>
          </div>
          <button
            className={`control-panel__action ${isPaused ? '' : 'is-active'}`}
            type="button"
            onClick={onTogglePause}
          >
            {isPaused ? 'Play' : 'Pause'}
          </button>
        </div>

        <div className="control-panel__section">
          <div className="control-panel__label">Time Scale</div>
          <div className="control-panel__slider">
            <input
              type="range"
              min="0.2"
              max="3"
              step="0.05"
              value={timeScale}
              onChange={(event) => onTimeScaleChange(Number(event.target.value))}
            />
            <span>{timeScale.toFixed(2)}x</span>
          </div>
        </div>

        <div className="control-panel__section">
          <div className="control-panel__label">Camera Presets</div>
          <div className="control-panel__segmented">
            {cameraPresets.map((preset) => (
              <button
                key={preset.id}
                className={`control-panel__chip ${cameraPreset === preset.id ? 'is-active' : ''}`}
                type="button"
                onClick={() => onCameraPresetChange(preset.id)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="control-panel__section">
          <div className="control-panel__label">Camera Distance</div>
          <div className="control-panel__slider">
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.05"
              value={cameraDistance}
              onChange={(event) => onCameraDistanceChange(Number(event.target.value))}
            />
            <span>{cameraDistance.toFixed(2)}x</span>
          </div>
        </div>

        <div className="control-panel__section">
          <div className="control-panel__label">Layers</div>
          <div className="control-panel__toggles">
            <label className="control-panel__toggle">
              <input type="checkbox" checked={showWireframe} onChange={onToggleWireframe} />
              <span>Wireframe</span>
            </label>
            <label className="control-panel__toggle">
              <input type="checkbox" checked={showLabels} onChange={onToggleLabels} />
              <span>Labels</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
