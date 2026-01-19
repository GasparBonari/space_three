import Phobos from '../Moons/Phobos';
import Deimos from '../Moons/Deimos';

export default function MarsModels({ marsRef }) {
  return (
    <>
      <Phobos marsRef={marsRef} />
      <Deimos marsRef={marsRef} />
    </>
  );
}
