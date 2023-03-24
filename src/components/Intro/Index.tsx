import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

import { AsciiEffect } from './AsciiEffect.js';
import { Canvas, ThreeElements, useFrame, useThree, useLoader, extend } from '@react-three/fiber';
import { Box, CurveModifier, Text3D } from '@react-three/drei'
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';


let camera: THREE.PerspectiveCamera
let scene: THREE.Scene
let text: THREE.Mesh
let text2: THREE.Mesh
let pointLight1: THREE.SpotLight
let pointLight2: THREE.PointLight
let renderer: THREE.WebGLRenderer
let effect: AsciiEffect

let timer = 0;
extend({ TextGeometry });


const Stuff = (props: ThreeElements['mesh']) => {
  //init2();
  //animate2();
  const [textPos1, setTextPos1] = useState(0)
  const [light1x, setLight1x] = useState(0)
  const [light1y, setLight1y] = useState(0)

  const [light2x, setLight2x] = useState(0)
  const [light2y, setLight2y] = useState(0)
  const [light2Intensity, setLight2Intensity] = useState(0)

  useFrame((state, delta) => {

    timer += delta * 1500;

    if((timer * 0.0010) < 50) {
      //setTextPos1(17 - (timer * 0.0010) % 50);
    }

    const light1x = state.pointer.x*5 //Math.sin(timer * 0.0008) * 3 + Math.cos(timer * 0.00008) * 4;
    const light1y = state.pointer.y*5//Math.cos(timer * 0.0008) * 3 + Math.sin(timer * 0.00008) * 4 ;
    console.log(light1x, light1y)

    const light2x = -Math.sin(timer * 0.0005) * 3;
    const light2y = -Math.cos(timer * 0.0005) * 3;

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
  const points = useRef(null);


  const font = useLoader(FontLoader, '/sprout-logo.json');
  const fontSettings = {
    font,
    size: 7.5,
    height: 0.2,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 0.2,
    bevelSize: 0.1,
    bevelOffset: 0,
    bevelSegments: 1,
    letterSpacing: 0.1,
    lineHeight: 0.5,
  };

  const { mouse, camera } = useThree()

  return (
    <>

      <Box ref={light1TargetRef} visible={false} position={[light1x, light1y, 0]}/>
      <Box ref={light2TargetRef} visible={false} position={[light1x, light1y, 0]}/>

      <Box ref={light3TargetRef} visible={false} position={[light2y, light2x, 0]}/>
      <Box ref={light4TargetRef} visible={false} position={[light2x, light2y, 0]}/>

      <spotLight position={[-light2x, -light2y, 12]} angle={0.3} color={"white"}intensity={0.1}/>
      <spotLight position={[-light2y, light2x, 6]} angle={0.2} color={"white"} intensity={0.2}/>

      <spotLight position={[light2x, light2y, 6]} angle={0.6} intensity={0.0}/>
      <spotLight position={[light2y, -light2x, 2]} angle={0.3} intensity={0.0}/>

      <spotLight position={[0, 0, 10]} target={light2TargetRef.current} angle={0.1} color={"white"} intensity={3.9}/>
      <spotLight position={[0, 0, 15]} target={light3TargetRef.current} angle={0.3} intensity={0.0}/>
      <pointLight position={[-textPos1*2, 0, 10]} intensity={0.8} distance={20} decay={1}/>

      <pointLight position={[-20 + light1x*2, 0, 1]} intensity={0.0}/>


      <Text3D
        visible={true}
        rotation={[0,-0.0,0]}
        position={[-4, -3, 0]}
        font={'/sprout-logo.json'}
        curveSegments={10}
        bevelEnabled
        bevelSize={0.3}
        bevelThickness={0}
        height={0.2}
        lineHeight={0.5}
        letterSpacing={0.4}
        size={4.5}>
        A
        <meshStandardMaterial color={"grey"}/>
        {
          //
          <AsciiRenderer fgColor="black" bgColor="rgb(168, 162, 158)" />
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
                         characters = ' .:-+*=%@#123456780',
                         invert = false,
                         color = false,
                         resolution = 0.10,
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


function init2() {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.y = 0;
  camera.position.z = 450;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0, 0, 0);


  const loader = new FontLoader();
  loader.load('/public/font.json', (font: any) => {

    const shapes = font.generateShapes(' sprout. ', 800);
    const geometry = new THREE.ShapeGeometry(shapes);
    geometry.computeBoundingBox();

    let xMid = 0
    if (geometry.boundingBox) {
      xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    }

    geometry.translate(xMid, 0, 0);

    text = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }));
    text.position.z = -150;
    text.position.y = -300;
    scene.add(text);
    text2 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }));
    text2.position.z = -150;
    text2.position.y = -300;
    scene.add(text2);
  })

  pointLight1 = new THREE.SpotLight(0xffffff);
  pointLight1.position.set(0, 0, 200);
  scene.add(pointLight1);

  pointLight2 = new THREE.PointLight(0xffffff);
  pointLight2.position.set(0, 0, 200);
  scene.add(pointLight2);

  const pointLight3 = new THREE.PointLight(0xffffff, 0.25);
  scene.add(pointLight3);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  effect = new AsciiEffect(renderer, ' .:-+*=%@#1234567890A', { invert: true });
  effect.setSize(window.innerWidth, window.innerHeight);
  effect.domElement.style.color = 'gray';
  effect.domElement.style.backgroundColor = 'black';
  // Special case: append effect.domElement, instead of renderer.domElement.
  // AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.

  // document.getElementById("intro").appendChild(effect.domElement)
  setTimeout(() => {
    //document.getElementById("intro").remove()
  }, 5000)

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  effect.setSize(window.innerWidth, window.innerHeight);

}

//
function Intro() {
  return <Canvas>
    <Stuff/>
  </Canvas>
}


export default Intro;
