import CardsMenu from "./CardsMenu";
import FluidCenterContainer from "./FluidCenterContainer"
import CurveBackground from "../enums/CurveBackground";
import {ReactNode} from "react";


interface Props {
    children?: ReactNode,
    light: Boolean
}


function Footer({children, light }: Props) {
  return (
    <footer >   
        <FluidCenterContainer light={light} curveBackground={CurveBackground.Bottom}  centerContent={false} padTop={false}>
            {children}
        </FluidCenterContainer>
    </footer>
  );
}

export default Footer;
