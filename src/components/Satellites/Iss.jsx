import React, { useMemo, useRef, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import OrbitalLabel from '../UI/OrbitalLabel/OrbitalLabel';

const ISS = forwardRef(function ISS({
  earthRef,
  scale,
  timeScale = 1,
  paused = false,
  showLabel = false,
  onSelect,
}, ref) {
  const { scene } = useGLTF('/models/iss.glb');
  const issScene = useMemo(() => scene.clone(true), [scene]);
  const localRef = useRef();
  const issGroupRef = ref ?? localRef;
  const issModelRef = useRef();
  const timeRef = useRef(0);

  // Define orbit parameters for the ISS
  const orbitRadius = 1.3; // Radius of ISS orbit around Earth (close in LEO)
  const orbitSpeed = 0.2; // Speed of ISS orbit
  const inclination = 1; // Tilt of the orbit (ISS orbits Earth with an inclination)

  useFrame((_, delta) => {
    if (issGroupRef.current && earthRef.current) {
      if (!paused) {
        timeRef.current += delta * timeScale;
      }
      const theta = timeRef.current * orbitSpeed; // Angle in radians for the orbit
      const earthPosition = earthRef.current.position; // Earth's current position

      // Calculate the ISS position relative to Earth with inclination
      const x = earthPosition.x + Math.cos(theta) * orbitRadius;
      const z = earthPosition.z + Math.sin(theta) * orbitRadius * Math.cos(inclination); // Slight tilt
      const y = earthPosition.y + Math.sin(theta) * orbitRadius * Math.sin(inclination); // Vertical movement based on inclination

      issGroupRef.current.position.set(x, y, z); // Set the position of the ISS

      // Rotate the ISS to face along its orbit (optional for realism)
      if (!paused && issModelRef.current) {
        issModelRef.current.lookAt(earthPosition);
      }
    }
  });

  return (
    <group
      ref={issGroupRef}
      dispose={null}
      onClick={(event) => {
        event.stopPropagation();
        onSelect?.(event);
      }}
    >
      <primitive ref={issModelRef} object={issScene} scale={scale ?? [0.004, 0.004, 0.004]} />
      <OrbitalLabel text="ISS" visible={showLabel} position={[0, 0.25, 0]} distanceFactor={6} />
    </group>
  );
});

export default ISS;

useGLTF.preload('/models/iss.glb');
