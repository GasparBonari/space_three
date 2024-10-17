import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function Asteroid(props) {
    const { nodes, materials } = useGLTF('/asteroid.gltf');
    const asteroidRef = useRef();
    const speed = props.speed;
    const planetPosition = props.planetPosition;
    const direction = new THREE.Vector3(...props.direction).normalize();

    // Random axis of rotation and rotation speed for the asteroid
    const randomAxis = new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(); // Random unit vector for rotation axis
    const rotationSpeed = Math.random() * 0.05; // Random rotation speed

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
          asteroidRef.current.position.copy(getInitialPosition());
        }
    }, []);

    // Check collision between two bounding spheres
    function checkCollision(sphere1, sphere2) {
        const distanceSquared = Math.pow(sphere1.center[0] - sphere2.center[0], 2)
            + Math.pow(sphere1.center[1] - sphere2.center[1], 2)
            + Math.pow(sphere1.center[2] - sphere2.center[2], 2);
        const radiusSumSquared = Math.pow(sphere1.radius + sphere2.radius, 2);
        return distanceSquared < radiusSumSquared;
    }

    // Update the asteroid's position and rotation
    useFrame(() => {
        if (asteroidRef.current) {
          // Move the asteroid in the random direction
          asteroidRef.current.position.add(direction.clone().multiplyScalar(speed));
    
          // Apply rotation around the random axis
          asteroidRef.current.rotateOnWorldAxis(randomAxis, rotationSpeed);
    
          // Check for collision with the planet (Earth in this case)
          const asteroidBoundingSphere = {
            center: [asteroidRef.current.position.x, asteroidRef.current.position.y, asteroidRef.current.position.z],
            radius: 0.591 * 0.1, // Approximate radius of asteroid model
          };
    
          const earthBoundingSphere = {
            center: planetPosition,
            radius: 1.9739451558252037, // Approximate radius of planet model
          };
    
          if (checkCollision(asteroidBoundingSphere, earthBoundingSphere)) {
            // Reset asteroid position on collision
            asteroidRef.current.position.copy(getInitialPosition());
          }
    
          // Reset position if the asteroid moves too far from its starting point
          const boundary = 70; // Distance boundary
          if (asteroidRef.current.position.length() > boundary) {
            asteroidRef.current.position.copy(getInitialPosition());
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

useGLTF.preload('/asteroid.gltf');
