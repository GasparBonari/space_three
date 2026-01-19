import Ganymede from '../Moons/Ganymede';
import Callisto from '../Moons/Callisto';
import Europa from '../Moons/Europa';
import Io from '../Moons/Io';

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
