import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function Iapetus({ saturnRef, timeScale = 1, paused = false }) {
  const { nodes, materials } = useGLTF('/models/Iapetus.glb');
  const iapetusRef = useRef();
  const timeRef = useRef(0);

  // Orbit parameters
  const orbitRadius = 20;
  const orbitSpeed = 0.05;
  const rotationSpeed = 0.01;

  useFrame((_, delta) => {
    if (iapetusRef.current && saturnRef.current) {
      if (!paused) {
        timeRef.current += delta * timeScale;
      }
      const theta = timeRef.current * orbitSpeed;
      const saturnPosition = saturnRef.current.position;
      const x = saturnPosition.x + Math.cos(theta) * orbitRadius;
      const z = saturnPosition.z + Math.sin(theta) * orbitRadius;
      iapetusRef.current.position.set(x, saturnPosition.y, z);
      if (!paused) {
        iapetusRef.current.rotation.y -= rotationSpeed * delta * timeScale;
      }
    }
  });

  return (
    <group ref={iapetusRef} scale={0.002} dispose={null}>
      <mesh geometry={nodes.cylindrically_mapped_sphere.geometry} material={materials['Default OBJ.001']} />
    </group>
  );
}

useGLTF.preload('/models/Iapetus.glb');
