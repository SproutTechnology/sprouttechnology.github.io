import { AsciiEffect } from "./AsciiEffect.js";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text3D } from "@react-three/drei/core/Text3D";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

const asciiRenderOptions = {
    fgColor: "rgb(255,255,255,0)",
    bgColor: "rgb(0,0,0,0)",
};

const BASE_RESOLUTION = 0.2;
const xlarge = ["(min-width: 1280px)", 0.12] as const;
const large = ["(min-width: 1024px)", 0.15] as const;
const medium = ["(min-width: 768px)", 0.17] as const;

const resolutions = [xlarge, large, medium].map(([mq, res]) => [window.matchMedia(mq), res] as const);

const useResolution = () => {
    const subscribe = useCallback((callback: VoidFunction) => {
        resolutions.forEach(([mq]) => {
            // if ("addEventListener" in mq) {
            mq.addEventListener("change", callback);
            // } else {
            // TODO: @ts-expect-error up to safari 13 compat
            // mq.addListener(callback);
            // }
        });

        return () => {
            resolutions.forEach(([mq]) => {
                // if ("removeEventListener" in mq) {
                mq.removeEventListener("change", callback);
                // } else {
                // TODO: @ts-expect-error up to safari 13 compat
                // mq.removeListener(callback);
                // }
            });
        };
    }, []);

    return useSyncExternalStore(subscribe, () => {
        const matching = resolutions.find(([mq]) => mq.matches);

        if (!matching) return BASE_RESOLUTION;

        return matching[1];
    });
};

const characterList = [" ", "A"];

function useAsciiRenderer({ renderIndex = 1, bgColor = "black", fgColor = "white", invert = false, color = true }) {
    // Reactive state
    const { size, gl, scene, camera } = useThree();
    const resolution = useResolution();

    // Create effect
    const effect = useMemo(() => {
        const effect = new AsciiEffect(gl, characterList, {
            // invert,
            // color,
            resolution,
            strResolution: "low",
        });

        effect.domElement.style.position = "absolute";
        effect.domElement.style.top = "0px";
        effect.domElement.style.left = "0px";
        effect.domElement.style.pointerEvents = "none";

        return effect;
    }, [invert, color, resolution]);

    // Styling
    useLayoutEffect(() => {
        effect.domElement.style.color = fgColor;
        effect.domElement.style.backgroundColor = bgColor;
    }, [fgColor, bgColor]);

    // Append on mount, remove on unmount
    useEffect(() => {
        gl.domElement.style.opacity = "0";
        if (gl.domElement?.parentNode) gl.domElement.parentNode.appendChild(effect.domElement);
        return () => {
            gl.domElement.style.opacity = "1";
            if (gl.domElement?.parentNode) gl.domElement.parentNode.removeChild(effect.domElement);
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

    return null;
}

const Stuff = () => {
    const { size } = useThree();

    const [lightIntensity, setLightIntensity] = useState(0);

    const [light1x, setLight1x] = useState(0);
    const [light1y, setLight1y] = useState(0);

    const [light2x, setLight2x] = useState(0);
    const [light2y, setLight2y] = useState(0);

    const timer = useRef(0);

    useFrame((state, delta) => {
        timer.current += delta * 1500;

        const light1x = (state.pointer.x * size.width) / 250 - 0.5;
        const light1y = (state.pointer.y * size.height) / 250;

        setLight1x(light1x);
        setLight1y(light1y);

        const light2x = -Math.sin(timer.current * 0.0001) * 6;
        const light2y = -Math.cos(timer.current * 0.0004) * 3;

        setLight2x(light2x);
        setLight2y(light2y);

        setLightIntensity(timer.current * 1.0001);
    });

    useAsciiRenderer(asciiRenderOptions);

    return (
        <>
            <spotLight position={[light2y, -light2x, 2]} angle={0.3} intensity={Math.min(0.3, lightIntensity)} />
            <pointLight position={[0, 0, 10]} intensity={Math.min(0.8, lightIntensity)} distance={20} decay={1} />
            <pointLight position={[light1x, light1y, 2]} intensity={Math.min(2.0, lightIntensity)} distance={3} decay={0.4} />

            <Text3D
                visible={true}
                rotation={[0, 0, 0]}
                position={[-3.2, -3.2, 0]}
                font={"/custom-fonts/sprout-logo/sprout-logo-glyph.json"}
                curveSegments={3}
                bevelEnabled
                bevelSize={0.1}
                bevelThickness={0.1}
                height={0.2}
                lineHeight={0.5}
                letterSpacing={0.4}
                size={4.5}
            >
                A
                <meshStandardMaterial color={"grey"} />
            </Text3D>
        </>
    );
};

function Intro() {
    return (
        <Canvas
            style={{
                display: "flex",
                aspectRatio: 1 / 1,
                maxHeight: "90vh",
                userSelect: "none",
            }}
            camera={{ position: [0, 0, 4.8] }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Stuff />
        </Canvas>
    );
}

export default Intro;
