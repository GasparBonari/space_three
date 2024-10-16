import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

export default function Earth(props) {
  const { nodes, materials } = useGLTF('/earth.gltf')
  const earthRef = useRef()

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.10 * delta;
    }
  });

  return (
    <group ref={earthRef} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.01}>
          <group name="fc09fa6deb6c45f687e724438fed81adfbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Earth" rotation={[-Math.PI / 2, 0, 0]} scale={57.393}>
                  <mesh name="Earth_Earth_0" geometry={nodes.Earth_Earth_0.geometry} material={materials.Earth} />
                  <mesh name="Earth_Earth_0_1" geometry={nodes.Earth_Earth_0_1.geometry} material={materials.Earth} />
                  <mesh name="Earth_Earth_0_2" geometry={nodes.Earth_Earth_0_2.geometry} material={materials.Earth} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/earth.gltf')
