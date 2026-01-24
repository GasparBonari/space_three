import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function ISS({ earthRef, scale }) {
  const { scene } = useGLTF('./models/iss.glb');
  const issRef = useRef();

  // Define orbit parameters for the ISS
  const orbitRadius = 1.3; // Radius of ISS orbit around Earth (close in LEO)
  const orbitSpeed = 0.2; // Speed of ISS orbit
  const inclination = 1; // Tilt of the orbit (ISS orbits Earth with an inclination)

  useFrame((state) => {
    if (issRef.current && earthRef.current) {
      const theta = state.clock.getElapsedTime() * orbitSpeed; // Angle in radians for the orbit
      const earthPosition = earthRef.current.position; // Earth's current position

      // Calculate the ISS position relative to Earth with inclination
      const x = earthPosition.x + Math.cos(theta) * orbitRadius;
      const z = earthPosition.z + Math.sin(theta) * orbitRadius * Math.cos(inclination); // Slight tilt
      const y = earthPosition.y + Math.sin(theta) * orbitRadius * Math.sin(inclination); // Vertical movement based on inclination

      issRef.current.position.set(x, y, z); // Set the position of the ISS

      // Rotate the ISS to face along its orbit (optional for realism)
      issRef.current.lookAt(earthPosition);
    }
  });

  return <primitive ref={issRef} object={scene} scale={[0.004, 0.004, 0.004]}/>;
}

useGLTF.preload('./iss.glb');
