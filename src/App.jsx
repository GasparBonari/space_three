import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Preload, AdaptiveDpr, Html } from '@react-three/drei';
import * as THREE from 'three';
import './App.css';

import Earth from './components/Planets/Earth';
import AsteroidField from './components/Asteroids/AsteroidField';
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
import InfoPanel from './components/UI/InfoPanel/InfoPanel';
import IntroPanel from './components/UI/IntroPanel/IntroPanel';
import ControlPanel from './components/UI/ControlPanel/ControlPanel';
import MiniMap from './components/UI/MiniMap/MiniMap';
import HudMenu from './components/UI/HudMenu/HudMenu';

// Component to control the camera and follow the orbiting planet
function CameraController({ targets, targetIndex, isZoomed, mode, distanceMultiplier = 1 }) {
  const helpers = useMemo(() => ({
    desired: new THREE.Vector3(),
    direction: new THREE.Vector3(),
    worldPosition: new THREE.Vector3(),
    box: new THREE.Box3(),
    sphere: new THREE.Sphere(),
    targetMatrix: new THREE.Matrix4(),
    targetQuaternion: new THREE.Quaternion(),
    origin: new THREE.Vector3(0, 0, 0),
  }), []);
  const minDistances = useRef(new Map());
  const presets = useMemo(() => ({
    overview: new THREE.Vector3(0, 70, 140),
    top: new THREE.Vector3(0, 180, 0.01),
    side: new THREE.Vector3(180, 30, 0),
  }), []);

  useFrame(({ camera }) => {
    if (mode && mode !== 'follow') {
      const preset = presets[mode] || presets.overview;
      helpers.desired.copy(preset).multiplyScalar(distanceMultiplier);
      camera.position.lerp(helpers.desired, 0.05);
      helpers.targetMatrix.lookAt(camera.position, helpers.origin, camera.up);
      helpers.targetQuaternion.setFromRotationMatrix(helpers.targetMatrix);
      camera.quaternion.slerp(helpers.targetQuaternion, 0.08);
      return;
    }

    const target = targets[targetIndex];
    const targetRef = target?.ref;
    if (targetRef && targetRef.current) {
      targetRef.current.getWorldPosition(helpers.worldPosition);
      const targetPosition = helpers.worldPosition;

      // Get the custom zoom distance for each planet
      const zoomDistance = (isZoomed ? target.zoomDistance : 7) * distanceMultiplier;
      const offsetX = (isZoomed ? 1 : 3) * distanceMultiplier;
      const padding = (isZoomed ? 0.6 : 1.2) * distanceMultiplier;

      helpers.desired.set(
        targetPosition.x + offsetX,
        targetPosition.y + offsetX,
        targetPosition.z + zoomDistance,
      );

      const targetKey = target.id ?? target.name;
      let baseDistance = minDistances.current.get(targetKey);
      if (baseDistance == null) {
        helpers.box.setFromObject(targetRef.current);
        helpers.box.getBoundingSphere(helpers.sphere);
        if (Number.isFinite(helpers.sphere.radius) && helpers.sphere.radius > 0) {
          baseDistance = helpers.sphere.radius;
          minDistances.current.set(targetKey, baseDistance);
        }
      }

      const minDistance = (baseDistance ?? 0) + padding;
      helpers.direction.subVectors(helpers.desired, targetPosition);
      if (helpers.direction.length() < minDistance) {
        helpers.direction.setLength(minDistance);
        helpers.desired.copy(targetPosition).add(helpers.direction);
      }

      camera.position.lerp(helpers.desired, 0.03);
      helpers.direction.subVectors(camera.position, targetPosition);
      if (helpers.direction.length() < minDistance) {
        helpers.direction.setLength(minDistance);
        camera.position.copy(targetPosition).add(helpers.direction);
      }
      helpers.targetMatrix.lookAt(camera.position, targetPosition, camera.up);
      helpers.targetQuaternion.setFromRotationMatrix(helpers.targetMatrix);
      camera.quaternion.slerp(helpers.targetQuaternion, 0.08);
    }
  });

  return null;
}

function SceneStyleController({ wireframe }) {
  const { scene } = useThree();

  useEffect(() => {
    scene.traverse((child) => {
      if (!child.isMesh || !child.material) return;
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => {
        if (!material || !('wireframe' in material)) return;
        material.wireframe = wireframe;
        material.needsUpdate = true;
      });
    });
  }, [scene, wireframe, scene.children.length]);

  return null;
}

function CameraReporter({ planets, cameraDataRef }) {
  const planetPositions = useMemo(
    () => planets.map(() => new THREE.Vector3()),
    [planets]
  );

  useEffect(() => {
    cameraDataRef.current.planets = planetPositions;
  }, [cameraDataRef, planetPositions]);

  useFrame(({ camera }) => {
    cameraDataRef.current.position.copy(camera.position);
    camera.getWorldDirection(cameraDataRef.current.direction);
    planets.forEach((planet, index) => {
      if (planet.ref?.current) {
        planet.ref.current.getWorldPosition(planetPositions[index]);
      }
    });
  });

  return null;
}

function PlanetLabel({ name, visible }) {
  if (!visible) return null;
  return (
    <Html center distanceFactor={12} position={[0, 1.4, 0]}>
      <div className="planet-label">{name}</div>
    </Html>
  );
}

// Function to make planets orbit around the sun using forwardRef to allow ref access
const Planet = React.forwardRef(
  ({ radius, speed, initialAngle, timeScale = 1, paused = false, children, ...props }, ref) => {
    const timeRef = useRef(0);

    useFrame((_, delta) => {
      if (!ref?.current) return;
      if (!paused) {
        timeRef.current += delta * timeScale;
      }
      const angle = initialAngle + timeRef.current * speed;
      ref.current.position.x = radius * Math.cos(angle);
      ref.current.position.z = radius * Math.sin(angle);
    });

    return (
      <group ref={ref} {...props}>
        {children}
      </group>
    );
  }
);

export default function App() {
  const [planetIndex, setPlanetIndex] = useState(2); // Track which planet camera should follow
  const [focusGroup, setFocusGroup] = useState('planets');
  const [focusIndex, setFocusIndex] = useState(2);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [timeScale, setTimeScale] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [cameraPreset, setCameraPreset] = useState('follow');
  const [cameraDistance, setCameraDistance] = useState(1);
  const [showWireframe, setShowWireframe] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const [showHudMenu, setShowHudMenu] = useState(false);
  const [showControlPanel, setShowControlPanel] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(false);
  const numAsteroids = 50;
  const starCount = 3000;
  const backgroundStarCount = 2000;

  const cameraDataRef = useRef({
    position: new THREE.Vector3(),
    direction: new THREE.Vector3(),
    planets: [],
  });

  const planetRefs = useRef([]);
  const targetRefs = useRef({});
  if (planetRefs.current.length === 0) {
    for (let i = 0; i < 8; i++) {
      planetRefs.current.push(React.createRef());
    }
  }

  const getTargetRef = useCallback((id) => {
    if (!targetRefs.current[id]) {
      targetRefs.current[id] = React.createRef();
    }
    return targetRefs.current[id];
  }, []);

  const planets = useMemo(
    () => [
      { name: 'Mercury', radius: 15, speed: 0.3, initialAngle: 0, ref: planetRefs.current[0], zoomDistance: 2, mapColor: '#9aa0a6' },
      { name: 'Venus', radius: 30, speed: 0.2, initialAngle: Math.PI / 2, ref: planetRefs.current[1], zoomDistance: 3, mapColor: '#d7a96b' },
      { name: 'Earth', radius: 40, speed: 0.1, initialAngle: Math.PI, ref: planetRefs.current[2], zoomDistance: 2, mapColor: '#4f8fff' },
      { name: 'Mars', radius: 55, speed: 0.08, initialAngle: Math.PI * 1.5, ref: planetRefs.current[3], zoomDistance: 2, mapColor: '#ff6b57' },
      { name: 'Jupiter', radius: 80, speed: 0.05, initialAngle: 0, ref: planetRefs.current[4], zoomDistance: 3, mapColor: '#d9b38c' },
      { name: 'Saturn', radius: 100, speed: 0.08, initialAngle: Math.PI * (3 / 4), ref: planetRefs.current[5], zoomDistance: 5, mapColor: '#d8c393' },
      { name: 'Uranus', radius: 120, speed: 0.08, initialAngle: Math.PI * (5 / 4), ref: planetRefs.current[6], zoomDistance: 8, mapColor: '#7bdff2' },
      { name: 'Neptune', radius: 150, speed: 0.04, initialAngle: Math.PI * (5 / 4), ref: planetRefs.current[7], zoomDistance: 10, mapColor: '#587dff' },
    ],
    [planetRefs]
  );

  const maxOrbitRadius = useMemo(
    () => Math.max(...planets.map((planet) => planet.radius)),
    [planets]
  );

  const orbitingGroups = useMemo(() => ({
    'earth-orbit': {
      parentIndex: 2,
      targets: [
        { id: 'earth-moon', name: 'Moon', zoomDistance: 1.6 },
        { id: 'earth-iss', name: 'ISS', zoomDistance: 1.2 },
        { id: 'earth-satellite', name: 'Satellite', zoomDistance: 1.3 },
      ],
    },
    'mars-moons': {
      parentIndex: 3,
      targets: [
        { id: 'mars-phobos', name: 'Phobos', zoomDistance: 1.4 },
        { id: 'mars-deimos', name: 'Deimos', zoomDistance: 1.6 },
      ],
    },
    'jupiter-moons': {
      parentIndex: 4,
      targets: [
        { id: 'jupiter-io', name: 'Io', zoomDistance: 2.2 },
        { id: 'jupiter-europa', name: 'Europa', zoomDistance: 2.4 },
        { id: 'jupiter-ganymede', name: 'Ganymede', zoomDistance: 2.8 },
        { id: 'jupiter-callisto', name: 'Callisto', zoomDistance: 3.2 },
      ],
    },
    'saturn-moons': {
      parentIndex: 5,
      targets: [
        { id: 'saturn-mimas', name: 'Mimas', zoomDistance: 2.1 },
        { id: 'saturn-enceladus', name: 'Enceladus', zoomDistance: 2.3 },
        { id: 'saturn-tethys', name: 'Tethys', zoomDistance: 2.5 },
        { id: 'saturn-dione', name: 'Dione', zoomDistance: 2.6 },
        { id: 'saturn-rhea', name: 'Rhea', zoomDistance: 2.7 },
        { id: 'saturn-titan', name: 'Titan', zoomDistance: 3.1 },
        { id: 'saturn-iapetus', name: 'Iapetus', zoomDistance: 3.6 },
      ],
    },
  }), []);

  const targetGroups = useMemo(() => {
    const groups = {
      planets: planets.map((planet, index) => ({
        id: `planet-${planet.name.toLowerCase()}`,
        name: planet.name,
        ref: planet.ref,
        zoomDistance: planet.zoomDistance,
        type: 'planet',
        parentPlanetIndex: index,
      })),
    };

    Object.entries(orbitingGroups).forEach(([groupId, group]) => {
      groups[groupId] = group.targets.map((target) => ({
        ...target,
        ref: getTargetRef(target.id),
        type: 'orbiting',
        parentPlanetIndex: group.parentIndex,
      }));
    });

    return groups;
  }, [planets, orbitingGroups, getTargetRef]);

  const focusTargets = targetGroups[focusGroup] ?? targetGroups.planets;

  useEffect(() => {
    if (cameraPreset !== 'follow') {
      setIsZoomed(false);
    }
  }, [cameraPreset]);

  useEffect(() => {
    if (focusGroup === 'planets' && focusIndex !== planetIndex) {
      setFocusIndex(planetIndex);
    }
  }, [focusGroup, focusIndex, planetIndex]);

  // Scroll handler to switch between planets
  const scrollHandler = useCallback((event) => {
    if (event.deltaY === 0) return;
    const direction = event.deltaY > 0 ? 1 : -1;

    if (focusGroup === 'planets') {
      setIsZoomed(false);
      const next = planetIndex + direction;
      if (next >= 0 && next < planets.length) {
        setPlanetIndex(next);
        setFocusIndex(next);
        setSelectedPlanet((prev) => (prev !== null ? next : prev));
      }
      return;
    }

    const next = focusIndex + direction;
    if (next >= 0 && next < focusTargets.length) {
      setFocusIndex(next);
      setIsZoomed(true);
      return;
    }

    const parentIndex = orbitingGroups[focusGroup]?.parentIndex ?? planetIndex;
    setFocusGroup('planets');
    setPlanetIndex(parentIndex);
    setFocusIndex(parentIndex);
    setIsZoomed(false);
    setSelectedPlanet(null);
  }, [focusGroup, focusIndex, focusTargets.length, orbitingGroups, planetIndex, planets.length]);

  useEffect(() => {
    window.addEventListener('wheel', scrollHandler);
    return () => window.removeEventListener('wheel', scrollHandler);
  }, [scrollHandler]);

  // Handle planet click
  const handlePlanetClick = (index) => {
    setFocusGroup('planets');
    setPlanetIndex(index);
    setFocusIndex(index);
    if (focusGroup === 'planets' && planetIndex === index) {
      setIsZoomed((prevZoom) => !prevZoom);
      setSelectedPlanet((prev) => (prev === index ? null : index));
    } else {
      setIsZoomed(true);
      setSelectedPlanet(index);
    }
  };

  const handleOrbitingTargetClick = useCallback((groupId, index, parentIndex) => {
    setFocusGroup(groupId);
    setFocusIndex(index);
    setPlanetIndex(parentIndex);
    setIsZoomed(true);
    setSelectedPlanet(null);
  }, []);

  const closeInfoPanel = () => {
    setSelectedPlanet(null);
    setIsZoomed(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      if (focusGroup === 'planets') return;
      const parentIndex = orbitingGroups[focusGroup]?.parentIndex ?? planetIndex;
      setFocusGroup('planets');
      setPlanetIndex(parentIndex);
      setFocusIndex(parentIndex);
      setIsZoomed(false);
      setSelectedPlanet(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusGroup, orbitingGroups, planetIndex]);

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
      <Canvas className="scene-canvas" camera={{ position: [0, 0, 40] }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
        <AdaptiveDpr pixelated />
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={2000} decay={2} distance={4000} />
        <Suspense fallback={null}>
          {/* Sun */}
          <Sun position={[0, 0, 0]} timeScale={timeScale} paused={isPaused} />

          {/* Planets orbiting around the sun */}
          {planets.map((planet, index) => (
            <Planet
              key={planet.name}
              ref={planet.ref}
              radius={planet.radius}
              speed={planet.speed}
              initialAngle={planet.initialAngle}
              timeScale={timeScale}
              paused={isPaused}
              onClick={(event) => {
                event.stopPropagation();
                handlePlanetClick(index);
              }}
            >
              {index === 0 && <Mercury timeScale={timeScale} paused={isPaused} />}
              {index === 1 && <Venus timeScale={timeScale} paused={isPaused} />}
              {index === 2 && <Earth timeScale={timeScale} paused={isPaused} />}
              {index === 3 && <Mars timeScale={timeScale} paused={isPaused} />}
              {index === 4 && <Jupiter timeScale={timeScale} paused={isPaused} />}
              {index === 5 && <Saturn timeScale={timeScale} paused={isPaused} />}
              {index === 6 && <Uranus timeScale={timeScale} paused={isPaused} />}
              {index === 7 && <Neptune timeScale={timeScale} paused={isPaused} />}
              <PlanetLabel name={planet.name} visible={showLabels} />
            </Planet>
          ))}

          {/* Models for Earth */}
          <EarthModels
            earthRef={planets[2].ref}
            timeScale={timeScale}
            paused={isPaused}
            showLabels={showLabels}
            moonRef={getTargetRef('earth-moon')}
            issRef={getTargetRef('earth-iss')}
            satelliteRef={getTargetRef('earth-satellite')}
            onMoonSelect={() => handleOrbitingTargetClick('earth-orbit', 0, 2)}
            onIssSelect={() => handleOrbitingTargetClick('earth-orbit', 1, 2)}
            onSatelliteSelect={() => handleOrbitingTargetClick('earth-orbit', 2, 2)}
          />

          {/* Models for Mars */}
          <MarsModels
            marsRef={planets[3].ref}
            timeScale={timeScale}
            paused={isPaused}
            showLabels={showLabels}
            phobosRef={getTargetRef('mars-phobos')}
            deimosRef={getTargetRef('mars-deimos')}
            onPhobosSelect={() => handleOrbitingTargetClick('mars-moons', 0, 3)}
            onDeimosSelect={() => handleOrbitingTargetClick('mars-moons', 1, 3)}
          />

          {/* Models for Jupiter */}
          <JupiterModels
            jupiterRef={planets[4].ref}
            timeScale={timeScale}
            paused={isPaused}
            showLabels={showLabels}
            ioRef={getTargetRef('jupiter-io')}
            europaRef={getTargetRef('jupiter-europa')}
            ganymedeRef={getTargetRef('jupiter-ganymede')}
            callistoRef={getTargetRef('jupiter-callisto')}
            onIoSelect={() => handleOrbitingTargetClick('jupiter-moons', 0, 4)}
            onEuropaSelect={() => handleOrbitingTargetClick('jupiter-moons', 1, 4)}
            onGanymedeSelect={() => handleOrbitingTargetClick('jupiter-moons', 2, 4)}
            onCallistoSelect={() => handleOrbitingTargetClick('jupiter-moons', 3, 4)}
          />

          {/* Models for Saturn */}
          <SaturnModels
            saturnRef={planets[5].ref}
            timeScale={timeScale}
            paused={isPaused}
            showLabels={showLabels}
            mimasRef={getTargetRef('saturn-mimas')}
            enceladusRef={getTargetRef('saturn-enceladus')}
            tethysRef={getTargetRef('saturn-tethys')}
            dioneRef={getTargetRef('saturn-dione')}
            rheaRef={getTargetRef('saturn-rhea')}
            titanRef={getTargetRef('saturn-titan')}
            iapetusRef={getTargetRef('saturn-iapetus')}
            onMimasSelect={() => handleOrbitingTargetClick('saturn-moons', 0, 5)}
            onEnceladusSelect={() => handleOrbitingTargetClick('saturn-moons', 1, 5)}
            onTethysSelect={() => handleOrbitingTargetClick('saturn-moons', 2, 5)}
            onDioneSelect={() => handleOrbitingTargetClick('saturn-moons', 3, 5)}
            onRheaSelect={() => handleOrbitingTargetClick('saturn-moons', 4, 5)}
            onTitanSelect={() => handleOrbitingTargetClick('saturn-moons', 5, 5)}
            onIapetusSelect={() => handleOrbitingTargetClick('saturn-moons', 6, 5)}
          />

          {/* Asteroids */}
          <AsteroidField asteroids={asteroids} timeScale={timeScale} paused={isPaused} />
        </Suspense>
        <Preload all />

        <Stars radius={200} depth={50} count={backgroundStarCount} factor={4} saturation={0} />
        <ColorStars count={starCount} />

        <SceneStyleController wireframe={showWireframe} />
        <CameraReporter planets={planets} cameraDataRef={cameraDataRef} />

        {/* Camera controller to follow planets */}
        <CameraController
          targets={focusTargets}
          targetIndex={focusIndex}
          isZoomed={isZoomed}
          mode={cameraPreset}
          distanceMultiplier={cameraDistance}
        />
      </Canvas>

      <HudMenu
        open={showHudMenu}
        onToggleOpen={() => setShowHudMenu((prev) => !prev)}
        showControls={showControlPanel}
        onToggleControls={() => setShowControlPanel((prev) => !prev)}
        showMiniMap={showMiniMap}
        onToggleMiniMap={() => setShowMiniMap((prev) => !prev)}
        onBadgeClick={() => setShowIntro(true)}
      />

      {showMiniMap && (
        <MiniMap
          planets={planets}
          cameraDataRef={cameraDataRef}
          activeIndex={planetIndex}
          maxOrbitRadius={maxOrbitRadius}
        />
      )}

      {showControlPanel && (
        <ControlPanel
          timeScale={timeScale}
          isPaused={isPaused}
          onTogglePause={() => setIsPaused((prev) => !prev)}
          onTimeScaleChange={setTimeScale}
          cameraPreset={cameraPreset}
          onCameraPresetChange={setCameraPreset}
          cameraDistance={cameraDistance}
          onCameraDistanceChange={setCameraDistance}
          showWireframe={showWireframe}
          onToggleWireframe={() => setShowWireframe((prev) => !prev)}
          showLabels={showLabels}
          onToggleLabels={() => setShowLabels((prev) => !prev)}
        />
      )}

      {/* Info HUD overlay */}
      {selectedPlanet !== null && (
        <InfoPanel
          planet={{ ...planets[selectedPlanet], index: selectedPlanet }}
          onClose={closeInfoPanel}
          onBadgeClick={() => setShowIntro(true)}
        />
      )}

      {showIntro && (
        <IntroPanel onClose={() => setShowIntro(false)} />
      )}
    </>
  );
}
