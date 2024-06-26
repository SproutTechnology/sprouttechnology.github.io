import { AsciiEffect } from "./AsciiEffect.js";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useAspect, useVideoTexture } from "@react-three/drei";
import React, { useEffect, useLayoutEffect, useMemo } from "react";
import { Vector2 } from "three/src/math/Vector2.js";

function Scene({bgColor, fgColor}) {
    const size = useAspect(1800, 1000);
    return (
        <mesh scale={size}>
            <planeGeometry />
            <VideoMaterial url="wave-final-desktop.mp4" />
            <AsciiRenderer bgColor={bgColor} fgColor={fgColor}/>
        </mesh>
    );
}

function VideoMaterial({ url }) {
    const texture = useVideoTexture(url);
    texture.offset = new Vector2(0.15, 0.35);
    texture.repeat.set(0.6, 0.6);
    return <meshBasicMaterial map={texture} toneMapped={false} />;
}

function AsciiRenderer({
    renderIndex = 1,
    bgColor = "black", //'#ffffff',
    fgColor = "#cccccc",
    characters = "  .:-+*=%@#123456780",
    invert = false,
    color = false,
    resolution = 0.2,
    strResolution = "medium",
}) {
    // Reactive state
    const { size, gl, scene, camera } = useThree();

    // Create effect
    const effect = useMemo(() => {
        const effect = new AsciiEffect(gl, characters, { invert, color, resolution, strResolution });
        effect.domElement.style.position = "absolute";
        effect.domElement.style.top = "0px";
        effect.domElement.style.left = "0px";
        effect.domElement.style.pointerEvents = "none";
        return effect;
    }, [characters, invert, color, resolution]);

    // Styling
    useLayoutEffect(() => {
        effect.domElement.style.color = fgColor;
        effect.domElement.style.backgroundColor = bgColor;
    }, [fgColor, bgColor]);

    // Append on mount, remove on unmount
    useEffect(() => {
        gl.domElement.style.opacity = "0";
        gl.domElement.parentNode.appendChild(effect.domElement);
        return () => {
            gl.domElement.style.opacity = "1";
            gl.domElement.parentNode.removeChild(effect.domElement);
        };
    }, [effect]);

    // Set size
    useEffect(() => {
        effect.setSize(size.width, size.height);
    }, [effect, size]);

    // Take over render-loop (that is what the index is for)
    useFrame((state) => {
        effect.render(scene, camera);
    }, renderIndex);

    // This component returns nothing, it is a purely logical
}

//
export function Intro() {
    return (
        <div style={{ flexDirection: "column", backgroundColor: "black" }}>
            <div style={{ height: "100svh", width: "100%", position: "relative" }}>
                <div style={{ height: "100%", width: "100%", position: "absolute", left: -0 }}>
                    <Canvas>
                        <Scene bgColor="black" fgColor="#cccccc" />
                    </Canvas>
                </div>
                <div style={{ height: 0, width: "100%", position: "absolute", top: 0, backgroundColor: "black" }}></div>
                <div style={{ height: 0, width: "100%", position: "absolute", bottom: 0, backgroundColor: "black" }} />

                <div
                    style={{ color: "black", left: 0, bottom: 0, fontWeight: "bold", fontSize: 200, textAlign: "center", width: "100%", position: "absolute" }}
                >
                    <img style={{ width: 800, maxWidth: "100%" }} src={"sprout-logo.png"} />
                    <span></span>
                </div>
            </div>
        </div>
    );
}
export function WaveEffect() {
    return (
        <Canvas>
            <Scene bgColor="white" fgColor="#5596e0" />
        </Canvas>
    );
}

