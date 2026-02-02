import React, { useRef, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import OrbitalLabel from '../UI/OrbitalLabel/OrbitalLabel';

const Callisto = forwardRef(function Callisto({
  jupiterRef,
  timeScale = 1,
  paused = false,
  showLabel = false,
  onSelect,
}, ref) {
  const { nodes, materials } = useGLTF('/models/callisto.gltf')
  const localRef = useRef();
  const callistoRef = ref ?? localRef;
  const timeRef = useRef(0);
  
  const orbitRadius = 13; // Radius of the orbit
  const orbitSpeed = 0.2; // Speed of the orbit
  const rotationSpeed = 0.01; // Rotation own axis

  useFrame((_, delta) => {
    if (callistoRef.current && jupiterRef.current) {
      if (!paused) {
        timeRef.current += delta * timeScale;
      }
      const theta = timeRef.current * orbitSpeed;
      const earthPosition = jupiterRef.current.position;
      
      const x = earthPosition.x + Math.cos(theta) * orbitRadius;
      const z = earthPosition.z + Math.sin(theta) * orbitRadius;
      callistoRef.current.position.set(x, earthPosition.y, z); 

      if (!paused) {
        callistoRef.current.rotation.y -= rotationSpeed * delta * timeScale;
      }
    }
  });
  return (
    <group
      ref={callistoRef}
      dispose={null}
      onClick={(event) => {
        event.stopPropagation();
        onSelect?.(event);
      }}
    >
      <mesh geometry={nodes['Ganimede_Material_#25_0'].geometry} material={materials.Material_25} scale={0.01}/>
      <OrbitalLabel text="Callisto" visible={showLabel} />
    </group>
  )
});

export default Callisto;

useGLTF.preload('/models/callisto.gltf')
