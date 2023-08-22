import Showcase from "../Showcase";
import { css } from "@emotion/react";

const hero = () => css`
    background-color: #2a2a2a;
    position: relative;
    width: 100%;
    padding-top: 80px;
    height: 150vw;

    @media (min-width: 768px) {
        height: 90vh;
    }
`;

function Hero() {
    return (
        <div css={hero}>
            <Showcase />
        </div>
    );
}

export default Hero;
