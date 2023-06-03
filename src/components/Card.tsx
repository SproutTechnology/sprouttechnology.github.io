import styled from '@emotion/styled'
import CardSize from '../enums/CardSize';
import Button from "./Button"
interface Card {
  color: string;
  title: string;
  size : CardSize
  text : string
  buttonText? : string,
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
  color : black;
  flex-shrink : 0;
  border-radius : ${(props) => props.theme.borderRadius};
  width : ${(props) => props.theme.cardSizes.width[props.size]};
  height : ${(props) => props.theme.cardSizes.height[props.size]};
  background-color: ${(props : StyledCard) => props.color};
`

const Heading = styled.h1`
  margin-bottom : 2.5rem;
  margin-top : unset;
  text-align : left;
  font-size : ${(props) => props.theme.fontSize.h2};
`

const Content = styled.div`
  height : 100%;
  padding : 2rem;
  display : flex;
  flex-direction : column;
  justify-content : space-between;
  align-items : flex-start;
`

const Paragraph = styled.p`
font-size : ${(props) => props.theme.fontSize.p};
`

const Text = styled.div`
  
`
  

function Card({ color, size, title, text, buttonText }: Card) {
  return (
    <StyledCard size={size} color={color}>
      <Content>
        <Text>
          <Heading>{title}</Heading>
          <Paragraph>{text}</Paragraph>
        </Text>
        <Button text={buttonText} small={size === CardSize.Small} ></Button>
      </Content>
    </StyledCard>
  );
}


export default Card;
