import React from 'react'
import { useGLTF } from '@react-three/drei'


export default function Saturn(props) {
  const { nodes, materials } = useGLTF('/saturn.gltf')

  // Clone the rings material and add an emissive property
  const ringsMaterial = materials.rings.clone()
  ringsMaterial.emissive = ringsMaterial.color.clone() // Use the original color
  ringsMaterial.emissiveIntensity = 0.04 // Increase the intensity to make it glow more

  return (
    <group {...props} dispose={null}>
      <group scale={0.0015}>
        <mesh
          geometry={nodes.saturn_Planet_0.geometry}
          material={materials.Planet}
          rotation={[-0.779, 0.194, -0.033]}
          scale={100}
        />
        <mesh
          geometry={nodes.ring_rings_0.geometry}
          material={ringsMaterial} // Use the modified rings material
          rotation={[2.362, -0.198, 0.029]}
          scale={[-3383.158, 3383.158, 3383.158]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/saturn.gltf')