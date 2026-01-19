import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function Europa({ jupiterRef }) {
  const { scene } = useGLTF('./europa.glb');
  const europaRef = useRef();
  
  const orbitRadius = 3.5; // Radius of the orbit
  const orbitSpeed = 0.4; // Speed of the orbit
  const rotationSpeed = 0.01; // Rotation own axis

  useFrame((state) => {
    if (europaRef.current && jupiterRef.current) {
      const theta = state.clock.getElapsedTime() * orbitSpeed;
      const earthPosition = jupiterRef.current.position;
      
      const x = earthPosition.x + Math.cos(theta) * orbitRadius;
      const z = earthPosition.z + Math.sin(theta) * orbitRadius;
      europaRef.current.position.set(x, earthPosition.y, z); 

      europaRef.current.rotation.y -= rotationSpeed;
    }
  });

  return <primitive ref={europaRef} object={scene} scale={[0.0004, 0.0004, 0.0004]} />;
}

useGLTF.preload('./europa.glb');
