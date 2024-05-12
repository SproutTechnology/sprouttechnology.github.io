import styled from "@emotion/styled";
import SectionLayout from "../components/SectionLayout";
import Article from "../components/Article";
import ViewContainer from "../components/ViewContainer";
import { mq } from "../theme";
import { WaveEffect } from "../components/Intro/Index";

function OurVision() {
    return (
        <ViewContainer id="OurVision">
            <StyledSectionLayout bgColor="#fff0">
                <ArticlesWrapper>
                    <Article heading="Our vision">
                        <p>
                            We thrive together and, powered by our <em>chemistry and passion</em>, we want to build exciting things. Using our collective as a
                            platform, we aim to expand our capabilities with new people, ideas and perspectives. That&apos;s where you come in,{" "}
                            <em>evolving Sprout</em> into an even better version.
                        </p>
                    </Article>
                    <Article headingRight heading="&nbsp;">
                        <p>
                            As a Sprout partner, this means having the <em>full power of Sprout at your side</em>, in business ventures, projects or product
                            development efforts. With an experienced set of professionals to back you, no dream is too big! When we join forces,{" "}
                            <em>anything is possible</em>.
                        </p>
                    </Article>
                </ArticlesWrapper>
            </StyledSectionLayout>
            <WaveHolder>
                <WaveEffect />
            </WaveHolder>
        </ViewContainer>
    );
}

export default OurVision;

const ArticlesWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 0rem;
    margin-bottom: 2rem;

    ${mq["sm"]} {
        flex-direction: row;
        gap: 5rem;
    }
`;

const StyledSectionLayout = styled(SectionLayout)`
    background-position: bottom;
    background-size: 100% auto;
    z-index: 10;
`;

const WaveHolder = styled.div`
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 20vh;
    position: absolute;
    bottom: 0;

    ${mq["sm"]} {
        height: 40vh;
    }
`;
