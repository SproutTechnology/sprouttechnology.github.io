import { ReactNode } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
interface Props {
    children: ReactNode;
    padTop: Boolean,
    centerContent: Boolean,
   
}

interface StyleProps {
    padTop: Boolean,
    centerContent: Boolean,
}

const StyledContainer = styled('div')`
    margin-right : 1rem;
    margin-left : 1rem;
    padding-top : ${(props : StyleProps) => props.padTop ? '1rem' : '0'};
    padding-bottom : 1rem;
    display : flex;
    justify-content : center;
    flex-direction : column;
    height : 100%;
    
    align-items : ${(props : StyleProps) => props.centerContent ? 'center' : 'stretch'};
    @media only screen and (min-width: 1200px) { 
        display : flex;
        justify-content : center;
        flex-direction : column;
        container-type : inline-size;
        padding-top : ${(props : StyleProps) => props.padTop ? '6rem' : '0'};
        margin-right : 15vw;
        margin-left : 15vw;
    }
`






function Container({ children, centerContent,padTop }: Props) {
    return (
        <StyledContainer centerContent={centerContent} padTop={padTop}  >
            {children}
        </StyledContainer>
    );
}

export default Container;
