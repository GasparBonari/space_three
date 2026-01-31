import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function Europa({ jupiterRef, timeScale = 1, paused = false }) {
  const { scene } = useGLTF('/models/europa.glb');
  const europaRef = useRef();
  const timeRef = useRef(0);
  
  const orbitRadius = 6; // Radius of the orbit
  const orbitSpeed = 0.4; // Speed of the orbit
  const rotationSpeed = 0.01; // Rotation own axis

  useFrame((_, delta) => {
    if (europaRef.current && jupiterRef.current) {
      if (!paused) {
        timeRef.current += delta * timeScale;
      }
      const theta = timeRef.current * orbitSpeed;
      const earthPosition = jupiterRef.current.position;
      
      const x = earthPosition.x + Math.cos(theta) * orbitRadius;
      const z = earthPosition.z + Math.sin(theta) * orbitRadius;
      europaRef.current.position.set(x, earthPosition.y, z); 

      if (!paused) {
        europaRef.current.rotation.y -= rotationSpeed * delta * timeScale;
      }
    }
  });

  return <primitive ref={europaRef} object={scene} scale={[0.0004, 0.0004, 0.0004]} />;
}

useGLTF.preload('/models/europa.glb');
