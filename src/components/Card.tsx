interface Card {
  color: string;
  title: string;
  small?: boolean,
}

interface StyledCard {
  small : boolean,
  color : string
}
import { Theme, css } from "@emotion/react";


import styled from '@emotion/styled'

const StyledDiv = styled.div(
  {
    containerType : "inline-size",
    display: "flex",
    flexDirection : "column",
    alignItems : "center",
    justifyContent : "space-between", 
    borderRadius : "2rem",
    paddingBottom : "1rem",
    color: "black",
  },
  (props : StyledCard) => ({ backgroundColor: props.color, minHeight : props.small ? "20rem" : "20rem",  minWidth : props.small ? "15rem" : "20rem" })
)




const cardText = (theme: Theme) => css`
width: 80cqi;
padding-top : 10cqi;
font-size : clamp(0.2rem, 10cqi, 1rem)

  `
const paragraph = (theme: Theme) => css`

font-size : clamp(0.2rem, 10cqi, 1rem)

  `

function Card({ title, color, small }: Card) {
  return (
    <StyledDiv small={small} color={color}
   
      

    >
      <div css={cardText}>
        <h2 css={theme => ({ fontSize: theme.fontSize.h2 })}>Test</h2>
        <p css={paragraph}>We've all been in the business for a few years. Colleagues have come and gone.</p>
      </div>

     

    </StyledDiv>
  );
}

const Fancy = styled(Card)`
container-type : inline - size;
display: flex;
flex-direction : column;
align-items : center;
justify-content : space - between;
display: flex;
min-width : 10rem;
border-radius : 2rem;
padding-bottom : 1rem;
color: black;

`


export default Fancy;
