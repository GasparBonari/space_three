import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function Asteroid(props) {
    const { nodes, materials } = useGLTF('/models/asteroid.gltf');
    const asteroidRef = useRef();
    const speed = props.speed;
    const planetPosition = props.planetPosition;
    const direction = useMemo(() => new THREE.Vector3(...props.direction).normalize(), [props.direction]);

    // Random axis of rotation and rotation speed for the asteroid
    const randomAxis = useMemo(
      () => new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(),
      []
    ); // Random unit vector for rotation axis
    const rotationSpeed = useMemo(() => Math.random() * 0.05, []); // Random rotation speed

    function getInitialPosition() {
        const radius = Math.random() * 20 + 5; // Random distance from the planet
        const angle = Math.random() * Math.PI * 2; // Random angle around the planet
        const planetPos = new THREE.Vector3(...planetPosition);
        const offsetY = (Math.random() * 5 - 2.5); // Adding vertical variation
      
        return new THREE.Vector3(
          planetPos.x + radius * Math.cos(angle),
          planetPos.y + offsetY,
          planetPos.z + radius * Math.sin(angle)
        );
    }

    useEffect(() => {
        if (asteroidRef.current) {
          asteroidRef.current.position.set(...props.position);
        }
    }, [props.position]);

    const asteroidRadius = 0.591 * 0.1;
    const earthRadius = 1.9739451558252037;

    // Update the asteroid's position and rotation
    useFrame(() => {
        if (asteroidRef.current) {
          // Move the asteroid in the random direction
          asteroidRef.current.position.addScaledVector(direction, speed);
    
          // Apply rotation around the random axis
          asteroidRef.current.rotateOnWorldAxis(randomAxis, rotationSpeed);
    
          // Check for collision with the planet (Earth in this case)
          const dx = asteroidRef.current.position.x - planetPosition[0];
          const dy = asteroidRef.current.position.y - planetPosition[1];
          const dz = asteroidRef.current.position.z - planetPosition[2];
          const radiusSum = asteroidRadius + earthRadius;
          if (dx * dx + dy * dy + dz * dz < radiusSum * radiusSum) {
            // Reset asteroid position on collision
            asteroidRef.current.position.copy(getInitialPosition());
          }
    
          // Reset position if the asteroid moves too far from its starting point
          const boundary = 200; // Distance boundary - increased for larger solar system
          if (asteroidRef.current.position.length() > boundary) {
            asteroidRef.current.position.set(...props.position);
          }
        }
    });

    return (
        <group ref={asteroidRef} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={0.591}>
                <group rotation={[Math.PI / 2, 0, 0]}>
                  <mesh geometry={nodes.Asteroid_Mob_01_Asteroid_01_0.geometry} material={materials.Asteroid_01} scale={0.1} />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload('/models/asteroid.gltf');
