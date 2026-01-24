import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function Enceladus({ saturnRef }) {
  const { nodes, materials } = useGLTF('/models/Enceladus.glb');
  const enceladusRef = useRef();

  // Orbit parameters
  const orbitRadius = 8;
  const orbitSpeed = 0.13;
  const rotationSpeed = 0.01;

  useFrame((state) => {
    if (enceladusRef.current && saturnRef.current) {
      const theta = state.clock.getElapsedTime() * orbitSpeed;
      const saturnPosition = saturnRef.current.position;
      const x = saturnPosition.x + Math.cos(theta) * orbitRadius;
      const z = saturnPosition.z + Math.sin(theta) * orbitRadius;
      enceladusRef.current.position.set(x, saturnPosition.y, z);
      enceladusRef.current.rotation.y -= rotationSpeed;
    }
  });

  return (
    <group ref={enceladusRef} scale={0.001} dispose={null}>
      <mesh geometry={nodes.cylindrically_mapped_sphere.geometry} material={materials['Default OBJ.001']} />
    </group>
  );
}

useGLTF.preload('/Enceladus.glb');
