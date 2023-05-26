import CardsMenu from "./CardsMenu";
import FluidCenterContainer from "./FluidCenterContainer"
import CurveBackground from "../enums/CurveBackground";

function Footer() {
  return (
    <footer >   
        <FluidCenterContainer curveBackground={CurveBackground.Bottom}  centerContent={false} padTop={false}>
            <CardsMenu></CardsMenu>
        </FluidCenterContainer>
    </footer>
  );
}

export default Footer;
