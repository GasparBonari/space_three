import React, { useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

export default function ColorStars() {
    const pointsRef = useRef();
    const { size } = useThree();
  
    // Create an array of colors and sizes for the stars
    const starColors = [0xfff1e8, 0xffc300, 0x8ab4f8, 0x00ff00, 0xff69b4, 0xff6347, 0x87cefa];
    const starSizes = [0.001, 0.004, 0.006, 0.008, 0.006, 0.006];
  
    // Define the minimum and maximum radius to ensure stars are outside the planetary area
    const minDistance = 100; // Minimum distance from center to avoid planet area
    const maxDistance = 400; // Maximum distance for stars to appear
  
    // Generate random positions for the stars beyond the planetary range
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      let x, y, z, distance;
      do {
        x = (Math.random() - 0.5) * maxDistance * 2;
        y = (Math.random() - 0.5) * maxDistance * 2;
        z = (Math.random() - 0.5) * maxDistance * 2;
        distance = Math.sqrt(x * x + y * y + z * z);
      } while (distance < minDistance || distance > maxDistance); // Keep only stars outside the planetary region
  
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
  
    // Create buffer attributes for colors and sizes
    const colors = new Float32Array(5000 * 3);
    const sizes = new Float32Array(5000);
    for (let i = 0; i < 5000; i++) {
      const color = new THREE.Color(starColors[Math.floor(Math.random() * starColors.length)]);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      sizes[i] = starSizes[Math.floor(Math.random() * starSizes.length)];
    }
  
    return (
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
          <bufferAttribute attach="attributes-size" count={sizes.length} array={sizes} itemSize={1} />
        </bufferGeometry>
        <pointsMaterial size={0.1} vertexColors sizeAttenuation color="#ffffff" transparent opacity={0.8} />
      </points>
    );
  }
