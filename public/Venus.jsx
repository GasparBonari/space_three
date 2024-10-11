import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Venus(props) {
  const { nodes, materials } = useGLTF('/venus.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_2.geometry} scale={0.8} material={materials.moon} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/venus.gltf')
