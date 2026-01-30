import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function AsteroidField({ asteroids }) {
  const { nodes, materials } = useGLTF('/models/asteroid.gltf');
  const meshRef = useRef();
  const temp = useMemo(() => new THREE.Object3D(), []);

  const asteroidRadius = 0.591 * 0.1;
  const earthRadius = 1.9739451558252037;
  const boundary = 200;
  const instanceScale = 0.591 * 0.1;

  const positions = useMemo(
    () => asteroids.map((asteroid) => new THREE.Vector3(...asteroid.position)),
    [asteroids]
  );
  const basePositions = useMemo(
    () => asteroids.map((asteroid) => new THREE.Vector3(...asteroid.position)),
    [asteroids]
  );
  const directions = useMemo(
    () => asteroids.map((asteroid) => new THREE.Vector3(...asteroid.direction).normalize()),
    [asteroids]
  );
  const planetPositions = useMemo(
    () => asteroids.map((asteroid) => new THREE.Vector3(...asteroid.planetPosition)),
    [asteroids]
  );
  const speeds = useMemo(() => asteroids.map((asteroid) => asteroid.speed), [asteroids]);

  const rotationAxes = useMemo(
    () =>
      asteroids.map(
        () => new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize()
      ),
    [asteroids]
  );
  const rotationSpeeds = useMemo(
    () => asteroids.map(() => Math.random() * 0.05),
    [asteroids]
  );
  const rotationQuats = useMemo(
    () => asteroids.map(() => new THREE.Quaternion()),
    [asteroids]
  );
  const deltaQuats = useMemo(
    () =>
      rotationAxes.map((axis, index) =>
        new THREE.Quaternion().setFromAxisAngle(axis, rotationSpeeds[index])
      ),
    [rotationAxes, rotationSpeeds]
  );

  const resetAroundPlanet = (index) => {
    const planetPos = planetPositions[index];
    const radius = Math.random() * 20 + 5;
    const angle = Math.random() * Math.PI * 2;
    const offsetY = Math.random() * 5 - 2.5;

    positions[index].set(
      planetPos.x + radius * Math.cos(angle),
      planetPos.y + offsetY,
      planetPos.z + radius * Math.sin(angle)
    );
  };

  useEffect(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < positions.length; i += 1) {
      temp.position.copy(positions[i]);
      temp.quaternion.copy(rotationQuats[i]);
      temp.scale.setScalar(instanceScale);
      temp.updateMatrix();
      meshRef.current.setMatrixAt(i, temp.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [instanceScale, positions, rotationQuats, temp]);

  useFrame(() => {
    if (!meshRef.current) return;
    const radiusSum = asteroidRadius + earthRadius;

    for (let i = 0; i < positions.length; i += 1) {
      positions[i].addScaledVector(directions[i], speeds[i]);
      rotationQuats[i].multiply(deltaQuats[i]);

      const planetPos = planetPositions[i];
      const dx = positions[i].x - planetPos.x;
      const dy = positions[i].y - planetPos.y;
      const dz = positions[i].z - planetPos.z;
      if (dx * dx + dy * dy + dz * dz < radiusSum * radiusSum) {
        resetAroundPlanet(i);
      }

      if (positions[i].length() > boundary) {
        positions[i].copy(basePositions[i]);
      }

      temp.position.copy(positions[i]);
      temp.quaternion.copy(rotationQuats[i]);
      temp.scale.setScalar(instanceScale);
      temp.updateMatrix();
      meshRef.current.setMatrixAt(i, temp.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[
        nodes.Asteroid_Mob_01_Asteroid_01_0.geometry,
        materials.Asteroid_01,
        asteroids.length,
      ]}
    />
  );
}

useGLTF.preload('/models/asteroid.gltf');
