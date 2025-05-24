import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function Tethys({ saturnRef }) {
  const { nodes, materials } = useGLTF('/Tethys.glb');
  const tethysRef = useRef();

  // Orbit parameters
  const orbitRadius = 7.5;
  const orbitSpeed = 0.11;
  const rotationSpeed = 0.01;

  useFrame((state) => {
    if (tethysRef.current && saturnRef.current) {
      const theta = state.clock.getElapsedTime() * orbitSpeed;
      const saturnPosition = saturnRef.current.position;
      const x = saturnPosition.x + Math.cos(theta) * orbitRadius;
      const z = saturnPosition.z + Math.sin(theta) * orbitRadius;
      tethysRef.current.position.set(x, saturnPosition.y, z);
      tethysRef.current.rotation.y -= rotationSpeed;
    }
  });

  return (
    <group ref={tethysRef} scale={0.001} dispose={null}>
      <mesh geometry={nodes.cylindrically_mapped_sphere.geometry} material={materials['Default OBJ.001']} />
    </group>
  );
}

useGLTF.preload('/Tethys.glb');
