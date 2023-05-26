import styled from '@emotion/styled'
import CardSize from '../enums/CardSize';

interface Card {
  color: string;
  title: string;
  size : CardSize
}

interface StyledCard {
  color : string,
  size : CardSize
}

const StyledCard = styled.div`
  container-type : inline-size; 
  display: flex;
  flex-direction : column;
  align-items : center;
  justify-content : space-between;
  border-radius : ${(props) => props.theme.borderRadius};
  min-width : ${(props) => props.theme.cardSizes.width[props.size]};
  height : ${(props) => props.theme.cardSizes.height[props.size]};
  background-color: ${(props : StyledCard) => props.color};
`
  

function Card({ color, size }: Card) {
  return (
    <StyledCard size={size} color={color}></StyledCard>
  );
}


export default Card;
