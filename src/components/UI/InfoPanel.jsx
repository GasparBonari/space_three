import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
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

  // small interactive 3D badge component using a tiny r3f Canvas
  function Badge({ radius = 10 }) {
    const mesh = useRef();
    const [hovered, setHovered] = useState(false);
    const lastPointer = useRef({ x: 0, y: 0 });

    useFrame(() => {
      if (mesh.current) {
        // subtle idle rotation
        mesh.current.rotation.y += 0.01;
        // smooth hover scale
        const target = hovered ? 1.12 : 1.0;
        mesh.current.scale.x += (target - mesh.current.scale.x) * 0.12;
        mesh.current.scale.y = mesh.current.scale.x;
        mesh.current.scale.z = mesh.current.scale.x;
      }
    });

    return (
      <mesh
        ref={mesh}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); lastPointer.current = { x: e.clientX, y: e.clientY }; document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); lastPointer.current = { x: 0, y: 0 }; document.body.style.cursor = 'default'; }}
        onPointerMove={(e) => {
          // allow subtle rotation by moving the pointer while hovered
          if (!hovered || !mesh.current) return;
          const dx = (e.clientX - lastPointer.current.x) || 0;
          const dy = (e.clientY - lastPointer.current.y) || 0;
          lastPointer.current = { x: e.clientX, y: e.clientY };
          mesh.current.rotation.y += dx * 0.006;
          mesh.current.rotation.x += dy * 0.004;
        }}
        onClick={(e) => { e.stopPropagation(); /* optional click action */ }}
        position={[0, 0, 0]}
      >
        <sphereGeometry args={[Math.max(radius * 0.04, 0.3), 64, 64]} />
        <MeshDistortMaterial distort={0.9} speed={3.2} color={hovered ? '#7fe0ff' : '#2b9cff'} metalness={0.6} roughness={0.2} />
      </mesh>
    );
  }

  return (
    <div className="info-panel">
      <div className="info-panel__inner">
        <button className="info-panel__close" onClick={onClose} aria-label="Close">✕</button>

        <div className="info-panel__header">
          <div className="info-panel__badge">
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }} style={{ pointerEvents: 'auto' }}>
              <ambientLight intensity={0.6} />
              <directionalLight intensity={0.8} position={[5, 5, 5]} />
              <Badge radius={35} />
            </Canvas>
          </div>
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
        </div>
      </div>
    </div>
  );
}
