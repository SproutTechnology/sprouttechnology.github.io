import { ReactNode } from "react";
import styled from "@emotion/styled";
import Container from "./Container";
interface Props {
  children: ReactNode;
  padTop: Boolean,
  centerContent: Boolean,
}

const Background = styled('div')`
    background-image:  url("/src/assets/header.svg");
    background-position: top;
    background-repeat: no-repeat;
    background-color : #E5DBD1;
    background-size : 100%;
    container-type : inline-size;
`

function TopCurveContainer({ children, padTop,centerContent }: Props) {
  return (
    <Background>
      <Container padTop={padTop} centerContent={centerContent}>
        {children}
        </Container>
    </Background>

  );
}

export default TopCurveContainer;
