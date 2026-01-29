import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function Satellite({ earthRef }) {
  const { nodes, materials } = useGLTF('/models/satellite.gltf')
  const satelliteRef = useRef();

  // Define orbit parameters
  const orbitRadius = 1.5; // Radius of the orbit
  const orbitSpeed = 0.4; // Speed of orbit

  // Update the satellite's position to make it orbit around the Earth
  useFrame((state) => {
    if (satelliteRef.current && earthRef.current) {
      const theta = state.clock.getElapsedTime() * orbitSpeed; // Angle in radians for the orbit
      const earthPosition = earthRef.current.position; // Earth's current position
      
      // Calculate satellite's position relative to Earth
      const x = earthPosition.x + Math.cos(theta) * orbitRadius;
      const z = earthPosition.z + Math.sin(theta) * orbitRadius;
      satelliteRef.current.position.set(x, earthPosition.y, z); // Orbiting in the xz-plane at Earth's y-level
    }
  });

  return (
    <group ref={satelliteRef} dispose={null}>
      <group rotation={[-1.755, 0.06, 2.589]} scale={[0.02, 0.02, 0.02]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0, 0, 0.186]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={[0.875, 0.883, 0.875]}>
            <mesh geometry={nodes.Object_4.geometry} material={materials.Satellite} />
            <mesh geometry={nodes.Object_5.geometry} material={materials.Gold} />
            <mesh geometry={nodes.Object_6.geometry} material={materials.Satellite_2} />
          </group>
          <group rotation={[0, 0, 0.137]} scale={0.075}>
            <mesh geometry={nodes.Object_18.geometry} material={materials.Satellite} />
            <mesh geometry={nodes.Object_19.geometry} material={materials.Gold} />
          </group>
          <group position={[0, 0, 2.294]} rotation={[0, 0, -0.402]} scale={0.075}>
            <mesh geometry={nodes.Object_21.geometry} material={materials.Satellite} />
            <mesh geometry={nodes.Object_22.geometry} material={materials.Gold} />
          </group>
          <group position={[0, 0, 3.53]} rotation={[0, 0, 0.995]} scale={0.06}>
            <mesh geometry={nodes.Object_28.geometry} material={materials.Satellite} />
            <mesh geometry={nodes.Object_29.geometry} material={materials.Gold} />
          </group>
          <group position={[0, 0, 2.575]}>
            <mesh geometry={nodes.Object_55.geometry} material={materials.Satellite} />
            <mesh geometry={nodes.Object_56.geometry} material={materials.Solar_Panel} />
          </group>
          <mesh geometry={nodes.Object_8.geometry} material={materials.Satellite} position={[0, 0, 1.395]} />
          <mesh geometry={nodes.Object_10.geometry} material={materials.Satellite} position={[0, 0, 1.781]} />
          <mesh geometry={nodes.Object_12.geometry} material={materials.Satellite} position={[0, 0, 0.519]} />
          <mesh geometry={nodes.Object_14.geometry} material={materials.Satellite} position={[0, 0, 1.584]} />
          <mesh geometry={nodes.Object_16.geometry} material={materials.Gold} position={[0, -0.018, 1.821]} rotation={[0, 0, 0.021]} />
          <mesh geometry={nodes.Object_24.geometry} material={materials.Packs} position={[0, 0, 2.699]} rotation={[0, 0, -0.481]} />
          <mesh geometry={nodes.Object_26.geometry} material={materials.Packs} position={[0, 0, 2.127]} />
          <mesh geometry={nodes.Object_31.geometry} material={materials.Satellite} position={[0, 0, 2.831]} rotation={[0, 0, -0.811]} />
          <mesh geometry={nodes.Object_33.geometry} material={materials.Packs} position={[0, 0, 3.04]} rotation={[0, 0, 1.475]} />
          <mesh geometry={nodes.Object_35.geometry} material={materials.Packs} position={[0, 0, 3.277]} rotation={[0, 0, 1.475]} />
          <mesh geometry={nodes.Object_37.geometry} material={materials.Gold} />
          <mesh geometry={nodes.Object_39.geometry} material={materials.Gold} position={[0, 0, 1.332]} />
          <mesh geometry={nodes.Object_41.geometry} material={materials.Gold} position={[0, 0, 2.78]} rotation={[0, 0, 1.397]} scale={0.803} />
          <mesh geometry={nodes.Object_43.geometry} material={materials.Satellite} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={1.465} />
          <mesh geometry={nodes.Object_45.geometry} material={materials.Satellite} rotation={[0, Math.PI / 2, 0]} />
          <mesh geometry={nodes.Object_47.geometry} material={materials.Satellite} position={[0, 0, -0.508]} rotation={[Math.PI / 2, Math.PI / 4, -Math.PI / 2]} />
          <mesh geometry={nodes.Object_49.geometry} material={materials.Satellite} position={[0, 0, -1.248]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} />
          <mesh geometry={nodes.Object_51.geometry} material={materials.Satellite} position={[0, 0, -1.237]} rotation={[Math.PI / 2, Math.PI / 4, -Math.PI]} />
          <mesh geometry={nodes.Object_53.geometry} material={materials.Satellite} position={[0, 0, -1.237]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/satellite.gltf')
