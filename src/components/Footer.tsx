import CardsMenu from "./CardsMenu";
import BottomCurveContainer from "./BottomCurveContainer"
import { Theme, css } from '@emotion/react'

const footer = (theme : Theme )=> css`
  margin-top : 15rem;
  
`

function Footer() {
  return (
    <footer css={footer}>   
        <BottomCurveContainer  centerContent={false} padTop={false}>
            <CardsMenu></CardsMenu>
        </BottomCurveContainer>
        
    </footer>
  );
}

export default Footer;
