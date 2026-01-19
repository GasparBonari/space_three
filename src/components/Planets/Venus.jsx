import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

export default function Venus(props) {
	const { nodes, materials } = useGLTF('/venus.gltf')
	const venusRef = useRef();

	useFrame((_, delta) => {
		if (venusRef.current) {
			venusRef.current.rotation.y -= 0.10 * delta;
		}
	});


	return (
		<group ref={venusRef} {...props} dispose={null}>
			<mesh geometry={nodes.Object_4.geometry} material={materials['Scene_-_Root']} scale={1} />
		</group>
	)
}

useGLTF.preload('/venus.gltf')

