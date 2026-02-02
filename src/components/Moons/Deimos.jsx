import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import OrbitalLabel from '../UI/OrbitalLabel/OrbitalLabel';

export default function Deimos({
  marsRef,
  timeScale = 1,
  paused = false,
  showLabel = false,
}) {
  const { nodes, materials } = useGLTF('/models/deimos.gltf');
  const deimosRef = useRef();
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
    <group ref={deimosRef} dispose={null}>
      <mesh 
        geometry={nodes['Deimos_01_-_Default_0'].geometry} 
        material={materials['01_-_Default']} 
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.0001}
      />
      <OrbitalLabel text="Deimos" visible={showLabel} />
    </group>
  );
}

useGLTF.preload('/models/deimos.gltf');
