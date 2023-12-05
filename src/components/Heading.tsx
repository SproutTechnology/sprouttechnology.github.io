

import styled from "@emotion/styled";

interface Props {
    color: string;
    preText? : string;
 
   
}
function Heading({color, preText } : Props) {
    return (
        <StyledHeading color={color}>
            {preText && <PreLogoText>{preText}</PreLogoText> }
            <span>Sprout.</span>
        </StyledHeading>   
    );
}


export default Heading;

const PreLogoText = styled.span`
    font-family :  ${(props) => props.theme.emphasizedHeadline.font};
    font-size : ${(props) => props.theme.emphasizedHeadline.fontSize};
    color : ${(props) => props.theme.emphasizedHeadline.color};
`

const StyledHeading = styled.h1`
    margin : unset;
    display : flex;
    gap : 1rem;
    align-items :baseline;
    color : ${(props) => props.color};
    font-size : ${(props) => props.theme.logo.fontSize};
    text-align : center;
    font-family : arial;
    font-weight : 800;
   
`


