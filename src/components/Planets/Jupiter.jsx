import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

export default function Jupiter(props) {
  const { nodes, materials } = useGLTF('/models/jupiter.gltf')
  const jupiterRef = useRef();

  useFrame((_, delta) => {
    if (jupiterRef.current) {
      jupiterRef.current.rotation.y += 0.10 * delta;
    }
  });

  return (
    <group ref={ jupiterRef } {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.0001}>
          <mesh geometry={nodes.Sphere_Material_0.geometry} material={materials.Material} rotation={[-Math.PI / 2, 0, 0]} scale={101} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/jupiter.gltf')
