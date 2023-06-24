import FluidCenterContainer from "./FluidCenterContainer";
import ArticleSection from "./ArticleSection";
import CurveBackground from "../enums/CurveBackground";

const MainContent = () => (
    <>
        <FluidCenterContainer curveBackground={CurveBackground.Top} padTop={true} centerContent={false}>
            <ArticleSection></ArticleSection>
        </FluidCenterContainer>
    </>
);

export default MainContent;
