import React, { useState, useEffect } from 'react';
import { Suspense } from 'react'
import './App.css'
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei'
import Earth from '../public/Earth'
import Asteroid from '../public/Asteroid'
import Satellite from '../public/Satellite'
import Mars from '../public/Mars'
import Venus from '../public/Venus'
import Jupiter from '../public/Jupiter'
import Mercury from '../public/Mercury'

function CameraController({ planets }) {
  const [planetIndex, setPlanetIndex] = useState(0);

  const scrollHandler = (event) => {
    if (event.deltaY > 0 && planetIndex < planets.length - 1) {
      setPlanetIndex((prevIndex) => prevIndex + 1);
    } else if (event.deltaY < 0 && planetIndex > 0) {
      setPlanetIndex((prevIndex) => prevIndex - 1);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', scrollHandler);
    return () => window.removeEventListener('wheel', scrollHandler);
  }, [planetIndex]);

  useFrame(({ camera }) => {
    const targetPosition = planets[planetIndex].cameraPosition || planets[planetIndex].position;
    camera.position.lerp(
      {
        x: targetPosition[0],
        y: targetPosition[1],
        z: targetPosition[2],
      },
      0.05 // Speed of transition
    );
  });

  return null;
}

export default function App() {
  const numAsteroids = 50;

  const planets = [
    { position: [80, 0, -10], cameraPosition: [80, 0, -8], name: 'Mercury' },
    { position: [50, -0.7, -10], cameraPosition: [50, -0.7, -7.5], name: 'Venus' },
    { position: [0, 0, 0], cameraPosition: [0, 0, 0.5], name: 'Earth' },
    { position: [-50, 20, 10], cameraPosition: [-50, 20, 13], name: 'Mars' },
    { position: [70, 50, 5], cameraPosition: [70, 50, 8], name: 'Jupiter' },
  ];

  // Create an array to store asteroid objects
  const asteroids = Array.from({ length: numAsteroids }, (_, i) => {
    const randomPlanetIndex = Math.floor(Math.random() * planets.length); // Random planet index
    return {
      id: i,
      position: [-20, Math.random() * 20 - 10, Math.random() * 20 - 10], // Initial random position
      speed: Math.random() * 0.1 + 0.005,
      planetPosition: planets[randomPlanetIndex].position, // Assign random planet's position
    };
  });

  return (
    <>
      <Canvas camera={{ position: [0, 0, 15] }}>
        <ambientLight intensity={0.2} />
        <directionalLight intensity={5} position={[-20, 20, 0]} />
        {/* <OrbitControls /> */}
        <Suspense fallback={null}>
          <Mercury position={planets[0].position} />
          <Venus position={planets[1].position} />
          <Earth position={planets[2].position} />
          <Mars position={planets[3].position} />
          <Jupiter position={planets[4].position} />
          {/* Render each asteroid */}
          {asteroids.map((asteroid) => (
            <Asteroid key={asteroid.id} position={asteroid.position} speed={asteroid.speed} planetPosition={asteroid.planetPosition}/>
          ))}
          <Satellite position={[1, 0, 0]} />
        </Suspense>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} />
        <CameraController planets={planets} />
      </Canvas>
    </>
  )
}