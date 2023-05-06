import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';

import {AsciiEffect} from './AsciiEffect.js';
import {Canvas, extend, ThreeElements, useFrame, useThree} from '@react-three/fiber';
import {Text3D} from '@react-three/drei'
import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';


let timer = 0;
extend({TextGeometry});


const Stuff = (props: ThreeElements['mesh']) => {

    const {size} = useThree()

    const [lightIntensity, setLightIntensity] = useState(0)

    const [light1x, setLight1x] = useState(0)
    const [light1y, setLight1y] = useState(0)

    const [light2x, setLight2x] = useState(0)
    const [light2y, setLight2y] = useState(0)

    useFrame((state, delta) => {

        timer += delta * 1500;

        const light1x = state.pointer.x * size.width / 250 - 0.5
        const light1y = state.pointer.y * size.height / 250

        setLight1x(light1x)
        setLight1y(light1y)

        const light2x = -Math.sin(timer * 0.0001) * 6
        const light2y = -Math.cos(timer * 0.0004) * 3;

        setLight2x(light2x)
        setLight2y(light2y)

        setLightIntensity(timer*1.0001)
    })


    return (
        <>
            <spotLight position={[light2y, -light2x, 2]} angle={0.3} intensity={Math.min(0.3, lightIntensity)}/>
            <pointLight position={[0, 0, 10]} intensity={Math.min(0.8, lightIntensity)} distance={20} decay={1}/>
            <pointLight position={[light1x, light1y, 2]} intensity={Math.min(2.0, lightIntensity)} distance={3} decay={0.4}/>

            <Text3D
                visible={true}
                rotation={[0, 0, 0]}
                position={[-3, -3, 0]}
                font={'/custom-fonts/sprout-logo/sprout-logo-glyph.json'}
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
                    <AsciiRenderer fgColor="#0000" bgColor="#0000"/>
                }
            </Text3D>
        </>
    )
}


function AsciiRenderer({
                           renderIndex = 1,
                           bgColor = 'black',
                           fgColor = 'white',
                           characters = 'A',
                           invert = false,
                           color = true,
                           resolution = 0.12,
                           strResolution = 'low'
                       }) {
    // Reactive state
    const {size, gl, scene, camera} = useThree()

    // Create effect
    const effect = useMemo(() => {
        const effect = new AsciiEffect(gl, characters, {invert, color, resolution, strResolution})
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
        if (gl.domElement?.parentNode)
            gl.domElement.parentNode.appendChild(effect.domElement)
        return () => {
            gl.domElement.style.opacity = '1'
            if (gl.domElement?.parentNode)
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
    return <Canvas style={{width: '100%', height: '100%'}} camera={{position: [0, 0, 4.8]}}>
        <Stuff/>
    </Canvas>
}


export default Intro;
