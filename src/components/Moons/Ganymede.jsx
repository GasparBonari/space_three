import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei'

export default function Ganymede({ jupiterRef }) {
  const { nodes, materials } = useGLTF('/models/ganymede.gltf')
  const ganymedeRef = useRef();
  
  const orbitRadius = 9; // Radius of the orbit
  const orbitSpeed = 0.3; // Speed of the orbit
  const rotationSpeed = 0.01; // Rotation own axis

  useFrame((state) => {
    if (ganymedeRef.current && jupiterRef.current) {
      const theta = state.clock.getElapsedTime() * orbitSpeed;
      const earthPosition = jupiterRef.current.position;
      
      const x = earthPosition.x + Math.cos(theta) * orbitRadius;
      const z = earthPosition.z + Math.sin(theta) * orbitRadius;
      ganymedeRef.current.position.set(x, earthPosition.y, z); 

      ganymedeRef.current.rotation.y -= rotationSpeed;
    }
  });
  return (
    <group ref={ganymedeRef} dispose={null}>
      <mesh geometry={nodes['Ganimede_Material_#25_0'].geometry} material={materials.Material_25} rotation={[-Math.PI / 2, 0, 0]} scale={0.01}/>
    </group>
  )
}

useGLTF.preload('/ganymede.gltf')
