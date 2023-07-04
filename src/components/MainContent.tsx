import FluidCenterContainer from "./FluidCenterContainer";
import ArticleSection from "./ArticleSection";
import CurveBackground from "../enums/CurveBackground";
import styled from "@emotion/styled";

interface Props {
    backgroundColor: string,
}


const Main = styled.div`
    padding-bottom : 10rem;
    background-color: ${(props : Props) => props.backgroundColor};
`

const MainContent = ({ backgroundColor }: Props) => (
    <Main backgroundColor={backgroundColor}>
        <FluidCenterContainer light={false} curveBackground={CurveBackground.Top} padTop={true} centerContent={false}>
            <ArticleSection></ArticleSection>
        </FluidCenterContainer>
    </Main>
);

export default MainContent;
