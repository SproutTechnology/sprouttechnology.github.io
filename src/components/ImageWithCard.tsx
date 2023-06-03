import Card from "./Card";
import styled from "@emotion/styled";
import CardSize from "../enums/CardSize";
interface Props {
  mirror? : Boolean,
  text : string,
  title : string
 
}

interface ImageWithCardContainerProps {
  mirror : Boolean
}


const ImageWithCardContainer = styled.div`
  container-type : inline-size;
  width : ${(props) => props.theme.cardSizes.width[CardSize.Large]};
  display : flex;
  flex-direction : column;
  justify-content : center;
  gap : 1rem;
  align-items : center;
  @container (width > 700px){
    width : 100%;
    height : ${props => props.theme.cardSizes.height[CardSize.Large]};
    flex-direction : ${(props : ImageWithCardContainerProps) => props.mirror ? 'row-reverse' : 'row'};
  }
`

const ImageWrapper = styled.div`
max-width: 100%;
height: 100%;
object-fit: scale-down;
border-radius: 2rem;
}
  
`

const Image = styled.img`
width : 100%;
height: 100%;
object-fit: cover;
border-radius: 2rem;
`


const ImageWithCard = ( {mirror, text, title} : Props) => (
    <ImageWithCardContainer mirror={mirror || false} >
        <Card size={CardSize.Large} text={text} color="#C8B9AB" title={title}></Card>    
        <ImageWrapper>
          <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"></Image>
        </ImageWrapper>
    </ImageWithCardContainer>
)

export default ImageWithCard;