import { useRef, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import OrbitalLabel from '../UI/OrbitalLabel/OrbitalLabel';

const Tethys = forwardRef(function Tethys({
  saturnRef,
  timeScale = 1,
  paused = false,
  showLabel = false,
  onSelect,
}, ref) {
  const { nodes, materials } = useGLTF('/models/Tethys.glb');
  const localRef = useRef();
  const tethysRef = ref ?? localRef;
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
    <group
      ref={tethysRef}
      dispose={null}
      onClick={(event) => {
        event.stopPropagation();
        onSelect?.(event);
      }}
    >
      <group scale={0.001}>
        <mesh geometry={nodes.cylindrically_mapped_sphere.geometry} material={materials['Default OBJ.001']} />
      </group>
      <OrbitalLabel text="Tethys" visible={showLabel} />
    </group>
  );
});

export default Tethys;

useGLTF.preload('/models/Tethys.glb');
