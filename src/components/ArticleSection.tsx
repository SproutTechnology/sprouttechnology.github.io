import styled from "@emotion/styled";
import ImageWithCard from "./ImageWithCard";
import Colors from "../enums/Colors";

const StyledArticleSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${(props) => props.theme.spacing.large};
`;

const ArticleSection = () => (
    <StyledArticleSection>
        <ImageWithCard
            title="Sprout is us"
            text="We've all been in the business for a few years. Colleagues have come and gone, projects and companies have changed in a world where technology is ever evolving. We've stayed on that path, with its ups and downs, following our passion for software..."
            imageUrl={"https://cdn.pixabay.com/photo/2023/06/16/11/47/books-8067850_960_720.jpg"}
        />
        <ImageWithCard
            cardColor={Colors.green}
            mirror={true}
            title="The vision"
            text="We've all been in the business for a few years. Colleagues have come and gone, projects and companies have changed in a world where technology is ever evolving. We've stayed on that path, with its ups and downs, following our passion for software..."
            imageUrl={"https://cdn.pixabay.com/photo/2021/10/30/12/41/mountains-6754215_1280.jpg"}
        />
    </StyledArticleSection>
);

export default ArticleSection;
