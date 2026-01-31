import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

export default function Mercury({ timeScale = 1, paused = false, ...props }) {
  const { nodes, materials } = useGLTF('/models/mercury.gltf')
  const mercuryRef = useRef();

  useFrame((_, delta) => {
    if (mercuryRef.current && !paused) {
      mercuryRef.current.rotation.y += 0.10 * delta * timeScale;
    }
  });

  return (
    <group ref={mercuryRef} {...props} dispose={null}>
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

useGLTF.preload('/models/mercury.gltf')
