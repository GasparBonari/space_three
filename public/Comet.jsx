import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Comet() {
  const cometRef = useRef();
  const [startPosition, setStartPosition] = useState(new THREE.Vector3());
  const [endPosition, setEndPosition] = useState(new THREE.Vector3());
  const [progress, setProgress] = useState(0);

  const setRandomPositions = () => {
    setStartPosition(new THREE.Vector3(
      (Math.random() - 0.5) * 100,
      0,
      (Math.random() - 0.5) * 100
    ));
    setEndPosition(new THREE.Vector3(
      (Math.random() - 0.5) * 100,
      0,
      (Math.random() - 0.5) * 100
    ));
    setProgress(0);
  };

  useEffect(() => {
    setRandomPositions();
  }, []);

  useFrame((_, delta) => {
    if (cometRef.current) {
      setProgress((prev) => prev + delta * 0.1);

      if (progress >= 1) {
        setRandomPositions();
      } else {
        cometRef.current.position.lerpVectors(startPosition, endPosition, progress);
      }
    }
  });

  return (
    <group ref={cometRef}>
      {/* Glowing sphere to make the comet visible */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="blue" emissive="blue" emissiveIntensity={1.5} />
      </mesh>
      {/* Light source to create a comet trail effect */}
      <pointLight
        color="blue"
        intensity={2}
        distance={20}
        decay={2}
      />
    </group>
  );
}
