import { ReactNode } from "react";
import styled from "@emotion/styled";
import CurveBackground from "../enums/CurveBackground";


interface Props {
    children: ReactNode;
    padTop: Boolean,
    centerContent: Boolean,
    curveBackground? : CurveBackground
    light: Boolean,
}

interface StyleProps {
    padTop: Boolean,
    centerContent: Boolean,
}

const StyledContainer = styled('div')`
    margin-right : 2rem;
    margin-left : 2rem;
    padding-top : ${(props) => props.padTop ? '1rem' : '0'};
    padding-bottom : 1rem;
    display : flex;
    justify-content : center;
    flex-direction : column;
    height : 100%;
    align-items : ${(props) => props.centerContent ? 'center' : 'stretch'};
    @media only screen and (min-width: ${(props) => props.theme.breakpoints.sm}) { 
        margin-right : 6rem;
        margin-left : 6rem;
    }
    @media only screen and (min-width: ${(props) => props.theme.breakpoints.md}) { 
        margin-right : 6rem;
        margin-left : 6rem;
    }
    @media only screen and (min-width: ${(props) => props.theme.breakpoints.lg}) { 
        margin-right : 7rem;
        margin-left : 7rem;
        display : flex;
        justify-content : center;
        flex-direction : column;
       
        padding-top : ${(props: StyleProps) => props.padTop ? '6rem' : '0'};
        
    }
`
const TopCurveBackgroundLight = styled('div')`
    background-image:  url("/curve_left.svg");
    background-position: top;
    background-repeat: no-repeat;
    background-color : #E5DBD1;
    background-size : 100%;
   
   
`

const BottomCurveBackgroundLight = styled('div')`
    background-image:  url("/curve_right_light.svg");
    background-position: top;
    background-repeat: no-repeat;
    background-color : #E5DBD1;
    background-size : 100%;
  
    min-height : 35rem;
    display: flex;
    flex-direction: column;
    justify-content: end;
    
    
`

const BottomCurveBackgroundDark = styled('div')`
    background-image:  url("/curve_right.svg");
    background-position: top;
    background-repeat: no-repeat;
    background-color : #1D1D1D;
    background-size : 100%;
 
    min-height : 35rem;
    display: flex;
    flex-direction: column;
    justify-content: end;
  
`

function Container({ children, centerContent, padTop, curveBackground, light }: Props) {

    if (curveBackground === CurveBackground.Top) return (
        <TopCurveBackgroundLight>
            <StyledContainer centerContent={centerContent} padTop={padTop}  >
                {children}
            </StyledContainer>
        </TopCurveBackgroundLight>
    )

    if (curveBackground === CurveBackground.Bottom && light) return (
        <BottomCurveBackgroundLight>
            <StyledContainer centerContent={centerContent} padTop={padTop}  >
                {children}
            </StyledContainer>
        </BottomCurveBackgroundLight>
    )

    if (curveBackground === CurveBackground.Bottom && !light) return (
        <BottomCurveBackgroundDark>
            <StyledContainer centerContent={centerContent} padTop={padTop}  >
                {children}
            </StyledContainer>
        </BottomCurveBackgroundDark>
    )

    return (
        <StyledContainer centerContent={centerContent} padTop={padTop}  >
            {children}
        </StyledContainer>
    );
}

export default Container;
