import Card from "./Card";
import styled from "@emotion/styled";
import CardSize from "../enums/CardSize";
import Colors from "../enums/Colors";

const BACKUP_IMAGE  = {
    url :"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    alt : "A tree in front of the ocean with the sun in the background"
} 
interface Props {
    mirror?: Boolean;
    text: string;
    title: string;
    cardColor?: string;
    imageUrl: string;
    imageAlt : string,
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
    gap: 1.5rem;
    align-items: center;
    @container (width > 700px) {
        width: 100%;
        height: 60cqh;
        flex-direction: ${(props: ImageWithCardContainerProps) => (props.mirror ? "row-reverse" : "row")};
    }
`;

const ImageWrapper = styled.div`
    height: 100%;
    width : 100%;
    object-fit: scale-down;
    border-radius: 2rem;
    @container (width > 700px) {
        height: 60vh;
        width : 65cqw;
        flex-direction: ${(props: ImageWithCardContainerProps) => (props.mirror ? "row-reverse" : "row")};
    }
}
  
`;



const StyledCard = styled(Card)`
    height: 100%;
    width : 100%;
    @container (width > 700px) {
        width : 35cqw;
        height: 60vh;
        flex-direction: ${(props: ImageWithCardContainerProps) => (props.mirror ? "row-reverse" : "row")};
    }
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 2rem;
`;



const ImageWithCard = ({ mirror, text, title, cardColor = Colors.beige, imageUrl = BACKUP_IMAGE.url, linkTo, imageAlt = BACKUP_IMAGE.alt }: Props) => (
        <ImageWithCardContainer mirror={mirror || false}>
            <StyledCard initialWidth={CardSize.Large} text={text} color={cardColor} title={title} linkTo={linkTo}/>
            <ImageWrapper>
                <Image alt={imageAlt} src={imageUrl}></Image>
            </ImageWrapper>
        </ImageWithCardContainer>
    
);

export default ImageWithCard;
