import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function Dione({ saturnRef }) {
  const { nodes, materials } = useGLTF('/models/Dione.glb');
  const dioneRef = useRef();

  // Orbit parameters
  const orbitRadius = 9;
  const orbitSpeed = 0.09;
  const rotationSpeed = 0.01;

  useFrame((state) => {
    if (dioneRef.current && saturnRef.current) {
      const theta = state.clock.getElapsedTime() * orbitSpeed;
      const saturnPosition = saturnRef.current.position;
      const x = saturnPosition.x + Math.cos(theta) * orbitRadius;
      const z = saturnPosition.z + Math.sin(theta) * orbitRadius;
      dioneRef.current.position.set(x, saturnPosition.y, z);
      dioneRef.current.rotation.y -= rotationSpeed;
    }
  });

  return (
    <group ref={dioneRef} scale={0.001} dispose={null}>
      <mesh geometry={nodes.cylindrically_mapped_sphere.geometry} material={materials['Default OBJ.001']} />
    </group>
  );
}

useGLTF.preload('/Dione.glb');
