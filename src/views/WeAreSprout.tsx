import styled from "@emotion/styled";
import SectionLayout from "../components/SectionLayout";
import Article from "../components/Article";
import ViewContainer from "../components/ViewContainer";
import ImageBanner from "../components/ImagesBanner";
import { mq } from "../theme";

function WeAreSprout() {
    return (
        <ViewContainer id="About">
            <SectionLayout fullWidthContent={<ImageBanner></ImageBanner>} bgColor="white">
                <ArticlesWrapper>
                    <Article heading="We are Sprout">
                        <p>
                            As trends and technology have emerged and evolved, projects and colleagues have come and gone, we&apos;ve stayed on our path,
                            following our <em>passion for software</em>.
                        </p>
                        <p>
                            Somewhere along that path, we met <em>people</em> that made a mark.
                        </p>
                    </Article>
                    <Article headingRight heading="&nbsp;">
                        <p>
                            People that challenged us, made us better or simply put a smile on our face. We&apos;ve realized <em>it&apos;s all about them</em>.
                            Those people. <em>Us</em>.
                        </p>
                        <p>
                            Sprout is a <em>collaborative, creative platform</em> that builds upon that insight.
                        </p>
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
    flex-direction: column;
    gap: 0;
    margin-bottom: 2rem;

    ${mq["sm"]} {
        flex-direction: row;
        gap: 5rem;
    }
`;
