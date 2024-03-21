import styled from "@emotion/styled";
import SectionLayout from "../components/SectionLayout";
import Article from "../components/Article";
import ViewContainer from "../components/ViewContainer";
import { mq } from "../theme";

function OurVision() {
    return (
        <ViewContainer id="OurVision">
            <StyledSectionLayout bgColor="white" desktopBackgroundUrl="/tempwave.svg" mobileBackgroundUrl="/tempwave.svg">
                <ArticlesWrapper>
                    <Article heading="Our vision">
                        <p>
                            We thrive together and, powered by our <em>our chemistry and passion</em>, we want to build exciting things. Using our collective as
                            a platform, we aim to expand our capabilities with new people, ideas and perspectives. That&apos;s where you come in,{" "}
                            <em>evolving Sprout</em> into an even better version.
                        </p>
                    </Article>
                    <Article headingRight heading="&nbsp;">
                        <p>
                            As a Sprout partner, this means having the <em>full power of Sprout at your side</em>, in business ventures, projects or product
                            development efforts. With an experienced set of professionals to back you, no dream is to big! When we join forces,{" "}
                            <em>anything is possible</em>.
                        </p>
                    </Article>
                </ArticlesWrapper>
            </StyledSectionLayout>
        </ViewContainer>
    );
}

export default OurVision;

const ArticlesWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 0;
    margin-bottom: 2rem;

    ${mq["sm"]} {
        flex-direction: row;
        gap: 5rem;
    }
`;

const StyledSectionLayout = styled(SectionLayout)`
    background-position: bottom;
    background-size: 100% auto;

    ${mq["sm"]} {
        background-position: bottom;
        background-size: 100% auto;
    }
`;
