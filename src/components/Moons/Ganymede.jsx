import React, { useRef, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import OrbitalLabel from '../UI/OrbitalLabel/OrbitalLabel';

const Ganymede = forwardRef(function Ganymede({
  jupiterRef,
  timeScale = 1,
  paused = false,
  showLabel = false,
  onSelect,
}, ref) {
  const { nodes, materials } = useGLTF('/models/ganymede.gltf')
  const localRef = useRef();
  const ganymedeRef = ref ?? localRef;
  const timeRef = useRef(0);
  
  const orbitRadius = 9; // Radius of the orbit
  const orbitSpeed = 0.3; // Speed of the orbit
  const rotationSpeed = 0.01; // Rotation own axis

  useFrame((_, delta) => {
    if (ganymedeRef.current && jupiterRef.current) {
      if (!paused) {
        timeRef.current += delta * timeScale;
      }
      const theta = timeRef.current * orbitSpeed;
      const earthPosition = jupiterRef.current.position;
      
      const x = earthPosition.x + Math.cos(theta) * orbitRadius;
      const z = earthPosition.z + Math.sin(theta) * orbitRadius;
      ganymedeRef.current.position.set(x, earthPosition.y, z); 

      if (!paused) {
        ganymedeRef.current.rotation.y -= rotationSpeed * delta * timeScale;
      }
    }
  });
  return (
    <group
      ref={ganymedeRef}
      dispose={null}
      onClick={(event) => {
        event.stopPropagation();
        onSelect?.(event);
      }}
    >
      <mesh geometry={nodes['Ganimede_Material_#25_0'].geometry} material={materials.Material_25} rotation={[-Math.PI / 2, 0, 0]} scale={0.01}/>
      <OrbitalLabel text="Ganymede" visible={showLabel} />
    </group>
  )
});

export default Ganymede;

useGLTF.preload('/models/ganymede.gltf')
