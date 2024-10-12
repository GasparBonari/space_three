import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function Asteroid(props) {
    const { nodes, materials } = useGLTF('/asteroid.gltf');
    const asteroidRef = useRef();
    const speed = props.speed;
    const planetPosition = props.planetPosition;

    // Random axis of rotation and rotation speed for the asteroid
    const randomAxis = new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(); // Random unit vector for rotation axis
    const rotationSpeed = Math.random() * 0.05; // Random rotation speed

    function getInitialPosition() {
        const radius = Math.random() * 20 + 5; // Random distance from the planet
        const angle = Math.random() * Math.PI * 2; // Random angle around the planet
        return new THREE.Vector3(
            planetPosition[0] + radius * Math.cos(angle),
            planetPosition[1] + (Math.random() * 5 - 2.5), // Adding vertical variation
            planetPosition[2] + radius * Math.sin(angle)
        );
    }

    if (!asteroidRef.current) {
        asteroidRef.current = { position: getInitialPosition() };
    }

    // Bounding spheres for Earth and the asteroid
    const earthBoundingSphere = {
        center: [0, 0, 0],
        radius: 1.9739451558252037, // Approximate radius of planet models
    };

    const asteroidBoundingSphere = {
        center: props.position,
        radius: 0.591 * 0.1, // Approximate radius of asteroid model
    };

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
            // Move the asteroid along the defined direction
            asteroidRef.current.position.add(new THREE.Vector3(1, 0, 0).multiplyScalar(speed));

            // Apply rotation around the random axis at the specified speed
            asteroidRef.current.rotateOnWorldAxis(randomAxis, rotationSpeed);

            // Check for collision with Earth
            if (checkCollision(earthBoundingSphere, asteroidBoundingSphere)) {
                // Handle collision (e.g., reset position)
                asteroidRef.current.position.set(-10, -5 + Math.random() * 10, -5 + Math.random() * 10);
            }

            // Reset asteroid position if it moves outside the specified boundary
            const boundary = 25; // Adjust this boundary as needed
            if (asteroidRef.current.position.distanceTo(new THREE.Vector3(...planetPosition)) > boundary) {
                asteroidRef.current.position.copy(getInitialPosition());
            }
        }
    });

    return (
        <group {...props} ref={asteroidRef} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={0.591}>
                <group rotation={[Math.PI / 2, 0, 0]}>
                  <mesh geometry={nodes.Asteroid_Mob_01_Asteroid_01_0.geometry} material={materials.Asteroid_01} rotation={[-Math.PI / 2, 0, 0]} scale={0.1} />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload('/asteroid.gltf');
