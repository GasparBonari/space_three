import React from 'react'
import { Suspense } from 'react'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import Earth from '../public/Earth'
import Asteroid from '../public/Asteroid'
import Satellite from '../public/Satellite'

function App() {
  // Define the number of asteroids
  const numAsteroids = 10;

  // Create an array to store asteroid objects
  const asteroids = [];

  // Initialize asteroid objects
  for (let i = 0; i < numAsteroids; i++) {
    asteroids.push({
      id: i,
      position: [-20, Math.random() * 20 - 10, Math.random() * 20 - 10], // Random positions
      speed: Math.random() * 0.1 + 0.005, // Random speed
    });
  }

  return (
    <>
      <Canvas>
        <ambientLight intensity={0.2} />
        <directionalLight intensity={5} position={[-20, 20, 0]} />
        <OrbitControls />
        <Suspense fallback={null}>
          <Earth position={[0, 0, 0]} />
          {/* Render each asteroid */}
          {asteroids.map((asteroid) => (
            <Asteroid key={asteroid.id} position={asteroid.position} speed={asteroid.speed} />
          ))}
          <Satellite position={[1, 0, 0]} />
        </Suspense>
        <Stars
          radius={100} // Radius of the spherical distribution of stars
          depth={50} // Depth of the star field
          count={5000} // Number of stars
          factor={4} // Star size factor
          saturation={0} // Saturation of the stars
        />
      </Canvas>
    </>
  )
}

export default App
