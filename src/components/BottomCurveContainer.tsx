import { ReactNode } from "react";
import Container from "./Container";
import styled from "@emotion/styled";
interface Props {
  children: ReactNode;
  padTop: Boolean,
    centerContent: Boolean,
}

const Background = styled('div')`
    background-image:  url("/src/assets/footer.svg");
    background-position: top;
    background-repeat: no-repeat;
    background-color : #1D1D1D;
    background-size : 100%;
    container-type : inline-size;
    min-height : 60vh;
`

function BottomCurveContainer({ children,padTop,centerContent }: Props) {
  return (
    <Background>
      <Container padTop={padTop} centerContent={centerContent}>{children}</Container>
    </Background>
  );
}

export default BottomCurveContainer;
