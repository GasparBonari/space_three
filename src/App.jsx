import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import './App.css';

import Earth from './components/Planets/Earth';
import Asteroid from './components/Asteroids/Asteroid';
import Mars from './components/Planets/Mars';
import Venus from './components/Planets/Venus';
import Jupiter from './components/Planets/Jupiter';
import Mercury from './components/Planets/Mercury';
import Sun from './components/Planets/Sun';
import Saturn from './components/Planets/Saturn';
import Uranus from './components/Planets/Uranus';
import ColorStars from './components/Stars/ColorStars';
import Neptune from './components/Planets/Neptune';

import EarthModels from './components/PlanetModels/EarthModels';
import MarsModels from './components/PlanetModels/MarsModels';
import JupiterModels from './components/PlanetModels/JupiterModels';
import SaturnModels from './components/PlanetModels/SaturnModels';
import InfoPanel from './components/UI/InfoPanel';

// Component to control the camera and follow the orbiting planet
function CameraController({ planets, planetIndex, isZoomed }) {
  useFrame(({ camera }) => {
    const planetRef = planets[planetIndex].ref;
    if (planetRef && planetRef.current) {
      const planetPosition = planetRef.current.position;
      
      // Get the custom zoom distance for each planet
      const zoomDistance = isZoomed ? planets[planetIndex].zoomDistance : 10;  // Adjust zoom distance for each planet
      const offsetX = isZoomed ? 1 : 5;  // Offset can also be customized if needed

      camera.position.lerp(
        {
          x: planetPosition.x + offsetX,  // Offset from planet
          y: planetPosition.y + offsetX,
          z: planetPosition.z + zoomDistance,  // Adjust zoom distance based on planet size
        },
        0.03 // Smooth camera transition
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
  const [planetIndex, setPlanetIndex] = useState(2); // Track which planet camera should follow
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const numAsteroids = 50;

  const planetRefs = useRef([]);
  if (planetRefs.current.length === 0) {
    for (let i = 0; i < 8; i++) {
      planetRefs.current.push(React.createRef());
    }
  }

  const planets = [
    { name: 'Mercury', radius: 15, speed: 0.3, initialAngle: 0, ref: planetRefs.current[0], zoomDistance: 2 },
    { name: 'Venus', radius: 30, speed: 0.2, initialAngle: Math.PI / 2, ref: planetRefs.current[1], zoomDistance: 3 },
    { name: 'Earth', radius: 40, speed: 0.1, initialAngle: Math.PI, ref: planetRefs.current[2], zoomDistance: 2 },
    { name: 'Mars', radius: 55, speed: 0.08, initialAngle: Math.PI * 1.5, ref: planetRefs.current[3], zoomDistance: 2 },
    { name: 'Jupiter', radius: 80, speed: 0.05, initialAngle: 0, ref: planetRefs.current[4], zoomDistance: 3 },
    { name: 'Saturn', radius: 100, speed: 0.08, initialAngle: Math.PI * (3 / 4), ref: planetRefs.current[5], zoomDistance: 5 },
    { name: 'Uranus', radius: 120, speed: 0.08, initialAngle: Math.PI * (5 / 4), ref: planetRefs.current[6], zoomDistance: 8 },
    { name: 'Neptune', radius: 150, speed: 0.04, initialAngle: Math.PI * (5 / 4), ref: planetRefs.current[7], zoomDistance: 10 },
  ];

  // Scroll handler to switch between planets
  const scrollHandler = useCallback((event) => {
    setIsZoomed(false);

    if (event.deltaY > 0 && planetIndex < planets.length - 1) {
      const next = planetIndex + 1;
      setPlanetIndex(next);
      setSelectedPlanet((prev) => (prev !== null ? next : prev));
    } else if (event.deltaY < 0 && planetIndex > 0) {
      const next = planetIndex - 1;
      setPlanetIndex(next);
      setSelectedPlanet((prev) => (prev !== null ? next : prev));
    }
  }, [planetIndex, planets.length]);

  useEffect(() => {
    window.addEventListener('wheel', scrollHandler);
    return () => window.removeEventListener('wheel', scrollHandler);
  }, [scrollHandler]);

  // Handle planet click
  const handlePlanetClick = (index) => {
    if (planetIndex === index) {
      setIsZoomed((prevZoom) => !prevZoom);  // Toggle zoom when clicking the same planet
      setSelectedPlanet((prev) => (prev === index ? null : index));
    } else {
      setPlanetIndex(index);  // Switch to the clicked planet
      setIsZoomed(true);      // Zoom in on the new planet
      setSelectedPlanet(index);
    }
  };

  const closeInfoPanel = () => {
    setSelectedPlanet(null);
    setIsZoomed(false);
  };

  // Create an array to store asteroid objects
  const asteroids = useMemo(() => {
    return Array.from({ length: numAsteroids }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 30 + 25; // Between the planets, not tied to specific planets
      return {
        id: i,
        position: [
          distance * Math.cos(angle),
          Math.random() * 20 - 10,
          distance * Math.sin(angle)
        ],
        speed: Math.random() * 0.1 + 0.005,
        planetPosition: [0, 0, 0], // Solar system center, not a specific planet
        direction: [
          Math.random() * 2 - 1, // Random x direction
          Math.random() * 2 - 1, // Random y direction
          Math.random() * 2 - 1  // Random z direction
        ]
      };
    });
  }, [numAsteroids]);

  return (
    <>
      <Canvas camera={{ position: [0, 0, 40] }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={2000} decay={2} distance={4000} />
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
              onClick={(e) => {
                e.stopPropagation();
                handlePlanetClick(index);
              }}
            >
              {index === 0 && <Mercury />}
              {index === 1 && <Venus />}
              {index === 2 && <Earth />}
              {index === 3 && <Mars />}
              {index === 4 && <Jupiter />}
              {index === 5 && <Saturn />}
              {index === 6 && <Uranus />}
              {index === 7 && <Neptune />}
            </Planet>
          ))}

          {/* Models for Earth */}
          <EarthModels earthRef={planets[2].ref} />

          {/* Models for Mars */}
          <MarsModels marsRef={planets[3].ref} />

          {/* Models for Jupiter */}
          <JupiterModels jupiterRef={planets[4].ref} />

          {/* Models for Saturn */}
          <SaturnModels saturnRef={planets[5].ref} />
          
          {/* Asteroids */}
          {asteroids.map((asteroid) => (
            <Asteroid 
              key={asteroid.id} 
              position={asteroid.position} 
              speed={asteroid.speed}
              direction={asteroid.direction}
              planetPosition={asteroid.planetPosition} 
            />
          ))}
        </Suspense>

        <Stars radius={200} depth={50} count={5000} factor={4} saturation={0} />
        <ColorStars />

        {/* Camera controller to follow planets */}
        <CameraController planets={planets} planetIndex={planetIndex} isZoomed={isZoomed} />
      </Canvas>

      {/* Info HUD overlay */}
      {selectedPlanet !== null && (
        <InfoPanel
          planet={{ ...planets[selectedPlanet], index: selectedPlanet }}
          onClose={closeInfoPanel}
        />
      )}
    </>
  );
}