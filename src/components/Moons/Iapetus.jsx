import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function Iapetus({ saturnRef }) {
  const { nodes, materials } = useGLTF('/models/Iapetus.glb');
  const iapetusRef = useRef();

  // Orbit parameters
  const orbitRadius = 12;
  const orbitSpeed = 0.05;
  const rotationSpeed = 0.01;

  useFrame((state) => {
    if (iapetusRef.current && saturnRef.current) {
      const theta = state.clock.getElapsedTime() * orbitSpeed;
      const saturnPosition = saturnRef.current.position;
      const x = saturnPosition.x + Math.cos(theta) * orbitRadius;
      const z = saturnPosition.z + Math.sin(theta) * orbitRadius;
      iapetusRef.current.position.set(x, saturnPosition.y, z);
      iapetusRef.current.rotation.y -= rotationSpeed;
    }
  });

  return (
    <group ref={iapetusRef} scale={0.002} dispose={null}>
      <mesh geometry={nodes.cylindrically_mapped_sphere.geometry} material={materials['Default OBJ.001']} />
    </group>
  );
}

useGLTF.preload('/Iapetus.glb');
