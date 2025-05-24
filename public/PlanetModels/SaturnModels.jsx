import Titan from '../Titan';
import Dione from '../Dione';
import Enceladus from '../Enceladus';
import Mimas from '../Mimas';
import Rhea from '../Rhea';
import Tethys from '../Tethys';
import Iapetus from '../Iapetus';

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
