import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Europa({ scale = [0.007, 0.007, 0.007] }) {
  const { scene } = useGLTF('./europa.glb');
  const europaRef = useRef();

  return <primitive ref={europaRef} object={scene} scale={scale} />;
}

useGLTF.preload('./europa.glb');
