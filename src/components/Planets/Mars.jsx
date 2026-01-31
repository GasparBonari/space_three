import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

export default function Mars({ timeScale = 1, paused = false, ...props }) {
  const { nodes, materials } = useGLTF('/models/mars.gltf')
  const marsRef = useRef();

  useFrame((_, delta) => {
    if (marsRef.current && !paused) {
      marsRef.current.rotation.y += 0.10 * delta * timeScale;
    }
  });

  return (
    <group ref={marsRef} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[-Math.PI, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]} scale={0.5}>
            <mesh geometry={nodes.Mars_LOD0_MarsLOD1_0.geometry} material={materials.MarsLOD1} position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/mars.gltf')
