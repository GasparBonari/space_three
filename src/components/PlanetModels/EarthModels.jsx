import Moon from '../Moons/Moon';
import ISS from '../Satellites/Iss';
import Satellite from '../Satellites/Satellite';

export default function EarthModels({ earthRef }) {
  return (
    <>
      <Moon earthRef={earthRef} />
      <ISS earthRef={earthRef} />
      <Satellite earthRef={earthRef} />
    </>
  );
}
