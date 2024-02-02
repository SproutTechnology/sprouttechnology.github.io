import styled from "@emotion/styled";
import SectionLayout from "../components/SectionLayout";
import Article from "../components/Article";
import ViewContainer from "../components/ViewContainer";
function Contact() {
    return (
        <ViewContainer id="Contact">
            <SectionLayout fullWidthContent={<img style={{ width: "100%" }} src="/tempwave.svg"></img>} bgColor="white">
                <ArticlesWrapper>
                    <Article heading="Contact_">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dignissimos corporis vel?</p>
                    </Article>
                </ArticlesWrapper>
            </SectionLayout>
        </ViewContainer>
    );
}

export default Contact;

const ArticlesWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 5rem;
    margin-bottom: 2rem;
`;
