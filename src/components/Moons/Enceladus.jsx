import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function Enceladus({ saturnRef, timeScale = 1, paused = false }) {
  const { nodes, materials } = useGLTF('/models/Enceladus.glb');
  const enceladusRef = useRef();
  const timeRef = useRef(0);

  // Orbit parameters
  const orbitRadius = 12;
  const orbitSpeed = 0.13;
  const rotationSpeed = 0.01;

  useFrame((_, delta) => {
    if (enceladusRef.current && saturnRef.current) {
      if (!paused) {
        timeRef.current += delta * timeScale;
      }
      const theta = timeRef.current * orbitSpeed;
      const saturnPosition = saturnRef.current.position;
      const x = saturnPosition.x + Math.cos(theta) * orbitRadius;
      const z = saturnPosition.z + Math.sin(theta) * orbitRadius;
      enceladusRef.current.position.set(x, saturnPosition.y, z);
      if (!paused) {
        enceladusRef.current.rotation.y -= rotationSpeed * delta * timeScale;
      }
    }
  });

  return (
    <group ref={enceladusRef} scale={0.001} dispose={null}>
      <mesh geometry={nodes.cylindrically_mapped_sphere.geometry} material={materials['Default OBJ.001']} />
    </group>
  );
}

useGLTF.preload('/models/Enceladus.glb');
