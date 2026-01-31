import { useRef, useMemo, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

export default function Saturn({ timeScale = 1, paused = false, ...props }) {
  const { nodes, materials } = useGLTF('/models/saturn.gltf')
  const saturnRef = useRef();

  useFrame((_, delta) => {
    if (saturnRef.current && !paused) {
      saturnRef.current.rotation.y += 0.10 * delta * timeScale;
    }
  });

  // Clone the rings material once and reuse it
  const ringsMaterial = useMemo(() => {
    const clone = materials.material.clone()
    clone.emissive = clone.color.clone()
    clone.emissiveIntensity = 0.04
    return clone
  }, [materials])

  useEffect(() => {
    return () => {
      ringsMaterial.dispose()
    }
  }, [ringsMaterial])

  return (
    <group ref={ saturnRef } {...props} dispose={null}>
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

useGLTF.preload('/models/saturn.gltf')
