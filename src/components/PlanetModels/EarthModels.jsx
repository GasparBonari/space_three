import Moon from '../Moons/Moon';
import ISS from '../Satellites/Iss';
import Satellite from '../Satellites/Satellite';

export default function EarthModels({ earthRef, timeScale = 1, paused = false }) {
  return (
    <>
      <Moon earthRef={earthRef} timeScale={timeScale} paused={paused} />
      <ISS earthRef={earthRef} timeScale={timeScale} paused={paused} />
      <Satellite earthRef={earthRef} timeScale={timeScale} paused={paused} />
    </>
  );
}
