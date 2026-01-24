import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function Titan({ saturnRef }) {
  const { nodes, materials } = useGLTF('/models/titan.gltf');
  const titanRef = useRef();

  // Titan orbit parameters
  const orbitRadius = 7; // Distance from Saturn
  const orbitSpeed = 0.12; // Speed of orbit
  const rotationSpeed = 0.01; // Own axis rotation

  useFrame((state) => {
    if (titanRef.current && saturnRef.current) {
      const theta = state.clock.getElapsedTime() * orbitSpeed;
      const saturnPosition = saturnRef.current.position;
      const x = saturnPosition.x + Math.cos(theta) * orbitRadius;
      const z = saturnPosition.z + Math.sin(theta) * orbitRadius;
      titanRef.current.position.set(x, saturnPosition.y, z);
      titanRef.current.rotation.y -= rotationSpeed;
    }
  });

  return (
    <group ref={titanRef} dispose={null}>
      <group scale={0.004}>
        <mesh geometry={nodes.Atmosphere_Atmosphere_0.geometry} material={materials.Atmosphere} />
        <mesh geometry={nodes.Clouds_Clouds_0.geometry} material={materials.Clouds} />
        <mesh geometry={nodes.Titan_Titan_0.geometry} material={materials.Titan} />
      </group>
    </group>
  );
}

useGLTF.preload('/titan.gltf');
