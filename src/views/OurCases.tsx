import styled from "@emotion/styled";
import SectionLayout from "@components/SectionLayout";
import Article from "@components/Article";
import ViewContainer from "@components/ViewContainer";
import CaseBanner from "@components/CaseBanner";
import { mq } from "../theme";

function OurCases() {
    return (
        <ViewContainer id="OurCases">
            <SectionLayout fullWidthContent={<CaseBanner></CaseBanner>} bgColor="white">
                <ArticlesWrapper>
                    <Article heading="Our cases_">
                        <p>
                            Hiring us is not like hiring anyone else. We hit the ground running and make an impact from day one. We bring{" "}
                            <em>energy positivity and professionalism</em> to any project. And if you hire a whole Sprout team - watch that energy
                        </p>
                    </Article>
                </ArticlesWrapper>
            </SectionLayout>
        </ViewContainer>
    );
}

export default OurCases;

const ArticlesWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 5rem;
    flex-direction: column;
    margin-bottom: 2rem;

    ${mq["sm"]} {
        flex-direction: row;
        width: 50%;
    }
`;
