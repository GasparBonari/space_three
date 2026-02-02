import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import OrbitalLabel from '../UI/OrbitalLabel/OrbitalLabel';

export default function Titan({
  saturnRef,
  timeScale = 1,
  paused = false,
  showLabel = false,
}) {
  const { nodes, materials } = useGLTF('/models/titan.gltf');
  const titanRef = useRef();
  const timeRef = useRef(0);

  // Titan orbit parameters
  const orbitRadius = 14; // Distance from Saturn
  const orbitSpeed = 0.12; // Speed of orbit
  const rotationSpeed = 0.01; // Own axis rotation

  useFrame((_, delta) => {
    if (titanRef.current && saturnRef.current) {
      if (!paused) {
        timeRef.current += delta * timeScale;
      }
      const theta = timeRef.current * orbitSpeed;
      const saturnPosition = saturnRef.current.position;
      const x = saturnPosition.x + Math.cos(theta) * orbitRadius;
      const z = saturnPosition.z + Math.sin(theta) * orbitRadius;
      titanRef.current.position.set(x, saturnPosition.y, z);
      if (!paused) {
        titanRef.current.rotation.y -= rotationSpeed * delta * timeScale;
      }
    }
  });

  return (
    <group ref={titanRef} dispose={null}>
      <group scale={0.004}>
        <mesh geometry={nodes.Atmosphere_Atmosphere_0.geometry} material={materials.Atmosphere} />
        <mesh geometry={nodes.Clouds_Clouds_0.geometry} material={materials.Clouds} />
        <mesh geometry={nodes.Titan_Titan_0.geometry} material={materials.Titan} />
      </group>
      <OrbitalLabel text="Titan" visible={showLabel} />
    </group>
  );
}

useGLTF.preload('/models/titan.gltf');
