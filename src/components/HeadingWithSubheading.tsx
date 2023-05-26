


import FluidCenterContainer from "./FluidCenterContainer";
import styled from "@emotion/styled";

interface Props {
    text : string,
    textColor : string,
    backgroundColor : string,
    subheading : string,
}

interface StyledHeaderProps  {
    backgroundColor : string,
}


const StyledHeader = styled.div`
    container-type : inline-size;
    background-color : ${(props : StyledHeaderProps) => props.backgroundColor};
    color : 
    display : flex;
    flex-direction : column;
    gap : 1rem;
`

const MainAndSubHeadingWrapper = styled.div`
    display : flex;
    width : 100%;
    flex-direction : column;
    align-items : center;
`

const MainHeading = styled.h1`
  font-size: ${props => props.theme.fontSize.h1};
  color : ${props => props.color};
  margin : unset;
`

const SubHeading = styled.h2`
  font-size: ${props => props.theme.fontSize.h2};
  color : ${props => props.color};
  align-self : flex-end;
  max-width : 35rem;
`


const HeadingWithSubheading = ({text, textColor, backgroundColor, subheading} : Props) => (
    <StyledHeader backgroundColor={backgroundColor}>
        <FluidCenterContainer padTop={false} centerContent={true}>
            <MainAndSubHeadingWrapper>
                <MainHeading color={textColor}>{text}</MainHeading>
                <SubHeading color={textColor}>{subheading}</SubHeading>
            </MainAndSubHeadingWrapper>
        </FluidCenterContainer>
    </StyledHeader>
)

export default HeadingWithSubheading