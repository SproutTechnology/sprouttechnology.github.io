import { useEffect } from "react";

import styled from "@emotion/styled";
import { type ValueAnimationTransition, useAnimate } from "framer-motion";

const paths = [
    "M0 20L50 25.2C100 30.3 200 40.7 300 43.5C400 46.3 500 41.7 600 39.2C700 36.7 800 36.3 850 36.2L900 36L900 0L850 0C800 0 700 0 600 0C500 0 400 0 300 0C200 0 100 0 50 0L0 0Z",
    "M0 62L50 77.7C100 93.3 200 124.7 300 133C400 141.3 500 126.7 600 118.8C700 111 800 110 850 109.5L900 109L900 0L850 0C800 0 700 0 600 0C500 0 400 0 300 0C200 0 100 0 50 0L0 0Z",
    "M0 126L50 157.2C100 188.3 200 250.7 300 267.2C400 283.7 500 254.3 600 238.8C700 223.3 800 221.7 850 220.8L900 220L900 0L850 0C800 0 700 0 600 0C500 0 400 0 300 0C200 0 100 0 50 0L0 0Z",
    "M0 189L50 235.8C100 282.7 200 376.3 300 401.2C400 426 500 382 600 358.7C700 335.3 800 332.7 850 331.3L900 330L900 0L850 0C800 0 700 0 600 0C500 0 400 0 300 0C200 0 100 0 50 0L0 0Z",
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
            transform: translate(-900px, 0) scale(2, 2);
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
