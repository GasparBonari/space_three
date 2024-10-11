import React from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Mercury(props) {
  const group = React.useRef()
  const { nodes, materials, animations } = useGLTF('/mercury.gltf')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="MercuryFBX" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Mercury" rotation={[-1.833, 0, 0]} scale={0.01}>
                  <mesh name="Mercury_01_-_Default_0" geometry={nodes['Mercury_01_-_Default_0'].geometry} material={materials['01_-_Default']} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/mercury.gltf')
