


import FluidCenterContainer from "./FluidCenterContainer";
import ArticleSection  from "./ArticleSection";
import CurveBackground from "../enums/CurveBackground";

const MainContent = () => (
    <div>
       
        <FluidCenterContainer curveBackground={CurveBackground.Top} padTop={true} centerContent={false}>
           <ArticleSection></ArticleSection>
        </FluidCenterContainer>
    </div>
)

export default MainContent