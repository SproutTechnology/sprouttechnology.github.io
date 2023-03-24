// Threejs example: threejs.org/examples/?q=asc#webgl_effects_ascii

import { useEffect, useRef, useState, useMemo, useLayoutEffect } from 'react'
import { Canvas, MeshProps, useFrame, useThree } from '@react-three/fiber'
import { Box, OrbitControls, useCursor } from '@react-three/drei'
import { AsciiEffect } from 'three-stdlib'
import * as THREE from 'three';


export default function App() {
  return (
    <Canvas dpr={[0,1]}>
      <color attach="background" args={['black']} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Torusknot />
      <Box position={[-4, 0, 0]}>

      </Box>
      <OrbitControls />
      <AsciiRenderer fgColor="white" bgColor="black" />
    </Canvas>
  )
}



function Torusknot(props: MeshProps) {
  const ref = useRef<THREE.Mesh>(null!)
  const [clicked, click] = useState(false)
  const [hovered, hover] = useState(false)
  useCursor(hovered)

  useFrame((state, delta) => {
    if(ref.current?.position?.x) {
      ref.current.position.x += delta
    }
  })

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1.25}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}>
      <torusKnotGeometry args={[1, 0.2, 128, 32]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

function AsciiRenderer({
                         renderIndex = 1,
                         bgColor = 'black',
                         fgColor = 'white',
                         characters = ' .:-+*=%@#123456780',
                         invert = true,
                         color = false,
                         resolution = 0.15
                       }) {
  // Reactive state
  const { size, gl, scene, camera } = useThree()

  // Create effect
  const effect = useMemo(() => {
    const effect = new AsciiEffect(gl, characters, { invert, color, resolution })
    effect.domElement.style.position = 'absolute'
    effect.domElement.style.top = '0px'
    effect.domElement.style.left = '0px'
    effect.domElement.style.pointerEvents = 'none'
    return effect
  }, [characters, invert, color, resolution])

  // Styling
  useLayoutEffect(() => {
    effect.domElement.style.color = fgColor
    effect.domElement.style.backgroundColor = bgColor
  }, [fgColor, bgColor])

  useEffect(() => {
    gl.domElement.style.opacity = '0'
    if(gl.domElement?.parentNode)
      gl.domElement.parentNode.appendChild(effect.domElement)
    return () => {
      gl.domElement.style.opacity = '1'
      if(gl.domElement?.parentNode)
        gl.domElement.parentNode.removeChild(effect.domElement)
    }
  }, [effect])

  // Set size
  useEffect(() => {
    effect.setSize(size.width, size.height)
  }, [effect, size])

  // Take over render-loop (that is what the index is for)
  useFrame((state) => {
    effect.render(scene, camera)
  }, renderIndex)

  return <></>

  // This component returns nothing, it is a purely logical
}
