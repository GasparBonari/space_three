import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei'

export default function Callisto({ jupiterRef }) {
  const { nodes, materials } = useGLTF('/models/callisto.gltf')
  const callistoRef = useRef();
  
  const orbitRadius = 13; // Radius of the orbit
  const orbitSpeed = 0.2; // Speed of the orbit
  const rotationSpeed = 0.01; // Rotation own axis

  useFrame((state) => {
    if (callistoRef.current && jupiterRef.current) {
      const theta = state.clock.getElapsedTime() * orbitSpeed;
      const earthPosition = jupiterRef.current.position;
      
      const x = earthPosition.x + Math.cos(theta) * orbitRadius;
      const z = earthPosition.z + Math.sin(theta) * orbitRadius;
      callistoRef.current.position.set(x, earthPosition.y, z); 

      callistoRef.current.rotation.y -= rotationSpeed;
    }
  });
  return (
    <group ref={callistoRef} dispose={null}>
      <mesh geometry={nodes['Ganimede_Material_#25_0'].geometry} material={materials.Material_25} scale={0.01}/>
    </group>
  )
}

useGLTF.preload('/models/callisto.gltf')
