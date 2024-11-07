import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Neptune(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/neptune.gltf')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (actions && animations[0]?.name) {
      const action = actions[animations[0].name];
      action.play();
      action.timeScale = 0.1;
    }
  }, [actions, animations]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="943e82ae1e91464bb6057ce325b1063bfbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Planeta" rotation={[-Math.PI / 2, 0, 0]} scale={0.5}>
                  <mesh name="Planeta_Planeta_0" geometry={nodes.Planeta_Planeta_0.geometry} material={materials.Planeta} />
                </group>
                <group name="Atmosfera" rotation={[-Math.PI / 2, 0, 0]} scale={0.52}>
                  <mesh name="Atmosfera_Atmosfera_0" geometry={nodes.Atmosfera_Atmosfera_0.geometry} material={materials.Atmosfera} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/neptune.gltf')
