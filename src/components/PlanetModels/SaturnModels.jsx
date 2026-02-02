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
  mimasRef,
  enceladusRef,
  tethysRef,
  dioneRef,
  rheaRef,
  titanRef,
  iapetusRef,
  onMimasSelect,
  onEnceladusSelect,
  onTethysSelect,
  onDioneSelect,
  onRheaSelect,
  onTitanSelect,
  onIapetusSelect,
}) {
  return (
    <>
      <Titan
        ref={titanRef}
        saturnRef={saturnRef}
        timeScale={timeScale}
        paused={paused}
        showLabel={showLabels}
        onSelect={onTitanSelect}
      />
      <Dione
        ref={dioneRef}
        saturnRef={saturnRef}
        timeScale={timeScale}
        paused={paused}
        showLabel={showLabels}
        onSelect={onDioneSelect}
      />
      <Enceladus
        ref={enceladusRef}
        saturnRef={saturnRef}
        timeScale={timeScale}
        paused={paused}
        showLabel={showLabels}
        onSelect={onEnceladusSelect}
      />
      <Mimas
        ref={mimasRef}
        saturnRef={saturnRef}
        timeScale={timeScale}
        paused={paused}
        showLabel={showLabels}
        onSelect={onMimasSelect}
      />
      <Rhea
        ref={rheaRef}
        saturnRef={saturnRef}
        timeScale={timeScale}
        paused={paused}
        showLabel={showLabels}
        onSelect={onRheaSelect}
      />
      <Tethys
        ref={tethysRef}
        saturnRef={saturnRef}
        timeScale={timeScale}
        paused={paused}
        showLabel={showLabels}
        onSelect={onTethysSelect}
      />
      <Iapetus
        ref={iapetusRef}
        saturnRef={saturnRef}
        timeScale={timeScale}
        paused={paused}
        showLabel={showLabels}
        onSelect={onIapetusSelect}
      />
    </>
  );
}
