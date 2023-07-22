import { Suspense, lazy } from "react";
import styled from "@emotion/styled";

const ShowcaseWrapper = styled.div`
    background-color: ${(props) => props.theme.backgroundColors.charcoal};
    display: flex;
    justify-content: center;
    width: 100%;
`;

const LazyIntro = lazy(() => import("./Intro/Index"));

function Showcase() {
    return (
        <ShowcaseWrapper>
            <Suspense fallback={null}>
                <LazyIntro />
            </Suspense>
        </ShowcaseWrapper>
    );
}

export default Showcase;
