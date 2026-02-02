import Phobos from '../Moons/Phobos';
import Deimos from '../Moons/Deimos';

export default function MarsModels({
  marsRef,
  timeScale = 1,
  paused = false,
  showLabels = false,
  phobosRef,
  deimosRef,
  onPhobosSelect,
  onDeimosSelect,
}) {
  return (
    <>
      <Phobos
        ref={phobosRef}
        marsRef={marsRef}
        timeScale={timeScale}
        paused={paused}
        showLabel={showLabels}
        onSelect={onPhobosSelect}
      />
      <Deimos
        ref={deimosRef}
        marsRef={marsRef}
        timeScale={timeScale}
        paused={paused}
        showLabel={showLabels}
        onSelect={onDeimosSelect}
      />
    </>
  );
}
