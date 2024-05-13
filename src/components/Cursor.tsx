import styled from "@emotion/styled";

function Cursor() {
    return <StyledCursor>_</StyledCursor>;
}

export default Cursor;

const StyledCursor = styled.span`
    animation-name: blink;
    animation-duration: 800ms;
    animation-iteration-count: infinite;
    opacity: 1;
`;
