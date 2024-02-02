import styled from "@emotion/styled";
import SectionLayout from "../components/SectionLayout";
import Article from "../components/Article";
import ViewContainer from "../components/ViewContainer";
function OurVision() {
    return (
        <ViewContainer id="OurVision">
            <SectionLayout fullWidthContent={<img style={{ width: "100%" }} src="/tempwave.svg"></img>} bgColor="white">
                <ArticlesWrapper>
                    <Article heading="Our vision_">
                        <p>
                            We thrive together and, powered by our <em>our chemistry and passion</em>, we want to build exciting things. Using our collective as
                            a platform, we aim to expand our capabilities with new people, ideas and perspectives. That&apos;s where you come in,{" "}
                            <em>evolving Sprout</em>
                            into an even better version.
                        </p>
                    </Article>
                    <Article headingRight heading=">Next page_">
                        <p>
                            As a Sprout partner, this means having the <em>full power of Sprout at your side</em>, in business ventures, projects or product
                            development efforts. With an experienced set of professionals to back you, no dream is to big! When we join forces,{" "}
                            <em>anything is possible</em>.
                        </p>
                    </Article>
                </ArticlesWrapper>
            </SectionLayout>
        </ViewContainer>
    );
}

export default OurVision;

const ArticlesWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 5rem;
    margin-bottom: 2rem;
`;
