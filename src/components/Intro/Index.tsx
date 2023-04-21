import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

import { AsciiEffect } from './AsciiEffect.js';
import { Canvas, ThreeElements, useFrame, useThree, useLoader, extend } from '@react-three/fiber';
import { Box, ScrollControls, Text3D, useScroll } from '@react-three/drei'
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';


let timer = 0;
extend({ TextGeometry });



const Stuff = (props: ThreeElements['mesh']) => {

  const { size, gl, scene } = useThree()


  const [textPos1, setTextPos1] = useState(0)
  const [light1x, setLight1x] = useState(0)
  const [light1y, setLight1y] = useState(0)

  const [light2x, setLight2x] = useState(0)
  const [light2y, setLight2y] = useState(0)
  const [light2Intensity, setLight2Intensity] = useState(0)
  const scroll = useScroll();


  useFrame((state, delta) => {

      const zPos = camera.position.z - delta;

      //camera.position.z = Math.max(zPos, 5)
      timer += delta * 1500;

    if((timer * 0.0010) < 50) {
      setTextPos1(4 - (timer * 0.0010) % 50);
    }

    const light1x = state.pointer.x*size.width/250-0.5 //Math.sin(timer * 0.0008) * 3 + Math.cos(timer * 0.00008) * 4;
    const light1y = state.pointer.y*size.height/250//Math.cos(timer * 0.0008) * 3 + Math.sin(timer * 0.00008) * 4 ;
    //const light1y = scroll.offset* size.height;//Math.cos(timer * 0.0008) * 3 + Math.sin(timer * 0.00008) * 4 ;
    //const light1x = 0;

    console.log(light1x, light1y)

    const light2x = -Math.sin(timer * 0.0001) * 6
    const light2y = -Math.cos(timer * 0.0004) * 3;

    const light2Intensity = 1 - Math.abs(Math.sin(timer * 0.00001)) * 0.5

    //text2.position.x = 2000 - (timer * 0.1 + 2000) % 3500;

    setLight1x(light1x)
    setLight1y(light1y )

    setLight2x(light2x)
    setLight2y(light2y)

    //setLight2Intensity(light2Intensity)

  })

  const light1TargetRef = useRef()
  const light2TargetRef = useRef()
  const light3TargetRef = useRef()
  const light4TargetRef = useRef()
  const textRef = useRef(null);

  const font = useLoader(FontLoader, '/sprout-logo.json');

  const { mouse, camera } = useThree()

    return (
    <>

      <Box ref={light1TargetRef} visible={false} position={[light1x, light1y, 0]}/>
      <Box ref={light2TargetRef} visible={false} position={[light1x, light1y, 0]}/>

      <Box ref={light3TargetRef} visible={false} position={[light2y, light2x, 0]}/>
      <Box ref={light4TargetRef} visible={false} position={[light2x, light2y, 0]}/>

      <spotLight position={[-light2x, -light2y, 12]} angle={0.3} color={"white"} intensity={0.0}/>
      <spotLight position={[-light2y, light2x, 6]} angle={0.2} color={"white"} intensity={0.0}/>

      <spotLight position={[light2x, light2y, 6]} angle={0.6} intensity={0.0}/>
      <spotLight position={[light2y, -light2x, 2]} angle={0.3} intensity={0.3}/>

      <spotLight position={[0, 0, 10]} target={light2TargetRef.current} angle={0.1} color={"white"} intensity={0}/>
      <spotLight position={[0, 0, 15]} target={light3TargetRef.current} angle={0.3} intensity={0.0}/>

      <pointLight position={[-textPos1*2, 0, 10]} intensity={0.8} distance={20} decay={1}/>

      <pointLight position={[light1x, light1y, 2]} intensity={2} distance={3} decay={0.4}/>

      <Text3D
        visible={true}
        rotation={[0,0,0]}
        position={[-3, -3, 0]}
        font={'/sprout-logo.json'}
        curveSegments={3}
        bevelEnabled
        bevelSize={0.1}
        bevelThickness={0.1}
        height={0.2}
        lineHeight={0.5}
        letterSpacing={0.4}
        size={4.5}>
        A
        <meshStandardMaterial color={"grey"}/>
        {
         <AsciiRenderer fgColor="white" bgColor="#1D1D1D" />
        }
      </Text3D>

      {
/*

      <points ref={points} position={[textPos1-10, -3, 0]}>
        <textGeometry args={["Sprout", fontSettings]} />
        <pointsMaterial color="white" size={0.515} sizeAttenuation />
      </points>

 */
      }

    </>
  )
}

//


function AsciiRenderer({
                         renderIndex = 1,
                         bgColor = 'black',
                         fgColor = 'white',
                         characters = ' AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                         invert = false,
                         color = true,
                         resolution = 0.12,
                         strResolution = 'low'
                       }) {
  // Reactive state
  const { size, gl, scene, camera } = useThree()

  // Create effect
  const effect = useMemo(() => {
    const effect = new AsciiEffect(gl, characters, { invert, color, resolution, strResolution })
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

  // Append on mount, remove on unmount
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

  // This component returns nothing, it is a purely logical

  return <></>
}

//
function Intro() {
    return <Canvas style={{cursor: 'crosshair', width: '800px', height: '800px'}} camera={{ position: [0, 0, 5.5]}} >
      <ScrollControls pages={0}>
        <Stuff/>
      </ScrollControls>
  </Canvas>
}


export default Intro;
