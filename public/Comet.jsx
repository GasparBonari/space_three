import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function Comet(props) {
  const cometRef = useRef();

  // Configuration for the comet's path and appearance
  const speed = 0.05;           // Speed of the comet movement
  const tailLength = 150;        // Number of particles in the tail
  const glowColor = '#66ccff';   // Color of the comet's tail

  // Randomize the initial start and target positions for the comet
  const startPos = useRef(
    new THREE.Vector3(
      (Math.random() - 0.5) * 300,  // Random X between -150 and 150
      Math.random() * 80 - 40,      // Random Y between -40 and 40
      (Math.random() - 0.5) * 300   // Random Z between -150 and 150
    )
  );
  const targetPos = useRef(new THREE.Vector3(
    (Math.random() - 0.5) * 300,
    Math.random() * 80 - 40,
    (Math.random() - 0.5) * 300
  ));

  // Set the initial comet position
  useEffect(() => {
    cometRef.current.position.copy(startPos.current);
  }, []);

  // Animate the comet's movement toward the target position
  useFrame((state, delta) => {
    if (cometRef.current) {
      // Move the comet towards the target
      cometRef.current.position.lerp(targetPos.current, speed);

      // Calculate the direction vector and set the rotation to face the target
      const direction = new THREE.Vector3().subVectors(targetPos.current, cometRef.current.position).normalize();
      cometRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction);

      // When the comet reaches the target, reset its position
      if (cometRef.current.position.distanceTo(targetPos.current) < 1) {
        startPos.current.set(
          (Math.random() - 0.5) * 300,
          Math.random() * 80 - 40,
          (Math.random() - 0.5) * 300
        );
        targetPos.current.set(
          (Math.random() - 0.5) * 300,
          Math.random() * 80 - 40,
          (Math.random() - 0.5) * 300
        );
        cometRef.current.position.copy(startPos.current);
      }
    }
  });

  return (
    <group ref={cometRef} {...props} dispose={null}>
      <Sparkles
        count={tailLength}           // Number of particles in the tail
        speed={10}                     // Particle movement speed
        size={80}                    // Particle size
        color={glowColor}             // Tail color
        position={[-3.5, 0.5, 0]}         // Tail starting position relative to the comet
        scale={[8, 0, 0]}             // Scale to make it look like a tail
        noise={20}                   // Spread of particles to make it look dynamic
        opacity={0.5}                 // Adjust opacity for a glowing effect
      />
    </group>
  );
}
