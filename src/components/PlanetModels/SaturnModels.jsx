import Titan from '../Moons/Titan';
import Dione from '../Moons/Dione';
import Enceladus from '../Moons/Enceladus';
import Mimas from '../Moons/Mimas';
import Rhea from '../Moons/Rhea';
import Tethys from '../Moons/Tethys';
import Iapetus from '../Moons/Iapetus';

export default function SaturnModels({
  saturnRef,
  timeScale = 1,
  paused = false,
  showLabels = false,
}) {
  return (
    <>
      <Titan saturnRef={saturnRef} timeScale={timeScale} paused={paused} showLabel={showLabels} />
      <Dione saturnRef={saturnRef} timeScale={timeScale} paused={paused} showLabel={showLabels} />
      <Enceladus saturnRef={saturnRef} timeScale={timeScale} paused={paused} showLabel={showLabels} />
      <Mimas saturnRef={saturnRef} timeScale={timeScale} paused={paused} showLabel={showLabels} />
      <Rhea saturnRef={saturnRef} timeScale={timeScale} paused={paused} showLabel={showLabels} />
      <Tethys saturnRef={saturnRef} timeScale={timeScale} paused={paused} showLabel={showLabels} />
      <Iapetus saturnRef={saturnRef} timeScale={timeScale} paused={paused} showLabel={showLabels} />
    </>
  );
}
