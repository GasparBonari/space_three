import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import OrbitalLabel from '../UI/OrbitalLabel/OrbitalLabel';

export default function Moon({
  earthRef,
  timeScale = 1,
  paused = false,
  showLabel = false,
}) {
  const { nodes, materials } = useGLTF('/models/moon.gltf');
  const moonRef = useRef();
  const timeRef = useRef(0);

  // Define orbit parameters for the Moon
  const orbitRadius = 4; // Radius of the Moon's orbit
  const orbitSpeed = 0.3; // Speed of the Moon's orbit (slower than the satellite)
  const rotationSpeed = 0.01; // Rotation own axis

  // Update the Moon's position to make it orbit around the Earth
  useFrame((_, delta) => {
    if (moonRef.current && earthRef.current) {
      if (!paused) {
        timeRef.current += delta * timeScale;
      }
      const theta = timeRef.current * orbitSpeed; // Angle in radians for the orbit
      const earthPosition = earthRef.current.position; // Earth's current position
      
      // Calculate the Moon's position relative to Earth
      const x = earthPosition.x + Math.cos(theta) * orbitRadius;
      const z = earthPosition.z + Math.sin(theta) * orbitRadius;
      moonRef.current.position.set(x, earthPosition.y, z); // Orbiting in the xz-plane at Earth's y-level'

      // Make the Moon rotate on its own axis
      if (!paused) {
        moonRef.current.rotation.y -= rotationSpeed * delta * timeScale;
      }
    }
  });

  return (
    <group ref={moonRef} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.defaultMaterial.geometry} material={materials.Material__50} rotation={[-Math.PI / 2, 0, 0]} scale={0.2}/>
      </group>
      <OrbitalLabel text="Moon" visible={showLabel} position={[0, 0.45, 0]} />
    </group>
  )
}

useGLTF.preload('/models/moon.gltf')
