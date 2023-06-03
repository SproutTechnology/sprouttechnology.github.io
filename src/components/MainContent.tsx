


import FluidCenterContainer from "./FluidCenterContainer";
import ArticleSection  from "./ArticleSection";
import CurveBackground from "../enums/CurveBackground";
import styled from "@emotion/styled";

const Main = styled.div`
    margin-bottom : 10rem;
`

const MainContent = () => (
    <Main> 
        <FluidCenterContainer curveBackground={CurveBackground.Top} padTop={true} centerContent={false}>
            <ArticleSection></ArticleSection>
        </FluidCenterContainer>
    </Main>
)

export default MainContent