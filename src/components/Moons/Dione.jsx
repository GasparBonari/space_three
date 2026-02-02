import React, { useRef, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import OrbitalLabel from '../UI/OrbitalLabel/OrbitalLabel';

const Dione = forwardRef(function Dione({
  saturnRef,
  timeScale = 1,
  paused = false,
  showLabel = false,
  onSelect,
}, ref) {
  const { nodes, materials } = useGLTF('/models/Dione.glb');
  const localRef = useRef();
  const dioneRef = ref ?? localRef;
  const timeRef = useRef(0);

  // Orbit parameters
  const orbitRadius = 13;
  const orbitSpeed = 0.09;
  const rotationSpeed = 0.01;

  useFrame((_, delta) => {
    if (dioneRef.current && saturnRef.current) {
      if (!paused) {
        timeRef.current += delta * timeScale;
      }
      const theta = timeRef.current * orbitSpeed;
      const saturnPosition = saturnRef.current.position;
      const x = saturnPosition.x + Math.cos(theta) * orbitRadius;
      const z = saturnPosition.z + Math.sin(theta) * orbitRadius;
      dioneRef.current.position.set(x, saturnPosition.y, z);
      if (!paused) {
        dioneRef.current.rotation.y -= rotationSpeed * delta * timeScale;
      }
    }
  });

  return (
    <group
      ref={dioneRef}
      dispose={null}
      onClick={(event) => {
        event.stopPropagation();
        onSelect?.(event);
      }}
    >
      <group scale={0.001}>
        <mesh geometry={nodes.cylindrically_mapped_sphere.geometry} material={materials['Default OBJ.001']} />
      </group>
      <OrbitalLabel text="Dione" visible={showLabel} />
    </group>
  );
});

export default Dione;

useGLTF.preload('/models/Dione.glb');
