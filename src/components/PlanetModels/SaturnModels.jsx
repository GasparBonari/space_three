import Titan from '../Moons/Titan';
import Dione from '../Moons/Dione';
import Enceladus from '../Moons/Enceladus';
import Mimas from '../Moons/Mimas';
import Rhea from '../Moons/Rhea';
import Tethys from '../Moons/Tethys';
import Iapetus from '../Moons/Iapetus';

export default function SaturnModels({ saturnRef, timeScale = 1, paused = false }) {
  return (
    <>
      <Titan saturnRef={saturnRef} timeScale={timeScale} paused={paused} />
      <Dione saturnRef={saturnRef} timeScale={timeScale} paused={paused} />
      <Enceladus saturnRef={saturnRef} timeScale={timeScale} paused={paused} />
      <Mimas saturnRef={saturnRef} timeScale={timeScale} paused={paused} />
      <Rhea saturnRef={saturnRef} timeScale={timeScale} paused={paused} />
      <Tethys saturnRef={saturnRef} timeScale={timeScale} paused={paused} />
      <Iapetus saturnRef={saturnRef} timeScale={timeScale} paused={paused} />
    </>
  );
}
