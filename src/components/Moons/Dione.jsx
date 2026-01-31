import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function Dione({ saturnRef, timeScale = 1, paused = false }) {
  const { nodes, materials } = useGLTF('/models/Dione.glb');
  const dioneRef = useRef();
  const timeRef = useRef(0);

  // Orbit parameters
  const orbitRadius = 13;
  const orbitSpeed = 0.09;
  const rotationSpeed = 0.01;

  useFrame((_, delta) => {
    if (dioneRef.current && saturnRef.current) {
      if (!paused) {
        timeRef.current += delta * timeScale;
      }
      const theta = timeRef.current * orbitSpeed;
      const saturnPosition = saturnRef.current.position;
      const x = saturnPosition.x + Math.cos(theta) * orbitRadius;
      const z = saturnPosition.z + Math.sin(theta) * orbitRadius;
      dioneRef.current.position.set(x, saturnPosition.y, z);
      if (!paused) {
        dioneRef.current.rotation.y -= rotationSpeed * delta * timeScale;
      }
    }
  });

  return (
    <group ref={dioneRef} scale={0.001} dispose={null}>
      <mesh geometry={nodes.cylindrically_mapped_sphere.geometry} material={materials['Default OBJ.001']} />
    </group>
  );
}

useGLTF.preload('/models/Dione.glb');
