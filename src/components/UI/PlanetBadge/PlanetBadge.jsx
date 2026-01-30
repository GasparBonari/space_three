import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import './PlanetBadge.css';

function BadgeMesh({ radius = 35, interactive = true, onClick }) {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);
  const lastPointer = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!mesh.current) return;
    mesh.current.rotation.y += 0.01;
    const target = interactive && hovered ? 1.12 : 1.0;
    mesh.current.scale.x += (target - mesh.current.scale.x) * 0.12;
    mesh.current.scale.y = mesh.current.scale.x;
    mesh.current.scale.z = mesh.current.scale.x;
  });

  const handlePointerOver = (e) => {
    if (!interactive) return;
    e.stopPropagation();
    setHovered(true);
    lastPointer.current = { x: e.clientX, y: e.clientY };
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e) => {
    if (!interactive) return;
    e.stopPropagation();
    setHovered(false);
    lastPointer.current = { x: 0, y: 0 };
    document.body.style.cursor = 'default';
  };

  const handlePointerMove = (e) => {
    if (!interactive || !hovered || !mesh.current) return;
    const dx = (e.clientX - lastPointer.current.x) || 0;
    const dy = (e.clientY - lastPointer.current.y) || 0;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    mesh.current.rotation.y += dx * 0.006;
    mesh.current.rotation.x += dy * 0.004;
  };

  const handleClick = (e) => {
    if (!interactive || !onClick) return;
    e.stopPropagation();
    onClick(e);
  };

  return (
    <mesh
      ref={mesh}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
      position={[0, 0, 0]}
    >
      <sphereGeometry args={[Math.max(radius * 0.04, 0.3), 64, 64]} />
      <MeshDistortMaterial
        distort={0.9}
        speed={3.2}
        color={interactive && hovered ? '#7fe0ff' : '#2b9cff'}
        metalness={0.6}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function PlanetBadge({ radius = 35, interactive = true, showLoader = true, onClick }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className={`planet-badge ${ready ? 'is-ready' : 'is-loading'}`} aria-busy={!ready}>
      {showLoader && !ready && (
        <div className="planet-badge__loader" aria-hidden="true">
          <span className="planet-badge__pulse" />
        </div>
      )}
      <Canvas
        className="planet-badge__canvas"
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ pointerEvents: interactive ? 'auto' : 'none', opacity: ready ? 1 : 0 }}
        onCreated={() => setReady(true)}
      >
        <ambientLight intensity={0.6} />
        <directionalLight intensity={0.8} position={[5, 5, 5]} />
        <BadgeMesh radius={radius} interactive={interactive} onClick={onClick} />
      </Canvas>
    </div>
  );
}
