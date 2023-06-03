import styled from "@emotion/styled";
import ImageWithCard from "./ImageWithCard";

const StyledArticleSection = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    gap : ${props => props.theme.spacing.medium};
`

const ArticleSection = () => (
    <StyledArticleSection  >
        <ImageWithCard title="Sprout is us" text="We've all been in the business for a few years. Colleagues have come and gone, projects and companies have changed in a world where technology is ever evolving. We've stayed on that path, with its ups and downs, following our passion for software..." />
        <ImageWithCard mirror={true} title="The vision" text="We've all been in the business for a few years. Colleagues have come and gone, projects and companies have changed in a world where technology is ever evolving. We've stayed on that path, with its ups and downs, following our passion for software..." />

    </StyledArticleSection>
)

export default ArticleSection;