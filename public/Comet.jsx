import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useGLTF, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function Comet(props) {
  const { nodes, materials } = useGLTF('/comet.gltf');
  const cometRef = useRef();

  // Adjust comet movement speed and tail length
  const speed = 0.2;
  const tailLength = 100;
  const glowColor = '#66ccff';

  // Apply emissive color to all materials
  useEffect(() => {
    Object.values(materials).forEach((material) => {
      material.emissive = new THREE.Color(glowColor);
      material.emissiveIntensity = 1; // Adjust the intensity for a stronger glow
    });
  }, [materials]);

  useFrame((state, delta) => {
    if (cometRef.current) {
      // Move the comet from left to right
      cometRef.current.position.x += speed * delta;

      // Reset the comet's position after it exits the scene on the right
      if (cometRef.current.position.x > 50) {
        cometRef.current.position.x = -50;
      }
    }
  });

  return (
    <group ref={cometRef} {...props} dispose={null}>
      <group position={[-0.091, 0.444, 0.066]} rotation={[2.255, -0.027, -1.625]}>
        {/* Apply glow color to each part of the comet */}
        <mesh geometry={nodes.Object_2.geometry} material={materials.material_0} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.material_0} />
        <mesh geometry={nodes.Object_4.geometry} material={materials.material_0} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.material_0} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.material_0} />
        <mesh geometry={nodes.Object_7.geometry} material={materials.material_0} />
        <mesh geometry={nodes.Object_8.geometry} material={materials.material_0} />
        <mesh geometry={nodes.Object_9.geometry} material={materials.material_0} />
        <mesh geometry={nodes.Object_10.geometry} material={materials.material_0} />
        <mesh geometry={nodes.Object_11.geometry} material={materials.material_0} />
        <mesh geometry={nodes.Object_12.geometry} material={materials.material_0} />
        <mesh geometry={nodes.Object_13.geometry} material={materials.material_0} />
        <mesh geometry={nodes.Object_14.geometry} material={materials.material_0} />
        <mesh geometry={nodes.Object_15.geometry} material={materials.material_0} />
        <mesh geometry={nodes.Object_16.geometry} material={materials.material_0} />
        <mesh geometry={nodes.Object_17.geometry} material={materials.material_0} />
      </group>

      {/* Comet Tail (Sparkles) */}
      <Sparkles
        count={tailLength}           // Number of particles in the tail
        speed={1}                     // Particle movement speed
        size={150}                    // Particle size
        color={glowColor}             // Tail color
        position={[-3.8, 0, 0]}         // Tail starting position relative to the comet
        scale={[8, 0, 0]}             // Scale to make it look like a tail
        noise={0.5}                   // Spread of particles to make it look dynamic
        opacity={0.7}                 // Adjust opacity for a glowing effect
      />
    </group>
  );
}

useGLTF.preload('/comet.gltf');
