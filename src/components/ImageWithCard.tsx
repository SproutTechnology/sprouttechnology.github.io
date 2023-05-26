import Card from "./Card";
import styled from "@emotion/styled";
import CardSize from "../enums/CardSize";
interface Props {
  mirror? : Boolean,
}


const ImageWithCardContainer = styled.div`
  container-type : inline-size;
  display : flex;
  flex-direction : column;
  gap : 1rem;
  @container (width > 800px){
    flex-direction : ${(props : Props) => props.mirror ? 'row-reverse' : 'row'};
  }
`

const ImageWrapper = styled.picture`
  display : flex;
  flex-basis : 70cqi;
`

const Image = styled.img`
  max-width : 100%;
  height : auto;
  border-radius : 1rem;
`


const ImageWithCard = ( {mirror} : Props) => (
    <ImageWithCardContainer mirror={mirror} >
        <Card size={CardSize.Large} color="#C8B9AB" title="Sprout is us"></Card>    
        <ImageWrapper>
          <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"></Image>
        </ImageWrapper>
    </ImageWithCardContainer>
)

export default ImageWithCard;