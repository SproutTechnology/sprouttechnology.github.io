import FluidCenterContainer from "./FluidCenterContainer";
import ArticleSection from "./article/ArticleSection";
import CurveBackground from "../enums/CurveBackground";
import styled from "@emotion/styled";
import theme from "../emotion.d";

const Main = styled.div`
    background-color: ${theme.backgroundColors.livingRoom};
`;

const MainContent = () => (
    <Main>
        <FluidCenterContainer light={false} curveBackground={CurveBackground.Top} padTop={true} centerContent={false}>
            <ArticleSection></ArticleSection>
        </FluidCenterContainer>
    </Main>
);

export default MainContent;
