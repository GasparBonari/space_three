import Phobos from '../Moons/Phobos';
import Deimos from '../Moons/Deimos';

export default function MarsModels({ marsRef, timeScale = 1, paused = false }) {
  return (
    <>
      <Phobos marsRef={marsRef} timeScale={timeScale} paused={paused} />
      <Deimos marsRef={marsRef} timeScale={timeScale} paused={paused} />
    </>
  );
}
