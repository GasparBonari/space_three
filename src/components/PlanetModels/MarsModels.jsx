import Phobos from '../Moons/Phobos';
import Deimos from '../Moons/Deimos';

export default function MarsModels({
  marsRef,
  timeScale = 1,
  paused = false,
  showLabels = false,
}) {
  return (
    <>
      <Phobos marsRef={marsRef} timeScale={timeScale} paused={paused} showLabel={showLabels} />
      <Deimos marsRef={marsRef} timeScale={timeScale} paused={paused} showLabel={showLabels} />
    </>
  );
}
