import Phobos from '../Phobos';
import Deimos from '../Deimos';

export default function MarsModels({ marsRef }) {
  return (
    <>
      <Phobos marsRef={marsRef} />
      <Deimos marsRef={marsRef} />
    </>
  );
}
