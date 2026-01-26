import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function Deimos({ marsRef }) {
  const { nodes, materials } = useGLTF('/models/deimos.gltf');
  const deimosRef = useRef();

  // Deimos orbit parameters
  const orbitRadius = 7;
  const orbitSpeed = 0.5;

  useFrame((state) => {
    if (deimosRef.current && marsRef.current) {
      const theta = state.clock.getElapsedTime() * orbitSpeed;
      const marsPosition = marsRef.current.position;

      const x = marsPosition.x + Math.cos(theta) * orbitRadius;
      const z = marsPosition.z + Math.sin(theta) * orbitRadius;
      deimosRef.current.position.set(x, marsPosition.y, z);

      // Lock rotation to face Mars (tidal locking)
      deimosRef.current.lookAt(marsPosition);
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
    </group>
  );
}

useGLTF.preload('/deimos.gltf');
