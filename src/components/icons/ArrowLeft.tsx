import { css } from "@emotion/react";
import styled from "@emotion/styled";

const ArrowLeft = ({ onClick }: { onClick?: () => void }) => (
    <ArrowWrapper onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="#FFF">
            <title>4-Arrow Left</title>
            <g id="_4-Arrow_Left" data-name="4-Arrow Left">
                <path d="M32,15H3.41l8.29-8.29L10.29,5.29l-10,10a1,1,0,0,0,0,1.41l10,10,1.41-1.41L3.41,17H32Z" />
            </g>
        </svg>
    </ArrowWrapper>
);

export default ArrowLeft;

const ArrowWrapper = styled.div(() => [
    css`
        width: 32px;

        &:hover {
            cursor: pointer;
        }
    `,
]);
