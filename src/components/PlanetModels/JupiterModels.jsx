import Ganymede from '../Moons/Ganymede';
import Callisto from '../Moons/Callisto';
import Europa from '../Moons/Europa';
import Io from '../Moons/Io';

export default function JupiterModels({
  jupiterRef,
  timeScale = 1,
  paused = false,
  showLabels = false,
}) {
  return (
    <>
      <Ganymede jupiterRef={jupiterRef} timeScale={timeScale} paused={paused} showLabel={showLabels} />
      <Callisto jupiterRef={jupiterRef} timeScale={timeScale} paused={paused} showLabel={showLabels} />
      <Europa jupiterRef={jupiterRef} timeScale={timeScale} paused={paused} showLabel={showLabels} />
      <Io jupiterRef={jupiterRef} timeScale={timeScale} paused={paused} showLabel={showLabels} />
    </>
  );
}
