import { useMemo } from 'react';
import * as THREE from 'three';

export default function ColorStars({ count = 3000, minDistance = 100, maxDistance = 400 }) {
  const { positions, colors, sizes } = useMemo(() => {
    const starColors = [0xfff1e8, 0xffc300, 0x8ab4f8, 0x00ff00, 0xff69b4, 0xff6347, 0x87cefa];
    const starSizes = [0.001, 0.004, 0.006, 0.008, 0.006, 0.006];

    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      let x, y, z, distance;
      do {
        x = (Math.random() - 0.5) * maxDistance * 2;
        y = (Math.random() - 0.5) * maxDistance * 2;
        z = (Math.random() - 0.5) * maxDistance * 2;
        distance = Math.sqrt(x * x + y * y + z * z);
      } while (distance < minDistance || distance > maxDistance);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const color = new THREE.Color(starColors[Math.floor(Math.random() * starColors.length)]);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      sizes[i] = starSizes[Math.floor(Math.random() * starSizes.length)];
    }

    return { positions, colors, sizes };
  }, [count, maxDistance, minDistance]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={sizes.length} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors sizeAttenuation color="#ffffff" transparent opacity={0.8} />
    </points>
  );
}
