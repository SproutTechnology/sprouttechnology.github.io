import { Suspense, lazy } from "react";
import styled from "@emotion/styled";
import { FadeScale } from "./helpers/Fader";

const ShowcaseWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: auto;
    z-index: 10;
    position: relative;
    margin-top: 3rem;

    @media (min-width: 768px) {
        height: 85%;
        margin-top: 0;
    }
`;

const LazyIntro = lazy(() => import("./Intro/Index"));

function Showcase() {
    return (
        <ShowcaseWrapper id="hero">
            <Suspense fallback={null}>
                <LazyIntro />
            </Suspense>
        </ShowcaseWrapper>
    );
}

export default Showcase;
