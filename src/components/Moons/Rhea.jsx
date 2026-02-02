import { useRef, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import OrbitalLabel from '../UI/OrbitalLabel/OrbitalLabel';

const Rhea = forwardRef(function Rhea({
  saturnRef,
  timeScale = 1,
  paused = false,
  showLabel = false,
  onSelect,
}, ref) {
  const { nodes, materials } = useGLTF('/models/Rhea.glb');
  const localRef = useRef();
  const rheaRef = ref ?? localRef;
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
    <group
      ref={rheaRef}
      dispose={null}
      onClick={(event) => {
        event.stopPropagation();
        onSelect?.(event);
      }}
    >
      <group scale={0.002}>
        <mesh geometry={nodes.cylindrically_mapped_sphere.geometry} material={materials['Default OBJ.001']} />
      </group>
      <OrbitalLabel text="Rhea" visible={showLabel} />
    </group>
  );
});

export default Rhea;

useGLTF.preload('/models/Rhea.glb');
