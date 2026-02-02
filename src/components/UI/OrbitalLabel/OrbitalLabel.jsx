import { Html } from '@react-three/drei';

export default function OrbitalLabel({
  text,
  visible = false,
  position = [0, 0.35, 0],
  distanceFactor = 8,
  className = '',
}) {
  if (!visible) return null;
  return (
    <Html center distanceFactor={distanceFactor} position={position}>
      <div className={`space-label ${className}`.trim()}>{text}</div>
    </Html>
  );
}
