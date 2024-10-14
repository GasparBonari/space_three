import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Sun(props) {
  const group = React.useRef()
  const { nodes, materials, animations } = useGLTF('/sun.gltf')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    // Trigger the animation named "Take 001"
    if (actions['Take 001']) {
      actions['Take 001'].play();  // Start the animation

      // Slow down the animation by reducing the timeScale
      actions['Take 001'].timeScale = 0.5; // Adjust this value to slow down the animation
    }

    return () => {
      if (actions['Take 001']) {
        actions['Take 001'].stop(); // Optionally stop animation when component unmounts
      }
    };
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.022}>
          <group name="23c71f95b90948a0bb8746260230a45efbx" rotation={[-Math.PI, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="GeoSphere002" scale={0.964}>
                  <mesh name="0" geometry={nodes['0'].geometry} material={materials['02_-_Default']} morphTargetDictionary={nodes['0'].morphTargetDictionary} morphTargetInfluences={nodes['0'].morphTargetInfluences} />
                </group>
                <group name="GeoSphere001">
                  <mesh name="GeoSphere001_01_-_Default_0" geometry={nodes['GeoSphere001_01_-_Default_0'].geometry} material={materials['01_-_Default']} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/sun.gltf')
