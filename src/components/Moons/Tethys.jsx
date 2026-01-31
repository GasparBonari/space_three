import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function Tethys({ saturnRef, timeScale = 1, paused = false }) {
  const { nodes, materials } = useGLTF('/models/Tethys.glb');
  const tethysRef = useRef();
  const timeRef = useRef(0);

  // Orbit parameters
  const orbitRadius = 11;
  const orbitSpeed = 0.11;
  const rotationSpeed = 0.01;

  useFrame((_, delta) => {
    if (tethysRef.current && saturnRef.current) {
      if (!paused) {
        timeRef.current += delta * timeScale;
      }
      const theta = timeRef.current * orbitSpeed;
      const saturnPosition = saturnRef.current.position;
      const x = saturnPosition.x + Math.cos(theta) * orbitRadius;
      const z = saturnPosition.z + Math.sin(theta) * orbitRadius;
      tethysRef.current.position.set(x, saturnPosition.y, z);
      if (!paused) {
        tethysRef.current.rotation.y -= rotationSpeed * delta * timeScale;
      }
    }
  });

  return (
    <group ref={tethysRef} scale={0.001} dispose={null}>
      <mesh geometry={nodes.cylindrically_mapped_sphere.geometry} material={materials['Default OBJ.001']} />
    </group>
  );
}

useGLTF.preload('/models/Tethys.glb');
