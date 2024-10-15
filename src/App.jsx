import React, { useState, useEffect, useRef } from 'react';
import { Suspense } from 'react';
import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import Earth from '../public/Earth';
import Asteroid from '../public/Asteroid';
import Satellite from '../public/Satellite';
import Mars from '../public/Mars';
import Venus from '../public/Venus';
import Jupiter from '../public/Jupiter';
import Mercury from '../public/Mercury';
import Sun from '../public/Sun';

// Component to control the camera and follow the orbiting planet
function CameraController({ planets, planetIndex }) {
  useFrame(({ camera }) => {
    const planetRef = planets[planetIndex].ref;
    if (planetRef && planetRef.current) {
      const planetPosition = planetRef.current.position;
      camera.position.lerp(
        {
          x: planetPosition.x + 5,  // Offset from planet
          y: planetPosition.y + 5,
          z: planetPosition.z + 10,
        },
        0.05 // Smooth camera transition
      );
      camera.lookAt(planetPosition); // Keep looking at the planet
    }
  });

  return null;
}

// Function to make planets orbit around the sun using forwardRef to allow ref access
const Planet = React.forwardRef(({ radius, speed, initialAngle, children, ...props }, ref) => {
  useFrame(({ clock }) => {
    const angle = initialAngle + clock.getElapsedTime() * speed;
    ref.current.position.x = radius * Math.cos(angle);
    ref.current.position.z = radius * Math.sin(angle);
  });

  return <group ref={ref} {...props}>{children}</group>;
});

export default function App() {
  const [planetIndex, setPlanetIndex] = useState(0); // Track which planet camera should follow
  const numAsteroids = 50;

  // Create planet objects with a ref for each
  const planets = [
    { name: 'Mercury', radius: 10, speed: 0.3, initialAngle: 0, ref: useRef() },
    { name: 'Venus', radius: 15, speed: 0.2, initialAngle: Math.PI / 2, ref: useRef() },
    { name: 'Earth', radius: 20, speed: 0.1, initialAngle: Math.PI, ref: useRef() },
    { name: 'Mars', radius: 25, speed: 0.08, initialAngle: Math.PI * 1.5, ref: useRef() },
    { name: 'Jupiter', radius: 35, speed: 0.05, initialAngle: 0, ref: useRef() },
  ];

  // Scroll handler to switch between planets
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

  // Create an array to store asteroid objects
  const asteroids = Array.from({ length: numAsteroids }, (_, i) => {
    const randomPlanetIndex = Math.floor(Math.random() * planets.length);
    return {
      id: i,
      position: [-20, Math.random() * 20 - 10, Math.random() * 20 - 10],
      speed: Math.random() * 0.1 + 0.005,
      planetPosition: planets[randomPlanetIndex].ref.current?.position || [0, 0, 0],
    };
  });

  return (
    <>
      <Canvas camera={{ position: [0, 0, 40] }}>
        <ambientLight intensity={0.2} />
        {/* <directionalLight intensity={5} position={[-20, 20, 0]} /> */}
        <pointLight position={[0, 0, 0]} intensity={500} decay={2} distance={2000} />
        <Suspense fallback={null}>
          {/* Sun */}
          <Sun position={[0, 0, 0]} />

          {/* Planets orbiting around the sun */}
          {planets.map((planet, index) => (
            <Planet 
              key={planet.name} 
              ref={planet.ref} 
              radius={planet.radius} 
              speed={planet.speed} 
              initialAngle={planet.initialAngle}
            >
              {index === 0 && <Mercury />}
              {index === 1 && <Venus />}
              {index === 2 && <Earth />}
              {index === 3 && <Mars />}
              {index === 4 && <Jupiter />}
            </Planet>
          ))}

          {/* Asteroids */}
          {asteroids.map((asteroid) => (
            <Asteroid key={asteroid.id} position={asteroid.position} speed={asteroid.speed} planetPosition={asteroid.planetPosition} />
          ))}

          <Satellite position={[1, 0, 0]} />
        </Suspense>

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} />

        {/* Camera controller to follow planets */}
        <CameraController planets={planets} planetIndex={planetIndex} />
      </Canvas>
    </>
  );
}