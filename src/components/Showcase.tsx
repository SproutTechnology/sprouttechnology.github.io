import React, {Suspense} from "react";
import Intro from "./Intro/Index";
import {css, Theme} from "@emotion/react"
const showCase = (theme: Theme) => css`
  background-color : ${theme.color.charcoal};
  height : 100%;
  width : 100%;
  
  
`

function Showcase() {
  return (
      <div css={showCase} >
          <Suspense fallback={null}>
          <Intro />
        </Suspense>
      </div>
  );
}

export default Showcase;
