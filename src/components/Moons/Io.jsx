import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import OrbitalLabel from '../UI/OrbitalLabel/OrbitalLabel';

export default function Io({
  jupiterRef,
  timeScale = 1,
  paused = false,
  showLabel = false,
}) {
  const { nodes, materials } = useGLTF('/models/io.gltf')
  const ioRef = useRef();
  const timeRef = useRef(0);
  
  const orbitRadius = 4; // Radius of the orbit
  const orbitSpeed = 0.6; // Speed of the orbit
  const rotationSpeed = 0.02; // Rotation own axis

  useFrame((_, delta) => {
    if (ioRef.current && jupiterRef.current) {
      if (!paused) {
        timeRef.current += delta * timeScale;
      }
      const theta = timeRef.current * orbitSpeed;
      const earthPosition = jupiterRef.current.position;
      
      const x = earthPosition.x + Math.cos(theta) * orbitRadius;
      const z = earthPosition.z + Math.sin(theta) * orbitRadius;
      ioRef.current.position.set(x, earthPosition.y, z); 

      if (!paused) {
        ioRef.current.rotation.y -= rotationSpeed * delta * timeScale;
      }
    }
  });

  return (
    <group ref={ioRef} dispose={null}>
      <mesh geometry={nodes.Object_2.geometry} material={materials.material} rotation={[-Math.PI / 2, 0, 0]} scale={0.0025}/>
      <OrbitalLabel text="Io" visible={showLabel} />
    </group>
  )
}

useGLTF.preload('/models/io.gltf')
