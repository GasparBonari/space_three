import Moon from '../Moons/Moon';
import ISS from '../Satellites/Iss';
import Satellite from '../Satellites/Satellite';

export default function EarthModels({
  earthRef,
  timeScale = 1,
  paused = false,
  showLabels = false,
}) {
  return (
    <>
      <Moon earthRef={earthRef} timeScale={timeScale} paused={paused} showLabel={showLabels} />
      <ISS earthRef={earthRef} timeScale={timeScale} paused={paused} showLabel={showLabels} />
      <Satellite earthRef={earthRef} timeScale={timeScale} paused={paused} showLabel={showLabels} />
    </>
  );
}
