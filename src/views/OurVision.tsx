import styled from "@emotion/styled";
import SectionLayout from "../components/SectionLayout";
import Article from "../components/Article";
import ViewContainer from "../components/ViewContainer";
function WeAreSprout() {
    return (
        <ViewContainer id="OurVision">
            <SectionLayout fullWidthContent={<img style={{ width: "100%" }} src="/tempwave.svg"></img>} bgColor="white">
                <ArticlesWrapper>
                    <Article heading="Our vision_">
                        <span>
                            We&apos;ve all been in the business for a few years. Colleagues have come and gone, projects and companies have changed in a world
                            where technology is ever evolving. We&apos;ve stayed on that path, with its ups and downs,{" "}
                            <em>following our passion for software.</em>
                        </span>
                    </Article>
                    <Article headingRight heading=">Next page_">
                        <span>
                            Somewhere along that path we met people that made a mark.
                            <em>People that inspired and challenged us</em>, made us better or simply put a smile on our face.
                        </span>
                    </Article>
                </ArticlesWrapper>
            </SectionLayout>
        </ViewContainer>
    );
}

export default WeAreSprout;

const ArticlesWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 5rem;
    margin-bottom: 2rem;
`;
