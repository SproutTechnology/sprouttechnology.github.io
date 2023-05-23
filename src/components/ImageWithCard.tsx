import Card from "./Card";
import { Theme, css } from "@emotion/react";
import styled from "@emotion/styled";

interface Props {
  mirror? : Boolean,
}


const StyledWrapper = styled.div`
  container-type : inline-size;
  display : flex;
  flex-direction : column;
  gap : 1rem;

  @container (width > 450px){
    flex-direction : ${(props : Props) => props.mirror ? 'row-reverse' : 'row'};
    
  }
`
const StyledCard = styled(Card)`
    flex-basis : 30cqi;
    @container (width < 450px){
      min-height :  clamp(20rem, 10cqh, 30rem);
    }
`

const image = (theme: Theme) => css`
  max-width : 100%;
  height : auto;
  border-radius : 1rem;
`


const imageWrapper = (theme: Theme) => css`
  display : flex;
  flex-basis : 70cqi;
`


const ImageWithCard = ( {mirror} : Props) => (
    <StyledWrapper mirror={mirror} >
        <StyledCard color="#C8B9AB" title="Sprout is us"></StyledCard>    
        <div css={imageWrapper}>
        <img css={image}   src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"></img>
        </div>
    </StyledWrapper>
)

export default ImageWithCard;