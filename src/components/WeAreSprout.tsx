

import styled from "@emotion/styled";
import SectionLayout from "./SectionLayout";
import { mq } from "../theme";
import Heading from "./Heading";
import Article from "./Article";

function WeAreSprout() {
    return (
        <SectionLayout>
            <ArticlesWrapper>
                <Article heading="We are sprout_" text="We've all been in the business for a few years. Colleagues have come and gone, projects and companies have changed in a world where technology is ever evolving. We've stayed on that path, with its ups and downs, following our passion for software."></Article>
                <Article heading=">Next page_" text="Somewhere along that path we met people that made a mark. People that inspired and challenged us, made us better or simply put a smile on our face."></Article>
            </ArticlesWrapper>
        </SectionLayout>
    );
}


export default WeAreSprout;

const ArticlesWrapper = styled.div`
    display : flex;
   
    gap : 5rem;
`
