import Titan from '../Moons/Titan';
import Dione from '../Moons/Dione';
import Enceladus from '../Moons/Enceladus';
import Mimas from '../Moons/Mimas';
import Rhea from '../Moons/Rhea';
import Tethys from '../Moons/Tethys';
import Iapetus from '../Moons/Iapetus';

export default function SaturnModels({ saturnRef }) {
  return (
    <>
      <Titan saturnRef={saturnRef} />
      <Dione saturnRef={saturnRef} />
      <Enceladus saturnRef={saturnRef} />
      <Mimas saturnRef={saturnRef} />
      <Rhea saturnRef={saturnRef} />
      <Tethys saturnRef={saturnRef} />
      <Iapetus saturnRef={saturnRef} />
    </>
  );
}
