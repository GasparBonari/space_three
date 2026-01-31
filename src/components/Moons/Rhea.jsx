import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function Rhea({ saturnRef, timeScale = 1, paused = false }) {
  const { nodes, materials } = useGLTF('/models/Rhea.glb');
  const rheaRef = useRef();
  const timeRef = useRef(0);

  // Orbit parameters
  const orbitRadius = 16;
  const orbitSpeed = 0.07;
  const rotationSpeed = 0.01;

  useFrame((_, delta) => {
    if (rheaRef.current && saturnRef.current) {
      if (!paused) {
        timeRef.current += delta * timeScale;
      }
      const theta = timeRef.current * orbitSpeed;
      const saturnPosition = saturnRef.current.position;
      const x = saturnPosition.x + Math.cos(theta) * orbitRadius;
      const z = saturnPosition.z + Math.sin(theta) * orbitRadius;
      rheaRef.current.position.set(x, saturnPosition.y, z);
      if (!paused) {
        rheaRef.current.rotation.y -= rotationSpeed * delta * timeScale;
      }
    }
  });

  return (
    <group ref={rheaRef} scale={0.002} dispose={null}>
      <mesh geometry={nodes.cylindrically_mapped_sphere.geometry} material={materials['Default OBJ.001']} />
    </group>
  );
}

useGLTF.preload('/models/Rhea.glb');
