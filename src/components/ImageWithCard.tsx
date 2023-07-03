import Card from "./Card";
import styled from "@emotion/styled";
import CardSize from "../enums/CardSize";
import Colors from "../enums/Colors";

const BACKUP_IMAGE = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg";
interface Props {
    mirror?: Boolean;
    text: string;
    title: string;
    cardColor?: string;
    imageUrl: string;
}

interface ImageWithCardContainerProps {
    mirror: Boolean;
}

const ImageWithCardContainer = styled.div`
    container-type: inline-size;
    width: ${(props) => props.theme.cardSizes.width[CardSize.Large]};
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    align-items: center;
    @container (width > 700px) {
        width: 100%;
        height: ${(props) => props.theme.cardSizes.height[CardSize.Large]};
        flex-direction: ${(props: ImageWithCardContainerProps) => (props.mirror ? "row-reverse" : "row")};
    }
`;

const ImageWrapper = styled.div`
    height: 100%;
    object-fit: scale-down;
    border-radius: 2rem;
}
  
`;

const Image = styled.img`
    max-width: 720px;
    height: 100%;
    object-fit: cover;
    border-radius: 2rem;
`;

const ImageWithCard = ({ mirror, text, title, cardColor = Colors.beige, imageUrl = BACKUP_IMAGE }: Props) => (
    <ImageWithCardContainer mirror={mirror || false}>
        <Card size={CardSize.Large} text={text} color={cardColor} title={title}></Card>
        <ImageWrapper>
            <Image src={imageUrl}></Image>
        </ImageWrapper>
    </ImageWithCardContainer>
);

export default ImageWithCard;
