import React, { useRef, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import OrbitalLabel from '../UI/OrbitalLabel/OrbitalLabel';

const Deimos = forwardRef(function Deimos({
  marsRef,
  timeScale = 1,
  paused = false,
  showLabel = false,
  onSelect,
}, ref) {
  const { nodes, materials } = useGLTF('/models/deimos.gltf');
  const localRef = useRef();
  const deimosRef = ref ?? localRef;
  const timeRef = useRef(0);

  // Deimos orbit parameters
  const orbitRadius = 7;
  const orbitSpeed = 0.5;

  useFrame((_, delta) => {
    if (deimosRef.current && marsRef.current) {
      if (!paused) {
        timeRef.current += delta * timeScale;
      }
      const theta = timeRef.current * orbitSpeed;
      const marsPosition = marsRef.current.position;

      const x = marsPosition.x + Math.cos(theta) * orbitRadius;
      const z = marsPosition.z + Math.sin(theta) * orbitRadius;
      deimosRef.current.position.set(x, marsPosition.y, z);

      // Lock rotation to face Mars (tidal locking)
      if (!paused) {
        deimosRef.current.lookAt(marsPosition);
      }
    }
  });

  return (
    <group
      ref={deimosRef}
      dispose={null}
      onClick={(event) => {
        event.stopPropagation();
        onSelect?.(event);
      }}
    >
      <mesh 
        geometry={nodes['Deimos_01_-_Default_0'].geometry} 
        material={materials['01_-_Default']} 
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.0001}
      />
      <OrbitalLabel text="Deimos" visible={showLabel} />
    </group>
  );
});

export default Deimos;

useGLTF.preload('/models/deimos.gltf');
