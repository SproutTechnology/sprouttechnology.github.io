import styled from "@emotion/styled";
import ImageWithCard from "./ImageWithCard";
import LinkToPage from "../enums/LinkToPage";

const StyledArticleSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${(props) => props.theme.spacing.large};
`;

const ArticleSection = () => (
    <StyledArticleSection>
        <ImageWithCard
            linkTo={LinkToPage.SproutIsUs}
            title="Sprout is us"
            text="We've all been in the business for a few years. Colleagues have come and gone, projects and companies have changed in a world where technology is ever evolving. We've stayed on that path, with its ups and downs, following our passion for software..."
            imageUrl="https://cdn.pixabay.com/photo/2020/10/21/18/07/laptop-5673901_960_720.jpg"
        />
        <ImageWithCard
            linkTo={LinkToPage.TheVision}
            mirror={true}
            title="The vision"
            text="We've all been in the business for a few years. Colleagues have come and gone, projects and companies have changed in a world where technology is ever evolving. We've stayed on that path, with its ups and downs, following our passion for software..."
            imageUrl={"https://cdn.pixabay.com/photo/2023/05/20/16/05/island-8006762_960_720.jpg"}
        />
    </StyledArticleSection>
);

export default ArticleSection;
