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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </Article>
                    <Article headingRight heading="&nbsp;">
                        <p>
                            sprout.info@gmail.com
                            <br />
                            +46123123123
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
