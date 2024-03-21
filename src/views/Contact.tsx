import styled from "@emotion/styled";
import SectionLayout from "../components/SectionLayout";
import Article from "../components/Article";
import ViewContainer from "../components/ViewContainer";
import Footer from "@components/Footer";
import { mq } from "../theme";

function Contact() {
    return (
        <ViewContainer id="Contact">
            <SectionLayout fullWidthContent={<Footer></Footer>} bgColor="white">
                <ArticlesWrapper>
                    <Article heading="Contact_">
                        <p>
                            We want to hear more about your projects, your journey and your dreams! Let’s have a chat about how we can collaborate and help you
                            achieve them. Drop an e-mail, give us a call or book a meeting - become a part of our ecosystem.
                        </p>
                    </Article>
                    <Article headingRight heading="&nbsp;">
                        <p>
                            hello@wearesprout.se
                            <br />
                            <br />
                            <StyledSpan>
                                natasha.diba@wearesprout.se
                                <br />
                                +4673-4058400
                            </StyledSpan>
                            <StyledSpan>
                                sara.ljungberg@wearesprout.se
                                <br />
                                +4676-8535530
                            </StyledSpan>
                            <StyledSpan>
                                oliver.stanisic@wearesprout.se
                                <br />
                                +4670-7508261
                            </StyledSpan>
                        </p>
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
    flex-direction: column;
    gap: 0;
    margin-bottom: 2rem;

    ${mq["sm"]} {
        gap: 5rem;
        flex-direction: row;
    }
`;

const StyledSpan = styled.span`
    display: block;
    background: #ebebeb;
    padding: 5px;
    margin-bottom: 5px;
    word-break: break-all;
`;
