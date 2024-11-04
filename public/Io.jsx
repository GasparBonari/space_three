import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Io(props) {
  const { nodes, materials } = useGLTF('/io.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_2.geometry} material={materials.material} rotation={[-Math.PI / 2, 0, 0]} scale={0.02}/>
    </group>
  )
}

useGLTF.preload('/io.gltf')
