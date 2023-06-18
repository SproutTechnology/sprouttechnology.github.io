import { useEffect } from "react";

import styled from "@emotion/styled";
import { type ValueAnimationTransition, useAnimate } from "framer-motion";

const paths = [
    "M0 486.7C-25.7 458.2 -51.5 429.6 -71.7 406.7C-92 383.9 -106.8 366.8 -136.8 375.9C-166.9 384.9 -212.1 420.1 -243.4 421.5C-274.6 422.9 -291.8 390.5 -298.9 356.2C-306 321.9 -303.2 285.6 -307.9 258.4C-312.7 231.2 -325.1 212.9 -336.9 194.5C-348.6 176.1 -359.7 157.4 -383.4 139.5C-407.1 121.7 -443.5 104.7 -462.9 81.6C-482.2 58.5 -484.5 29.2 -486.7 0L0 0Z",
    "M0 486.7C-23.8 460 -47.5 433.2 -76.2 432.3C-104.9 431.4 -138.6 456.3 -165.2 453.9C-191.8 451.4 -211.2 421.5 -229 396.6C-246.8 371.8 -262.8 351.9 -279.6 333.2C-296.4 314.6 -314 297.1 -337.1 282.8C-360.1 268.6 -388.8 257.5 -414.8 239.5C-440.9 221.5 -464.4 196.5 -457.4 166.5C-450.4 136.4 -412.8 101.3 -412.6 72.8C-412.4 44.2 -449.6 22.1 -486.7 0L0 0Z",
    "M0 486.7C-30 483.5 -60 480.3 -80.6 457C-101.1 433.6 -112.1 390.1 -141.3 388.1C-170.4 386.1 -217.6 425.7 -243.4 421.5C-269.1 417.4 -273.5 369.6 -285.4 340.1C-297.3 310.7 -316.9 299.5 -340.9 286C-364.9 272.6 -393.5 256.7 -401.8 232C-410.2 207.3 -398.4 173.6 -405.9 147.8C-413.5 121.9 -440.3 103.9 -457 80.6C-473.6 57.3 -480.2 28.6 -486.7 0L0 0Z",
    "M0 486.7C-27.6 470.6 -55.2 454.4 -76.4 433.3C-97.6 412.2 -112.5 386.2 -139.5 383.4C-166.6 380.5 -205.8 400.8 -223.5 387.1C-241.2 373.4 -237.5 325.7 -260.3 310.2C-283.2 294.8 -332.7 311.5 -363.9 305.3C-395 299.1 -407.8 270 -421.5 243.4C-435.2 216.7 -449.8 192.5 -454.8 165.5C-459.8 138.6 -455.2 109 -458.9 80.9C-462.6 52.9 -474.7 26.4 -486.7 0L0 0Z",
];

const waveAnimationOpts: ValueAnimationTransition = {
    ease: "linear",
    duration: 1,
    times: [0, 0.16, 0.33, 0.5, 0.66, 0.83],
};

const Breakout = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
`;

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const StyledSVG = styled.svg`
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: visible;

    > path {
        fill: #e5dbd1;
        transform: translate(900px, 0) scale(3, 3);
    }

    @media (min-width: 1024px) {
        > path {
            transform: translate(900px, 0) scale(2, 2);
        }
    }
`;

export function MenuBackground({ isOpen }: { isOpen: boolean }) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        animate(
            scope.current,
            {
                d: isOpen ? paths : paths.slice().reverse(),
            },
            waveAnimationOpts,
        );
    }, [isOpen]);

    return (
        <Breakout>
            <Wrapper>
                <StyledSVG width="900" height="900" viewBox="0 0 900 900" preserveAspectRatio="xMaxYMin slice">
                    <path ref={scope} />
                </StyledSVG>
            </Wrapper>
        </Breakout>
    );
}
