import { useEffect, useMemo, useRef, useState } from 'react';
import './MiniMap.css';

const MIN_MAP_SIZE = 140;
const MAX_MAP_SIZE = 320;
const MAP_SIZE_STEP = 20;

export default function MiniMap({ planets, cameraDataRef, activeIndex, maxOrbitRadius }) {
  const canvasRef = useRef(null);
  const [mapSize, setMapSize] = useState(200);
  const orbitRadii = useMemo(() => planets.map((planet) => planet.radius), [planets]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let frameId;
    const render = () => {
      const { width, height } = canvas;
      const centerX = width / 2;
      const centerY = height / 2;
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(8, 10, 16, 0.88)';
      ctx.fillRect(0, 0, width, height);

      const mapRadius = Math.min(width, height) / 2 - 12;
      const scale = mapRadius / Math.max(maxOrbitRadius, 1);

      ctx.strokeStyle = 'rgba(120, 160, 255, 0.15)';
      ctx.lineWidth = 1;
      orbitRadii.forEach((radius) => {
        const scaled = radius * scale;
        ctx.beginPath();
        ctx.arc(centerX, centerY, scaled, 0, Math.PI * 2);
        ctx.stroke();
      });

      ctx.fillStyle = '#ffcc66';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
      ctx.fill();

      const cameraData = cameraDataRef.current;
      const planetPositions = cameraData?.planets ?? [];

      planets.forEach((planet, index) => {
        const position = planetPositions[index];
        if (!position) return;
        const x = centerX + position.x * scale;
        const y = centerY + position.z * scale;
        ctx.fillStyle = planet.mapColor || '#9aa0a6';
        ctx.beginPath();
        ctx.arc(x, y, index === activeIndex ? 4 : 2.6, 0, Math.PI * 2);
        ctx.fill();
      });

      const camPosition = cameraData?.position;
      if (camPosition) {
        let camX = camPosition.x * scale;
        let camY = camPosition.z * scale;
        const camDistance = Math.hypot(camX, camY);
        if (camDistance > mapRadius) {
          const clamp = mapRadius / camDistance;
          camX *= clamp;
          camY *= clamp;
        }

        const camScreenX = centerX + camX;
        const camScreenY = centerY + camY;

        ctx.save();
        ctx.translate(camScreenX, camScreenY);
        const camDir = cameraData?.direction || { x: 1, z: 0 };
        const angle = Math.atan2(camDir.z, camDir.x);
        ctx.rotate(angle);
        ctx.fillStyle = '#6ff0c3';
        ctx.beginPath();
        ctx.moveTo(8, 0);
        ctx.lineTo(-6, 4);
        ctx.lineTo(-6, -4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        ctx.strokeStyle = 'rgba(111, 240, 195, 0.7)';
        ctx.beginPath();
        ctx.arc(camScreenX, camScreenY, 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [activeIndex, cameraDataRef, mapSize, maxOrbitRadius, orbitRadii, planets]);

  return (
    <div className="mini-map">
      <div className="mini-map__inner">
        <div className="mini-map__header">
          <div className="mini-map__label">Camera Map</div>
          <div className="mini-map__controls">
            <button
              type="button"
              className="mini-map__button"
              onClick={() => setMapSize((size) => Math.max(MIN_MAP_SIZE, size - MAP_SIZE_STEP))}
              disabled={mapSize <= MIN_MAP_SIZE}
              aria-label="Decrease camera map size"
            >
              -
            </button>
            <button
              type="button"
              className="mini-map__button"
              onClick={() => setMapSize((size) => Math.min(MAX_MAP_SIZE, size + MAP_SIZE_STEP))}
              disabled={mapSize >= MAX_MAP_SIZE}
              aria-label="Increase camera map size"
            >
              +
            </button>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          width={mapSize}
          height={mapSize}
          style={{ width: `${mapSize}px`, height: `${mapSize}px` }}
        />
      </div>
    </div>
  );
}
