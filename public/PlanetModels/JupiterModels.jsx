import Ganymede from '../Ganymede';
import Callisto from '../Callisto';
import Europa from '../Europa';
import Io from '../Io';

export default function JupiterModels({ jupiterRef }) {
  return (
    <>
      <Ganymede jupiterRef={jupiterRef} />
      <Callisto jupiterRef={jupiterRef} />
      <Europa jupiterRef={jupiterRef} />
      <Io jupiterRef={jupiterRef} />
    </>
  );
}
