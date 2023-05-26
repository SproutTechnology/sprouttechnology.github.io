import styled from "@emotion/styled";
import ImageWithCard from "./ImageWithCard";

const StyledArticleSection = styled.div`
    display : flex;
    flex-direction : column;
    gap : ${props => props.theme.spacing.medium};
`

const ArticleSection = () => (
    <StyledArticleSection  >
        <ImageWithCard />
        <ImageWithCard mirror={true} />
    </StyledArticleSection>
)

export default ArticleSection;