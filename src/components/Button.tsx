import React, {Suspense} from "react";
import Intro from "./Intro/Index";
import {css, Theme} from "@emotion/react"
const button = (theme: Theme) => css`
  width : 80cqw;
  height : 2.5rem;
  background-color : black;
  color : white;
  text-align : center;
  border-radius : 50px;

`

function Button() {
  return (
      <button css={button}>Slide to</button>
  );
}

export default Button;
