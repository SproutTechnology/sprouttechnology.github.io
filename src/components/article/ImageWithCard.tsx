import Card from "../Card";
import styled from "@emotion/styled";
import CardSize from "../../enums/CardSize";
import Colors from "../../enums/Colors";

const BACKUP_IMAGE = {
    url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    alt: "A tree in front of the ocean with the sun in the background",
};
interface Props {
    mirror?: Boolean;
    text: string;
    title: string;
    cardColor?: string;
    imageUrl: string;
    imageAlt: string;
    linkTo: string;
}

interface ImageWithCardContainerProps {
    mirror?: Boolean;
}

const ImageWithCardContainer = styled.div`
    container-type: inline-size;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    gap: 1.5rem;
    height: 35rem;
    
    @media only screen and (min-width: ${(props) => props.theme.breakpoints.sm}) {
        width: 100%;
        flex-direction: ${(props: ImageWithCardContainerProps) => (props.mirror ? "row-reverse" : "row")};
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    flex-basis: 100%;
    object-fit: cover;
    border-radius: 2rem;
`;

const ImageWithCard = ({ mirror, text, title, cardColor = Colors.beige, imageUrl = BACKUP_IMAGE.url, linkTo, imageAlt = BACKUP_IMAGE.alt }: Props) => (
    <ImageWithCardContainer mirror={mirror || false} className="rellax" data-rellax-percentage="0.5" data-rellax-speed="4">
        <Card initialWidth={CardSize.Large} text={text} color={cardColor} title={title} linkTo={linkTo} />
        <div>
            <Image alt={imageAlt} src={imageUrl}></Image>
        </div>
    </ImageWithCardContainer>
);

export default ImageWithCard;
