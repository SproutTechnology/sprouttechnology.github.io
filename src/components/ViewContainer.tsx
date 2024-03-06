import styled from "@emotion/styled";
import { ReactNode } from "react";

interface Props {
    id?: string;
    children: ReactNode;
    dismissOnClick?: boolean;
    onClickHandler?: () => void;
}

function ViewContainer({ id, onClickHandler, children, dismissOnClick }: Props) {
    function onClick() {
        if (dismissOnClick) {
            const pageHeight = window.innerHeight;
            scroll(0, pageHeight);
            if (onClickHandler) onClickHandler();
        }
    }
    return (
        <StyledViewContainer id={id} onClick={onClick} data-type="ViewContainer">
            {children}
        </StyledViewContainer>
    );
}

export default ViewContainer;

const StyledViewContainer = styled.div`
    min-height: 100svh;
    background-color: white;
    display: flex;
    flex-direction: column;
`;
