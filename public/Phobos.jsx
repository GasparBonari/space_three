import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function Phobos({ marsRef }) {
  const { nodes, materials } = useGLTF('/phobos.gltf');
  const phobosRef = useRef();

  // Phobos orbit parameters
  const orbitRadius = 2;
  const orbitSpeed = 0.8;

  useFrame((state) => {
    if (phobosRef.current && marsRef.current) {
      const theta = state.clock.getElapsedTime() * orbitSpeed;
      const marsPosition = marsRef.current.position;

      const x = marsPosition.x + Math.cos(theta) * orbitRadius;
      const z = marsPosition.z + Math.sin(theta) * orbitRadius;
      phobosRef.current.position.set(x, marsPosition.y, z);

      // Lock rotation to face Mars (tidal locking)
      phobosRef.current.lookAt(marsPosition);
    }
  });

  return (
    <group ref={phobosRef} dispose={null}>
      <mesh geometry={nodes.Object_4.geometry} material={materials.phobos_tex_01} rotation={[Math.PI / 2, 0, 0]} scale={0.01}/>
    </group>
  );
}

useGLTF.preload('/phobos.gltf');
