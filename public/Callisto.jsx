import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Callisto(props) {
  const { nodes, materials } = useGLTF('/callisto.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes['Ganimede_Material_#25_0'].geometry} material={materials.Material_25} position={[-3.673, 0, 4.312]} rotation={[-Math.PI / 2, 0, 0]} scale={0.1}/>
    </group>
  )
}

useGLTF.preload('/callisto.gltf')
