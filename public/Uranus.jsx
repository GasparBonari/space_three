import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

export default function Uranus(props) {
  const { nodes, materials } = useGLTF('/uranus.gltf')
  const uranusRef = useRef();

  useFrame((_, delta) => {
    if (uranusRef.current) {
      uranusRef.current.rotation.y -= 0.9 * delta;
    }
  });

  return (
    <group {...props} dispose={null}>
      <group ref={ uranusRef } rotation={[-1.703, 0, 0]} scale={0.01}>
        <mesh geometry={nodes.Esfera_Mat1_0.geometry} material={materials['Mat.1']} />
        <mesh geometry={nodes.Esfera_Mat1_0_1.geometry} material={materials['Mat.1']} />
        <mesh geometry={nodes.Esfera_Mat1_0_2.geometry} material={materials['Mat.1']} />
        <mesh geometry={nodes.Esfera_Mat1_0_3.geometry} material={materials['Mat.1']} />
        <mesh geometry={nodes.Esfera_Mat1_0_4.geometry} material={materials['Mat.1']} />
        <mesh geometry={nodes.Esfera_Mat1_0_5.geometry} material={materials['Mat.1']} />
        <mesh geometry={nodes.Esfera_Mat1_0_6.geometry} material={materials['Mat.1']} />
        <mesh geometry={nodes.Esfera_Mat1_0_7.geometry} material={materials['Mat.1']} />
      </group>
      <group rotation={[0.135, 0, 0]} scale={0.01}>
        <mesh geometry={nodes.Plano_Mat_0.geometry} material={materials.material} position={[-450, 50, 0]} rotation={[-0.27, 0, 0]} />
      </group>
    </group>
  )
}

useGLTF.preload('/uranus.gltf')
