import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Mars(props) {
  const { nodes, materials } = useGLTF('/mars.gltf')
  return (
    <group {...props} dispose={null}>
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

useGLTF.preload('/mars.gltf')
