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

const StyledContainer = styled.div`
    margin-right : 1rem;
    margin-left : 1rem;
    padding-top : ${(props: StyleProps) => props.padTop ? '1rem' : '0'};
    padding-bottom : 1rem;
    display : flex;
    justify-content : center;
    flex-direction : column;
    height : 100%;
    align-items : ${(props: StyleProps) => props.centerContent ? 'center' : 'stretch'};
    @media only screen and (min-width: 1200px) { 
        margin-right : clamp(1rem, 20vw, 15rem);
        margin-left : clamp(1rem, 20vw, 15rem);
        display : flex;
        justify-content : center;
        flex-direction : column;
        container-type : inline-size;
        padding-top : ${(props: StyleProps) => props.padTop ? '6rem' : '0'};
        
    }
`
const TopCurveBackgroundLight = styled('div')`
    background-image:  url("/curve_left.svg");
    background-position: top;
    background-repeat: no-repeat;
    background-color : #E5DBD1;
    background-size : 100%;
    container-type : inline-size;
`

const BottomCurveBackgroundLight = styled('div')`
    background-image:  url("/curve_right_light.svg");
    background-position: top;
    background-repeat: no-repeat;
    background-color : #E5DBD1;
    background-size : 100%;
    container-type : inline-size;
    min-height : 20vh;
`

const BottomCurveBackgroundDark = styled('div')`
    background-image:  url("/curve_right.svg");
    background-position: top;
    background-repeat: no-repeat;
    background-color : #1D1D1D;
    background-size : 100%;
    container-type : inline-size;
    min-height : 20vh;
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
