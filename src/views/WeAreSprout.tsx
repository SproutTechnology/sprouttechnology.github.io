

import styled from "@emotion/styled";
import SectionLayout from "../components/SectionLayout";
import Article from "../components/Article";
import ViewContainer from "../components/ViewContainer";
import ImageBanner from "../components/ImagesBanner";
import { mq } from "../theme";

function WeAreSprout() {
    console.log(mq["sm"])
    return (
        <ViewContainer id="About">
            <SectionLayout fullWidthContent={<ImageBanner></ImageBanner>} bgColor="white">
                <ArticlesWrapper>
                    <Article heading="We are sprout_">
                        <span>
                            We've all been in the business for a few years.
                            Colleagues have come and gone, projects and companies have changed in a world where technology is ever evolving.
                            We've stayed on that path, with its ups and downs, <em>following our passion for software.</em>
                        </span>
                    </Article>
                    <Article headingRight heading=">Next page_">
                        <span>
                            Somewhere along that path we met people that made a mark. 
                            <em>People that inspired and challenged us</em>
                            , made us better or simply put a smile on our face.
                        </span>

                    </Article>
                </ArticlesWrapper>
            </SectionLayout>   
        </ViewContainer>
    );
}


export default WeAreSprout;



const ArticlesWrapper = styled.div`
    display : flex;
    justify-content : space-between;
    flex-wrap : wrap;
    gap : 5rem;
    margin-bottom : 2rem;
    ${mq["sm"]} { 
        flex-wrap : nowrap
    }
`
