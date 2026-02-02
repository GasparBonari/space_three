import React, { useRef, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import OrbitalLabel from '../UI/OrbitalLabel/OrbitalLabel';

const Mimas = forwardRef(function Mimas({
  saturnRef,
  timeScale = 1,
  paused = false,
  showLabel = false,
  onSelect,
}, ref) {
  const { nodes, materials } = useGLTF('/models/Mimas.glb');
  const localRef = useRef();
  const mimasRef = ref ?? localRef;
  const timeRef = useRef(0);

  // Orbit parameters
  const orbitRadius = 10;
  const orbitSpeed = 0.15;
  const rotationSpeed = 0.01;

  useFrame((_, delta) => {
    if (mimasRef.current && saturnRef.current) {
      if (!paused) {
        timeRef.current += delta * timeScale;
      }
      const theta = timeRef.current * orbitSpeed;
      const saturnPosition = saturnRef.current.position;
      const x = saturnPosition.x + Math.cos(theta) * orbitRadius;
      const z = saturnPosition.z + Math.sin(theta) * orbitRadius;
      mimasRef.current.position.set(x, saturnPosition.y, z);
      if (!paused) {
        mimasRef.current.rotation.y -= rotationSpeed * delta * timeScale;
      }
    }
  });

  return (
    <group
      ref={mimasRef}
      dispose={null}
      onClick={(event) => {
        event.stopPropagation();
        onSelect?.(event);
      }}
    >
      <group scale={0.002}>
        <mesh geometry={nodes.Mimas.geometry} material={materials.Mimas_mat} />
      </group>
      <OrbitalLabel text="Mimas" visible={showLabel} />
    </group>
  );
});

export default Mimas;

useGLTF.preload('/models/Mimas.glb');
