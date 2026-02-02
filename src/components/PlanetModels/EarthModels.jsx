import Moon from '../Moons/Moon';
import ISS from '../Satellites/Iss';
import Satellite from '../Satellites/Satellite';

export default function EarthModels({
  earthRef,
  timeScale = 1,
  paused = false,
  showLabels = false,
  moonRef,
  issRef,
  satelliteRef,
  onMoonSelect,
  onIssSelect,
  onSatelliteSelect,
}) {
  return (
    <>
      <Moon
        ref={moonRef}
        earthRef={earthRef}
        timeScale={timeScale}
        paused={paused}
        showLabel={showLabels}
        onSelect={onMoonSelect}
      />
      <ISS
        ref={issRef}
        earthRef={earthRef}
        timeScale={timeScale}
        paused={paused}
        showLabel={showLabels}
        onSelect={onIssSelect}
      />
      <Satellite
        ref={satelliteRef}
        earthRef={earthRef}
        timeScale={timeScale}
        paused={paused}
        showLabel={showLabels}
        onSelect={onSatelliteSelect}
      />
    </>
  );
}
