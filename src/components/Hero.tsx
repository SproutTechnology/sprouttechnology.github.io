import Container from "./Container";
import Showcase from "./Showcase";

import { Theme, css } from '@emotion/react'
const hero = (theme: Theme) => css`
  background-color : ${theme.color.charcoal};
  height : 90vh;
  
`
function Hero() {
  return (
    <div css={hero}>
      <Container padTop={false} centerContent={true}>
        <Showcase />
      </Container>
    </div>
  );
}

export default Hero;
