import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei'

export default function Io({ jupiterRef }) {
  const { nodes, materials } = useGLTF('/models/io.gltf')
  const ioRef = useRef();
  
  const orbitRadius = 2.5; // Radius of the orbit
  const orbitSpeed = 0.6; // Speed of the orbit
  const rotationSpeed = 0.02; // Rotation own axis

  useFrame((state) => {
    if (ioRef.current && jupiterRef.current) {
      const theta = state.clock.getElapsedTime() * orbitSpeed;
      const earthPosition = jupiterRef.current.position;
      
      const x = earthPosition.x + Math.cos(theta) * orbitRadius;
      const z = earthPosition.z + Math.sin(theta) * orbitRadius;
      ioRef.current.position.set(x, earthPosition.y, z); 

      ioRef.current.rotation.y -= rotationSpeed;
    }
  });

  return (
    <group ref={ioRef} dispose={null}>
      <mesh geometry={nodes.Object_2.geometry} material={materials.material} rotation={[-Math.PI / 2, 0, 0]} scale={0.0025}/>
    </group>
  )
}

useGLTF.preload('/io.gltf')
