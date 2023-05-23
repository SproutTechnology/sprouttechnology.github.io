


import ImageWithCard from "./ImageWithCard";
import { css } from "@emotion/react";
import TopCurveContainer from "./TopCurveContainer";
import { HeaderText } from "./HeaderText";
import Container from "./Container";
const mainContent = css`
  background-image : url("/src/assets/header.svg");
  background-repeat : no-repeat;
  background-position : top;
  background-color : #E5DBD1;
  background-size : 100%;
  container-type : inline-size;
 

`
const test = css`
background-color : #E5DBD1;

`

const test2 = css`
gap : 2rem;
display : flex;
flex-direction : column;
`

const header = css`
 background-color : #1D1D1D;
 display : flex;
 flex-direction : column;
 gap : 1rem;
 container-type : inline-size;
`

const MainContent = () => (
    <div css={test}>
        <div css={header}>
            <Container padTop={false} centerContent={true}>
                <div>
                <HeaderText text="We are Sprout" color="white" type="h1"></HeaderText>
                <h2 className=" text-right">
                    Welcome to our universe. A growing ecosystem of collaborationg people,
                    ideas and initiatives
                </h2>
                </div>
            </Container>
        </div>
        <TopCurveContainer padTop={true} centerContent={false}>
            <div css={test2}>
                <ImageWithCard></ImageWithCard>
                <ImageWithCard mirror={true}></ImageWithCard>
            </div>
        </TopCurveContainer>
    </div >
)

export default MainContent