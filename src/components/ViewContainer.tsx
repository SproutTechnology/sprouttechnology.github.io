

import styled from "@emotion/styled";
import { ReactNode } from "react";


interface Props {
    children: ReactNode;
    dismissOnClick? : boolean;
    onClickHandler? : ()=> void;
}



function ViewContainer({onClickHandler, children, dismissOnClick}: Props) {
    function onClick() {
        if(dismissOnClick) {
            let pageHeight = window.innerHeight;
            scroll(0, pageHeight)
            if(onClickHandler) onClickHandler()
        }
    }
    return (
        <StyledViewContainer onClick={onClick}>
            {children}
        </StyledViewContainer>
    );
}


export default ViewContainer;




const StyledViewContainer = styled.div` 
    min-height : 100svh;
    background-color: black;
    display : flex;
    flex-direction : column;
    `;
