import { useRef, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import OrbitalLabel from '../UI/OrbitalLabel/OrbitalLabel';

const Phobos = forwardRef(function Phobos({
  marsRef,
  timeScale = 1,
  paused = false,
  showLabel = false,
  onSelect,
}, ref) {
  const { nodes, materials } = useGLTF('/models/phobos.gltf');
  const localRef = useRef();
  const phobosRef = ref ?? localRef;
  const timeRef = useRef(0);

  // Phobos orbit parameters
  const orbitRadius = 3.5;
  const orbitSpeed = 0.8;

  useFrame((_, delta) => {
    if (phobosRef.current && marsRef.current) {
      if (!paused) {
        timeRef.current += delta * timeScale;
      }
      const theta = timeRef.current * orbitSpeed;
      const marsPosition = marsRef.current.position;

      const x = marsPosition.x + Math.cos(theta) * orbitRadius;
      const z = marsPosition.z + Math.sin(theta) * orbitRadius;
      phobosRef.current.position.set(x, marsPosition.y, z);

      // Lock rotation to face Mars (tidal locking)
      if (!paused) {
        phobosRef.current.lookAt(marsPosition);
      }
    }
  });

  return (
    <group
      ref={phobosRef}
      dispose={null}
      onClick={(event) => {
        event.stopPropagation();
        onSelect?.(event);
      }}
    >
      <mesh geometry={nodes.Object_4.geometry} material={materials.phobos_tex_01} rotation={[Math.PI / 2, 0, 0]} scale={0.01}/>
      <OrbitalLabel text="Phobos" visible={showLabel} />
    </group>
  );
});

export default Phobos;

useGLTF.preload('/models/phobos.gltf');
