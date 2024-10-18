import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei'

export default function Moon({ earthRef }) {
  const { nodes, materials } = useGLTF('/moon.gltf');
  const moonRef = useRef();

  // Define orbit parameters for the Moon
  const orbitRadius = 2.5; // Radius of the Moon's orbit
  const orbitSpeed = 0.3; // Speed of the Moon's orbit (slower than the satellite)
  const rotationSpeed = 0.01; // Rotation own axis

  // Update the Moon's position to make it orbit around the Earth
  useFrame((state) => {
    if (moonRef.current && earthRef.current) {
      const theta = state.clock.getElapsedTime() * orbitSpeed; // Angle in radians for the orbit
      const earthPosition = earthRef.current.position; // Earth's current position
      
      // Calculate the Moon's position relative to Earth
      const x = earthPosition.x + Math.cos(theta) * orbitRadius;
      const z = earthPosition.z + Math.sin(theta) * orbitRadius;
      moonRef.current.position.set(x, earthPosition.y, z); // Orbiting in the xz-plane at Earth's y-level'

      // Make the Moon rotate on its own axis
      moonRef.current.rotation.y -= rotationSpeed;
    }
  });

  return (
    <group ref={moonRef} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.defaultMaterial.geometry} material={materials.Material__50} rotation={[-Math.PI / 2, 0, 0]} scale={0.1}/>
      </group>
    </group>
  )
}

useGLTF.preload('/moon.gltf')
