import styled from "@emotion/styled";
import SectionLayout from "../components/SectionLayout";
import Article from "../components/Article";
import ViewContainer from "../components/ViewContainer";
import Footer from "@components/Footer";
import { mq } from "../theme";

function Contact() {
    return (
        <ViewContainer id="Contact">
            <SectionLayout fullWidthContent={<Footer></Footer>} bgColor="black">
                <ArticlesWrapper>
                    <Article heading="Contact" invertedColors={true}>
                        <p>
                            We want to hear more about your projects, your journey and your dreams! Let’s have a chat about how we can collaborate and help you
                            achieve them. Drop an e-mail, give us a call or book a meeting - become a part of our ecosystem.
                        </p>
                    </Article>
                    <Article headingRight heading="&nbsp;" invertedColors={true}>
                        <p>
                            <MainContact>hello@wearesprout.se</MainContact>
                            <ContactPerson>
                                natasha.diba@wearesprout.se
                                <br />
                                +4673-4058400
                            </ContactPerson>
                            <ContactPerson>
                                sara.ljungberg@wearesprout.se
                                <br />
                                +4676-8535530
                            </ContactPerson>
                            <ContactPerson>
                                oliver.stanisic@wearesprout.se
                                <br />
                                +4670-7508261
                            </ContactPerson>
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

const MainContact = styled.span`
    display: block;
    margin-bottom: ${(props) => props.theme.spacing.sm};
    word-break: break-all;
`;

const ContactPerson = styled.span`
    display: block;
    background: #ebebeb;
    color: #141517;
    padding: 5px;
    margin-bottom: ${(props) => props.theme.spacing.xs};
    word-break: break-all;
`;
