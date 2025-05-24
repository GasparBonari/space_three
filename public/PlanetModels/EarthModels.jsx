import Moon from '../Moon';
import ISS from '../Iss';
import Satellite from '../Satellite';

export default function EarthModels({ earthRef }) {
  return (
    <>
      <Moon earthRef={earthRef} />
      <ISS earthRef={earthRef} />
      <Satellite earthRef={earthRef} />
    </>
  );
}
