import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

export default function Earth(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/earth.gltf')
  const { actions } = useAnimations(animations, group)

  // Define a function to update rotation in each frame
  useFrame((state, delta) => {
    // Update the rotation of the Earth group to create rotation effect
    group.current.rotation.y += 0.10 * delta; // Adjust rotation speed as needed
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.002}>
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
