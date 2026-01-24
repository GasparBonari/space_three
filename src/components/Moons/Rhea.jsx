import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function Rhea({ saturnRef }) {
  const { nodes, materials } = useGLTF('/models/Rhea.glb');
  const rheaRef = useRef();

  // Orbit parameters
  const orbitRadius = 10;
  const orbitSpeed = 0.07;
  const rotationSpeed = 0.01;

  useFrame((state) => {
    if (rheaRef.current && saturnRef.current) {
      const theta = state.clock.getElapsedTime() * orbitSpeed;
      const saturnPosition = saturnRef.current.position;
      const x = saturnPosition.x + Math.cos(theta) * orbitRadius;
      const z = saturnPosition.z + Math.sin(theta) * orbitRadius;
      rheaRef.current.position.set(x, saturnPosition.y, z);
      rheaRef.current.rotation.y -= rotationSpeed;
    }
  });

  return (
    <group ref={rheaRef} scale={0.002} dispose={null}>
      <mesh geometry={nodes.cylindrically_mapped_sphere.geometry} material={materials['Default OBJ.001']} />
    </group>
  );
}

useGLTF.preload('/Rhea.glb');
