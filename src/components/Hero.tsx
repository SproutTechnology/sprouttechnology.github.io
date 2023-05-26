import FluidCenterContainer from "./FluidCenterContainer";
import Showcase from "./Showcase";

import { Theme, css } from '@emotion/react'
const hero = (theme: Theme) => css`
  background-color : ${theme.backgroundColors.charcoal};
  height : 90vh;
  
`
function Hero() {
  return (
    <div css={hero}>
      <FluidCenterContainer padTop={false} centerContent={true}>
        <Showcase />
      </FluidCenterContainer>
    </div>
  );
}

export default Hero;
