import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Ganymede(props) {
  const { nodes, materials } = useGLTF('/ganymede.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes['Ganimede_Material_#25_0'].geometry} material={materials.Material_25} position={[-3.673, 0, 4.312]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01}/>
    </group>
  )
}

useGLTF.preload('/ganymede.gltf')
