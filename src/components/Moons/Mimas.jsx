import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function Mimas({ saturnRef }) {
  const { nodes, materials } = useGLTF('/models/Mimas.glb');
  const mimasRef = useRef();

  // Orbit parameters
  const orbitRadius = 6.5;
  const orbitSpeed = 0.15;
  const rotationSpeed = 0.01;

  useFrame((state) => {
    if (mimasRef.current && saturnRef.current) {
      const theta = state.clock.getElapsedTime() * orbitSpeed;
      const saturnPosition = saturnRef.current.position;
      const x = saturnPosition.x + Math.cos(theta) * orbitRadius;
      const z = saturnPosition.z + Math.sin(theta) * orbitRadius;
      mimasRef.current.position.set(x, saturnPosition.y, z);
      mimasRef.current.rotation.y -= rotationSpeed;
    }
  });

  return (
    <group ref={mimasRef} scale={0.002} dispose={null}>
      <mesh geometry={nodes.Mimas.geometry} material={materials.Mimas_mat} />
    </group>
  );
}

useGLTF.preload('/Mimas.glb');
