import { Suspense, lazy } from "react";
import styled from "@emotion/styled";
import { FadeScale } from "./helpers/Fader";

const ShowcaseWrapper = styled(FadeScale)`
    // background-color: ${(props) => props.theme.backgroundColors.charcoal};
    display: flex;
    justify-content: center;
    width: 100%;
    height: 85%;
    margin: auto;
    z-index: 10;
    position: relative;
`;

const LazyIntro = lazy(() => import("./Intro/Index"));

function Showcase() {
    return (
        <ShowcaseWrapper id="hero" delay="0.35">
            <Suspense fallback={null}>
                <LazyIntro />
            </Suspense>
        </ShowcaseWrapper>
    );
}

export default Showcase;
