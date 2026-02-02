import Ganymede from '../Moons/Ganymede';
import Callisto from '../Moons/Callisto';
import Europa from '../Moons/Europa';
import Io from '../Moons/Io';

export default function JupiterModels({
  jupiterRef,
  timeScale = 1,
  paused = false,
  showLabels = false,
  ioRef,
  europaRef,
  ganymedeRef,
  callistoRef,
  onIoSelect,
  onEuropaSelect,
  onGanymedeSelect,
  onCallistoSelect,
}) {
  return (
    <>
      <Ganymede
        ref={ganymedeRef}
        jupiterRef={jupiterRef}
        timeScale={timeScale}
        paused={paused}
        showLabel={showLabels}
        onSelect={onGanymedeSelect}
      />
      <Callisto
        ref={callistoRef}
        jupiterRef={jupiterRef}
        timeScale={timeScale}
        paused={paused}
        showLabel={showLabels}
        onSelect={onCallistoSelect}
      />
      <Europa
        ref={europaRef}
        jupiterRef={jupiterRef}
        timeScale={timeScale}
        paused={paused}
        showLabel={showLabels}
        onSelect={onEuropaSelect}
      />
      <Io
        ref={ioRef}
        jupiterRef={jupiterRef}
        timeScale={timeScale}
        paused={paused}
        showLabel={showLabels}
        onSelect={onIoSelect}
      />
    </>
  );
}
