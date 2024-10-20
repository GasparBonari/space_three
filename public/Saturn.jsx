import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Saturn(props) {
  const { nodes, materials } = useGLTF('/saturn.gltf')

  // Clone the rings material and add an emissive property
  const ringsMaterial = materials.material.clone() // Assuming 'materials.material' is the rings material
  ringsMaterial.emissive = ringsMaterial.color.clone() // Use the original color for the emissive effect
  ringsMaterial.emissiveIntensity = 0.04 // Adjust the emissive intensity to make the rings glow

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[0, 0, 0]} rotation={[-1.571, -1.386, 0.001]} scale={1.8}>
          <mesh geometry={nodes.Object_5.geometry} material={ringsMaterial} position={[0.017, 0, 0.001]} rotation={[1.571, -0.002, -1.386]} scale={0.005} />
          <mesh geometry={nodes.Object_8.geometry} material={ringsMaterial} position={[0.017, 0, 0.001]} rotation={[1.571, -0.002, -1.386]} scale={0.005} />
          <mesh geometry={nodes.Object_11.geometry} material={ringsMaterial} position={[0.017, 0, 0.001]} rotation={[1.571, -0.002, -1.386]} scale={0.005} />
          <mesh geometry={nodes.Object_14.geometry} material={ringsMaterial} position={[0.017, 0, 0.001]} rotation={[1.571, -0.002, -1.386]} scale={0.005} />
          <mesh geometry={nodes.Object_16.geometry} material={ringsMaterial} position={[0.017, 0, 0.001]} rotation={[1.571, -0.002, -1.386]} scale={0.005} />
        </group>
        <group scale={1}>
          <mesh geometry={nodes.Object_20.geometry} material={materials.material_0} scale={0.01} />
          <mesh geometry={nodes.Object_23.geometry} material={materials.material_0} scale={0.01} />
          <mesh geometry={nodes.Object_25.geometry} material={materials.material_0} scale={0.01} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/saturn.gltf')