import {Suspense} from "react";
import Intro from "./Intro/Index";
import styled from "@emotion/styled";

const ShowcaseWrapper = styled.div`
  background-color : ${props => props.theme.backgroundColors.charcoal};
  display : flex;
  justify-content : center;
  width : 100%;

`

function Showcase() {
  return (
      <ShowcaseWrapper>
          <Suspense fallback={null}>
          <Intro />
        </Suspense>
      </ShowcaseWrapper>
  );
}

export default Showcase;
