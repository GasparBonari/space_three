import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Jupiter(props) {
  const { nodes, materials } = useGLTF('/jupiter.gltf')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.0001}>
          <mesh geometry={nodes.Sphere_Material_0.geometry} material={materials.Material} rotation={[-Math.PI / 2, 0, 0]} scale={101} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/jupiter.gltf')
