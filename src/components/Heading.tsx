

import styled from "@emotion/styled";
import { mq } from "../theme";

function Heading() {
    return (
        <StyledHeading>
            <span>Sprout</span>
            <Logo src="/heading.svg"/>
        </StyledHeading>   
    );
}


export default Heading;


const Logo = styled.img`
    ${({ theme }) => `
        width : 100%;
        height : 5rem;
        max-width : ${theme.breakpoints.sm};
        ${mq["xs"]} { 
            height : auto;
        }
    `} 
`
const StyledHeading = styled.h1`
    margin : unset;   
    & span {
        display : none;
    }
`


